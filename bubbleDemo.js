/*
盒内碰撞泡泡设计：
预想使用方法：
1. 使class为指定值的盒子作为容器，在生成容器前容器的宽高必须固定且不能改变
2. 生成容器
3. 将小球放入容器中，并使其运动，碰撞为完全弹性碰撞（利用动量守恒计算前后速度）
*/

function bubble(a, r, x, y, mpx, mpy, mnx, mny)
{
     /*  
        a为需要指定成为泡泡的jQuery对象
        a: 充当悬浮泡泡的jQuery对象
        r: 悬浮泡泡的半径
        x, y: 初始坐标（原点为容器左上角）
        mpx, mpy: 泡泡的圆心在正方向上偏离原位置的最大距离（矩形）
        mnx, mny: 泡泡的圆心在负方向上偏离原位置的最大距离
    */
    this.el = a;
    this.radius = r;
    this.x = x;
    this.y = y;
    this.mpx = mpx || 0;
    this.mpy = mpy || 0;
    this.mnx = mnx || 0;
    this.mny = mny || 0;
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
    var dx, dy, t;
    var _this = this;
    //计算一次位移之后泡泡在x、y轴正负方向能够移动的额度
    //当前偏移量
    var cx = parseInt(_this.el[0].style.left) - _this.x;
    var cy = parseInt(_this.el[0].style.top) - _this.y;
    var mpx = Math.min(_this.mpx, _this.mpx - Math.abs(cx));
    var mnx = Math.min(_this.mnx, _this.mnx - Math.abs(cx));
    var mpy = Math.min(_this.mpy, _this.mpy - Math.abs(cy));
    var mny = Math.min(_this.mny, _this.mny - Math.abs(cy));
    if(Math.floor(Math.random() * 10) % 2 == 0 && cx < _this.mpx)
    {
        console.log("px");
        dx = Math.abs(Math.floor(Math.random() * mpx));
    }
    else
    {
        console.log("nx");
        dx = -Math.abs(Math.floor(Math.random() * mnx));
    }
    if(Math.floor(Math.random() * 10) % 2 == 0 && cy < _this.mpy)
    {
        console.log("py");
        dy = Math.abs(Math.floor(Math.random() * mpy));
    }
    else
    {
        console.log("ny");
        dy = -Math.abs(Math.floor(Math.random() * mny));
    }
    t = Math.floor(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))) * 5;
    console.log(dx, dy, cx, cy, mpx, mpy);
    this.el.animate({
        "left": "+=" + dx + "px",
        "top": "+=" + dy + "px"
    }, t, 
        function()
        {
            _this.runBubble();
        }
    )
}