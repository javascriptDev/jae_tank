/**
 * Created by addison on 2014/5/21.
 * Created by indice on 2014/5/21.
 */
function Bullet(o) {
    //外观
    this.appearance = o.appearance || BuiltIn_Appearance.a;
    //攻击力
    this.atk = o.atk || 1;
    //谁发射的
    this.owner = o.owner || null;
    //位置
    this.position = o.position || null;
    //射速
    this.speed = o.speed || 10;
    //运动方向
    this.direction = o.direction;
    //子弹大小
    this.height = 10;
    this.width = 10;
    //击中的目标
    this.quarry = null;
    //渲染子弹到dom中
    this.render();
    //生成后，移动子弹
    this.move();
}

Bullet.prototype = {
    type: otype.bullet,
    //检测是否打到障碍物
    isHitObstruction: function () {
        var me = this;
        var obstructions = ds.oMgr.getObj(dataType.obs);
        var me = this,
            dire = this.direction;
        var pos = this.getPos();
        var ishit = false;
        obstructions.forEach(function (obstruction) {
            var tp = obstruction.position;
            //条件是 子弹的xy在 障碍物xy之内
            switch (dire) {
                case direction.up:
                    if ((pos.x >= tp.x - me.width / 2) && (pos.x <= tp.x + obstruction.width + me.width / 2) && (pos.y <= tp.y + obstruction.height + me.height / 2)) {
                        me.quarry = obstruction;
                        ishit = true;
                    }
                    break;
                case direction.left:
                    if ((pos.y >= tp.y - me.height) && (pos.y < tp.y + obstruction.height + me.height) && (pos.x <= tp.x + obstruction.width + me.width / 2)) {
                        me.quarry = obstruction;
                        ishit = true;
                    }
                    break;
                case direction.down:
                    if ((pos.x >= tp.x - me.width / 2) && (pos.x < tp.x + obstruction.width + me.width / 2) && (pos.y >= tp.y - me.height / 2)) {
                        me.quarry = obstruction;
                        ishit = true;
                    }
                    break;
                case direction.right:
                    if ((pos.y >= tp.y - me.height / 2) && (pos.y <= tp.y + obstruction.height + me.height / 2) && (pos.x >= tp.x + me.width / 2)) {
                        me.quarry = obstruction;
                        ishit = true;
                    }
                    ;
                    break;
                default :
                    return;
                    break;
            }
        })
        return ishit;
    },
    //检测是否击中坦克
    isHitTank: function () {
        var tanks = ds.oMgr.getObj(dataType.tank);
        var me = this;
        var pos = this.position;
        var ishit = false;
        for (var i = 0, len = tanks.length; i < len; i++) {
            var tank = tanks[i];
            var tp = tank.position;
            //条件是 子弹的xy在 坦克xy之内
            if (( pos.x > tp.x && pos.x < (tp.x + tank.width)) && (pos.y > (tp.y - tank.height) && pos.y < tp.y)) {
                me.quarry = tank;
                ishit = true;
                break;
            }
        }
        return ishit;
    },
    //检测是否击中墙体
    isHitWall: function () {
        //ds.oMgr.getObj(dataType.wall);
        //todo:临时设置墙的范围
        var hitWall = false;
        var left = this.position.x,
            top = this.position.y;
        if (left > 500 || top > 500 || left < 0 || top < 0) {
            hitWall = true;
        }
        return hitWall;
    },
    //子弹移动检测
    move: function () {
        var me = this;
        if (!this.isHitTank() && !this.isHitObstruction() && !this.isHitWall()) {
            var el = this.el.style;
            var step = this.speed / 5;
            switch (this.direction) {
                case direction.up:
                    el.top = parseInt(el.top) - step + 'px';
                    me.position.y -= step;
                    break;
                case direction.left:
                    el.left = parseInt(el.left) - step + 'px';
                    me.position.x -= step;
                    break;
                case direction.down:
                    el.top = parseInt(el.top) + step + 'px';
                    me.position.y += step;
                    break;
                case direction.right:
                    el.left = parseInt(el.left) + step + 'px';
                    me.position.x += step;
                    break;
                default:
                    return;
                    break;
            }
            setTimeout(function () {
                me.move();
            }, 18)
        } else {
            this.destroy();
        }
    },
    render: function (scope) {
        var bullet = document.createElement('span');
        var s = bullet.style;
        var pos = this.getPos();
        s.position = 'absolute';
        s.top = pos.y + 'px';
        s.left = pos.x + 'px';
        bullet.className = this.appearance.cls;
        this.el = bullet;
        document.body.appendChild(this.el);
    },
    //子弹的出发坐标
    getPos: function () {
        var top = 0, left = 0;
        switch (this.direction) {
            //上下不偏移，左右偏移
            case direction.up:
                top = this.position.y;
                left = this.position.x + this.owner.width / 2 + this.width / 2;
                break;
            case direction.left:
                top = this.position.y + this.owner.height / 2;
                left = this.position.x - this.width / 2;
                break;
            case direction.down:
                top = this.position.y + this.owner.height + this.height / 2;
                left = this.position.x + this.owner.width / 2 + this.width / 2;
                break;
            case direction.right:
                top = this.position.y + this.owner.height / 2 + this.height / 2;
                left = this.position.x + this.owner.width + this.width / 2;
                break;
            default :
                break;
        }
        return {
            y: top,
            x: left
        }
    },
    //销毁
    destroy: function () {
        this.el.parentNode.removeChild(this.el);
        ds.oMgr.del(dataType.bullet, this);
        if (this.quarry) {
            this.quarry.underAttack.call(this.quarry, this.atk);
        }
        this.pub(baseEvent.checkGameOver, Game);
    }
}

var BuiltIn_Bullet = {
    a: function (o) {
        return new Bullet({
                atk: o.atk ? o.atk + 10 : 10,
                appearance: BuiltIn_Appearance.c,
                speed: o.speed ? o.speed + 10 : 10,
                position: o.position,
                owner: o.owner,
                direction: o.direction
            }
        )
    }
}