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
        var obstructions = ds.oMgr.getObj(dataType.bullet);
        var me = this,
            pos = this.position,
            dire = this.direction;
        var ishit = false;
        obstructions.forEach(function (obstruction) {
            var tp = obstruction.position;
            //条件是 子弹的xy在 坦克xy之内
            if (( pos.x > tp.x && pos.x < (tp.x + obstruction.width)) && (pos.y > (tp.y - obstruction.height) && pos.y < tp.y)) {
                this.quarry = obstruction;
                ishit = true;
            }
        })
        console.log('is hit obstruction' + ishit);
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
        console.log('is hit tank' + ishit);
        return ishit;
    },
    //检测是否击中墙体
    isHitWall: function () {
        //ds.oMgr.getObj(dataType.wall);
        //todo:临时设置墙的范围
        var hitWall = false;
        var left = parseInt(this.el.style.left),
            top = parseInt(this.el.style.top);
        if (left > 500 || top > 500 || left < 0 || top < 0) {
            hitWall = true;
        }
        return hitWall;

    },
    //销毁
    destroy: function () {
        this.el.parentNode.removeChild(this.el);
        ds.oMgr.del(otype.bullet, this);
        var quarry = this.quarry, type;
        if (quarry == otype.obstruction) {
            type = dataType.obs;
        } else if (quarry == otype.tank) {
            type = dataType.tank;
        }
        ds.oMgr.del(type, quarry);
    },
    //子弹移动检测
    move: function () {
        var me = this;
        if (!this.isHitTank() && !this.isHitObstruction() && !this.isHitWall()) {
            //todo:移动子弹
            var el = this.el.style;
            var step = this.speed / 5;
            switch (this.direction) {
                case direction.up:
                    el.top = parseInt(el.top) - step + 'px';
                    break;
                case direction.left:
                    el.left = parseInt(el.left) - step + 'px';
                    break;
                case direction.down:
                    el.top = parseInt(el.top) + step + 'px';
                    break;
                case direction.right:
                    el.left = parseInt(el.left) + step + 'px';
                    break;
                default:
                    return;
                    break;
            }

            setTimeout(function () {
                me.move.call(me);
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
        s.top = pos.top + 'px';
        s.left = pos.left + 'px';
        bullet.className = this.appearance.cls;
        this.el = bullet;
        document.body.appendChild(this.el);
    },
    getPos: function () {
        var top = 0, left = 0;
        switch (this.direction) {
            case direction.up:
                top = this.position.y;
                left = this.position.x + this.owner.width / 2 + this.width / 2;
                break;
            case direction.left:
                top = this.position.y + this.owner.height / 2 + this.width / 2;
                left = this.position.x - this.width + this.width / 2;
                break;
            case direction.down:
                top = this.position.y + this.owner.height + this.height;
                left = this.position.x + this.owner.width / 2 + this.width / 2;
                break;
            case direction.right:
                top = this.position.y + this.owner.height / 2 + this.width / 2;
                left = this.position.x + this.owner.width + this.width;
                break;
            default :
                break;
        }
        return {
            top: top,
            left: left
        }
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