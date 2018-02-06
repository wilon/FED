<?php

// 板块上限-PHP.ini max_input_vars 值限

// 头像问题
    uid=1370986则保存图片 uc_server/avatar/ 001 / 37 / 09 / 86_01_avatar_*.jpg
    判断用户头像就是判断图片地址，所以头像保存不上一般都是目录权限问题。

// 页面自定义模块
    block_get('75');
    block_display('75');

// UCenter通信不成功？
    1. 注意配置：【文件目录】【文件名】【大小写】【配置信息】
    2. UCenter服务端: --下载：http://www.comsenz.com/downloads/install/ucenter
        uc_server/data/cache/apps.php 更新缓存可以更新此文件
        配置[主URL]：http://www.***.**/xxxx
        该目录下存在：./api/接口文件.php
        且配置文件无误： require DISCUZ_ROOT.'./config/config_ucenter.php';
    3. UClient: --下载：http://faq.comsenz.com/library/UCenter/example/examples.zip
        config.inc.php 文件配置
        define('UC_CONNECT', 'mysql');   // 若不是本地，则为null，同时更改UC_IP为UCenter服务器IP地址
        define('UC_IP', '');

        // 本地数据库配置信息
        $dbhost = 'localhost';      // 必填
        $dbuser = '99cms';          // 必填
        $dbpw   = 'B9D9PcHmPs@';    // 必填

        $dbname    = '99cms_hb';        // 数据库名
        $pconnect  = 0;                 // 数据库持久连接 0=关闭, 1=开启
        $tablepre  = '`ucenter`.uc_';   // 表名前缀, 同一数据库安装多个论坛请修改此处
        $dbcharset = 'utf-8';           // MySQL 字符集, 可选 'gbk', 'big5', 'utf8', 'latin1', 留空为按照论坛字符集设定

        //同步登陆 Cookie设置
        $cookiedomain = '';           // cookie 作用域
        $cookiepath   = '/';          // cookie 作用路徑
    4. test.php进行测试
        * xml_unserialize($s) $s可能多空格
        * 过一阵通信不成功了，可能UCserver的IP变了

// UCenter 积分对接
    1. 设置客户端： ./api/uc.php@getcreditsettings 如下
        $credits = array(    // key 是creditId
                1 => array('O2O', '元'),
                2 => array('APP', '分'),
            );
    2. 设置UCenter后台：积分兑换，设置兑换详情。点击【同步应用的积分设置】刷新
    3. 接口函数：
        // uc_user_getcredit( appid,  uid,  creditId)
        $point = uc_user_getcredit(1, 1, 0);
        // uc_credit_exchange_request( uid ,  from ,  to ,  toappid ,  amount)
        // from->to app creditId
        $res   = uc_credit_exchange_request(1, 1, 1, 1, 80);

// 发帖流程
    // 用户名称
    $table  = DB::table('common_member');
    $sql    = "SELECT `username` FROM {$table} WHERE `uid`={$authorid}";
    $author = DB::fetch_first($sql)['username'];
    if (empty($author)) {
        $data['data'] = "";
        $data['msg']  = "用户ID有误！";
        $data['code'] = 40006;
        die(json_encode($data));
    }


    // 添加forum_thread主题表
    $tid = C::t('forum_thread')->insert(array(
                'fid' => $fid,
                'author' => $author,
                'authorid' => $authorid,
                'subject' => $subject,
                'dateline' => $time,
                'lastpost' => $time,
                'lastposter' => $author,
                'attachment' => $attachment,  // 2为有图片
                'displayorder' => -2,  // -2为待审核
            ), true);  // 增加true，返回自增id号

    // 添加forum_newthread最新主题表
    C::t('forum_newthread')->insert(array(
                'tid' => $tid,
                'fid' => $newthread['fid'],
                'dateline' => $newthread['dateline'],
            ));

    // 添加forum_post帖子
    $pid = insertpost(array(
            'fid' => $fid,
            'tid' => $tid,
            'first' => '1',
            'author' => $author,
            'authorid' => $authorid,
            'subject' => $subject,
            'dateline' => $time,
            'message' => $message,
            'bbcodeoff' => -1,
            'smileyoff' => -1,
            'useip' => $useip,
            'attachment' => $attachment,
        ));

    // 添加forum_sofa，首帖沙发空缺有此表一条数据
    C::t('forum_sofa')->insert(array(
        'tid' => $tid,
        'fid' => $fid
        ));

    if (!empty($pics)) {
        // 添加图片forum_attachment(_n)
        foreach ($attArr as $v2) {
            $aid = C::t("forum_attachment")->insert(array(
                    'tid' => $tid,
                    'pid' => $pid,
                    'uid' => $authorid,
                    'tableid' => $tid % 10
                ), true);
            $imgData = array(
                    'aid' => $aid,
                    'tid' => $tid,
                    'pid' => $pid,
                    'uid' => $authorid,
                    'dateline' => $time,
                    'filesize' => $v2['filesize'],
                    'attachment' => $v2['attachment'],
                    'isimage' => 1,
                    'width' =>$v2['width']
                );
            C::t("forum_attachment_n")->insert('tid:' . $tid, $imgData);
            $message .= "[attach]{$aid}[/attach]";
            unset($aid, $imgData);
        }

        // 更新forum_post帖子`message`
        C::t('forum_post')->update('tid:'.$tid, $pid, array(
                'message' => $message,
            ));
    }

    // 更新forum_forum板块帖子数据
    $forum = C::t('forum_forum')->fetch($fid);
    C::t('forum_forum')->update($fid, array(
                'threads' => $forum['threads'] + 1,
                'posts' => $forum['posts'] + 1,
                'todayposts' => $forum['todayposts'] + 1,
                'lastpost' => $tid . "\t" . $subject . "\t" . $time . "\t" . $author
            ));

    // 添加forum_thread_moderate审核主题表
    $table = DB::table('forum_thread_moderate');
    $sql = "INSERT INTO {$table} VALUES({$tid}, 0, {$time})";
    DB::fetch_all($sql);

    /* // 添加消息
    $notice = new helper_notification();
    $notice->notification_add(
            1,  // uid
            'activity',  // type 类型
            '有新的待审核主题。<a href="admin.php?action=moderate&operation=threads&dateline=all">现在进行审核</a>', // note
            array('actor'=>""),
            0,
            4 // 4 管理工作
        ); */

    // 成功！返回数据
    $data['data'] = "";
    $data['msg']  = "OK";
    $data['code'] = 20000;
    die(json_encode($data));
}