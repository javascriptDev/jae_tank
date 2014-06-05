/**
 * Created by addison on 2014/5/21.
 */
//内置的障碍物
var BuiltIn_Obstruction = {
    a: function (position) {
        return  new Obstruction({
            material: BuiltIn_Material.b,
            width: 200,
            height: 100,
            position: position
        })
    },
    b: function (position) {
        return new Obstruction({
            material: BuiltIn_Material.a,
            width: 200,
            height: 100,
            position: position
        })
    }
}