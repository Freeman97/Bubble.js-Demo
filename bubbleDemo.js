/*
盒内碰撞泡泡设计：
预想使用方法：
1. 使class为指定值的盒子作为容器，在生成容器前容器的宽高必须固定且不能改变
2. 生成容器
3. 将小球放入容器中，并使其运动，碰撞为完全弹性碰撞（利用动量守恒计算前后速度）
*/

function container(a)
{
    //a为充当容器的jQuery对象
    this.el = a;
    this.cHeight = a[0].offsetHeight;
    this.cWidth = a[0].offsetWidth;
    this.bubbleTimer = 0;
    this.bubbleAdded = [];
}

container.prototype.addBubble = function(a)
{
    this.bubbleAdded.push(a);
}

container.prototype.bubbleRun = function()
{
    clearInterval(this.bubbleTimer);
    var n = this.bubbleAdded.length;
    var resetFlag = false;
    var _this = this;
    console.log(n)
    for(var i = 0; i < n; i++)
    {
        var sx = this.bubbleAdded[i].sx;
        var sy = this.bubbleAdded[i].sy;
        var d1 = Math.floor(1 + Math.random()) * Math.max(_this.cHeight ,_this.cWidth) * sx;
        var d2 = Math.floor(1 + Math.random()) * Math.max(_this.cHeight ,_this.cWidth) * sy;
        console.log({d1, d2});
        this.bubbleAdded[i].sx = d1;
        this.bubbleAdded[i].sy = d2;
        var t = d1 * 2;
        _this.bubbleAdded[i].el.animate({
            "left": "+=" + d1,
            "top": "+=" + d2
        }, t);
    }
    this.bubbleTimer = setInterval(
        function()
        {
            resetFlag = false;
            for(var i = 0; i < n; i++)
            {
                for(var j = i + 1; j < n; j++)
                {
                    if(_this.isColl(_this.bubbleAdded[i], _this.bubbleAdded[j], 10))
                    {
                        resetFlag = true;
                        _this.collision(_this.bubbleAdded[i], _this.bubbleAdded[j]);
                    }
                }
            }
            for(var i = 0; i < n; i++)
            {
                var s = _this.isColl2(_this.bubbleAdded[i], 10);
                _this.collision2(_this.bubbleAdded[i] ,s);
                if(!s[0] || !s[1] || !s[2] || !s[3])
                {
                    resetFlag = true;
                }
            }
            if(resetFlag)
            {
                for(var i = 0; i < n; i++)
                {
                    var d1 = _this.bubbleAdded[i].sx;
                    var d2 = _this.bubbleAdded[i].sy;
                    var t = d1 * 2;
                    _this.bubbleAdded[i].el.stop();
                    console.log(_this.bubbleAdded[i]);
                    // _this.bubbleAdded[i].el.animate({
                    //     "left": "+=" + d1,
                    //     "top": "+=" + d2
                    // }, t);
                }
            }
        }, 400
    )
}

container.prototype.bubbleStop = function()
{
    clearInterval(this.bubbleTimer);
}

container.prototype.isColl = function(b1, b2, eps)
{
    //eps为碰撞判定的调整用参数....
    var x1 = b1.el.offset().left + b1.el[0].offsetWidth / 2;
    var y1 = b1.el.offset().top + b1.el.offset().top / 2;
    var x2 = b2.el.offset().left + b2.el[0].offsetWidth / 2;
    var y2 = b2.el.offset().top + b2.el.offset().top / 2;
    var a = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    var b = b1.radius + b2.radius + eps;
    return a <= b;
}

container.prototype.isColl2 = function(b1, eps)
{
    console.log(b1.el.offset().left);
    var x1 = parseInt(b1.el.offset().left) + parseInt(b1.el[0].offsetWidth) / 2;
    var y1 = parseInt(b1.el.offset().top) + parseInt(b1.el[0].offsetHeight) / 2;
    console.log(b1.sx);
    console.log(b1.sy);
    var a = x1 - b1.radius >= eps;
    var b = y1 - b1.radius >= eps;
    var c = x1 + b1.radius - this.cWidth <= -eps;
    var d = y1 + b1.radius - this.cHeight <= -eps;
    console.log({a,b,c,d})
    return {a, b, c, d};
}

container.prototype.collision = function(b1, b2)
{
    /*  
        假设：小球质量与小球半径的平方成正比 -> 动量守恒，于是：
        v1* = r2 ^ 2 / r1 ^ 2 * v2
        v2* = r1 ^ 2 / r2 ^ 2 * v1
    */
    // b1.sx = -Math.pow(b2.radius, 2) / Math.pow(b1.radius, 2) * b2.sx;
    // b1.sy = -Math.pow(b2.radius, 2) / Math.pow(b1.radius, 2) * b2.sy;
    // b2.sx = -Math.pow(b1.radius, 2) / Math.pow(b2.radius, 2) * b1.sx;
    // b2.sy = -Math.pow(b1.radius, 2) / Math.pow(b2.radius, 2) * b1.sy;
    b1.sx = -b1.sx;
    b1.sy = -b1.sy;
    b2.sx = -b2.sx;
    b2.sy = -b2.sy;
}

container.prototype.collision2 = function(b1, a)
{
    if(!a[0] || !a[2])
    {
        b1.sx *= -1;
    }
    if(!a[1] || !a[3])
    {
        b1.sy *= -1;
    }
}

function bubble(a, r, sx, sy, x, y)
{
    //a为需要指定成为泡泡的jQuery对象
    this.el = a;
    this.radius = r;
    this.sx = sx;
    this.sy = sy;
    this.x = x;
    this.y = y;
    a.css({
        "position": "absolute",
        "margin": 0,
        "width": "100px",
        "height": "100px",
        "border": "1px solid",
        "left": x,
        "top": y,
        "border-radius": "50%"
    });
}

