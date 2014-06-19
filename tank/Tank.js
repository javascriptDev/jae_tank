/**
 * Created by addison on 2014/5/19.
 */

/*
 坦克类

 @class Tank

 @param {object} o - 实例化对象用的参数
 */
function Tank(o) {
    var defaultKeyBoard = {id: Math.random() * 10000, up: 'w', down: 's', left: 'a', right: 'd', fire: 'j', dump: 'k', prop: 'm'};
    var secondKeyBoard = {id: Math.random() * 10000, up: 'up', down: 'down', left: 'left', right: 'right', fire: '+', dump: '-'};


    //当前坦克状态(生/死)
    this.statue = o.statue || tank_Statue.alive;
    //坦克坐标
    this.position = o.position || {x: 0, y: 0};
    //坦克 血量
    this.hp = o.hp || 100;
    //同盟成员
    this.team = o.team || [];
    //坦克的武器
    this.weapon = o.weapon || BuiltIn_Weapon.a();
    //枪口方向
    this.direction = o.direction || direction.up;
    //buff
    this.buffs = o.buffs || [];
    //外表
    this.appearance = o.appearance || BuiltIn_Appearance.a();
    //等级
    this.level = o.level || 1;
    //经验值
    this.ep = 0;
    //键位
    this.keyBoard = o.keyBoard || defaultKeyBoard;
    //初始化攻击cd
    this.cdBegin = new Date().getTime();
    //唯一id
    this.id = Math.random() * 100000;
    //储存当前操作的集合
    this.key = [];
    //坦克的宽高
    this.width = 60;
    this.height = 60;
    //初始化
    this.init();
    //等级不同拥有不同的属性
    var baseProper = this.getBaseProperty(o.level || 1);
    //防御力
    this.Defense = o.defense || baseProper.defense;
    //移动速度
    this.moveSpeed = o.moveSpeed || baseProper.moveSpeed;
    //攻击力
    this.atk = baseProper.baseAtk;
    //攻击速度
    this.firingSpeed = baseProper.firingSpeed;
    //攻击cd时间(ms)
    this.cd = 300;
}

