var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  res.write('\
   <!DOCTYPE html>\
	  <html>\
	  <head lang="en">\
		  <meta charset="UTF-8">\
			  <title></title>\
			  <style>\
			  .tank-a, .tank-b {\
				  width: 30px;;\
				  height: 30px;;\
				  -webkit-transform: translate(0, 0) translateZ(0);\
				  }\
\
			  .tank-a {\
				  border: 1px solid red;\
				  border-top: 2px solid green;\
				  }\
\
			  .tank-b {\
				  border: 1px solid green;;\
				  border-top: 2px solid red;\
				  }\
\
			  .bullet-1 {\
				  width: 10px;\
				  height: 10px;\
				  background: red;\
				  border-radius: 5px;\
				  }\
\
			  .map-base {\
				  width: 500px;\
				  height: 400px;\
				  border: 1px solid green;\
				  }\
\
			  </style>\
\
			  <!--数据共享类-->\
			  <script src="datashare.js"></script>\
			  <!--坦克其他属性 枚举值-->\
			  <script src="tank/tankOtherProperty.js"></script>\
			  <!--支持的基础事件-->\
			  <script src="Event/BaseEvent.js"></script>\
			  <!--事件类-->\
			  <script src="Event/Event.js"></script>\
			  <!--材质类 和 内置的一些材质-->\
			  <script src="face/Material.js"></script>\
			  <!--内置皮肤-->\
			  <script src="face/Appearance.js"></script>\
			  <!--子弹类-->\
			  <script src="atk/Bullet.js"></script>\
			  <!--内置武器-->\
			  <script src="atk/Weapon.js"></script>\
\
			  <!--防御系统-->\
			  <script src="atk/Defense.js"></script>\
			  <!--坦克类-->\
			  <script src="tank/Tank.js"></script>\
			  <!--内置坦克-->\
			  <script src="tank/BuiltIn_Tank.js"></script>\
			  <!--buff 效果-->\
			  <script src="spirit/buffEffect.js"></script>\
			  <!--buff类-->\
			  <script src="spirit/Buff.js"></script>\
			  <!--障碍物类-->\
			  <script src="obstruction/Obstructions.js"></script>\
			  <!--内置障碍物-->\
			  <script src="obstruction/BuiltIn_Obstruction.js"></script>\
			  <!--地图类-->\
			  <script src="Map/Map.js"></script>\
			  <!--游戏管理类-->\
			  <script src="Game.js"></script>\
\
			  <script>\
			  Game.start();\
			  </script>\
		  </head>\
		  <body>\
		  </body>\
	  </html>,  ');
  res.end();
}).listen(process.env.PORT || 1337, null);
