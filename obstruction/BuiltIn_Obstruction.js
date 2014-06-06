/**
 * Created by addison on 2014/5/21.
 */
//内置的障碍物
var BuiltIn_Obstruction = {
    a: function (position) {
        return  new Obstruction({
            appearance: BuiltIn_Appearance.o1,
            width: 40,
            height: 30,
            position: position || {x: 0, y: 0},
            type: obstructionType.impenetrable
        })
    },
    b: function (position) {
        return new Obstruction({
            appearance: BuiltIn_Appearance.o2,
            width: 80,
            height: 20,
            position: position || {x: 0, y: 0},
            type: obstructionType.impenetrable
        })
    }
}