//设置基本方法
Tank.prototype = {
    /**
     * @property { string } object type
     */
    type: otype.tank,
    /**
     * 显示坦克属性面板
     *
     * @method showPropertyPanel
     */
    showPropertyPanel: function () {
        if (!this.ppanel) {
            var me = this;
            var base = document.createElement('div');
            var bs = base.style;
            base.className = 'tp-panel';

            var html = '<div style="text-align: center;">' + this.id + '的属性面板</div>';
            var show = ['hp', 'weapon', 'level', 'ep', 'moveSpeed', 'atk', 'firingSpeed', 'cd'];
            show.forEach(function (item) {
                html += ('<div class=p-item><span>' + item + ' : </span><div style="display: inline-block">' + me[item] + '</div></div>');
            })
            base.innerHTML = html;
            //set css
            bs.position = 'absolute';
            bs.top = '50px';
            bs.left = '50px';
            bs.border = '1px solid red';
            this.ppanel = base;
            document.body.appendChild(base);
        } else {
            this.ppanel.parentNode.removeChild(this.ppanel);
            delete  this.ppanel;
        }
    },
    /**
     * 获取坦克等级
     *
     * @method getLevel
     * @return { number } 坦克等级
     */
    getLevel: function () {
        return this.builtInLevel;
    },

    /**
     * 添加buff 并增加属性
     *
     * @method addBuff
     * @param { Buff } buff - buff对象
     */
    addBuff: function (buff) {
        this.buffs.push(buff);
        this.takeEffect(buff);
    },

    /**
     * 根据buff 附加坦克属性
     *
     * @method takeEffect
     * @param { Buff } buff - Buff 对象
     */
    takeEffect: function (buff) {
        var me = this;
        this.el.style.background = 'red';
        switch (buff.effect.name) {
            case buff_type.addBulletSpeed:
                me.firingSpeed += buff.effect.value;
                break;
            case buff_type.addMoveSpeed:
                me.moveSpeed += buff.effect.value;
                break;
            default :
                return;
                break;
        }
        setTimeout(function () {
            me.delBuff(buff);
            me.buffOver(buff);
        }, buff.duration);
    },

    /**
     * buff cd到，删除buff效果,恢复坦克属性
     *
     * @method buffOver
     * @param { Buff } buff - 过期的buff
     */
    buffOver: function (buff) {
        this.el.style.background = 'white';
        var me = this;
        switch (buff.effect.name) {
            case buff_type.addBulletSpeed:
                me.firingSpeed -= buff.effect.value;
                break;
            case buff_type.addMoveSpeed:
                me.moveSpeed -= buff.effect.value;
                break;
            default :
                return;
                break;
        }

    },

    /**
     * 从buff数组删除过期的buff
     *
     * @method delBuff
     * @param { Buff } buff - 过期的buff
     */
    delBuff: function (buff) {
        //遍历自身buff,根据传参删除相应buff
        for (var i = 0, len = this.buffs.length; i < len; i++) {
            if (this.buffs[i] === buff) {
                this.buffs.splice(i, 1);
                break;
            }
        }
        console.log('tank=' + this.id + ' -- buff Name=' + buff.effect + '  end');
    },

    /**
     * 获取坦克的基础属性
     *
     * @method getBaseProperty
     * @param { Number } level - 坦克等级
     * @return {Object} the properties of tank
     */
    getBaseProperty: function (level) {
        var base;
        this.getLevel().forEach(function (item) {
            if (item.level == level) {
                base = item.property;
                return base;
            }
        })
        return base;
    },

    /**
     * 动画
     *
     * @method animate
     * @param { Object } o - 动画参数
     * {
     *   x : 动画 x 坐标
     *   y : 动画 y 坐标
     * }
     */
    animate: function (o) {
        var el = this.el;
        el.style.webkitTransition = '-webkit-transform ' + 0.1 + 's ';
        if (this.el.style.webkitTransform.indexOf('translate') != -1) {
            el.style.webkitTransform = el.style.webkitTransform.replace(/translate[\(（][^\)）]+[\))]/, 'translate(' + o.x + 'px,' + o.y + 'px)');
        } else {
            el.style.webkitTransform += ' translate(' + o.x + 'px,' + o.y + 'px)';
        }
    },

    /**
     * 获取每次移动的距离
     *
     * @method getMoveStep
     * @return { Number } 每次移动的距离
     */
    getMoveStep: function () {
        var step = this.moveSpeed / baseProperty.base_MoveSpeed;
        return step;
    },

    /**
     *坦克旋转动画基础函数
     *
     * @method rotate
     * @param { deg } rotate - 旋转角度
     * @param { Function } cb - 旋转完毕 回调函数
     */
    rotate: function (rotate, cb) {
        var el = this.el;
        var after = function (e) {
            if (cb) {
                cb();
            }
            el.removeEventListener("webkitTransitionEnd", after);
        }
        el.addEventListener("webkitTransitionEnd", after, false);

        el.style.webkitTransition = '-webkit-transform ' + 1 + 's ';
        //旋转
        if (el.style.webkitTransform.indexOf('rotate') != -1) {
            el.style.webkitTransform = el.style.webkitTransform.replace(/rotateZ[\(（][^\)）]+[\))]$/, 'rotateZ(' + rotate + 'deg)');

        } else {
            el.style.webkitTransform += ' rotateZ(' + rotate + 'deg)';
        }
    },

    /**
     * 多按键情况下，记录所欲按键
     *
     * @method addKey
     * @param { Object } o
     * {
     *   key  : { String ( char code)} - 按键对应的 char code
     *   para : { Object } key down 事件 参数e
     * }
     */
    addKey: function (o) {
        if (!this.isExist(o)) {
            this.key.push(o);
        }
    },

    /**
     *从按键数组内删除对应的按键
     *
     * @method removeKey
     * @param { String } key - 需要删除的按键 char code
     */
    removeKey: function (key) {

        for (var i = 0, len = this.key.length; i < len; i++) {
            try {
                if (this.key[i].key == key) {
                    this.key.splice(i, 1);
                }
            } catch (e) {
                console.dir(this.key);
            }

        }
    },

    /**
     * 遍历 按键数组内的函数，并且执行
     *
     * @method runKeyArr
     */
    runKeyArr: function () {
        var me = this;
        this.runHandler = setInterval(function () {
            me.key.forEach(function (item) {
                me.keyDownEvent(item.para);
            })
        }, 18)
    },

    /**
     * 检测按键数组是否已经包含新按键
     *
     * @method isExist
     * @param { String (key code)} o - 新按键对应的char code
     * @return { Bollean } 返回 按键数组是否包含参数按键
     */
    isExist: function (o) {
        var isExist = false;
        if (Array.prototype.contains.call(this.key, o)) {
            isExist = true;
        }
        return isExist;
    },

    /**
     * 检测按键数组是否同时包含两个方向键，如果有则删除(避免坦克斜着走)
     *
     * @method deleteMoveKey
     */
    deleteMoveKey: function () {
        var me = this;
        this.key.forEach(function (item, index) {
                var kb = me.keyBoard;
                var key = item.key;
                if (key == kb.up || key == kb.down || key == kb.left || key == kb.right) {
                    me.key.splice(index, 1);
                }
            }
        )
    },

    /**
     * 坦克移动过程中，检测是否撞击到障碍物
     *
     * @method isHitObstruction
     * @return { Bollean } 是否撞击障碍物
     */
    isHitObstruction: function () {
        var me = this;
        var obstructions = ds.oMgr.getObj(dataType.obs);
        var me = this,
            pos = this.position,
            dire = this.direction;
        var ishit = false;
        obstructions.forEach(function (obstruction) {
            var tp = obstruction.position;
            switch (dire) {
                case direction.up:
                    if ((pos.x >= tp.x - me.width / 2) && (pos.x <= tp.x + obstruction.width + me.width / 2) && (pos.y <= tp.y + obstruction.height + me.height / 2)) {
                        me.quarry = obstruction;
                        ishit = true;
                    }
                    break;
                case direction.left:
                    if ((pos.y >= tp.y - me.height / 2) && (pos.y < tp.y + obstruction.height + me.height / 2) && (pos.x <= tp.x + obstruction.width + me.width / 2)) {
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

    /**
     * 坦克移动过程中，检测是否撞击到坦克
     *
     * @method isHitObTank
     * @return { Bollean } 是否撞击坦克
     */
    isHitTank: function () {
//        var tanks = ds.oMgr.getObj(dataType.tank);
//        var me = this;
//        var pos = this.position;
//        var ishit = false;
//        for (var i = 0, len = tanks.length; i < len; i++) {
//            var tank = tanks[i];
//            var tp = tank.position;
//            //条件是 子弹的xy在 坦克xy之内
//            if (( pos.x > tp.x && pos.x < (tp.x + tank.width)) && (pos.y > (tp.y - tank.height) && pos.y < tp.y)) {
//                me.quarry = tank;
//                ishit = true;
//                break;
//            }
//        }
//        return ishit;
        return false;
    },

    /**
     * 坦克移动过程中，检测是否撞击到墙体
     *
     * @method isHitWall
     * @return { Bollean } 是否撞击墙体
     */
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

    /**
     * 坦克移动过程中，检测是否迟到buff
     *
     * @method isHitBuff
     * @return { Bollean } 是否撞击Buff
     */
    isHitBuff: function () {
        var me = this;
        var buffs = ds.oMgr.getObj(dataType.buff);
        var me = this,
            pos = this.position,
            dire = this.direction;
        var ishit = false;
        buffs.forEach(function (buff) {
            var bp = buff.position;
            switch (dire) {
                case direction.up:
                    //判断条件
                    //1.确保坦克的右边缘在 buff最左侧的右边
                    //2.确保坦克的左边缘在 buff 左右边的左边
                    //3.确保坦克y轴搞好碰到buff
                    if ((pos.x + me.width > bp.x) && (pos.x < bp.x + buff.width) && (pos.y <= bp.y)) {
                        ishit = true;
                    }
                    break;
                case direction.left:
                    if ((pos.y + me.height > bp.y ) && (pos.y < bp.y + buff.height) && pos.x >= bp.x) {
                        ishit = true;
                    }
                    ;
                    break;
                case direction.down:
                    ;
                    break;
                case direction.right:
                    ;
                    break;
                default :
                    return;
                    break;
            }
            if (ishit) {
                buff.destroy();
                this.pub(baseEvent.buffBegin, me, buff);
            }
        })
        return ishit;
    },

    /**
     * 销毁坦克
     *
     * @method destroy
     */
    destroy: function () {
        console.log(this.id + 'is destroy');
    },

    /**
     * 坦克被攻击时，
     *
     * @method underAttack
     */
    underAttack: function (val) {
        this.attack.underAttack.call(this, val);
    }
}


//移动相关
Tank.prototype.move = {
    /**
     * 向上移动
     *
     * @method up
     * @param { String } dire - 移动的方向
     */
    up: function (dire) {
        //移动
        var me = this;
        this.position.y -= this.getMoveStep();
        if (dire == this.direction) {
            if (this.isHitBuff()) {
                console.log(this.buffs);

            } else if (this.isHitObstruction()) {
                console.log('tank is hit obstruction');

            } else if (this.isHitWall()) {
                console.log('tank is hit wall');

            } else {
                this.animate(this.position);
            }

        } else {//转弯
            this.direction = direction.up;
            this.move.turn.call(me, function move() {
                me.animate(me.position);
            });
        }
    },
    //向下移动
    down: function (dire) {
        var me = this;
        //移动
        this.position.y += this.getMoveStep();
        if (dire == this.direction) {
            this.animate(this.position);
        } else {//转弯
            this.direction = direction.down;
            this.move.turn.call(me, function move() {
                me.animate(me.position);
            });
        }
    },
    //左移动
    left: function (dire) {
        //移动
        var me = this;
        this.position.x -= this.getMoveStep();
        if (dire == this.direction) {
            this.animate(this.position);
        } else {//转弯
            this.direction = direction.left;
            this.move.turn.call(me, function move() {
                me.animate(me.position);
            });
        }
    },
    //右移动
    right: function (dire) {
        //移动
        var me = this;
        this.position.x += this.getMoveStep();
        if (dire == this.direction) {
            this.animate(this.position);
        } else {//转弯
            this.direction = direction.right;
            this.move.turn.call(me, function move() {
                me.animate(me.position);
            });
        }
    },
    //转弯
    turn: function (fn) {
        this.rotate(this.util.getDegByDirection.call(this), fn);
    },
    //跳跃
    dump: function () {
        console.log('dump==' + this.id);
    },
    //改变移动速度(比如 吃buff,buff过期,经过障碍物,撞墙)
    changeMoveSpeed: function () {

    }
}

//进攻相关
Tank.prototype.attack = {

    /**
     * 坦克开火
     *
     * @method fire
     */
    fire: function () {
        var me = this
        //判断是否cd到了
        if (this.attack.isCoolDown.call(this)) {
            //设置cd开始时间，方便判断是否cd结束
            this.cdBegin = new Date().getTime();
            //实例化子弹(把最终攻击力 附加给 子弹.子弹自动检测攻击到的对象)
            //(最终伤害 = 最终攻击力-敌军防御力)
            //直接position=me.position()这样会是引用，如果改变 position。那么坦克的position也会变.这时候需要深度复制
            var position = {};
            position.x = me.position.x;
            position.y = me.position.y;
            var direction = me.direction;
            var atk = me.atk + me.weapon.atk;
            var speed = me.firingSpeed + me.weapon.speed;
            var bullet = this.weapon.bullet({
                position: position,
                owner: me,
                direction: direction,
                atk: atk,
                //子弹最终飞行速度
                speed: speed
            });

            //添加到共享对象
            ds.oMgr.add(dataType.bullet, bullet);
        }
    },

    /**
     * 检测是否过了开火 cd
     *
     * @method isCoolDown
     * @reutrn { Boolean } 开火cd 是否好了
     */
    isCoolDown: function () {
        return (new Date().getTime() - this.cdBegin) >= this.cd ? true : false;
    },

    /**
     * 计算最终攻击力
     *
     * @method calcAtk
     * @return { Number } 最终的攻击力
     */
    calcAtk: function () {
        //todo:buff攻击力需要加上
        //基础攻击力+武器自身攻击+子弹附加效果攻击
        //  return (+this.weapon.bullet({}).atk);
    },

    /**
     * 处理被攻击时候，怎么掉血
     *
     * @method underAttack
     */
    underAttack: function () {
        console.log('tank is under attack');
        this.destroy();
    }
}

//设置私有属性
Tank.prototype.setNativeProperties = function () {
    var proto = Tank.prototype;
    Object.defineProperties(proto, {
        //定义游戏内部等级制度
        builtInLevel: {
            set: function (x) {
                console.log('failed');
            },
            get: function () {
                return [
                    {level: 1, ep: 100, property: {
                        baseAtk: 1,
                        baseMoveSpeed: 1,
                        firingSpeed: 1,
                        defense: defense_Catgory.l1
                    }},
                    {level: 2, ep: 200, property: {
                        baseAtk: 2,
                        baseMoveSpeed: 2,
                        firingSpeed: 2,
                        defense: defense_Catgory.l2
                    }},
                    {level: 3, ep: 300, property: {
                        baseAtk: 3,
                        baseMoveSpeed: 3,
                        firingSpeed: 3,
                        defense: defense_Catgory.l3
                    }},
                    {level: 4, ep: 400, property: {
                        baseAtk: 4,
                        baseMoveSpeed: 4,
                        firingSpeed: 4,
                        defense: defense_Catgory.l4
                    }},
                    {level: 5, ep: 500, property: {
                        baseAtk: 5,
                        baseMoveSpeed: 5,
                        firingSpeed: 5,
                        defense: defense_Catgory.l5
                    }}
                ]
            },
            enumerable: false,
            configurable: true
        }
    })
}

/**
 * 构造函数初始化函数
 *
 * @method init
 */
Tank.prototype.init = function () {
    var tank = document.createElement('div');
    tank.className = this.appearance.cls;
    var canvas = document.createElement('canvas');
    var c = canvas.getContext('2d');

    var h = this.height,
        w = this.width;
    tank.style.height = h + 'px';
    tank.style.width = w + 'px';
    canvas.width = this.width;
    canvas.height = this.height;

    c.rect(0, h * 0.4, w, h * 0.6);
    c.rect(0.2 * w, w * 0.4, w * 0.6, h * 0.4);
    c.rect(w * 0.45, 0, w * 0.1, h * 0.5);
    c.stroke();

    tank.appendChild(canvas);

    this.el = tank;
    this.setNativeProperties();
    this.addEvent();
    this.subScribeEvent();
    //todo:实例化坦克，循环检测多按键。后续改进
    this.runKeyArr();
}

/**
 * 订阅事件
 *
 * @method subScribeEvent
 * 1.buff开始事件
 * 2.buff结束事件
 */
Tank.prototype.subScribeEvent = function () {
    //订阅吃精灵事件
    this.sub(baseEvent.buffBegin, this, this.addBuff)
    //订阅精灵效果结束事件
    this.sub(baseEvent.buffEnd, this, this.delBuff);
}

//工具函数
Tank.prototype.util = {
    /**
     * 根据键位返回玩家
     *
     * @method getTankByBb
     * @param { Object } kb - 键位
     */
    getTankByKb: function (kb) {
        var tank;
        var allTank = ds.oMgr.getObj(dataType.tank);
        if (ds && allTank && allTank.length > 0) {
            allTank.forEach(function (item) {
                //遍历tank操作键盘
                var board = item.keyBoard;
                for (var i in board) {
                    //如果tank 的键盘操作健 包含 传入的(假设两个坦克的按键不重复.以后会做强制措施)
                    if (board[i] == kb) {
                        tank = item;
                        return tank;
                    }
                }
            })
        }
        return tank;
    },

    /**
     * 根据运动方向返回物体旋转角度
     *
     * @method getDegByDirection
     * @return { Number } 角度
     */
    getDegByDirection: function () {
        var deg;
        switch (this.direction) {
            case direction.up:
                deg = 0;
                break;
            case direction.down:
                deg = 180;
                break;
            case direction.left:
                deg = -90;
                break;
            case direction.right:
                deg = 90;
                break;
            default:
                deg = 0;
                break;
        }
        return deg;
    }
}

//添加操控行为事件
Tank.prototype.addEvent = function () {
    var me = this;
    //处理键盘操控事件
    this.moveEvent = function (e) {
        //console.log( e.keyCode + ' ---' + e.type );
        var code = e.keyCode || e.which;
        var char = String.fromCharCode(code).toLowerCase();
        //根据按键找到相关的坦克
        var currentTank = Tank.prototype.util.getTankByKb(char);
        if (currentTank) {
            var kb = currentTank.keyBoard,
                up = kb.up,
                down = kb.down,
                left = kb.left,
                right = kb.right,
                fire = kb.fire,
                dump = kb.dump,
                turn = kb.turn,
                prop = kb.prop;


            //删除 保存的移动的key
            if (char == up || char == down || char == left || char == right) {
                me.deleteMoveKey();
            }

            //添加到 key数组
            if (e.type == 'keydown') {
                me.addKey({
                    key: char,
                    para: e
                });

                //判断动作及方向
                switch (char) {
                    case up:
                        currentTank.move.up.call(currentTank, direction.up);
                        break;
                    case down:
                        currentTank.move.down.call(currentTank, direction.down);
                        break;
                    case left:
                        currentTank.move.left.call(currentTank, direction.left);
                        break;
                    case right:
                        currentTank.move.right.call(currentTank, direction.right);
                        break;
                    case dump:
                        currentTank.move.dump.call(currentTank);
                        break;
                    case fire:
                        currentTank.attack.fire.call(currentTank);
                        break;
                    case prop:
                        currentTank.showPropertyPanel();
                        break;
                    default:
                        return;
                        break;
                }
            } else if (e.type == 'keyup') { //keyup

                me.removeKey(char);
            }
        }

    }
    //单纯处理同时按键的操作
    this.keyDownEvent = function (e) {
        var code = e.keyCode || e.which;
        var char = String.fromCharCode(code).toLowerCase();
        //根据按键找到相关的坦克
        var currentTank = Tank.prototype.util.getTankByKb(char);


        if (currentTank) {
            var kb = currentTank.keyBoard,
                up = kb.up,
                down = kb.down,
                left = kb.left,
                right = kb.right,
                fire = kb.fire,
                dump = kb.dump,
                turn = kb.turn;
            //判断动作及方向
            switch (char) {
                case up:
                    currentTank.move.up.call(currentTank, direction.up);
                    break;
                case down:
                    currentTank.move.down.call(currentTank, direction.down);
                    break;
                case left:
                    currentTank.move.left.call(currentTank, direction.left);
                    break;
                case right:
                    currentTank.move.right.call(currentTank, direction.right);
                    break;
                case dump:
                    currentTank.move.dump.call(currentTank);
                    break;
                case fire:
                    currentTank.attack.fire.call(currentTank);
                    break;
                default:
                    return;
                    break;
            }

        }
    }
//添加点击事件
    if (!document.body.onkeydown) {
        document.body.onkeydown = this.moveEvent;
    }
    if (!document.body.onkeyup) {
        document.body.onkeyup = this.moveEvent;
    }
}

/**
 * 渲染坦克到dom
 *
 * @method render
 *///渲染坦克
Tank.prototype.render = function (scope) {
    //scope 就是 map
    var style = this.el.style;
    this.animate(this.position);
    scope.el.appendChild(this.el);
}


