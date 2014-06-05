/**
 * Created by addison on 2014/5/21.
 */
function Events() {

	//事件集合对象
	var events = {};

	//查看事件是否存在
	var eventTypeExist = function( name ) {
		var exist = false;
		if(events[name]) {
			exist = true;
		}
		return exist;
	}

	//根据事件类型获取订阅的函数
	var getEvent = function( name ) {
		return events[name];
	}

	//订阅事件
	var subscribe = function( eventName, target, fn ) {
		if(eventTypeExist( eventName )) {
			events[eventName].push( {t: target, fn: fn} );
		} else {
			events[eventName] = [
				{t: target, fn: fn}
			];
		}
	}

	//发布事件
	var publish = function( eventName, target, param ) {
		var fns = getEvent( eventName );
		Array.prototype.forEach.call( fns, function( item ) {
			//查看是不是 事件触发的对象
			if(item.t === target) {
				if(Object.prototype.toString.call( item.fn ) == '[object Function]') {
					item.fn.call( target, param );
				}
			}
		} );
	}

	//触发事件
	var fire = function( eventName, target, param ) {
		publish( eventName, target, param );
	}

	//给所有对象加上 发布 订阅 触发事件的方法
	Object.prototype.fire = fire;
	Object.prototype.sub = subscribe;
	Object.prototype.pub = publish;
	Array.prototype.contains = function( o ) {
		var result = false;
		for( var i = 0, len = this.length; i < len; i++ ) {
			if(this[i].key === o.key) {
				result = true;
				break;
			}
		}
		return result;
	}
}

