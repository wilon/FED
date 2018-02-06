
### jquery dom 与 string 之间转换
```js
    var string = '<div class="div1">Hello World!</div><div class="div2">Hello World!2333</div>'
    // string 转成对象处理
    var divEle = $('<div/>');
    divEle.html(string);
    divEle.find('.div2').html('<h1>Hello World!2333</h2>');
    console.log(divEle.html());
```