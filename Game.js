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
                            position: {x: 0, y: 0},
                            duration: 10
                        }
                    ),
                    BuiltIn_Buff.addMoveSpeed(10, 10)
                ],
                obstructions: [
                    BuiltIn_Obstruction.a(30, 30),
                    BuiltIn_Obstruction.a(50, 30),
                    BuiltIn_Obstruction.b(80, 0)
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