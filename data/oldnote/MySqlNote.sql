
MySQL笔记
    浮点数：超过16777216（2^24）则用double，用float不准确
    表设计：id主键自增非空无负号
    数据库三范式：
        1. 确保每列保持原子性
        2. 确保表中的每列都和主键相关
        3. 确保每列都和主键列直接相关,而不是间接相关
    1. 字段不可分; 2. 有主键，非主键字段依赖主键; 3. 非主键字段不能相互依赖;
    索引分为聚簇索引和非聚簇索引两种。有INDEX，UNIQUE，FULLTEXT
一、服务器操作
    mysql -h 主机名 - u用户名 -p[密码]  -- 主机名是本地则可省略
    mysql> exit;  -- 退出
    -- 若提示mysql不是系统命令，则换件变量添加..mysql\bin\;
    -- 启动、关闭MySQL
    net start/stop mysql
    /etc/init.d/mysqld restart  -- 重启MySQL
    phpMyAdmin->localhost->用户  可以更改密码、权限、远程访问
二、数据库操作
    mysql> show databases;  -- 查看当前用户下的所有数据库
    mysql> create database 数据库名;  -- 创建lamp78db数据
    mysql> drop database 数据库名;  -- ！删除一个数据库
    mysql> create database if not exists 数据库名;  -- 若数据库不存在，则尝试创建
    mysql> drop database if exists 数据库名;  -- ！若数据库存在，则尝试删除
    mysql> use lamp78;  -- 选择并进入lamp78库
    mysql> SELECT database();  -- 查看当前所在数据库的位置。
