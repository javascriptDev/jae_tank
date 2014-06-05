/**
 * Created by indice on 2014/5/19.
 */


//坦克附加的武器类
function Weapon(o) {
    //外观
    this.appearance = o.appearance;
    //射速
    this.speed = o.speed;
    //攻击类
    this.atk = o.atk;
    //子弹类型
    this.bullet = o.bullet || BuiltIn_Bullet.a;
}


//内置的坦克武器
var BuiltIn_Weapon = {
    a: new Weapon({
        appearance: 'a',
        speed: 5,
        atk: 10,
        bullet: BuiltIn_Bullet.a
    }),
    b: new Weapon({
        appearance: 'b',
        speed: 6,
        atk: 20,
        bullet: BuiltIn_Bullet.a
    })

}
