
### zsh + oh-my-zsh
```shell
    yum -y install zsh
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/wilon/oh-my-zsh/master/tools/install.sh)"
    chsh -s /bin/zsh    # 修改默认zsh，需重启。或修改 /etc/passwd
    zsh    # 手动切换
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/wilon/oh-my-zsh/master/tools/simple_install.sh)"    # bash config
    wget https://raw.githubusercontent.com/wilon/oh-my-zsh/master/templates/inputrc.zsh-template -O ~/.inputrc    # inputrc config
```

### 目录文件查找字符串grep
```shell
    grep [-acinv] [--color=auto] 'string/preg' FILENAME/FILE_DIR
    -a # 将 binary 文件以 text 文件的方式搜寻数据
    -i # 忽略大小写的不同，所以大小写视为相同
    -r # 递归查找 FILE_DIR
    -n # 顺便输出行号
    -c # 计算找到 '搜寻字符串' 的次数
    -v # 反向选择，亦即显示出没有 '搜寻字符串' 内容的那一行！
    -o # 只输出文件中匹配到的部分。
    -E # 匹配正则表达式
    --color=auto # 可以将找到的关键词部分加上颜色的显示喔！
    # 管道符 grep，适配 sed、awk 的正则
    ## 正则  .   []   \(\)  \{3\}  \+   *  \|  [0-9]  \s
    ## 字符  \.  \[\]  ()   {}      +  \*   |
    cat cache/smtp.log | grep '\([0-9]\+\.\)\{3\}[0-9]\+'    # ip
    # zgrep 在Gzip压缩文件中搜索
    zgrep -i error /var/log/syslog.2.gz
```

### awk sed 文件操作
```shell
    awk ‘!a[$0]++’ path/to/file    # 去除重复行
    cat cache/smtp.log | grep "To" | awk '{print $9;}' | sort | uniq -c    # 查看邮件日志 | 有“To”的行 | 列出用户 | 排序 | 统计用户出现次数
    for i in `ls`; do cp -f $i `echo $i | sed 's/^\([0-9]\..*md\)$/0\1/'`; done    # 目录下 1.xx.md 2.xx.md 复制为 01.xx.md 02.xx.md
    for i in `ls`; do cp -f $i `echo $i | sed 's/\..*px_.*_.*.net.png$/.png/'`; done    # 批量修改多余文件后缀
    sed -i "s/oldstring/newstring/g" `grep oldstring -rl yourdir`    # 把目录下所有文件的 oldstring 替换为 newstring
    sed -i "s/garden/mirGarden/g" ./readme.md    # 将文件内的字符替换
    sed -i "s/garden/mirGarden/g" `ls`    # 将当前文件夹下所有文件内的字符替换

```

### ind 文件及目录操作
```shell
    find .    # 列出所有文件及目录
    find . -type f -size +50M -print0 | xargs -0 du -h | sort -nr    # 列出大于50M的文件 | 且显示文件大小 | 并排序
    find . -type d -name ".svn" | xargs rm -rf    # 找出所有“.svn”文件夹 | 并删除
    find . -name .DS_Store | xargs rm    # 找出所有“.DS_Store”文件 | 并删除
    find /data/logs/nginx -type f -name "*.gz" -ctime -5 | xargs zcat | grep 'HTTP/1.1" 500'
```

### 一行脚本，作为任务
```shell
    # 凌晨备份数据库
    0 2 * * * /usr/bin/mysqldump -uDUMPUSER -pDUMPUSERPWD DATABASE | gzip > /data/backup/mysql/TABLE_$(date +"\%Y\%m\%d").sql.gz
    # 只保留最近5天
    0 2 * * * find /data/backup/mysql/ -name "TABLE_*.sql.gz" -type f -mtime +5 -exec rm {} \; > /dev/null 2>&1
    # Mac、Linux 更新host，科学上网
    */10 * * * * /usr/bin/curl -o /private/etc/hosts https://raw.githubusercontent.com/googlehosts/hosts/master/hosts-files/hosts
    # 检测服务
    if test `pgrep nginx | wc -l` -eq 0; then /usr/sbin/service nginx start > /dev/null; fi;
    if test `pgrep php-fpm | wc -l` -eq 0; then /usr/sbin/service php7.0-fpm start > /dev/null; fi;
    if test `pgrep mysql | wc -l` -eq 0; then /usr/sbin/service mysql start > /dev/null; fi;
    # 检测 URL
    */10 7-23 * * * (/usr/bin/wget -O /tmp/wechat.check http://wx.baitongshiji.com/wechat/check || /usr/sbin/service docker restart) >> /tmp/wechat.check.log 2>&1
```

