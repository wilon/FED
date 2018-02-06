<?php
// 切换数据库CONFIG2后M默认为数据库2
    M('favoritev2', '99cms_', "DB_CONFIG2")->where(1)->delete();
    M('flash')->where(1)->find();    // 数据库DB_CONFIG2

// 查看放入模板里的所有变量
    var_dump($this->view->tVar);

// 大写字母方法
    M('shop')    // pre_shop 表模型
    C('ALIPAY_NAME')    // 读取配置文件内配置

// TP自动加载和父类冲突，结局方法
    parent::_initialize();  // 继承父类的，否则冲突

// ajax安全验证
    if (!IS_AJAX) halt('请求的页面不存在');

// 更新了表发现 $model->add($data)更新的字段插入不了
    清缓存就ok

// include模板导入变量
    $this->assign('tpl', 'Home:Index:extend_menu');    <include file="$tpl" />
    <include file="Home:Index:header"/>    /Home/Tpl/Index/header.html

/**
 * 数据库操作
 */

// 某一 字段数值增加\减少
    $User->where('id=5')->setInc('score'); // 用户的积分加1
    $User->where('id=5')->setDec('score',5); // 用户的积分减5

// order($order)
    $order = "time desc"; // 单个
    $order = array("time desc", "status"); // 多个
    $order = "time desc, status asc";  // 多个
    $order = "time status";  // 报错！

// save($data)
    $data 必须是数组

// where($map) 格式
    // 字串型
    $map = "status=1 AND roleid IN(2,3,5) AND age>=20";
    // 也可以写成:
    $map["status"] = 1;
    $map['id']     = array('between', '1, 8');
    $map['id']     = array('between', array('1', '8'));
    $map["roleid"] = array('in', '2, 3, 5');
    $map["roleid"] = array('in', array(2, 3, 5));
    $map["age"]    = array("egt" , 20); // eq/neq(不)等于; gt/egt 大于(等于); lt/elt 小于(等于)

// join用法，如将[类别]一字段加到[文章]中
    $a = C('DB_PREFIX') . 'article';
    $c = C('DB_PREFIX') . 'article_class';
    $field = "article_id, article_sort, article_title, article_time, $c.ac_name";
    $join  = "$c on $a.ac_id=$c.ac_id";
    // where里若有重复字段
    $where["$a.ac_id"] = $ac_id;

// field、getField、setField区别
    field 限定显示字段
    getField 取某一字段值，结果必须是一行，不能select
    setField 更新某一字段的值，结果必须是一行