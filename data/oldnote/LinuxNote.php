<?php

// 实用命令
    kill -s 9 15732
    cd /    // 快速回到根目录
    find -name nginx*conf -exec vim {} \;     // 当前目录下按文件全名查找文件
    rm -rf /weilong     // 直接删除目录/weilong
    mv weilong weicong  // 重命名文件[夹]
    history [-c]    // 查看[删除]历史命令
    tar -[z|j][c|x]vf xxx.tar.gz[bz2] [yyy]    // [格式][压缩|解压]
    unzip xxx.zip
    df -h  // 查看磁盘空间
    du -sh *  // 查看当前目录下个文件（夹）大小
    scp local_file remote_username@remote_ip:remote_folder // 服务器间传文件
    scp wechatdata remote_username@remote_ip:remote_folder // 服务器间传文件
    scp wechatdata.tar.gz mt@192.168.1.105:/opt/www/
    scp root@192.168.120.204:/opt/soft/nginx-0.5.38.tar.gz /opt/soft/
    scp root@192.168.120.204:/opt/soft/nginx-0.5.38.tar.gz /opt/soft/
    ssh -p 65032 mt@192.168.1.105


// 用户和权限
    passwd    // 修改当前登录用户密码
    passwd weilong    // 修改weilong用户密码
    [grep -i root] /etc/passwd [group]      // 查看[某]用户[组]信息
    gpasswd -a [-d] 用户名 组名  // 组中把用户加入[删除]
    chown -R root:root ./api/    // 更改文件及目录下所有文件为所属[用户：组]
    chmod 770 -R /www   // 更改文件及目录下所有文件权限

// 文件查看命令
    df -h  // 查看磁盘空间
    du -sh *  // 查看当前目录下个文件（夹）大小
    // 查看当前文件夹下文件的个数
        ls -l |grep "^-"|wc -l
    // 查看某目录下文件的个数，包括子目录里的。
    　　ls -lR|grep "^-"|wc -l
    // 查看某文件夹下目录的个数，包括子目录里的。
    　　ls -lR|grep "^d"|wc -l

// 重启了
    // 重启电脑
    shutdown -h|-r now (安全关机|重启，now可以更改为时间)
    reboot  重启
    // 重启Apache服务：
    /usr/local/apache2/bin/apachectl stop
    /usr/local/apache2/bin/apachectl start
    /etc/rc.d/init.d/nginx restart

// 查看一些信息
    netstat -apn | grep 80    查看80端口被哪些进程占用
    httpd(nginx/mysql/php) -v    查看软件版本
    ps aux[|grep nginx]     查看当前系统所有运行的进程
    uname -a    内核版本
    cat /etc/issue     系统信息
    cat /proc/version   系统详情
    yum(rpm) -qa |grep httpd(nginx/mysql/php)   apache2/nginx/mysql/php

// 安装LAMP
    1. 安装PHP库
    2. 安装Apache
    3. 安装MySQL
    4. 安装PHP

// 虚拟主机联网，联通主机
win7 设置无线网络为共享
CentOS 设置网卡为桥接

//网络相关
    setup
    ifconfig    查看网卡信息
    netstat  -an        查看所有网络连接
    netstat  -tlun      查看tcp和udp协议监听端口

    /etc/sysconfig/network-scripts/ifcfg-eth0           网卡信息文件
    /etc/sysconfig/network          主机名配置文件
    /etc/resolv.conf            DNS配置文件

//计划任务
    crontab  -e     编辑定时任务
    五个星     分、时、天、月、星期
    crontab  -l     查看系统定时任务
    crontab  -r         删除定时任务

//服务和进程
    chkconfig  --list       查看默认安装服务的自启动状态
    ntsysv      所系统默认安装服务进行自启动管理

//linux 时间
    date        查看系统时间
    date  -s  20130220      设定日期
    date  -s  09:30:00      设定时间

//linux常见目录
    /       根目录
    /bin        命令保存目录（普通用户就可以读取的命令）
    /boot       启动目录，启动相关文件
    /dev        设备文件保存目录
    /etc        配置文件保存目录
    /home       普通用户的家目录
    /lib        系统库保存目录
    /mnt        系统挂载目录
    /media      挂载目录
    /root       超级用户的家目录
    /tmp        临时目录
    /sbin       命令保存目录（超级用户才能使用的目录）
    /proc       直接写入内存的
    /sys
    /usr            系统软件资源目录
    /usr/bin/       系统命令（普通用户）
    /usr/sbin/      系统命令（超级用户）
    /var            系统相关文档内容（系统可变数据保存目录）
    /var/log/       系统日志位置
    /var/spool/mail/    系统默认邮箱位置
    /var/lib/mysql/     默认安装的mysql的库文件目录

//service能识别的目录！直接service httpd start
    /etc/rc.d/init.d/

//复杂命令
    -   ls | grep 3         管道符
    -   ls ; echo yes       通通执行
    -   ls && echo yes      与，1执行成功执行2
    -   ls || echo yes      或，1执行不成功执行2
    -   ls \                换行，下行继续
        -l                  相当于ls -l

