/**
 * Created by addison on 2014/5/21.
 */
/**/
//基础数据
var dataType = {
    //buff
    buff: 'buff',
    //障碍物
    obs: 'obs',
    //坦克
    tank: 'tanks',
    //子弹
    bullet: 'bulltes'
}

//DataShare 类
function DataShare(o) {
    //共享数据-->buff
    var buffs = o.buffs;
    //共享数据-->障碍物
    var obstructions = o.obstructions;
    //共享数据-->玩家
    var tanks = o.tanks || [];
    //共享数据-->子弹
    var bullets = [];

    //对象管理
    var Mgr = {

        //根据传入类型查找相关对象
        //获取
        getObj: function (type) {
            switch (type) {
                case dataType.buff:
                    return buffs;
                    break;
                case dataType.obs:
                    return obstructions;
                    break;
                case dataType.tank:
                    return tanks;
                    break;
                case dataType.bullet:
                    return bullets;
                default:
                    return  [];
                    break;
            }
        },
        //添加
        add: function (type, o) {
            this.getObj(type).push(o);
        },
        //删除
        del: function (type, o) {
            var me = this;
            this.getObj(type).forEach(function (item, index) {
                if (item == o) {
                    me.getObj(type).splice(index, 1);
                }
            })
        },
        //更新
        update: function (type, o, config) {
            this.getObj(type).forEach(function (item, index) {
                if (item === o) {
                    for (var i in config) {
                        item[i] = config[i];
                    }
                }
            })
        }


    }

    var subEvent = function () {

    }

    this.oMgr = Mgr;


}
