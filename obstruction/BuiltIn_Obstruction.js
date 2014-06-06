/**
 * Created by addison on 2014/5/21.
 */
//内置的障碍物
var BuiltIn_Obstruction = {
    a: function (position) {
        return  new Obstruction({
            appearance: BuiltIn_Appearance.o1,
            width: 200,
            height: 100,
            position: position,
            type: obstructionType.impenetrable
        })
    },
    b: function (position) {
        return new Obstruction({
            appearance: BuiltIn_Appearance.o2,
            width: 200,
            height: 100,
            position: position,
            type: obstructionType.impenetrable
        })
    }
}