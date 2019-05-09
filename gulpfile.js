'use strict'

// 引入 gulp
const gulp = require('gulp');

// 引入组件
const del = require('del'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');
// 压缩合并图片组件
const spritesmith = require('gulp.spritesmith'),
    buffer = require('vinyl-buffer'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    merge = require('merge-stream'),
    imageResize = require('gulp-image-resize');
// wilon md
const wilonBlogdata = require('gulp-concat-blogdata');
// server
const sync = require('browser-sync').create(),
    path = require('path');
// sitemap
const sm = require('sitemap'),
    fs = require('fs');
const htmlmin = require('gulp-htmlmin');

// 合并，压缩 js 文件
gulp.task('js', function() {
    del('./static/wilonblog-*.min.js');
    return gulp.src('./src/javascripts/*.js')
        .pipe(concat('wilonblog.min.js')) // 合并
        .pipe(uglify()) // 压缩
        .pipe(rev()) // 重命名hash
        .pipe(gulp.dest('./static/')) // 保存
        .pipe(rev.manifest('js.json')) // 生成一个重命名用json
        .pipe(gulp.dest('./cache/'));
});

// 缩放图片
gulp.task('imageresize', function() {
    return gulp.src('src/images/*.png')
        .pipe(imageResize({
            width: 18,
            height: 18,
            crop: true,
            upscale: false
        }))
        .pipe(gulp.dest('cache/'))
});

// 合并、压缩图片
gulp.task('sprite', gulp.series('imageresize', function() {
    // Generate our spritesheet
    var spriteData = gulp.src(['src/images/logo.png', 'cache/*.png', "!cache/logo.png"])
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }));
    // Pipe image stream through image optimizer and onto disk
    var imgStream = spriteData.img
        // DEV: We must buffer our stream into a Buffer for `imagemin`
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest('static/'));
    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData.css
        .pipe(csso())
        .pipe(gulp.dest('cache'));
    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);
}));

// 合并，压缩 css 文件
gulp.task('css', gulp.series('sprite', function() {
    del('./static/wilonblog-*.min.css');
    return gulp.src(['./src/stylesheets/*.css', 'cache/sprite.css'])
        .pipe(concat('wilonblog.min.css')) // 合并
        .pipe(minifyCSS()) // 压缩
        .pipe(rev()) // 重命名hash
        .pipe(gulp.dest('./static/')) // 保存
        .pipe(rev.manifest('css.json')) // 生成一个重命名用json
        .pipe(gulp.dest('./cache/'));
}));


// 合并md
gulp.task('md', function() {
    del('./static/wilonblog-*.min.json');
    return gulp.src('./data/*.md')
        .pipe(wilonBlogdata('wilonblog.min.json'))
        .pipe(rev()) // 重命名hash
        .pipe(gulp.dest('./static/')) // 保存
        .pipe(rev.manifest('data.json')) // 生成一个重命名用json
        .pipe(gulp.dest('./cache/'));
});

// sitemap
gulp.task('sitemap', gulp.series('md', function() {
    var urls = [];
    Array.prototype.addUrl = function(url) {
        return this.push({
            url: url,
            changefreq: 'weekly',
            priority: 0.8,
            lastmodrealtime: true,
            lastmodfile: 'index.html'
        });
    };
    urls.addUrl('/');
    urls.addUrl('/jquery-cheatsheet/');
    urls.addUrl('/analysis-phone-number/');
    var dataFs = fs.readFileSync('cache/data.json'),
        dataFileName = JSON.parse(dataFs.toString())['wilonblog.min.json'],
        dataFs = fs.readFileSync('static/' + dataFileName),
        data = JSON.parse(dataFs.toString());
    data.map(function(elem) {
        if (typeof elem.tag == 'undefined') {
            console.log(elem)
            elem.tag = '2333'
        }
        var title = elem.tag.toUpperCase() + ": " + elem.name
        urls.addUrl('/?kw=' + title);
        return;
    })
    var sitemap = sm.createSitemap({
        hostname: 'https://wilon.github.io',
        cacheTime: 600000,
        urls: urls
    });
    return fs.writeFileSync("sitemap.xml", sitemap.toString());
}));

// 替换模板文件内字符串
gulp.task('rev', gulp.series(gulp.parallel('js', 'css', 'md'), function() {
    return gulp.src(['./cache/*.json', './src/*.html']) // 读取需要进行替换的文件
        .pipe(revCollector()) // 执行文件内js、css名的替换
        .pipe(gulp.dest('./cache/')); // 替换后的文件输出的目录
}));

// 默认任务
gulp.task('default', gulp.series('rev', function() {
    return gulp.src('cache/*.html')
        .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true }))
        .pipe(gulp.dest('.'));
}));

// watch任务
gulp.task('revjs', gulp.series('js', function() {
    gulp.src(['./cache/*.json', './src/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./cache/'));
}));
gulp.task('revcss', gulp.series('css', function() {
    gulp.src(['./cache/*.json', './src/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./cache/'));
}));
gulp.task('revmd', gulp.series('md', function() {
    gulp.src(['./cache/*.json', './src/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./cache/'));
}));
gulp.task('revhtml', function() {
    gulp.src(['./cache/*.json', './src/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./cache/'));
});
gulp.task('watch', gulp.series('default', function() {
    gulp.watch('data/*.md', gulp.series('revmd'));
    gulp.watch('src/javascripts/*.js', gulp.series('revjs'));
    gulp.watch(['src/stylesheets/*.css', 'src/images/*.png'], gulp.series('revcss'));
    gulp.watch('src/index.html', gulp.series('revhtml'));
}));

// server任务
gulp.task('server', gulp.series('watch', function(done) {
    let watchOptions = {
        cwd: './',
        ignoreInitial: true,
        ignored: [
            '.DS_Store', 'nohup.out', 'npm-debug.log'
        ]
    };

    sync.watch('**', watchOptions, function(event, file) {
        console.log(file)
        return sync.reload(path.basename(file));
    });
    sync.init({
        server: {
            baseDir: './'
        },
        watchOptions: watchOptions,
        reloadOnRestart: true,
        open: false
    }, function() {
        if (done) {
            done();
        }
    });
}));