//保存错误信息到文件
    >覆盖 >>追加
    ls  >>  aa  2>&1        错误和正确都输入到aa，可以追加
            2>&1把标准错误重定向到标准正确输出
    ls  >>  aa  2>>/tmp/bb      正确信息输入aa，错误信息输入bb

//基本常识
    r读4,w写2,x执行1
    ctrl+c      强制终止
    ctrl+l      清屏
    ctrl+a      光标移动到行首
    ctrl+e      光标移动到行尾
    ctrl+u      从光标所在位置删除到行首

//常用命令
一：文件操作命令
    1.创建新文件
    -   touch cc    (创建cc)
        touch cc    (修改cc时间)
    2.删除文件 -f强制 -r操作目录
    -   rm cc   (删除cc，有是否删除的提示)
    -   rm -f cc    (无提示，直接删除)
    -   rm -r /weilong  (删除目录/weilong，每次行为都需y|s)
    -   rm -rf /weilong (直接删除目录/weilong)
    3.查看文件内容
        cat [-n] 文件名    (所有内容[显示行号])
        more 文件名    (分屏显示，space|b|q 翻页下|上|退出)
        head 文件名    (显示文件头)
        -   head -n 2 dota2 (=head -2 dota2,显示文件头两行)
    4.链接文件(等同于快捷方式)
    -   ln -s /weilong/a/b/dota2 /weilong/link  (必须写绝对路径，link是文件dota2的快捷方式)
三：文件和目录都能操作
    1.删除    rm
    2.复制    cp 源文件 目标位置
        -r复制目录 -p带文件属性 -d若是链接文件则复制链接属性 -a相当于-pdr
    3.剪切或改名
        mv 源文件 目标位置
        -   mv /weilong/dota2 d2    (文件dota2更名为d2)
    4.属主和属组命令
        chown 用户名 文件名   (改变文件属主)
    -   useradd weilong (建立新用户)
        passwd weilong  (设定密码)
        chown weilong aa    (weilong必须存在)
        chown weilong:user aa
四：帮助命令
    -   man ll      q退出
    -   ls --help
五：查找命令
    1.whereis 命令名   (查找命令及帮助文档的位置)
    2.find 查找
        按文件查找
        -   find /weilong/a -name aa    (在"/weilong/a"搜索"aa")
        按用户查找   -user   -group  -nouser，除了目录/proc /sys /mnt/cdrom/
        -   find /weilong -user weilong
        -   find /weilong -nouser
        按文件属性   -name -size -type -perm(权限) -iname(不区分大小写) -inum(i节点) -mtime n(4所有5天前4天后更改的文档；-4是4天内被改；+4是4天前被改)
        -   find /weilong -perm 744
        操作查找结果
        -   find /weilong -mtime +10 -exec rm -rf {} \;
        -   find /weilong -name dota -exec cat {} \;
    3.preg正则匹配文件内容 -i忽略大小写 -v反向选择
        -   grep -i "g" /weilong/dota2
        find:搜索文件名，通配符完全匹配。
        grep:搜索文件内字符串，包含匹配正则表达式。
    4.管道符   命令1 | 命令2 (1的结果执行2)
        -   netstate -an | grep ESTABLISHED | wc -l (统计正在连接的网络连接数量)
        -   ls | more (分屏显示ls内容)
    补充：netstat  查看网络状态的命令
        -t端口tcp -u端口udp -l监听    -n以IP和端口号显示，不用域名和服务名显示  -a查询所有连接
六：压缩和解压缩
    .gz .bz2    linux常见压缩格式
    tar 压缩打包命令  -z|-j识别.gz|.bz2格式   -c|-x|-t压缩|解压|查看    -v显示压缩过程    -f指定压缩包名
    -   tar -zcvf ig.tar.gz aa  (压缩aa为ig.tar.gz)
    -   tar -zcvf ig.tar.gz bb  (覆盖掉aa)
    -   tar -jxvf ig.tar.bz2    (解压掉ig.tar.bz2)
    -   tar -jxvf ig.tar.bz2 /weilong/a/b   (解压掉ig.tar.bz2到/weilong/a/b)
    Q：解压缩和解打包的区别？
七：关闭和重启
    1.shutdown -h|-r now (安全关机|重启，now可以更改为时间)
    2.reboot    重启
八：挂载命令
    linux所有存储设备必须挂载使用，包括硬盘
    mount|umount    (挂载|卸载)
    mount -t 文件系统 设备描述文件 挂载点(存在的空目录)
    -   mount -t iso9660 /dev/cdrom /mnt/cdrom  (光盘挂载)
    -   umount /dev/cdrom|/mnt/cdrom    (光盘卸载，退出挂载目录才能卸载)
九：网络命令
    1.ping测试网络连通性
        ping -c 次数 ip   (探测网络通畅)
    2.ifconfig  查询本机网络信息


//发展
1969年，肯.汤普森开发UNIX
    常见Unix
        AIX         IBM
        HP-UX       HP
        solaris     SUN
1991年，李纳斯.托瓦兹开发Linux