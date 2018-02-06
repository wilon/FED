
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
