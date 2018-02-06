<?php

// 有用的函数
    http_build_query(query_data);    // 数组转成get str

// 版本需要注意的
    $a = $b ?: $c;    // php-v >= 5.3

// 比较好的密码存储处理，sha1/md5都行
    $salt = sha1(uniqid(mt_rand(), true));
    $pwd_db = sha1($salt.sha1($pwd_user).KEY);

// 一行代码实现两个值交换，不引入第三个变量
    $a = 3;
    $b = 4;
    list($b, $a) = array($a, $b);
    $a = $a + $b && $b = $a - $b && $a = $a - $b;
    $a = $a ^ $b && $b = $b ^ $a && $a = $a ^ $b;
// 面向对象
    // 静态方法中只能操作静态属性
    static function p(){
        echo self::$country;  √
        // echo $this->name;  ×
    }

    // 创建新的空对象
    $var1 = json_decode('{}');
    $var2 = (object)[];
    $var3 = new stdClass();

// URL、路径解析
    $parse = parse_url('http://127.0.0.1/test/tp/index.php/home/str');  // URL用此方法
    $dir   = dirname('C:/xampp/htdocs/test/tp/index.php');
    $path  = pathinfo('C:/xampp/htdocs/test/tp/index.php'); // *路径用此方法
    $path2 = pathinfo('http://127.0.0.1/test/tp/index.php/home/str');
RES:
    $parse = array(3) {     // **
        ["scheme"] => string(4) "http"
        ["host"]   => string(9) "127.0.0.1"
        ["path"]   => string(27) "/test/tp/index.php/home/str"    // 不准
    }
    $dir   = string(23) "C:/xampp/htdocs/test/tp"
    $path  = array(4) {     // **
        ["dirname"]   => string(23) "C:/xampp/htdocs/test/tp"
        ["basename"]  => string(9) "index.php"
        ["extension"] => string(3) "php"
        ["filename"]  => string(5) "index"
    }
    $path2 = array(3) {     // 注：不准！
        ["dirname"] => string(39) "http://127.0.0.1/test/tp/index.php/home"
        ["basename"] => string(3) "str"
        ["filename"] => string(3) "str"
    }

// Internet Code 【/】 斜杠
    // ASCII码
    0010 0101    // 二进制
    2f           // 十六进制
    47           // 十进制  PHP:ord()chr()按十进制转换
    // URL编码
    %2F          // %十六进制
    // 函数
    string chr ( int $ascii )    // 返回相对应于 ASCII 所指定的单个字符
    int ord ( string $string )   // 返回第一个字符的ASCII码值


// sprintf()
    printf("%b", 250);      //将250转成二进制： 11111010
    printf("%o", 250);      //将250转成八进制： 0372
    printf("%x", 250);      //将250转成十六进制： 0xfa
    sprintf("%04d", 13);    // 补全4位：0013

// 通过file_get_content()来post数据
    return file_get_contents($url, false, stream_context_create(array('http' => array('method' => 'POST', 'content' => http_build_query($data)))));
    $post['uid'] = 1;
    $post['days'] = 30;
    $opts['http']['method']  = 'POST';
    $opts['http']['content'] = http_build_query($post);
    $context  = stream_context_create($opts);
    $url = 'http://' . $_SERVER['HTTP_HOST'] . __ROOT__ . '/api.php?s=/Glucose/daysGlucose';
    $result = file_get_contents($url, false, stream_context_create($opts));

// 得到多维数组所有key
    function array_all_keys($array) {
        foreach ($array as $k => $v) {
            $keys[] = $k;
            if (is_array($v)) $keys = array_merge($keys, array_all_keys($v));
        }
        return $keys;
    }

// 数组按内部值重新排序【usort更新索引为0123，uasort为保持索引】
    $s['a'] = ['name' => 'weilong', 'num' => 3, 'volume' => 98];
    $s['b'] = ['name' => 'weimong', 'num' => 2, 'volume' => 88];
    $s['c'] = ['name' => 'weicong', 'num' => 1, 'volume' => 88];
    uasort($s, function($a, $b) {
        if ($a['num'] == $b['num']) return 0;
        return ($a['num'] > $b['num']) ? 1 : -1;
    });

// curl
    $url  = "http://baidu.com";<br>
    $post_data = array('user' => 'weilong');<br>
    $headers = array(<br>
        'Content-type: text/xml;charset="utf-8"',<br>
        'Accept: text/xml',<br>
    );<br>
    $ch = curl_init();    // 初始化
    curl_setopt($ch, CURLOPT_URL, $url);    // url地址
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);    // http请求头
    curl_setopt($ch, CURLOPT_HEADER, 0);    // 是否显示头信息
    curl_setopt($ch, CURLOPT_TIMEOUT, 1);    // 最长秒数
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);    // 是否获取文本，不获取文本则以文件流形式输出
    curl_setopt($ch, CURLOPT_POST, 1);    // 数据发送方式post
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);    // post数据
    $response = curl_exec($ch);    // 获取文本为1则得到字串
    curl_close($ch);    // 关闭

