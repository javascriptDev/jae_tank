/**
 * Created by addison on 2014/5/20.
 */
Game = {
    start: function (o) {
        this.event = new Events();
        this.checkOver();
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
                    BuiltIn_Obstruction.a({x: 130, y: 130}),
                    BuiltIn_Obstruction.b({x: 220, y: 110}),
                    BuiltIn_Obstruction.b({x: 300, y: 240}),
                    BuiltIn_Obstruction.b({x: 400, y: 240})
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
    checkOver: function () {
        this.sub(baseEvent.checkGameOver, this, this.end);
    },
    end: function () {
        if (ds.oMgr.getObj(dataType.obs).length == 0) {
            //alert('game over');
            var div = document.createElement('div');
            var s = div.style;
            s.position = 'absolute';
            s.top = '100px';
            s.left = '100px';
            s.width = '200px';
            s.border = '1px solid red';
            s.background = '#333';
            s.color = 'white';
            div.innerHTML = '<div>公告</div><div>game over</div><div><button id="replay">重玩</button></div>';
            document.body.appendChild(div);
        }
    },
    pause: function () {
    },
    restart: function () {

    }
}