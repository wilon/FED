
### 正则表达式 RegExp
```javascript
    // 正则操作
    var myReg = /a(b.)d/g    // g 全局搜索；i 不区分大小写搜索；m 多行搜索；
    var myReg = new RegExp('/a(b.)d/', 'g');    // 好处是支持生成字符串正则
    var resIsMatch = myReg.test('aabcdefg');    // true
    var resArray = myReg.exec('aabcdefg');    // ["abcd", "bc"]
    // 字符串操作正则
    var myStr = 'aabcdefg';
    var resArray = myStr.match(myReg);    // ["abcd"]
    var resNum = myStr.search(myReg);    // 1
    var resStr = myStr.replace(myReg, 'zzz');    // "azzzefg"
    var resArray = myStr.split(myReg);    // ["a", "bc", "efg"]
```

### gulp task 顺序
```javascript
    gulp.task('rev', ['js', 'css', 'md'], function() {});
    // 同步执行：js, css, md，写 return 的会等待执行完才执行 rev
    // 若：js 没写 return，css, md 写了，
    // 则：css, md 执行完，js 仍在执行，同时开始执行 rev
```

### 数组内随机取一条
```javascript
    var tips = [
        '在【操作详细】里搜“API”，可以查看日志',
        '在【操作详细】里搜IP地址如“192.168.80”，可以查看该IP日志',
        '限制IP里 * 代表所有',
    ];
    var dd = parseInt(Math.random() * tips.length);
    $scope.tips = tips[dd];
```

### 字符串 String
```javascript
    // trim
    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, '');
    };
```

### 日期 new Date()
```javascript
    Date();    // "Wed Nov 09 2016 10:44:34 GMT+0800 (CST)"
    var date = new Date();
    // get方法获取具体时间值；set方法设置是兼职；to方法格式化
    date.getFullYear();    // 2016
    date.toString();    // "Wed Nov 09 2016 10:46:41 GMT+0800 (CST)"
    date.toLocaleString();    // "2016/11/9 上午10:47:10"
    date.toLocaleDateString();    // "2016/11/9"
    date.toLocaleTimeString();    // "上午10:47:30"
    date.setFullYear(1947);
    date.toString();    // "Wed Nov 09 2016 10:46:41 GMT+0800 (CST)"
    // 格式化函数
    Date.prototype.format = function(format) {
        var o = {
            "M+": this.getMonth() + 1,    //month
            "d+": this.getDate(),    //day
            "h+": this.getHours(),    //hour
            "m+": this.getMinutes(),    //minute
            "s+": this.getSeconds(),    //second
            "q+": Math.floor((this.getMonth() + 3) / 3),    //quarter
            "S": this.getMilliseconds()    //millisecond
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00"+ o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
    new Date().format('yyyy-MM-dd hh:mm:ss');    // "2016-11-09 11:02:48"
    new Date(1491983649 * 1000).format('yyyy-MM-dd hh:mm:ss');
```

### 其他
```javascript
    // 模板字符串 -v >= ES6
    var user = {name:'weilong', age:20},
        num = 8;
    var res = `My name is ${user.name}, age ${user.age + num}, num ${num}`;
    //检测URL
    String.prototype.checkeUrl = function () {
        return new RegExp('^(https|http|ftp|rtsp|mms)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]', 'g').test(url);
    }
```

### sleep wait
```javascript
console.log('wait 1s')
await new Promise(resolve => setTimeout(resolve, 1000));
console.log('wait 1s again')
await new Promise(resolve => setTimeout(resolve, 1000));
console.log('wait done')
```


### 数组方法
```javascript
    varr colors = ['red', 'green', 'blue'];
    var countColor = colors.length;
    var colorsStr = colors.join(', ');    // 拼接数组
    var countColor = colors.push('black');    // 栈：末尾推入一项
    var endColor = colors.pop();    // 栈：去除末尾项
    var startColor = colors.shift();    // 队列：去除首项
    var countColor = colors.unshift('red');    // 队列：首部推入一项
    var colors = colors.sort();    // 从小到大排序
    var colors = colors.reverse();    // 从大到小排序
    var colors = colors.sort(function (v1, v2) {
    if (v1.length > v2.length) {
            return 1;    // 前面的长就交换
        } else {
            return -1;
        }
    });    // 字符串由短到长排序
    var colorsNew = colors.concat('yellow', ['brown', 'blue']);    // 数组拼接
    var colorsNew1 = colors.slice(2);    // 返回去掉数2项后所有项的数组
    var colorsNew2 = colors.slice(2, 4);    // 返回去掉第2-4项的数组
    var removedColors = colors.splice(2);    // 返回去掉数2项后所有项的数组，colors为剩下值
    var removedColors1 = colors.splice(2, 4);    // 返回去掉第2项后数4项的数组，colors为剩下值
    var removedColors2 = colors.splice(2, 4, 'white');    // 返回去掉第2项后数4项的数组，colors为剩下值，第2项+white
    var removedColors2 = colors.splice(2, 0, 'white');    // 返回去掉第2项后共0项的数组，colors为剩下值，第2项+white
    var index = colors.indexOf('red');    // red位置
    var index1 = colors.lastIndexOf('red');    // red最后出现的位置
    var index2 = colors.indexOf('red', 'black');    // red位置为-1后数black位置
    var everyIsRed = colors.every(function (item, index, array) {
        return item == 'red';
    });   // 每一项都为red则返回true
    var someIsRed = colors.some(function (item, index, array) {
        return item == 'red';
    });   // 有一项为red则返回true
    var mapRes = colors.map(function (item, index, array) {
        return item.toLocaleUpperCase();
    });   // 每一项做操作，返回操作后数组
    var joinRes = colors.reduce(function (prev, cur, index, array) {
        return prev + index + ',' + cur;    // index为cur键
    });   // 并归对数组正序操作，返回操作后返回值
    var joinRes = colors.reduceRight(function (prev, cur, index, array) {
        return prev + index + ',' + cur;    // prev为上次返回值
    });   // 并归对数组反序操作，返回操作后返回值
```