### 查看进程 ps
```shell
    pa aux
    ps -ef | grep lantern | grep -v grep | awk '{print $2}' | xargs kill -9     # 杀死‘lantern’的进程
    nohup php colloct.php &    # 在后台运行
```

### nodejs + npm + gulp
```shell
    # install
    yum -y install nodejs
    yum -y install npm
    npm install gulp -g    # global
    npm install gulp --save    # save to package.json
    # Ubuntu install last nodejs
    curl -sL https://deb.nodesource.com/setup_6.x | sudo bash -    # source
    sudo apt-get install nodejs
    # other
    npm install -g    # 没有包则下载，有则更新包依赖
    npm config set registry https://registry.npm.taobao.org    # taobao 镜像
    sudo ln -s /usr/bin/nodejs /usr/bin/node    # Ubuntu
```

### PHP help
```shell
    # path
    php -i | grep configure    # 可以查看【PHP安装目录】位置
    php -i | grep php.ini    # 可以查看【php.ini】位置
    ps aux | grep php-fpm.conf    # 可以查看【php-fpm.conf】位置
    php-fpm -t    # 可以查看【php-fpm.conf】位置

    export PATH=$PATH:PHP安装目录/php/bin    # php命令加入path
    # confi 配置文件
    php -v
    # test
    wget https://wilon.github.io/static/p.php    # 雅黑PHP探针
```

### other
```shell
    echo $PATH    # 查看可以PATH，按优先级排列
    echo 'aaaaaa' > test.htm
    echo -n 'aaaaaa' > test.htm    # 没有换行
```

### top 命令详解 help
```shell
    第一行，任务队列信息 — 当前系统时间 — 系统运行时间 — 当前用户登录数 - 负载情况
    第三行，CPU状态信息 - 用户空间占用CPU的百分比 — 内核空间占用CPU的百分比, id — 空闲CPU百分比
    第四行，内存状态 - 物理内存总量 — 使用中的内存总量 — 空闲内存总量 — 缓存的内存量    # 8,000,000 = 8G
    第五行，SWAP交换分区信息 — 交换区总量 — 使用的交换区总量 — 空闲交换区总量 — 缓冲的交换区总量
    第七行以下：各进程（任务）的状态监控
        PID — 进程id
        USER — 进程所有者
        PR — 进程优先级
        NI — nice值。负值表示高优先级，正值表示低优先级
        VIRT — 进程使用的虚拟内存总量，单位kb。VIRT=SWAP+RES
        RES — 进程使用的、未被换出的物理内存大小，单位kb。RES=CODE+DATA
        SHR — 共享内存大小，单位kb
        S — 进程状态。D=不可中断的睡眠状态 R=运行 S=睡眠 T=跟踪/停止 Z=僵尸进程
        %CPU — 上次更新到现在的CPU时间占用百分比
        %MEM — 进程使用的物理内存百分比
        TIME+ — 进程使用的CPU时间总计，单位1/100秒
        COMMAND — 进程名称（命令名/命令行）
```

### docker run param
```shell
    -d    # 使用于服务型，containter将会运行在后台模式(Detached mode)。此时所有I/O数据只能通过网络资源或者共享卷组来进行交互。注意：--rm 和 -d不能共用！
    --rm    # 使用执行命令型，在container结束时自动清理其所产生的数据。注意：--rm 和 -d不能共用！
    --restart=always    # 随docker服务自启动
```

### docker 安装
```shell
    # centos 6.8
    rpm -Uvh http://ftp.riken.jp/Linux/fedora/epel/6Server/x86_64/epel-release-6-8.noarch.rpm
    yum -y install docker-io
```