三、表操作
    mysql> show tables; --查看当前库下所有的表
    --创建表aa，内有两个字段id和name； 其中int和varchar表示类型
    mysql> create table aa(id int,name varchar(8));
    mysql> CREATE TABLE `stu` (
        ->   `id` int(10) unsigned NOT NULL auto_increment,
        ->   `name` varchar(8) NOT NULL,
        ->   `age` tinyint(3) unsigned NOT NULL,
        ->   `sex` enum('m','w') NOT NULL default 'm',
        ->   `classid` char(6) default NULL,
        ->   PRIMARY KEY  (`id`)
        -> ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
    --执行aa表的删除
    mysql>drop table aa;
    --查看aa表结构
    mysql> desc aa;
    mysql> alter table 表名 rename to 新表名;
    mysql> RENAME TABLE `phpbuy_goods_cart` TO `phpbuy_shop_cart`;

四、表字段操作
    -- 查看stu表的建表语句，其中ENGINE=MyISAM表示表结构类型。
    mysql> show create table stu
    --修改stu表结构类型为innoDB(1个文件)
    mysql> alter table stu engine=innodb;
    --修改stu表结构类型为MyISAM (表文件3个)
    mysql> alter table stu engine=myisam;
    --设置字符集（编码）
    mysql> set names gbk;
    mysql> set names utf8;
    --===========================================================
        修改表结构：
    语法：
        alter table 表名 action（具体操作）；

      添加字段：   table 表名  add  字段名 类型 [约束] [after 字段名|first]
      删除字段：   alter table 表名  drop 字段名
      修改字段：   alter table 表名  change 原字段名 新字段名 类型 [约束]
                  alter table 表名  modify 字段名 类型 [约束]
      添加索引     alter table 表名  add index|unique|primary key [索引名]（字段名）
      删除索引     alter table 表名  drop index 索引名
      修改表名     alter table 表名  rename as 新表名
      重设自增     alter table 表名  auto_increment=1;
    --=============================================================================
    mysql>
    --创建users表，内有三个字段
    mysql> create table users(
        -> id int unsigned not null auto_increment primary key,
        -> username varchar(16) not null,
        -> userpass varchar(32) not null
        -> );
    --在users表最后添加一个sex字段
    mysql> alter table users add sex enum('m','w') not null;
    --在users表的userpass字段后添加age字段信息
    mysql> alter table users add age tinyint unsigned not null after userpass;
    --在users表的第一列位置添加aa字段
    mysql> alter table users add aa int first;
    --删除users表中的aa字段
    mysql> alter table users drop aa;
    -- 修改users表中sex字段（添加默认值）
    mysql> alter table users modify sex enum('m','w') not null default 'm';
    -- 修改sex字段名为sex2
    mysql> alter table users change sex sex2 enum('m','w') not null default 'm';
    -- 为users表中username字段添加唯一性索引（索引名为un_username）
    mysql> alter table users add unique un_username(username);
    -- 删除users表中的un_username索引
    mysql> alter table users drop index un_username;
    -- 为users表中age字段添加普通索引，没有指定索引名（默认索引名为字段名）
    mysql> alter table users add index (age);
    --删除索引
    mysql> alter table users drop index age;
五、表数值操作
    -- 执行aa表的数据添加，
    mysql> insert into aa(id,name) values(1,'zhangsan');
    mysql> insert into aa(id,name) values(2,'lisi');
    --标准性完整添加数据（指定所有的字段并给值）
    mysql> insert into stu(id,name,age,sex,classid)
        -> values(1,'zhangsan',20,'m','lamp78');

        insert into 99cms_api(key,secret,type) values(2,3,4); 错！字段有关键字！
        insert into 99cms_api(`key`,secret,`type`) values(2,3,4);

    --不指定字段添加值
    mysql> insert into stu values(2,'lisi',22,'w','lamp78');
    --主键放null则会自增
    mysql> insert into stu values(null,'wangwu',21,'w','lamp78');
    --指定部分字段添加值
    mysql> insert into stu(name,age) values('qq',23);
    --批量添加值
    mysql> insert into stu(name,age) values('aa',23),('bb',24);
    -- 将id值为5的classid字段值改为lamp79
    mysql> update stu set classid='lamp79' where id=5;
    --将id为4的age改为20，sex改为w
    mysql> update stu set age=20,sex='w' where id=4;
    --将id大于100的所有数据中name改为cc，sex改为m（批量修改）
    mysql> update stu set name='cc',sex='m' where id>100;
    --删除id大于5的所有数据
    mysql> delete from stu where id>5;
六、数据的备份和恢复（导入和导出）
    dos进入D:\mydata：  win+r -> d: -> cd D:\mydata
    D:\>
    **进入到MySQL安装目录下
    -- 将lamp78数据库导出到lamp78_20140220.sql
    [root@localhost mysql]# mysqldump -u root -p lamp78>lamp78_20140220.sql
    Enter password: ****
    --将lamp78_20140220.sql数据导入到lamp78数据库中
    [root@localhost mysql]# mysql -u root -p lamp78<lamp78_20140220.sql
    Enter password: ****
    --将lamp78库中的stu表导出到lamp78_stu.sql文件中
    [root@localhost mysql]# mysqldump -u root -p lamp78 stu>lamp78_stu.sql
    Enter password: ****
    --将stu表数据导入到lamp78数据库中（恢复表数据）
    [root@localhost mysql]# mysql -u root -p lamp78<lamp78_stu.sql
    Enter password: ****
七、sql语句（增删改查）
    --========================================================
    -- 添加SQL语句，格式
     insert into 表名[(字段列表)] values(值列表)[,(值列表)]...
    --========================================================
    --标准添加，指定所有字段添加所有值（null值是为了让主键自增）
    mysql> insert into stu(id,name,age,sex,classid) values(null,'dd',20,'m','lamp79');
    -- 不指定字段方式添加值（注意值的顺序要和表结构顺序一致）
    mysql> insert into stu values(null,'kk',19,'w','lamp78');
    --指定部分字段添加值
    mysql> insert into stu(name,age,classid) values('uu',30,'lamp79');
    -- 批量添加数据
    mysql> insert into stu(name,age,classid) values
        -> ('zz',31,'lamp77'),
        -> ('xx',18,'lamp79'),
        -> ('vv',26,'lamp77');
    --========================================================================
    -- 修改SQL语句：
    update 表名 set 列名=值[,列名=值...] [where 条件语句] [order by 排序][limit 部分数据]
    --========================================================================
    -- 将id为10或12的数据字段sex改为w值
    mysql> update stu set sex='w' where id in(10,12);
    --将id大于100的所有数据中name改为cc，sex改为m（批量修改）
    mysql> update stu set name='cc',sex='m' where id>100;
    --将id大于100的所有数据age+10
    mysql> update stu set age=age+1 where id>100;
    --将所有描述字段`desc`中的"WEB菜单"换成"导航菜单"
    mysql> UPDATE `99cms_web_node` SET `desc` = REPLACE(`desc`, "WEB菜单", "导航菜单");
    --=========================================================================
    -- 删除SQL语句：
     delete from 表名 [where 条件] [order by 排序][limit 部分数据]
    --=========================================================================
    --删除stu表中id值为100,200,300的数据
    mysql> delete from stu where id in(100,200,300);
    --删除stu表中id值大于100的数据
    mysql> delete from stu where id>100;
    --删除stu表中id值从100到200的所有数据
    mysql> delete from stu where id between 100 and 200;
    mysql> delete from stu where id in(1,3,7);
    mysql> delete from stu where id between 2 and 8;
    -- 按年龄做升序排序，并获取第一条，执行删除
    mysql> delete from stu order by age asc limit 1;
    --===========================================================================
    -- 数据查询SQL语句：
     SELECT *|字段列表  from 表名
        [where 条件]
        [group by 字段名 [having 分组后子条件]]
        [order by 字段名 [asc|desc]]    --默认asc升序，desc降序
        [limit [m,]n] --获取部分数据
        [join 表名]
    --===========================================================================
    -- 查询所有字段所有的值
    mysql> SELECT * from stu;
    --只查询name、age、和sex字段信息
    mysql> SELECT name,age,sex from stu;
    -- 查看name字段并在输出时为字段起了个别名username
    mysql> SELECT name as username from stu;
    -- 为字段起表名，as关键字可以省略不写
    mysql> SELECT name username from stu;
    --输出4个字段值，并为name起个别名username
    mysql> SELECT name username,age,sex,classid from stu;
    --在上面的基础上追加一个新字段，beijing值
    mysql> SELECT name username,age,sex,classid,'beijing' from stu;
    +----------+-----+-----+---------+---------+
    | username | age | sex | classid | beijing |
    +----------+-----+-----+---------+---------+
     -- 新加字段并起别名
    mysql> SELECT name username,age,sex,classid,'beijing' city from stu;
    +----------+-----+-----+---------+---------+
    | username | age | sex | classid | city    |
    +----------+-----+-----+---------+---------+
    mysql>
    mysql> SELECT name,age,age+4 from stu;
    +----------+-----+-------+
    | name     | age | age+4 |
    +----------+-----+-------+
    --通过计算多一个字段
    mysql> SELECT name,age,age+4 age2 from stu;
    +----------+-----+------+
    | name     | age | age2 |
    +----------+-----+------+
    --===================================================
    -- where 条件查询
    --2. 查询age年龄在20岁及以上lamp78期的学生信息
    mysql> SELECT * from stu where age>=20 and classid='lamp78';
    --3. 查询age年龄在20至30岁的学生信息
    mysql> SELECT * from stu where age between 20 and 30;
    --4. 查询age年龄在20至30岁之外的学生信息
    mysql> SELECT * from stu where age<20 or age>30;
    mysql> SELECT * from stu where age not between 20 and 30;
    --5. 查询班级是lamp78和lamp79的学生信息
    mysql> SELECT * from stu where classid='lamp78' or classid='lamp79';
    mysql> SELECT * from stu where classid in('lamp78','lamp79');
    --6. 查询班级号为null的学生信息
    mysql> SELECT * from stu where classid is null;
    --7. 查询班级号不为null的学生信息
    mysql> SELECT * from stu where classid is not null;
    --8. 查询班级号为lamp78期，性别为m的学生信息，并只输出name,sex和classid字段
    mysql> SELECT name,age,classid from stu where classid='lamp78' and sex='m';
    --9. 查询学生姓名中含有a字段名的学生信息
    mysql> SELECT * from stu where name like "%a%";
    --10. 查询学生姓名只有两个字母构成的学生信息
    mysql> SELECT * from stu where name like "_ _";
    --11. 将classid和name字段拼成一个stuname字段输出（字串连接功能）
    mysql> SELECT concat(classid,":",name) stuname from stu;
    --12. 查询班级号为lamp78期，年龄最大的学生信息，并只输出name,sex
    mysql> SELECT name,sex,MAX(age) from stu where classid='lamp78';
    --12. 查询班级年龄最大的学生信息，并只输出name,sex,并按班级、性别分组
    mysql> SELECT name,sex,MAX(age) from stu GROUP BY classid,sex;
    --join，注意where里条件字段是两个表重复字段
    mysql> SELECT 99cms_web_role.*,99cms_admin.username
            FROM `99cms_web_role` LEFT JOIN 99cms_admin
            ON 99cms_web_role.adduser=99cms_admin.uid
            WHERE ( 99cms_web_role.name LIKE '周%' )
            ORDER BY roleid ASC
            LIMIT 0,15;
    mysql> SELECT COUNT(*) FROM `99cms_tipoffs` WHERE id>97
    -- 投票计数语句

八、其他
    添加远程访问：
    GRANT ALL PRIVILEGES ON *.* TO 'myuser'@'192.168.3.94' IDENTIFIED BY 'mypwd' WITH GRANT OPTION;

九、MySQL函数
    -- 随机取一条
    SELECT * FROM ` posts` ORDER BY RAND() LIMIT 1;
    -- 连接字符串
    UPDATE `user` SET `name` = CONCAT(`name`, '_ok') WHERE `id` = 1;
    -- 时间
    UPDATE `coding_user` SET `date` = NOW() WHERE `id` = 1;  -- 2016-06-11 21:12:33
    UPDATE `coding_user` SET `date` = CURDATE() WHERE `id` = 1;  -- 2016-06-11
    UPDATE `coding_user` SET `date` = CURTIME() WHERE `id` = 1;  -- 21:12:33
