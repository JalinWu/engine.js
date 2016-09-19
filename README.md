# Koding Game Engine

## 遊戲初始化
```javascript
var Game = Engine("canvas-id");

// 設定遊戲數值
Game.set({
    width: 400, // Default: 640px
    height: 400, // Default: 480px
    ratio: 0.8, // Default: 1
    draw: function(){},
    debugMode: true // Default: false
});
```

## 角色
### 創造新角色
```javascript
// 創造新角色
var slime = Game.createSprite({
    x: 200,
    y: 200,
    costumes: ["./slime.gif"]
});

// 存放所有角色的物件
Game.sprites; // {}

Game.sprites.slime = slime;

// 移除遊戲中的所有角色
// Game.clearSprites();
```

### 角色的特徵
```javascript
slime.x;
slime.y;
slime.direction;
slime.scale;
slime.costumes;
slime.currentCostumeId;
slime.width;
slime.height;
slime.hidden;
```

### 角色的方法
```javascript
slime.moveTo();
slime.move();
slime.stepForward();
slime.toward();
slime.touched();
slime.distanceTo();
```

## IO & Events
```javascript
// Current cursor position
Game.cursor; // {x:0, y:0}

// 取得目前的 FPS
Game.inspector.fps; // 58

// 綁定事件
Game.on("click", Game.sprites.hero, function(){ /* Do something */ });
Game.on("hover", Game.sprites.hero, function(){ /* Do something */ });
Game.on("keydown", "w", function(){ /* Do something */ });
Game.on("keyup", "space", function(){ /* Do something */ });
Game.on("holding", "right", function(){ /* Do something */ });
```


## Rendering

```javascript
Game.preloadImages(
    [path1, path2, path3],
    completeCallback,
    progressCallback
);

Game.draw(function(){

  Game.drawBackdrop("./images/backGround.jpg");
  Game.drawBackdrop("#000000");

  Game.print(text, x, y, color, size, font);

  // Draw all sprites in Game.sprites on canvas
  Game.drawSprites();
});

Game.start();

Game.stop();

Game.clear();
```

你也可以拿 context 物件自由畫出你要畫的東西
可以查看 CanvasRenderingContext2D 的 [API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
```javascript
Game.ctx;
```
