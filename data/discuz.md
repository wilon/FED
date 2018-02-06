

### 文件、方法位置
```php
    source\module\portal\portal_view.php    // 文章详情页方法
    template\xxx\portal\view_xx.htm    // 文章详情页模板，根据设置有所不同
```

### 首页设置portal隐藏
```php
    // 1. 全局-域名设置-应用域名：
    //      默认：www.xxx.com
    // 2. 界面-导航设置-主导航：
    //      去掉内置首页，添加一个首页[链接为/]
```

### 只加载DB
```php
    define('IN_DISCUZ', true);
    require_once './source/function/function_core.php';
    require_once './source/class/discuz/discuz_database.php';
    require_once './config/config_global.php';
    class DB extends discuz_database {}
    $driver = function_exists('mysql_connect') ? 'db_driver_mysql' : 'db_driver_mysqli';
    require_once \"./source/class/db/$driver.php\";
    DB::init($driver, $_config['db']);
```

