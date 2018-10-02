function bubble(a, r, x, y, mpx, mpy, mnx, mny, s, ani)
{
     /*  
        a为需要指定成为泡泡的jQuery对象
        a: 充当悬浮泡泡的jQuery对象
        r: 悬浮泡泡的半径
        x, y: 初始坐标（原点为容器左上角）
        mpx, mpy: 泡泡的圆心在正方向上偏离原位置的最大距离（矩形）
        mnx, mny: 泡泡的圆心在负方向上偏离原位置的最大距离（请填负值）
        s: 小球运动完成时间倍数（越大越慢，如果不知道该填什么建议填个100试试，填的太小可能产生未能预测到的行为）
    */
    this.el = a;
    this.radius = r || 100;
    this.x = x || 0;
    this.y = y || 0;
    this.mpx = mpx || 20;
    this.mpy = mpy || 20;
    this.mnx = -mnx || -20;
    this.mny = -mny || -20;
    this.s = s || 100;
    this.ani = ani || "swing";
    a.css({
        "position": "absolute",
        "margin": 0,
        "width": r + "px",
        "height": r + "px",
        "background-color": "red",
        "left": x,
        "top": y,
        "border-radius": "50%"
    });
}

bubble.prototype.runBubble = function()
{
    var dx = 0, dy = 0, t;
    var _this = this;
    //计算一次位移之后泡泡在x、y轴正负方向能够移动的额度
    //当前偏移量
    var cx = parseInt(_this.el[0].style.left) - _this.x;
    var cy = parseInt(_this.el[0].style.top) - _this.y;
    if(parseInt(_this.el[0].style.left) > (_this.x + _this.mpx))
    {
        alert("Xpositive exceeded: " + _this.el[0].style.left);
    }
    if(parseInt(_this.el[0].style.left) < (_this.x + _this.mnx))
    {
        alert("Xnegative exceeded" + _this.el[0].style.left);
    }
    if(parseInt(_this.el[0].style.top) > (_this.y + _this.mpy))
    {
        alert("Ypositive exceeded" + _this.el[0].style.top);
    }
    if(parseInt(_this.el[0].style.top) < (_this.y + _this.mny))
    {
        alert("Ynegative exceeded" + _this.el[0].style.top);
    }
    //当前各个方向能够使用的最大位移
    var mpx = Math.min(_this.mpx, _this.mpx - cx);
    var mnx = Math.min(Math.abs(_this.mnx), Math.abs(_this.mnx - cx));
    var mpy = Math.min(_this.mpy, _this.mpy - cy);
    var mny = Math.min(Math.abs(_this.mny), Math.abs(_this.mny - cy));
    var randomizerX = (Math.floor(Math.random() * 10) % 2 == 0);
    var randomizerY = (Math.floor(Math.random() * 10) % 2 == 0);
    // console.log(randomizerX, randomizerY);
    if(randomizerX && cx <= _this.mpx)
    {
        console.log("px");
        dx = Math.abs(Math.floor(Math.random() * mpx));
    }
    else if(!randomizerX && cx > _this.mnx)
    {
        console.log("nx");
        dx = -Math.abs(Math.floor(Math.random() * mnx));
    }
    if(randomizerY && cy <= _this.mpy)
    {
        console.log("py");
        dy = Math.abs(Math.floor(Math.random() * mpy));
    }
    else if(!randomizerY && cy > _this.mny)
    {
        console.log("ny");
        dy = -Math.abs(Math.floor(Math.random() * mny));
    }
    t = Math.floor(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))) * _this.s;
    // console.log(dx, dy, cx, cy, mpx, mpy, mnx, mny);
    this.el.animate({
        "left": "+=" + dx + "px",
        "top": "+=" + dy + "px"
    }, t, _this.ani, 
        function()
        {
            _this.runBubble();
        }
    )
}