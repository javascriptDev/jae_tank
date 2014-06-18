/**
 * Created by indice on 2014/5/19.
 */


//内置障碍物类型
var obstructionType = {
    //不可击穿的
    impenetrable: 'impenetrable',
    //可击穿的
    breakdown: 'breakdown',
    //可被无视，直接穿过
    ignore: 'ignore'
}


//障碍物 类
function Obstruction(o) {
    //皮肤
    this.appearance = o.appearance || BuiltIn_Appearance.o1;
    //宽度
    this.width = o.width || 30;
    //高度
    this.height = o.height || 30;
    //坐标
    this.position = o.position || {x: 0, y: 0};
    //类型
    this.penetrability = o.penetrability || obstructionType.ignore;
    //渲染
    //  this.render();
}

Obstruction.prototype = {
    type: otype.obstruction,

    render: function (map) {
        var position = this.position;
        var o = document.createElement('span');
        o.className = this.appearance.cls;
        this.el = o;
        var s = o.style;
        s.width = this.width + 'px';
        s.height = this.height + 'px';
        s.position = 'absolute';
        s.top = position.y + 'px';
        s.left = position.x + 'px';
        document.body.appendChild(o);

    },
    destroy: function () {
        this.el.parentNode.removeChild(this.el);
        ds.oMgr.del(dataType.obs, this);
    },
    underAttack: function (val) {
        console.log('obstruction is under attack');
        this.destroy();
    }

}

