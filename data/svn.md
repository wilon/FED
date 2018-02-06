
### 服务端新建项目、配置用户
```shell
    # 配置项目
    svnadmin create /home/svn/newproject    # 新建项目newproject
    vim /home/svn/newproject/config/svnserve.conf
        anon-access = read
        auth-access = write
        # 默认为/home/svn/newproject/config下，可定义
        authz-db = authz    # 权限管理文件
        password-db = passwd    # 用户名密码文件
    # 配置权限组
    vim /home/svn/newproject/config/authz
        [groups]    # 分组
        developer = weilong
        [/]    # 分组权限
        @developer = rw
    # 配置用户=密码
    vim /home/svn/newproject/config/passwd
        [users]
        weilong = 123456
```

### 提交代码
```shell
    svn status    # 查看状态
    svn add    # 添加文件
    svn commit -m '说明'    # 向上提交
```

### 查看一些信息
```shell
    svn log    # 查看提交日志
    svn log -r 95    # 查看某次提交日志
    svn log -l 2    # 查看最近2次提交日志
    svn info [/project/path]    # 查看项目信息
```

### 操作文件
```shell
    svn　revert　[--recursive]　文件名    # 恢复文件为最新版
    svn propset svn:ignore 'vendor'    # 忽略，加入到ignore
```

### 版本管理
```shell
    svn merge -r 28:25 something    # 回滚到版本号
```

### 删库跑路
```shell
    find . -type d -name ".svn"|xargs rm -rf    # 回滚到版本号
```
