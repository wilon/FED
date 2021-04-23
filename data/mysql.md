
### 分配权限 GRANT
```sql
    GRANT ALL PRIVILEGES ON *.* TO 'weilong'@'192.168.3.94' IDENTIFIED BY 'mypwd' WITH GRANT OPTION;
    GRANT Select ON *.* TO 'weilong'@'172.30.%' IDENTIFIED BY "Wwl_Jumpbox_666";
    flush privileges;
```

### 更改用户密码
```sql
    mysql -u root
    mysql> use mysql;
    mysql> UPDATE user SET Password = PASSWORD('newpass') WHERE user = 'root';
    mysql> FLUSH PRIVILEGES;
```

### 更改用户可访问HOST
```sql
    mysql> use mysql;
    mysql> UPDATE user SET host='%' WHERE user='root';
    mysql> FLUSH PRIVILEGES;
```

### 事务
```sql
-- MyISAM 不支持事务
-- 事务内insert，未提交，但表id自增了
-- 事务内update，未提交前，表行锁了
show processlist;    -- 查看连接线程
kill 12443827;    -- 杀掉线程，锁解除
```

### 大表分页查询优化
```sql
    mysql> SELECT film_id,description FROM sakila.film ORDER BY title LIMIT 50,5;

    mysql> SELECT film.film_id,Film.description
        ->  FROM  sakila.film
        ->  INNER JOIN (
        ->      SELECT film.film_id FROM sakila.film
        ->      ORDER BY title LIMIT 50,5
        ->  ) AS lim USING(film_id);

    mysql> SELECT * FROM sakila*rental
        -> WHERE rental id < 16030,
        -> ORDER BY rental id DESC LIMIT 20;
```

### 字符类型及长度

```md

------
* 整形长度

| 数据类型   | 字节数*8=二进制位数b  | 带符号 -2^(b-1) ~ 2^(b-1)-1             | 不带符号 0 ~ 2^b-1             |
|:---------:|-------------------|--------------------------------------------|-------------------------------|
| TINYINT   | 1byte * 8 = 8bit  | -128 ~ 127                                 | 0 ~ 2^8-1=255                 |
| SMALLINT  | 2byte * 8 = 16bit | -32768 ~ 32767                             | 0 ~ 2^16=65535                |
| MEDIUMINT | 3byte * 8 = 24bit | -8388608 ~ 8388607                         | 0 ~ 2^24=16777215             |
| INT       | 4byte * 8 = 32bit | -2147483648 ~ 2147483647                   | 0 ~ 2^32=4294967295           |
| BIGINT    | 8byte * 8 = 64bit | -9223372036854775808 ~ 9223372036854775807 | 0 ~ 2^64=18446744073709551616 |

------
* 浮点型长度

| 数据类型 | 字节数 | 备注 |
|:------:|-----|--------|
| float  | 4   | 单精度浮点型 |
| double | 8   | 双精度浮点型 |

------
* 字符串长度

| 特性     | CHAR                                         | VARCHAR                                |
|--------|----------------------------------------------|----------------------------------------|
| 长度     | 定长，固定字符数<br>最大255个字符<br>数据长度不足声明值时，在尾部自动填充空格 | 长度可变，可设置<br>最大存储字符数最大不超过行大小（默认65535字节） |
| 前缀     | 无                                            | 1~2字节                                  |
| 有否尾部空格 | 长度不足默认用空格填满<br>检索和获取时会自动去除                   | 不会自动填充空格输入值就包含空格，则会存储，检索和获取数据都会体现      |
| 超长处理   | 超长部分如果是空格自动截断<br>如果是字符，严格模式下会报错              | 超长部分如果是空格自动截断，并生成警告<br>如果是字符，严格模式下会报错  |
| 存储开销   | 数据值的字节和 + 补位空格数                              | 数据值的字节和 + 长度标识字节数                      |

<br>

`varchar`最长占用 65535 byte。
* 字符类型若为 gbk，每个字符最多占2个字节，最大长度不能超过32766字符
* 字符类型若为 utf8，每个字符最多占3个字节，最大长度不能超过21845字符
* 字符类型若为 utf8mb，每个字符最多占4个字节，最大长度不能超过16383字符

MySQL 5.0版本之后，`varchar(n)`是几，就能存几个中文字。

* `InnoDB` 单列索引长度最大 `767 bytes`，实际上联合索引还有一个限制是 3072 bytes。

所以建立索引`varchar`最大长度 `gbk=767/2=383`，`utf8=767/3=255`，`utf8mb=767/4=191`。
所以好多人默认`varchar(255)`，其实就是 utf8 编码下 varchar 能建索引的最大长度。

------
* 日期和时间长度

| 类型      | 大小(字节) | 范围                                | 格式                  | 用途           |
|-----------|--------|-----------------------------------------|---------------------|--------------|
| DATE      | 3      | 1000-01-01/9999-12-31                   | YYYY-MM-DD          | 日期值          |
| TIME      | 3      | '-838:59:59'/'838:59:59'                | HH:MM:SS            | 时间值或持续时间     |
| YEAR      | 1      | 1901/2155                               | YYYY                | 年份值          |
| DATETIME  | 8      | 1000-01-01 00:00:00/9999-12-31 23:59:59 | YYYY-MM-DD HH:MM:SS | 混合日期和时间值     |
| TIMESTAMP | 4      | 1970-01-01 00:00:00/2038 等于int(4)     | YYYYMMDD HHMMSS     | 混合日期和时间值，时间戳 |

不能给MySQL的date类型的列设置默认值。
TIMESTAMP，它把客户端插入的时间从当前时区转化为UTC（世界标准时间）进行存储

```

