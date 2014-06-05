//内置 坦克类型
var BuiltIn_Tank = {
    normal: function (o) {
        return  new Tank({
            appearance: BuiltIn_Appearance.a,
            speed: 2,
            type: 'normal',
            weapon: BuiltIn_Weapon.b,
            moveSpeed: 10,
            position: o.position || {x: 0, y: 0},
            keyBoard:o.keyBoard
        })
    },
    hard: function (o) {
        return new Tank({
            appearance: BuiltIn_Appearance.b,
            speed: 10,
            type: 'hard',
            weapon: BuiltIn_Weapon.a,
            moveSpeed: 20,
            position: o.position || {x: 0, y: 0},
            keyBoard:o.keyBoard
        })
    }
};
