const game=document.querySelector('.game');
const score=document.querySelector('.score');
const startscreen=document.querySelector('.startscreen');
const gamearea=document.querySelector('.gamearea');
const img=document.querySelector('.img');
let player={score: 0};
document.addEventListener('keydown',keyDown); //press a key
document.addEventListener('keyup',keyUp);//leave a key

let keys={ArrowUp:false,ArrowDown:false,ArrowLeft:false,ArrowRight:false}
function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
}
function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
}
function checksafe(car,enemy){
   
    car_r=car.getBoundingClientRect();
    enemy_r=enemy.getBoundingClientRect();
    return  (car_r.right<enemy_r.left) || (car_r.left>enemy_r.right) ||
            (car_r.bottom<enemy_r.top) || (car_r.top>enemy_r.bottom);
    
}
function movelines(){
    let lines=document.querySelectorAll('.lines');
    lines.forEach(function(item,index){
        if(item.y>550){//NU This animates the lines
        item.y-=600; 
        }
        item.y+=2;
        item.style.top=item.y+ "px";
    });
}
function endGame(){
    player.start=false;
    startscreen.classList.remove('hide');//adding hide class
    // gamearea.classList.add('hide');//showing the game area
    // img.classList.add('hide');//showing the background area
    score.classList.remove('hide');
    //clear all the cars lines and enemy
    let lines=document.querySelectorAll('.lines');
    let enemy=document.querySelectorAll('.enemy');
    let car=document.querySelector('.car');
    lines.forEach(function(item){
        gamearea.removeChild(item);
    });
    enemy.forEach(function(item){
        gamearea.removeChild(item);
    });
    gamearea.removeChild(car);
    // lines.remove();
    // enemy.remove();
    // car.remove();

}
function moveEnemy(car){
    let enemy=document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        if(!checksafe(car,item)){
            console.log("GAME OVER!");
            endGame();
        }
        if(item.y>580){//NU This animates the lines
        item.y-=600; 
        item.style.left=Math.floor(Math.random()*350)+"px";//this will ensure less randomness
        }
        item.y+=2;
        item.style.top=item.y+ "px";
        
    });
}

// When we start the screen the game should start
startscreen.addEventListener('click',startGame);
function gamePlay(){
       if(player.start){
        let car=document.querySelector('.car');
        movelines();
        moveEnemy(car);
        let road=gamearea.getBoundingClientRect();//This gives bounding of the road
        movelines();
           if(keys.ArrowUp && player.y-5>=road.top){
               player.y-=5;
           }
           else if(keys.ArrowDown && player.y+5+car.offsetHeight<=road.bottom){
               player.y+=5;
           }
           else if(keys.ArrowLeft && player.x-5>=0){
               player.x-=5;
           }
           else if(keys.ArrowRight && player.x+5+car.offsetWidth<=road.width){
               player.x+=5;
           }
           car.style.top=player.y + "px";//check this syntax
           car.style.left=player.x + "px";
           window.requestAnimationFrame(gamePlay);
           score.innerHTML="score: "+player.score++;
        //    console.log(player.score++);
       }
   }
function startGame(){
    player.start=true;
    player.score=0;
    startscreen.classList.add('hide');//adding hide class
    gamearea.classList.remove('hide');//showing the game area
    img.classList.remove('hide');//showing the background area
    score.classList.remove('hide');
    let car=document.createElement('div');//creating a car
    car.setAttribute('class','car');
    gamearea.appendChild(car);
    // car.innerText="I am car";
    for( x=0;x<5;x++){
        let roadline=document.createElement('div');//Creating the lines
        roadline.setAttribute('class','lines');
        roadline.y=x*150;
        roadline.style.top=x*150+"px";
        gamearea.appendChild(roadline);
    }
    for( x=0;x<3;x++){
        let enymycolors=['#2ECC71','#F39C12','#1F618D'];
        let Enemycar=document.createElement('div');//Creating the Enemy car
        Enemycar.setAttribute('class','enemy');
        Enemycar.style.background=enymycolors[x];
        Enemycar.y=x*150;
        Enemycar.style.top=x*150+"px";
        Enemycar.style.left=Math.floor(Math.random()*350)+"px";//as road width is 400 we need width from 0 to 350
        gamearea.appendChild(Enemycar);
    }
    
    player.x=car.offsetTop;//distance from top
    player.y=car.offsetLeft;//distance from left
    window.requestAnimationFrame(gamePlay);
    
    
}