// 验证图片流
    $file = fopen($Pic_path . '.jpg', "rb");
    $bin  = fread($file, 3); //只读2字节
    fclose($file);
    $strInfo  = @unpack("C2chars", $bin);
    $typeCode = intval($strInfo['chars1'].$strInfo['chars2']);
    $fileType = '';
    if ($typeCode != 255216 /*jpg*/ && $typeCode != 7173 /*gif*/ && $typeCode != 13780 /*png*/)
        echo '不是一张正确图片';

    // 其实可以用，但处理略慢
    getimagesize('./a.png');

    // 数据流 [推荐]
    $im = @imagecreatefromstring(base64_decode($imgs_data));
    if($im == FALSE) die('error');

// PHP语言结构，非函数，比函数快
    echo(); print(); die(); isset(); unset();
    include(); require();
    array(); list(); empty()
    注意，include_once()是函数;
    注意，require_once()是函数;

// 静态方法和非静态
    区别：就是在调用静态方法时，我们不需要创建类的实例。

// 重复请求http://xxx.xml
    Q：会出现缓存问题，结果不是最新。
    S：请求http://xxx.xml?rand=rand()

// 创建文件写入日志
    $str = json_encode($arr);
    $res = preg_replace("#\\\u([0-9a-f]{4})#ie", "iconv('UCS-2BE', 'UTF-8', pack('H4', '\\1'))", $str);   // json中文化
    $time = date("Y-m-d");
    $fp = fopen("./log/catchnews{$time}.log", "a+");
    fwrite($fp, $res . "\r\n");
    fclose($fp);

// 中文的一些问题
    $allen = preg_match("/^[^/x80-/xff]+$/", $s);   // 判断是否是英文
    $res = preg_match('/[\x{4e00}-\x{9fa5}]/u', $str);  // 判断是否有中文
    $res = preg_replace("#\\\u([0-9a-f]{4})#ie", "iconv('UCS-2BE', 'UTF-8', pack('H4', '\\1'))", $str);    // \u9879\u5de1\u89c6 转成 汉字
    // 匹配出汉字，转成UTF-8
    if (preg_match("/[\x7f-\xff]/", $v['name']))
        $v['name'] = iconv("GBK", "UTF-8", $v['name']);

// $_POST收不到数据
    $_POST是一个数组，post数据是"{'msg':123}"时$_POST收不到数据
    可以用file_get_contents("php://input") 收取；但不能用于 enctype="multipart/form-data"。

// C#接口收不到PHP接口任何数据
    ContentLength = -1
    原因：nginx开启了gzip功能，httpResponse没有Content-Length
    解决：输出前加header('Content-Length: ' . strlen($str));

// 只要运行一次后关闭浏览器程序依然还是会运行
    ignore_user_abort(); //关掉浏览器，PHP脚本也可以继续执行.
    set_time_limit(0); // 通过set_time_limit(0)可以让程序无限制的执行下去

// 文件上传到服务器，require error
    文件权限不足。++

//超全局数组：
    *$_SERVER['HTTP_REFERER']--上一页面的url地址
    $_SERVER['SERVER_NAME']--服务器的主机名
    *$_SERVER['SERVER_ADDR']--服务器端的IP地址
    $_SERVER['SERVER_PORT']--服务器端的端口
    *$_SERVER['REMOTE_ADDR']--客户端的IP
    $_SERVER['DOCUMENT_ROOT']--服务器的web目录路径
    *$_SERVER['REQUEST_URI'];//--URL地址
    echo $_GET['name'];
    echo $_REQUEST['name']; //获取信息比上面get的会慢一些

// 'dir/upload.image.jpg'，找出 .jpg 或者 jpg
    //第1种方法
    substr(strrchr($file, '.'), 1);
    //第2种方法
    substr($file, strrpos($file, '.')+1);
    //第3种方法
    end(explode('.', $file));
    //第4种方法 √
    $info = pathinfo($file);
        array(4) {
          ["dirname"] => string(25) "Public/Uploads/day_141201"
          ["basename"] => string(22) "201412011622033276.jpg"
          ["extension"] => string(3) "jpg"
          ["filename"] => string(18) "201412011622033276"
        }
    //第5种方法
    pathinfo($file, PATHINFO_EXTENSION);

// 大小写识别
    PHP         变量区分大小写；函数名、类名不区分大小写；
    JavaScript  严格区分大小写；
    Linux       严格区分大小写；

//$a++与++$a
	$a = 9;
	$b = $a++;
	//$a = 10, $b = 9, 等价于$b = $a, $a++
	$a = 9;
	$b = ++$a;
	//$a=10, $b=10, 等价于$a++, $b = $a

//
	1. PHP文件的编码格式， gbk->utf-8<br>
        $content = iconv('GBK', 'UTF-8', $content);     // 推荐<br>
        $content = mb_convert_encoding($content, 'UTF-8','GBK');<br>
        $data = eval('return ' . iconv('GBK', 'UTF-8', var_export($data, true)) . ';');    // 数组<br>
	2. PHP文件中：header('Content-type:text/html;Charset=utf-8');<br>
	3. 浏览器的查看编码<br>
	4. <meta charset='utf-8'/><br>
	5. mysql_set_charset('utf8');<br>
	6. mysql> set names utf8;<br>

// empty与isset
	empty($a['a']) 	//若$a['a']所等于的值是0或null,则为真！<br> isset($b['b'])	//若$b['b']存在'b'这个键，则为真！

