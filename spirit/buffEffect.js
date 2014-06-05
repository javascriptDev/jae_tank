/**
 * Created by addison on 2014/5/19.
 */

//内置的buff 枚举
var Built_In_Effect = {
    addMoveSpeed: 'addMoveSpeed',
    addBulletSpeed: 'addBulletSpeed'
}


//内置buff效果类
function Effect(o) {
    //效果名字
    this.name = o.name || null;
    //效果值
    this.value = o.val || 0;
}