### 不走索引的情况
```md
* like %keyword 不走索引，使用全表扫描。但可以通过翻转函数+like前模糊查询+建立翻转函数索引=走翻转函数索引，不走全表扫描。
* like keyword% 索引有效。即支持前缀索引。
* like %keyword% 不走索引，也无法使用反向索引。
* int float 都可以 like，但就不走索引了，keyword% 索引也失效

------

* where 条件等号两边字段类型不同，不走索引
* 对字段进行函数运算，如sum，不走索引


* 组合索引 只使用后面的字段不走索引，使用前后的字段走索引. 第一个字段有参于（而且字段类型匹配 没有函数运算），那么会走索引，第一个字段可以在sql中的任意位置
* 组合索引遇到第一个不等值条件 即中断后面字段使用索引

------

* in、not in、>、< 等通常是走索引的，但走不走索引和筛选后的数据有关系。当后面的数据在数据表中超过30%的匹配时，会走全表扫描，即不走索引。

------

* 全表扫描会比使用索引更快
```

### HAVING 和 WHERE 的差别；JOIN 后的 ON 和 WHERE 的区别
```md
WHERE 在数据分组前进行过滤，HAVING 在数据分组后进行过滤。
WHERE 排除的行不包括在分组中。这可能会改变计算值，从而影响 HAVING 子句中基于这些值过滤掉的分组。
例：学生表 id,name,class,math_score 筛选出数学及格人数大于30的班级
`select id, count(*) as c from users where math_score >= 60 group by class having c > 30`

------

ON 在 join 前过滤，WHERE 在 select t1 join t2 后过滤。
流程：`select * from table1 left join table2 on (c1 and c1) where w1 and w2`
按条件 w1 筛选出table1 => 左联按 c1 and c1 筛选后的 table2  => 最终结果按 w2 筛选
```