### docker help
```shell
    service docker start    # 启动服务
    systemctl enable docker    # Centos 开机启动

    # docker CONTAINER 镜像
    docker pull <repository>
    docker images    #  查看安装的镜像
    docker run <repository> <command>     # 在容器内运行镜像
    docker rmi <image id>    # 删除镜像

    # docker CONTAINER 容器
    docker ps -a    # 查看所有容器
    docker start <container id>    # 开始该容器
    docker stop <container id>    # 停止该容器
    docker rm <container id>    # 删除该容器
    docker attach <container id>    # 进入正在运行的容器
    docker exec -it <container id> /bin/bash    # 以bash进入容器

    # Dockerfile
    docker build -t <image name> .
```

### docker Dockerfile
```shell
    构建镜像时会执行Dockerfile中的RUN命令
    容器启动的时候会执行Dockerfile中的CMD命令
```

### 输出分类、级别
```shell
    php -v > /dev/null 2>&1    # 不保留所有输出
    php -v 2>/dev/null    # 不保留错误输出
```

### 标准化输出
```shell
    30 21 * * * php -v > /dev/null 2>&1    # 不保留输出
    find / -name 'lnmp.conf' 2>/dev/null    # 不显示错误输出（Permission denied）
```

### 定时任务crontab
```shell
    # 安装配置
    yum -y install vixie-cron    # 软件包是cron的主程序；
    yum -y install crontabs    # 软件包是用来安装、卸装、或列举用来驱动cron守护进程的表格的程序。
    service crond start    # 启动服务
    chkconfig --level 345 crond on    # 配置开机启动
    # 参数
    crontab [ -u user ] -l    # 列出当前用户(指定用户)的任务
    crontab [ -u user ] -e    # 编辑当前用户(指定用户)的任务
    crontab [ -u user ] -r    # 清除当前用户(指定用户)的任务
    # 配置命令行
    MAILTO=""
    SHELL=/bin/sh
    PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin    # echo $PATH查看
    # 日志
    30 21 * * * php -v > /dev/null 2>&1    # 不保留输出
    30 21 * * * php -v >> /tmp/test.log    # 保存日志
    */1 * * * * (echo $(date +"\%Y-\%m-\%d \%H:\%M:\%S") && echo 1233333) >> /tmp/crond.log 2>&1    # 测试服务是否正常
    # 定时任务： 分　时　日　月　周　 命令
    30 21 * * * /usr/local/etc/rc.d/lighttpd restart    # 每晚的21:30重启apache。
    45 4 1,10,22 * * /usr/local/etc/rc.d/lighttpd restart    # 每月1、10、22日的4 : 45重启apache。
    10 1 * * 6,0 /usr/local/etc/rc.d/lighttpd restart    # 每周六、周日的1 : 10重启apache。
    0,30 18-23 * * * /usr/local/etc/rc.d/lighttpd restart    # 在每天18 : 00至23 : 00之间每隔30分钟重启apache。
    0 23 * * 6 /usr/local/etc/rc.d/lighttpd restart    # 每星期六的11 : 00 pm重启apache。
    * */1 * * * /usr/local/etc/rc.d/lighttpd restart    # 每一小时重启apache
    * 23-7/1 * * * /usr/local/etc/rc.d/lighttpd restart    # 晚上11点到早上7点之间，每隔一小时重启apache
    0 11 4 * mon-wed /usr/local/etc/rc.d/lighttpd restart    # 每月的4号与每周一到周三的11点重启apache
    0 4 1 jan * /usr/local/etc/rc.d/lighttpd restart    # 一月一号的4点重启apache
    */30 * * * * /usr/sbin/ntpdate 210.72.145.44    # 每半小时同步一下时间
```

### 重启
```shell
    # 重启电脑
    shutdown -h|-r now    # 安全关机|重启，now可以更改为时间
    reboot    # 重启
    # 重启\服务：
    /usr/local/apache2/bin/apachectl stop
    /usr/local/apache2/bin/apachectl start
    /etc/rc.d/init.d/nginx restart
    service nginxd reload
```

