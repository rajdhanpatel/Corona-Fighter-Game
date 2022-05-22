function load_img(){
    virus_img = new Image;
    virus_img.src = "img/v1.png";

    player_img = new Image;
    player_img.src = "img/superhero.png";

    gem_img = new Image;
    gem_img.src = "img/gemm.png";

}
function init(){
    canvas = document.getElementById("mycanvas");
    console.log(canvas);
    W = 700;
    H = 400;
    canvas.height = H;
    canvas.width = W;
    pen = canvas.getContext('2d');
    
    score = 0;
    game_over = false;
    e1 = {
        x:150,
        y:50,
        w:60,
        h:60,
        speed : 20,
    };
    e2 = {
        x:300,
        y:10,
        w:60,
        h:60,
        speed : 30,
    };
    e3 = {
        x:450,
        y:100,
        w:60,
        h:60,
        speed : 36,
    };
    enemy = [e1,e2,e3];
    player = {
        x: 20,
        y: H/2,
        w: 60,
        h: 60,
        speed:20,
        moving : "false",
    }
    gem = {
        x: W-100,
        y: H/2,
        w: 60,
        h: 60,
    }
    //create a event listener
    canvas.addEventListener("mousedown", function(){
        console.log("you pressed the mouse");
        player.moving = true;
        score += 20;
    });
    canvas.addEventListener("mouseup", function(){
        console.log("you released the mouse");
        player.moving = false;
    });
}

function  draw(){
    pen.clearRect(0, 0, W, H);
    pen.fillStyle='red';
    pen.drawImage(player_img,player.x,player.y,player.w,player.h,);

    pen.drawImage(gem_img,gem.x,gem.y,gem.w,gem.h);
    for(let i=0;i<enemy.length;i++){
        pen.drawImage(virus_img,enemy[i].x, enemy[i].y,enemy[i].h,enemy[i].w);
    }
    pen.fillStyle = "white";
    pen.fillText("Score " + score, 20, 20);
    
}

function isColliding(b1,b2){
    if(Math.abs(b1.x-b2.x)<=30 && Math.abs(b1.y-b2.y)<=30){
        return true;
    }
    return false;
}


function update(){
    //move to player
    if(player.moving == true){
        player.x += player.speed;
    }

    //check collision btw corona and player
    for(let i =0 ;i<enemy.length;i++){
        if(isColliding(enemy[i], player)){
            score -= i*100;//if how much the powerfull enemy is the score get decreses more
            if(score<0){
                game_over = true;
                alert("Game Over ");
            }
        }
    }

    //collision btw the gen and player
    if(isColliding(gem,player)){
        game_over = true;
        draw();
        alert("Your Score "+ score);
        //break the game loop

    }


    for(let i = 0; i<enemy.length;i++){
        enemy[i].y += enemy[i].speed;
        if(enemy[i].y>H-enemy[i].h || enemy[i].y<0){
            enemy[i].speed *= -1;
        }
    }

}

function gameloop(){
    //break the game loop when player collids with gem
    if(game_over==true){
        clearInterval(f);//this will stop the setInterval when both(gem and player) collids
        
    }

    draw();
    update();
}
load_img();
init();
var f = setInterval(gameloop, 100);