var util = require("./util");

// @TODO: 客製化特征
function Sprite(args, eventList) {
    this.x = args.x;
    this.y = args.y;
    this.direction = args.direction;
    this.scale = args.scale || 1;
    this.costumes = [].concat(args.costumes); // Deal with single string
    this.currentCostumeId = 0; // Deal with single string
    this.width = 1;
    this.height = 1;
    this.hidden = args.hidden;

    this._onTickFunc = null;
    this._eventList = eventList;
    this._deleted = false;

}

Sprite.prototype.moveTo = function(x, y){
    this.x = x;
    this.y = y;
};

Sprite.prototype.move = function(x, y){
    this.x += x;
    this.y += y;
};

Sprite.prototype.stepForward = function(distance){
    var rad = util.degreeToRad(this.direction)
    this.x += Math.cos(rad)*distance;
    this.y -= Math.sin(rad)*distance;
};

Sprite.prototype.toward = function(){
    var targetX, targetY, offsetX, offsetY, rad;
    if(util.isNumeric(arguments[0].x) && util.isNumeric(arguments[0].y)){
        targetX = arguments[0].x,
        targetY = arguments[0].y;
    } else if ( util.isNumeric(arguments[0]) && util.isNumeric(arguments[1]) ) {
        targetX = arguments[0],
        targetY = arguments[1];
    } else {
        throw "請傳入角色(Sprite)或是 X, Y 坐標值";
    }
    offsetX = targetX - this.x;
    offsetY = targetY - this.y;
    rad = Math.atan2(-offsetY, offsetX); // 這裡的 offsetY 和數學坐標是反過來的
    this.direction = util.radToDegree(rad);
    // console.log(this.direction);
}

Sprite.prototype.touched = function(){
    var crossX = crossY = false;
    if( arguments[0] instanceof Sprite ){
        var target = arguments[0];
        crossX = (this.x+this.width/2)>(target.x-target.width/2) && (target.x+target.width/2)>(this.x-this.width/2);
        crossY = (this.y+this.height/2)>(target.y-target.height/2) && (target.y+target.height/2)>(this.y-this.height/2);
    } else if ( util.isNumeric(arguments[0]) && util.isNumeric(arguments[1]) ) {
        var targetX = arguments[0],
            targetY = arguments[1];
        crossX = (this.x+this.width/2)>targetX && targetX>(this.x-this.width/2);
        crossY = (this.y+this.height/2)>targetY && targetY>(this.y-this.height/2);
    } else {
        throw "請傳入角色(Sprite)或是 X, Y 坐標值";
    }
    return (crossX && crossY);

    // var hitCanvas = document.createElement('canvas');
    // hitCanvas.width = 480;
    // hitCanvas.height = 360;
    // var hitTester = hitCanvas.getContext('2d');
    // hitTester.globalCompositeOperation = 'source-over';
    // a.stamp(hitTester, 100);
    // hitTester.globalCompositeOperation = 'source-in';
    // b.stamp(hitTester, 100);
    //
    // var aData = hitTester.getImageData(0, 0, 480, 360).data;
    //
    // var pxCount = aData.length;
    // for (var i = 0; i < pxCount; i += 4) {
    //     if (aData[i+3] > 0) {
    //         return true;
    //     }
    // }
    // return false;
};

Sprite.prototype.distanceTo = function(){
    if( util.isNumeric(arguments[0].x) && util.isNumeric(arguments[0].y) ){
        return util.distanceBetween( this, arguments[0] );
    } else if ( util.isNumeric(arguments[0]) && util.isNumeric(arguments[1]) ){
        return util.distanceBetween( this.x, this.y, arguments[0], arguments[1] );
    }
};

Sprite.prototype.always = Sprite.prototype.forever = function(func){
    this._onTickFunc = func;
};

Sprite.prototype.when = Sprite.prototype.on = function(){
    var event = arguments[0],
        target, handler;
    if(event=="hover" || event=="click"){
        target = this;
        handler = arguments[1];
    } else if (event=="touch"){
        if(Array.isArray(arguments[1])){
            target = [this].concat(arguments[1]);
        } else {
            target = [this].concat([arguments[1]]);
        }
        handler = arguments[2];
    } else {
        console.log('Sprite.on() does only support "click", "hover" and "touch" events');
        return false;
    }
    this._eventList.register(event, target, handler);
};

Sprite.prototype.destroy = function(){
    this._deleted = true;
};

module.exports = Sprite;