### service
```shell
    # 能识别的目录！直接service httpd start
    /etc/rc.d/init.d/
```

### 时间及管理
```shell
    date    # 查看系统时间
    date -s 20130220    # 设定日期
    date -s 09:30:00    # 设定时间
    # 远程校准时间
    yum -y install ntpdate
    ntpdate cn.pool.ntp.org
```

### php进程管理php-fpm
```shell
    # 1. 查看服务
    ps aux | grep --color=auto php-fpm
    # 2. 修改执行php进程用户
    vim /etc/php-fpm.d/www.conf     # 修改 user group
    /etc/init.d/php-fpm restart    # 重启
    chown -R user:group /var/lib/php/session    # 修改需要权限的文件夹
```

### 常见目录信息
```shell
    /           # 根目录
    /bin        # 命令保存目录（普通用户就可以读取的命令）
    /boot       # 启动目录，启动相关文件
    /dev        # 设备文件保存目录
    /etc        # 配置文件保存目录
    /home       # 普通用户的家目录
    /lib        # 系统库保存目录
    /mnt        # 系统挂载目录
    /media      # 挂载目录
    /root       # 超级用户的家目录
    /tmp        # 临时目录
    /sbin       # 命令保存目录（超级用户才能使用的目录）
    /proc       # 直接写入内存的
    /sys
    /usr                # 系统软件资源目录
    /usr/bin/           # 系统命令（普通用户）
    /usr/sbin/          # 系统命令（超级用户）
    /var                # 系统相关文档内容（系统可变数据保存目录）
    /var/log/           # 系统日志位置
    /var/spool/mail/    # 系统默认邮箱位置
    /var/lib/mysql/     # 默认安装的mysql的库文件目录
```

### curl 使用
```shell
    curl -o ~/baidu.html https://www.baidu.com    # 下载到指定文件
    curl -x 127.0.0.1:3128 https://www.google.com/humans.txt    # 指定代理
    curl -k https://www.baidu.com    # 允许不使用证书到SSL站点
    curl -v https://www.baidu.com    # 显示详情
    curl -s https://www.baidu.com    # 静默模式
```

### 查看系统信息
```shell
    netstat -apn | grep 80    # 查看80端口被哪些进程占用
    ps aux[|grep nginx]    # 查看当前系统所有运行的进程
    uname -a    # 内核版本
    cat /etc/issue    # 系统信息
    cat /proc/version    # 系统详情
```

### 查看文件夹信息
```shell
    df -h    # 查看磁盘空间
    du -sh *    # 查看当前目录下个文件（夹）大小
    du -sh * | sort -rn | grep "M\s"    # sort
    ls | wc -l    # 查看当前文件夹下文件（夹）的个数
    ls -l | grep "^-" | wc -l    # 查看当前文件夹下文件的个数
    ls -lR | grep "^-" | wc -l    # 查看某目录下文件的个数，包括子目录里的。
    ls -lR | grep "^d" | wc -l    # 查看某文件夹下目录的个数，包括子目录里的。
    ll --full-time    # 查看文件的完整时间信息
    ll -t | head -n 5    # 查看最新的5个文件
```

### composer安装
```shell
    # 国内安装-1
    curl -sS https://install.phpcomposer.com/installer | php    # 下载源码包php执行
    mv composer.phar /usr/local/bin/composer    # 加入到系统命令
    composer config -g repo.packagist composer https://packagist.phpcomposer.com    # 全局配置国内镜像源
    # 国内安装-2
    wget https://dl.laravel-china.org/composer.phar -O /usr/local/bin/composer
    chmod a+x /usr/local/bin/composer
    composer config -g repo.packagist composer https://packagist.laravel-china.org
    # 使用
    composer config -l -g    # 查看全局配置信息
    composer clear-cache    # 清除缓存
    composer require --no-plugins --no-scripts xxx/xxxx     # root 下安装
```

### 安装php扩展extension
```shell
    # pear 命令安装
    pear install xdebug    # 失败则扩展pear已不维护
    # 源码安装
    cd /xxx/php-包/ext/EXTENSION
    phpize    # 确认命令可使用
    ./configure -with-php-config=/usr/local/php/bin/php-config
    make && make install
    echo extension=EXTENSION.so >> /usr/local/php/etc/php.ini
```

