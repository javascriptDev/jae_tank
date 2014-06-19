/**
 * Created by addison on 2014/5/21.
 */
//内置的障碍物
var BuiltIn_Obstruction = {
    a: function (position) {
        return  new Obstruction({
            appearance: BuiltIn_Appearance.o1,
            width: 100,
            height: 60,
            position: position || {x: 0, y: 0},
            //可穿透性
            penetrability: obstructionType.impenetrable
        })
    },
    b: function (position) {
        return new Obstruction({
            appearance: BuiltIn_Appearance.o2,
            width: 120,
            height: 80,
            position: position || {x: 0, y: 0},
            penetrability: obstructionType.impenetrable
        })
    }
}