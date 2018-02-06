$(function(){

    // ReactJS笔记
    this.setState 每次修改以后，自动调用 this.render 方法，再次渲染组件。
    this.render 方法必须返回一个包起的标签

    /* jquery 里 $('form>input[name=s]').val();方法 table包起来无效 */
    window.location.reload()

    // 下拉框取值
    $("select[name='b_type'] option:selected").val()

    // 父子节点选择
    parent()    // 查找父节点，一级
    parent(selector)    // selector为一级父节点的selector
    parents(selector)    // 向父节点查找出所有selector
    parentsUntil(selector)    // 向父节点查找selector，找到停止
    children('selector')    // 查找子节点，一级
    find('selector')    // 此节点下所有符合selector的元素

    // 新增的标签并不绑定普通事件，用on
    // dom.on()，dom必须已存在，否则每次添加dom，就绑定on
    $("#qut_tbody").click(function(){}     // 错，不起作用
    $(document).on('click', '#qut_tbody', function() {}  // 可以了

    // 提交得不到a、b的值
    <form action="url?a=1&b=2" method="get"></form>
    <a href="javascript:void(0);" class="btn" onclick="if(confirm('确认？')){$('#form_article').submit();}">不显示</a>
    $('#form_article').submit();

    // js时间戳
    var s = new Date('2015-02-10 9:20').getTime();  // 1423531620000
    var n = $.now();  // 1423531682546 毫秒时间戳

    // 阻止标签内拖动复制
    <div onselectstart="return false"></div>

    // 鼠标滚动，高度变化
    $(window).scroll(function() {    // 滚动动作
        var top = $(window).scrollTop();  // 滚动高度
        var height = $(window).height();  // 浏览器可视窗口的高度
        var width = $(window).width();  // 浏览器可视窗口的宽度
        var Hheight = $(document).height();  // 整个文档的高度
        var Wwidth = $(document).width();  // 整个文档的宽度
        if (top == 0) {};    // 滚动条到达最顶部
        if (top+height+5 > Hheight) {};    // 滚动条到达最底部
    });
    // 滚动到指定位置
    $(document.body).animate({"scrollTop": 400});
    // 计算元素到顶部距离
    $('#znbj_result').offset().top

    // 文本框输入就变化
    $("#rcmoney").focus().keyup(function(){
        var ob = $(this).val();
        if(!isNaN(ob) && ob!=0){
            $("#rcmoney").css("border","1px solid #74b9ef");
            $(".form-style-1-error").eq(0).text("√");
        }else{
            $("#rcmoney").css("border","1px solid #fe6e00");
            $(".form-style-1-error").eq(0).text("请输入正确数值！");
        }
    });

    // 点击验证码换图片
    <img id="code" src="../public/code.php" height="25" onclick="this.src='../public/code.php?id='+Math.random();"/>
	<a href="" onclick="var code=getElementById('code');code.src='../public/code.php?id='+Math.random();return false;">看不清</a>

    // js字符串处理
    top = 'top=13px';
    n = top.replace(/[^0-9]/ig,"");   // 获取数字。 n = 13
    t = top.trim();   // 去除空格
    reg  = /^[a-zA-Z0-9_]+$/;    // js正则验证
    if(!top.match(reg)) {alert("名称必须由字母数字下划线组成！") }
    var t = new Date(parseInt(data.add_time) * 1000).toLocaleString();  // 格式化时间戳

    // JS数组、对象处理
    var a = [];    // 等价于 var a = new Array;
    var o = {sex:1};    // 等价于 var o = new Object;
    a[3] = 'ok';    // 赋值
    o.name = 'weilong';    // 赋值
    http://127.0.0.1/hzpd/99cms_jhxt/web.php?s=Glucosehttp://127.0.0.1/hzpd/99cms_jhxt/web.php?s=Glucose(var s in o);    // 遍历
        alert(o.s);
    for (var i = 0; i < a.length; i++) {    // 遍历
        alert(a[i]);
    };

    // 向外(父)查找用parents()，向内(子)find()
    ob.parents(".nodebox").find(".chck").attr("checked",true);

    // jQuery操作checkbox
    $(".chck").click(function(){    // checkbox点击事件
        var ob = $(this);
        if (ob.is(':checked')) {    // 判断checkbox是否选择
            // 全选
            ob.parent().find(".chckChild").attr("checked",true); // 操作checkbox为选中
            // ob.parent().find(".chckChild").prop("checked",true); // 兼容好
        } else {
            // 取消全选
            ob.parent().find(".chckChild").attr("checked",false); // 操作checkbox为不选中
        }
    });

    // 获得复选框多个值
    var checked = [];
    $("input:checkbox:checked").each(function(){
        checked.push($(this).val());
    });

    // 表单提交，绑定提交按钮事件（不用提交按钮onclick=fun()）
    $(function(){
        $(".btn_submit").click(function(){
            if($("input[name='name']").val() == '') {
                alert("请输入角色名称！");
                return false;
            }
        });
    });

    // 表单提交，表单事件提交
    $("#htmlform").submit(function(){
        // 用户名不能为空！
        if($("input[name='name']").val() == '') {
            $.pnotify({
                type: 'error',
                title: '提交失败！',
                text: '用户名不能为空！',
                icon: 'picon icon24 typ-icon-cancel white',
                sticker: false
            });
            $("input[name='name']").focus();
            return false;
        }
    });

    // Ajax 传值，__url__需要在原页面处定义
    $.ajax({
        type: "post",
        // async: "false",
        url:  __url__+'/withdrawPost',
        dataType:'json',
        data:"id="+$("#hiddenid").val()+"&zpassword="+va2+"&money="+va1,
        // data: $("#myform").serialize(),
        success: function(res){
            // 成功
            if(res==1){
                alert("提现成功！");
                window.location.href = __url__;
            }
            // 失败
            if(res==2){
                $("#zpassword").focus().css("border","1px solid red");
                $(".form-style-1-error").eq(1).text("支付密码错误，请重新输入！");
            }
        },
    });

    // 禁用a链接
    javascript:void(0);

    // 跳转
    window.location.href="www.baidu.com";
    window.location.reload()    // 刷新本页

    // 禁止表单submit提交
    form标签中加：onsubmit="return false"

    /**
     * 复制到剪切板函数
     */
    function copyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        // textArea.style.position = 'fixed';
        // textArea.style.top = 0;
        // textArea.style.left = 0;
        // textArea.style.width = '2em';
        // textArea.style.height = '2em';
        // textArea.style.padding = 0;
        // textArea.style.border = 'none';
        // textArea.style.outline = 'none';
        // textArea.style.boxShadow = 'none';
        // textArea.style.background = 'transparent';
        // textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            var result = document.execCommand('copy');
        } catch (err) {
            var result = false;
        }
        document.body.removeChild(textArea);
        return result;
    }
});