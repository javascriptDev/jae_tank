/**
 * Created by addison on 2014/5/20.
 */
var Game = {
    start: function
        (o) {
        this.event = new Events();
        window.onload = function () {
            var keyBoard = {
                up: 'up',
                down: 'down',
                left: 'left',
                right: 'right',
                dump: 'ctrl',
                fire: 'del'
            }
            var options = {
                buffs: [
                    BuiltIn_Buff.addBulletSpeed({
                            position: {x: 100, y: 100},
                            duration: 10
                        }
                    ),
                    BuiltIn_Buff.addMoveSpeed({
                        position: {x: 220, y: 190}
                    })
                ],
                obstructions: [
                    BuiltIn_Obstruction.a(30, 30),
                    BuiltIn_Obstruction.b(50, 30),
                    BuiltIn_Obstruction.b(80, 10)
                ],
                tanks: [
                    BuiltIn_Tank.hard({position: {x: 100, y: 200}}),
                    BuiltIn_Tank.normal({
                        keyBoard: keyBoard
                    })
                ]
            }
            ds = new DataShare(options);
            var map = new Map();

        }
    },
    end: function () {
    },
    pause: function () {
    },
    restart: function () {

    }
}