### 更换阿里云yum源
```shell
    mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup    # 备份
    wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo    # 下载相应的yum源
    yum clean all    # 运行yum
    yum makecache    # makecache生成缓存
```

### xshell连接服务器
```shell
    # 倒计时界面enter安装，一直下一步
    chkconfig iptables off    # 开机关闭iptables
    service iptables stop    # 立即关闭iptables
    # 设置网络连接为【NAT】
    service sshd start    # 开启ssh
```

### 服务开机启动
```shell
    vim /etc/inittab    # :id:5:initdefault: 启动级别，5图形界面改，3纯命令行
    chkconfig [--level 服务级别] 服务名 on    # 设置开机启动，off关闭
    chkconfig --level 345 mysqld on    # MySQL开机启动
    chkconfig --list    # 查看自启动列表、级别
    # 0:off  1:off   2:on    3:off   4:on    5:off   6:off
    ntsysv    # 伪图形界面启动服务
```

### 用户相关
```shell
    # 用户操作
    su weilong    # 切换用户
    sudo -i    # 切换到root
    useradd -G {group-name} weilong    # 新建用户[到组]
    # 密码操作
    passwd weilong    # 修改用户密码
    userdel [-r|f] weilong    # 删除用户[及目录|强制删除]
    vim /etc/passwd[group|shadow]    # 查看所有用户[组|密码]信息
    # /etc/passwd 用户名:口令:用户标识号:组标识号:描述:主目录:登录Shell
    # 组操作
    gpasswd -a [-d] 用户名 组名    # 把用户加入[删除]到组
    usermod -a -G groupA user    # 将用户添加到组groupA中，而不必离开其他用户组
    # 给用户添加sudo，需root操作
    chmod 600 /etc/sudoers
    echo 'weilong ALL=(ALL) ALL' >> /etc/sudoers
    chmod 400 /etc/sudoers    # 收起写权限
    # 禁止用户登陆
    usermod -L weilong    # Lock 帐号weilong
    usermod -U weilong    # Unlock 帐号weilong
    # ssh秘钥登陆服务端配置：/etc/ssh/sshd_config
    RSAAuthentication yes    # 使用RSA认证
    PubkeyAuthentication yes    # 允许Pubkey Key
    AuthorizedKeysFile .ssh/authorized_keys    # id_rsa.pub放入【该用户】下此文件
    PasswordAuthentication no    # 不允许密码登陆
    PermitEmptyPasswords no    # 不允许无密码登陆
    PermitRootLogin no   # 不允许root直接登陆
    AllowUsers weilong    # 允许用户
    # sftp登陆服务器
    Subsystem sftp internal-sftp    # sftp配置
    X11Forwarding no
    AllowTcpForwarding no
    Match user[Group] weilong    # 配置用户[组]——start
    ForceCommand internal-sftp
    ChrootDirectory /home    # 所属用户必须为root——end
```

### 文件上传rz下载sz
```shell
    yum -y install lrzsz
```

### scp文件传输
```shell
    cp LOCAL_FILE REMOTE_USERNAME@REMOTE_IP:REMOTE_FOLDER
```

### 命令重命名，创建快捷命令
```shell
    echo alias ws=\\'cd /home/wwwroot/default/\\' >> ~/.bashrc && source ~/.bashrc
```

### 终端快捷操作
```shell
    ctrl+a 跳转至行首，ctrl+e 跳转至行尾
    ctrl+k 快清至行首，ctrl+u 快清至行尾
    ctrl+w 清除当前光标位置之前的一个单词
    ctrl+c 强制终止，ctrl+l 清屏
    cmd !! 双惊叹号表示上一行命令
    !cmd   执行最近的已cmd开头的命令
```

### 查看文件
```shell
    tail -f FILENAME    # 动态查看文件最新变化
    cat [-n] 文件名    # 所有内容[显示行号]
    more 文件名    # 分屏显示，space|b|q 翻页下|上|退出
    head [-n 2] 文件名    # 显示文件头[两行]
```
