/**
 * Created by addison on 2014/5/19.
 */

//buff类
function Buff(o) {
    this.target = o.target || null;
    //位置
    this.position = o.position || {x: 0, y: 0};
    //功能
    this.effect = o.effect || null;
    //开始时间
    this.beginTime = 0;
    //持续时间
    this.duration = o.duration || 20;
    //结束时间
    this.endTime = 0;
    //外观
    this.appearance = o.appearance || BuiltIn_Appearance.b;

}
Buff.prototype = {
    render: function () {
    },
    begin: function (tank) {
        this.target = tank || ds.oMgr.getObj(dataType.tanks)[0]
        this.fire(baseEvent.buffBegin, this.target, this);
        this.beginTime = new Date().getTime();
        this.endTime = this.beginTime + this.duration * 1000;
        this.isEnd()
    },
    isEnd: function () {
        var me = this;
        var ivl = setInterval(function () {
            if (me.beginTime < me.endTime) {
                me.beginTime += 1000;
            } else {
                clearInterval(ivl);
                me.fire(baseEvent.buffEnd, me.target, me);
            }
        }, 1000)
    },
    end: function () {
    }

}


//内置的buff
var BuiltIn_Buff = {
    //增加移动速度
    addMoveSpeed: function (o) {
        return new Buff({
            position: o.positon,
            effect: Built_In_Effect.addMoveSpeed,
            duration: 5
        })
    },
    //增加射速
    addBulletSpeed: function (o) {
        return new Buff({
            position: o.position,
            effect: Built_In_Effect.addBulletSpeed,
            duration: 20
        })
    }

}

