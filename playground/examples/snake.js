var clock = 0;
var x = 0;

Game.set({
    width: 640,
    height: 480
});

// 上下左右控制方向，防止吃到自己
Game.on("keydown", "up", function(){
    if(snake.direction !== "down") {
        snake.direction = "up";
    }
});
Game.on("keydown", "down", function(){
    if(snake.direction !== "up") {
        snake.direction = "down";
    }
});
Game.on("keydown", "left", function(){
    if(snake.direction !== "right") {
        snake.direction = "left";
    }
});
Game.on("keydown", "right", function(){
    if(snake.direction !== "left") {
        snake.direction = "right";
    }
});

var snakeBodyX = [10];
var snakeBodyY = [10];
Game.sprites.snakeBody = [];
var snake = Game.sprites.snake = Game.createSprite({
    x: 10,
    y: 10,
    direction: "right",
    costumes: "./images/body.gif"
});
var food = Game.sprites.food = Game.createSprite({
    x: 20*(Math.floor(Math.random()*31))+10,
    y: 20*(Math.floor(Math.random()*23))+10,
    costumes: "./images/food.gif"
});

snake.on("touch", food, function(){
    snakeBodyX.unshift(0);
    snakeBodyY.unshift(0);
    food.x = 20*(Math.floor(Math.random()*31))+10;
    food.y = 20*(Math.floor(Math.random()*23))+10;
});

Game.update(function(){
    Game.drawBackdrop("#ffffff");
    if(clock%30===0){
        if (snake.direction === "up"){
            snake.y -= 20;
        }else if (snake.direction === "down"){
            snake.y += 20;
        }else if (snake.direction === "left"){
            snake.x -= 20;
        }else if (snake.direction === "right"){
            snake.x += 20;
        }
        snakeBodyX.push(snake.x);
        snakeBodyY.push(snake.y);
        snakeBodyX.shift();
        snakeBodyY.shift();
        Game.sprites.snakeBody.length = 0;
        for (var i = 0; i < snakeBodyX.length - 1; i++) {
            console.log(i + ": " + snakeBodyX);
            var snakeBody = Game.createSprite({
                x: snakeBodyX[i],
                y: snakeBodyY[i],
                costumes: "./images/body.gif"
            });
            Game.sprites.snakeBody.push(snakeBody);
        }   
    }
    if (snake.x > 630 || snake.x < 10 || 
        snake.y < 10 || snake.y > 470){
        Game.stop();
    }
    clock++;
    Game.drawSprites();
})

Game.start();