### Explain 详解
```md

`mysql> explain select * from table;`

| id | select_type | table   | type | possible_keys | key  | key_len | ref  | rows | Extra |
|----|-------------|---------|------|---------------|------|---------|------|------|-------|

## 一、 id

    我的理解是SQL执行的顺序的标识,SQL从大到小的执行

    1. id相同时，执行顺序由上至下

    2. 如果是子查询，id的序号会递增，id值越大优先级越高，越先被执行

    3. id如果相同，可以认为是一组，从上往下顺序执行；在所有组中，id值越大，优先级越高，越先执行

------

## 二、 select_type

    示查询中每个select子句的类型

    (1) SIMPLE(简单SELECT,不使用UNION或子查询等)

    (2) PRIMARY(查询中若包含任何复杂的子部分,最外层的select被标记为PRIMARY)

    (3) UNION(UNION中的第二个或后面的SELECT语句)

    (4) DEPENDENT UNION(UNION中的第二个或后面的SELECT语句，取决于外面的查询)

    (5) UNION RESULT(UNION的结果)

    (6) SUBQUERY(子查询中的第一个SELECT)

    (7) DEPENDENT SUBQUERY(子查询中的第一个SELECT，取决于外面的查询)

    (8) DERIVED(派生表的SELECT, FROM子句的子查询)

    (9) UNCACHEABLE SUBQUERY(一个子查询的结果不能被缓存，必须重新评估外链接的第一行)

------


## 三、 table

    显示这一行的数据是关于哪张表的，有时不是真实的表名字,看到的是derivedx(x是个数字,我的理解是第几步执行的结果)

------

## 四、 type

    表示MySQL在表中找到所需行的方式，又称“访问类型”。

    常用的类型有： ALL, index,  range, ref, eq_ref, const, system, NULL（从左到右，性能从差到好）

    ALL：Full Table Scan， MySQL将遍历全表以找到匹配的行

    index: Full Index Scan，index与ALL区别为index类型只遍历索引树

    range:只检索给定范围的行，使用一个索引来选择行

    ref: 表示上述表的连接匹配条件，即哪些列或常量被用于查找索引列上的值

    eq_ref: 类似ref，区别就在使用的索引是唯一索引，对于每个索引键值，表中只有一条记录匹配，简单来说，就是多表连接中使用primary key或者 unique key作为关联条件

    const、system: 当MySQL对查询某部分进行优化，并转换为一个常量时，使用这些类型访问。如将主键置于where列表中，MySQL就能将该查询转换为一个常量,system是const类型的特例，当查询的表只有一行的情况下，使用system

    NULL: MySQL在优化过程中分解语句，执行时甚至不用访问表或索引，例如从一个索引列里选取最小值可以通过单独索引查找完成。

------

## 五、 possible_keys

    指出MySQL能使用哪个索引在表中找到记录，查询涉及到的字段上若存在索引，则该索引将被列出，但不一定被查询使用

    该列完全独立于EXPLAIN输出所示的表的次序。这意味着在possible_keys中的某些键实际上不能按生成的表次序使用。
    如果该列是NULL，则没有相关的索引。在这种情况下，可以通过检查WHERE子句看是否它引用某些列或适合索引的列来提高你的查询性能。如果是这样，创造一个适当的索引并且再次用EXPLAIN检查查询

------

## 六、 Key

    key列显示MySQL实际决定使用的键（索引）

    如果没有选择索引，键是NULL。要想强制MySQL使用或忽视possible_keys列中的索引，在查询中使用FORCE INDEX、USE INDEX或者IGNORE INDEX。

------

## 七、 key_len

    表示索引中使用的字节数，可通过该列计算查询中使用的索引的长度（key_len显示的值为索引字段的最大可能长度，并非实际使用长度，即key_len是根据表定义计算而得，不是通过表内检索出的）

    不损失精确性的情况下，长度越短越好

------

## 八、 ref

    表示上述表的连接匹配条件，即哪些列或常量被用于查找索引列上的值

------

## 九、 rows

    表示MySQL根据表统计信息及索引选用情况，估算的找到所需的记录所需要读取的行数

------

## 十、 Extra

该列包含MySQL解决查询的详细信息,有以下几种情况：

Using where:列数据是从仅仅使用了索引中的信息而没有读取实际的行动的表返回的，这发生在对表的全部的请求列都是同一个索引的部分的时候，表示mysql服务器将在存储引擎检索行后再进行过滤

Using temporary：表示MySQL需要使用临时表来存储结果集，常见于排序和分组查询

Using filesort：MySQL中无法利用索引完成的排序操作称为“文件排序”

Using join buffer：改值强调了在获取连接条件时没有使用索引，并且需要连接缓冲区来存储中间结果。如果出现了这个值，那应该注意，根据查询的具体情况可能需要添加索引来改进能。

Impossible where：这个值强调了where语句会导致没有符合条件的行。

Select tables optimized away：这个值意味着仅通过使用索引，优化器可能仅从聚合函数结果中返回一行

------

## 总结：
    * EXPLAIN不会告诉你关于触发器、存储过程的信息或用户自定义函数对查询的影响情况
    * EXPLAIN不考虑各种Cache
    * EXPLAIN不能显示MySQL在执行查询时所作的优化工作
    * 部分统计信息是估算的，并非精确值
    * EXPALIN只能解释SELECT操作，其他操作要重写为SELECT后查看执行计划。
```