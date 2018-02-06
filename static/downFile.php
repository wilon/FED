<?php

error_reporting(0);

echo 'Down Channel ', intval(downChannel()), PHP_EOL;
echo 'Down Composer ', intval(downComposer()), PHP_EOL;

function downChannel()
{
    $file = __DIR__ . '/channel_v3.json';

    $url = 'https://packagecontrol.io/channel_v3.json';
    @file_put_contents($file, simpleCurl($url));
    return true;
}

function downComposer()
{
    $file = __DIR__ . '/composer.phar';

    $baseUrl = 'https://getcomposer.org';
    $api = "$baseUrl/versions";
    $res = json_decode(simpleCurl($api), true);
    $url = $baseUrl . $res['stable'][0]['path'];
    @file_put_contents($file, simpleCurl($url));
    return true;
}

/**
 * simple curl
 * @param  string $url
 * @param  array  $param = [
 *                   'method' => 'get',    // post
 *                   'data' => [],    // get/post data
 *                   'header' = 'chrome 查看到的' or [],    // string or array
 *                   'cookie' => 'chrome 查看到的' or [],    // string or array
 *                   'return' => 'body',    // all or header
 *               ]
 * @return mix
 */
function simpleCurl($url = '', $param = [])
{
    if (!$url) return false;
    $parseUrl = parse_url($url);
    // 初始化
    if (!isset($param['method'])) $param['method'] = 'get';
    $ch = curl_init();
    if ($param['method'] == 'get' && $param['data']) {
        $joint = $parseUrl['query'] ? '&' : '?';
        $url .= $joint . http_build_query($param['data']);
    }
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    // https支持
    if ($parseUrl['scheme'] == 'https') {
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    }
    // header
    $header = [];
    if (strpos(json_encode($param['header']), 'User-Agent') === false) {
        $header[] = 'User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36';
    }
    if (is_string($param['header'])) {
        foreach (explode("\n", $param['header']) as $v) {
            $header[] = trim($v);
        }
    } else if (is_array($param['header'])) {
        $header = array_merge($header, $param['header']);
    }
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    // cookie保持，session实现
    if (!isset($_SESSION)) session_start();
    $curloptCookie = '';
    $sessionKey = md5($parseUrl['host'] . 'wilon');
    // $sessionCookie = &$_SESSION[$sessionKey]['cookie'];
    if (is_string($param['cookie'])) {
        $curloptCookie .= $param['cookie'];
    } else if (is_array($param['cookie']) && is_array($sessionCookie)) {
        $sessionCookie = array_merge($sessionCookie, $param['cookie']);
    }
    if ($sessionCookie) {
        foreach ($sessionCookie as $k => $v) {
            $curloptCookie .= "$k=$v;";
        }
    }
    curl_setopt($ch, CURLOPT_COOKIE, $curloptCookie);
    // post
    if ($param['method'] == 'post') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $param['data']);
    }
    // response
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $header = trim(substr($response, 0, $headerSize));
    $body = trim(substr($response, $headerSize));
    curl_close($ch);
    // 更新cookie
    preg_match_all('/Set-Cookie:(.*?)\n/', $header, $matchesCookie);
    foreach ($matchesCookie[1] as $setCookie) {
        foreach (explode(';', $setCookie) as $cookieStr) {
            list($key, $value) = explode('=', trim($cookieStr));
            $sessionCookie[$key] = $value;
        }
    }
    // 返回
    $return = $param['return'] == 'header' ? $header :
        ($param['return'] == 'all' ? [$header, $body] : $body);
    return $return;
}
