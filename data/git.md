
### 修改一些信息
```bash
    git commit --amend    # 修改commit
    git reset .    # commit前取消add缓冲
```

### 子模块 submodule
```shell
    git submodule add 仓库地址 路径    # 添加子模块
    git submodule update --init --recursive    # 更新子模块
    git rm ./xxx & rm -rf ./xxx    # 删除子模块
```

### 初始新仓库流程
```bash
    # 1. 新建项目
    git clone https://github.com/wilon/wilon.github.io.git    # 代码copy进来，直接push
    # 2. 已有项目
    git init
    git remote add origin https://github.com/wilon/wilon.github.io.git
    git pull
    git merge origin/master
    git push --set-upstream origin master
    #-- 或修改 .git/config
    [remote "origin"]
        url = https://github.com/wilon/oh-my-zsh.git
        fetch = +refs/heads/master:refs/remotes/origin/master
    [branch "master"]
        remote = origin
        merge = refs/heads/master
```

### 分支
```shell
    # 本地分支操作
    git branch    # 查看本地分支
    git branch -r    # 查看远程分支
    git branch -a    # 查看所有分支
    git branch [name]     # 创建本地分支
    git branch -d [name]     # 删除分支
    git checkout [name]    # 切换分支
    git checkout -b [name]    # 创建新分支并立即切换到新分支
    git merge [name]     # 合并name分支到当前分支
    # 远程分支操作
    git push origin [name]    # 创建远程分支(本地分支push到远程)
    git push origin :heads/[name]    # 删除远程分支
    git push origin test:master    # 提交本地test分支作为远程的master分支，远程的github就会自动创建一个test分支
    git push origin test:test    # 提交本地test分支作为远程的test分支
    git push origin :test    # 删除远程分支，刚提交到远程的test将被删除，但是本地还会保存的，不用担心
    # 修改默认HEAD指向分支
    vim .git/refs/remotes/origin/HEAD
    `ref: refs/remotes/origin/master`
```
### 远程仓库
```shell
    git clone git://github.com/jquery/jquery.git    # 检出仓库
    git remote -v    # 查看远程仓库
    git remote add [name] [url]    # 添加远程仓库
    git remote rm [name]    # 删除远程仓库
    git remote set-url --push[name][newUrl]    # 修改远程仓库
    git pull [remoteName] [localBranchName]    # 拉取远程仓库
    git push [remoteName] [localBranchName]    # 推送远程仓库
```

### 私钥与公钥
```shell
    # TortoiseGit 使用 id_rsa
    # 1. 生成Putty key：puttygen工具，Conversions -> Import key -> Save private key；
    # 2. clone时使用
    ssh-keygen -t rsa -N '' -f ~/.ssh/id_rsa -q -b 2048    # 生成公私钥
    ssh-keygen -l -f ~/.ssh/id_rsa.pub    # 查看公钥指纹
```

### 新模块工作流程
```shell
    # 主分支master下
    git add mynewsfile/*    # 添加文件
    git commit [-a] -m '说明'    # 提交到本地库，-a所有改动
    git pull    # 从远程库拉取
    git push [origin master]    # 提交到远程库，默认master
```

### 小改动工作流程
```shell
    # 主分支master下
    git add file/*    # 添加文件
    git commit [-a] -m '说明'    # 提交到本地库，-a所有改动
    git pull    # 从远程库拉取
    # 解决冲突
    git push [origin master]    # 提交到远程库，默认master
```

### tag 管理
```shell
    git tag                 # 列出所有 tag
    git tag v1.0.1          # 创建 tag: v1.0.1
    git push origin --tags  # 将 tag 推送到远库
    git tag -d v1.0.1       # 删除本地 tag
    git push origin :refs/tags/v1.0.1    # 删除远程仓库 tag
```

### 查看一些东西
```shell
    vim .git/config    # 查看项目皮配置
    git status    # 项目目录里
    git branch -a    # 查看所有分支，*代表本地
    git diff 文件    # 当期文件修改
    git log    # 查看提交日志
    git log -p    # 查看提交日志，包含代码
    git log --graph    # 以图表形式查看分支提交日志
    git show    # 查看最近一次提交代码
    git show commit_id   # 查看某一次提交代码
```

### 配置一些东西
```shell
    # 1. 命令配置
    git config --global color.diff auto  && git config --global color.status auto && git config --global color.branch auto    # git配置颜色
    git config --global alias.st status    # git配置别名
    git config --global user.name wilon && git config --global user.email wilonx@163.com    # git配置用户名邮箱
    git config --global http.proxy "127.0.0.1:8087"    # 设置代理
    # 2. 修改配置文件 ~/.gitconfig，已同步在oh-my-zsh项目里
    wget <a href="https://raw.githubusercontent.com/wilon/oh-my-zsh/master/templates/gitconfig.zsh-template" target="_blank">https://raw.githubusercontent.com/wilon/oh-my-zsh/master/templates/gitconfig.zsh-template</a> -O ~/.gitconfig
```

### 其他
```shell
    git clone https://github.com/Wilon/mynote.git    # 克隆一个项目
    git reset --hard HEAD~1    # 回退所有内容到上N个版本，数字可变
    git config user.name "Travis CI" && git config user.email "travis@travis-ci.org" && date > data/pushdata && git commit -a -m "$(date)" && git push    # 自动提交且不产生activity
```

### install 安装最新版
```shell
    # 1. 下载 tar 包，https://github.com/git/git/releases
    # 2. 解压
    wget https://github.com/git/git/archive/v2.15.0.tar.gz
    tar -zxvf v2.15.0.tar.gz
    cd git-2.15.0/
    make prefix=/usr/local/git all
    make prefix=/usr/local/git install
    echo 'export PATH=$PATH:/usr/local/git/bin' >> /etc/bashrc
    source /etc/bashrc
```


### git rebase, 合并commit
```shell
    # 1, 查看log
    git log
    # 2, 找到合并到哪里的 commit hash, 执行合并
    git rebase -i [hash]
    # 3, 编辑合并选项，参考操作下面的文档说明
    # 4, 提交
    git push --force
    # 其他
    git rebase --abort    # 撤销 rebase
```

### Git pull 强制覆盖本地文件
```shell
    git fetch --all
    git reset --hard origin/master
    git pull
    # 或者 git reset --hard HEAD~[N] , 再 pull
```
