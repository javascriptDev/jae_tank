/**
 * Created by addison on 2014/5/19.
 */

//地图类
function Map(o) {
    this.init();
}


Map.prototype = {

    initMap: function () {
        var me = this;
        var m = document.createElement('div');
        m.className = 'map-base';
        this.el = m;

        var tanks = ds.oMgr.getObj(dataType.tank);
        var buffs = ds.oMgr.getObj(dataType.buff);
        var obs = ds.oMgr.getObj(dataType.obs);
        var bullets = ds.oMgr.getObj(dataType.bullet);

        var allObject = [tanks, buffs, obs, bullets];
        allObject.forEach(function (item) {
            item.forEach(function (i) {
                i.render(me);
            })
        })
        document.body.appendChild(m);
    },
    //初始化整个地图
    init: function () {
        this.initMap();

    }
}

