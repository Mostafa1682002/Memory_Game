let starGame=document.querySelector(".contorl-button button");
    username=document.querySelector(".container-info .name span");
    hour=document.querySelector(".hour"),
    minute=document.querySelector(".minute"),
    second=document.querySelector(".second"),
    tries=document.querySelector(".container-info .tries span"),
    allBox=document.querySelectorAll(".cont-game .game-block"),
    contGame=document.querySelector(".cont-game"),
    resultGame=document.querySelector('.result-game'),
    statePlayer=document.querySelector('.result-game .state'),
    againPlay=document.querySelector('.again');

let time=2*60*1000;
let h,m,s,staTime,
    duration=1000,
    number=0;
window.onload=function(){
    showtime();
    starGame.onclick=function(){
        let yorName=prompt("Enter your Name");
        if(yorName==""|| yorName==null){
            username.innerHTML=` Unknown`;
        }else{
            username.innerHTML=` ${yorName}`;
        }
        starGame.parentElement.classList.add('hide');
        startTimer();
        staTime=setInterval(startTimer,duration);
        
    }
}

let orderRange=[...Array(allBox.length).keys()];


//Function shuffle
function shuffle(array){
    let curent=array.length,
    temp,
    random;
    while(curent>0){
        random=Math.floor(Math.random()*curent);
        curent--;
        temp=array[curent];
        array[curent]=array[random];
        array[random]=temp;
    }
    return array;
}
let shuffleOrder=shuffle(orderRange);

allBox.forEach((block,index)=>{
    //Add Css order Properity
    block.style.order=orderRange[index];
    //Add Css Flip To Block
    block.addEventListener("click",function(){
        flipBlock(block);
    })
})


// Flip Block Function
function flipBlock(blockSelected){
    //add class flip to block
    blockSelected.classList.add("flip");
    ///
    let allflipBlocks=Array.from(allBox).filter((
        block)=>block.classList.contains('flip'));
    //if there checked two block
    if(allflipBlocks.length===2){
        //stop click function
        stopClicking();
        //Check Matched Block function
        ismatch(allflipBlocks[0],allflipBlocks[1]);
    }
}

//stop click function
function stopClicking(){
    //add class no clicing
    contGame.classList.add('no-clicking');
    //remove class no clicking after 1 second
    setTimeout(()=>{
        contGame.classList.remove('no-clicking');
    },duration)
}

//Check Matched Block function
function ismatch(frist,second){
    if(frist.dataset.tec===second.dataset.tec){
        frist.classList.remove("flip");
        second.classList.remove("flip");
        frist.classList.add("is-match");
        second.classList.add("is-match");
        document.querySelector('.win').play();
        number+=1;
        if(number==(orderRange.length/2)){
            showResult('Congratolation',true);
        }
    }else{
        tries.innerHTML=parseInt(tries.innerHTML)+1;
        document.querySelector('.loss').play();
        setTimeout(function(){
            frist.classList.remove("flip");
            second.classList.remove("flip");
        },duration)
        
    }
}

//Function Timer
function startTimer(){
    if(time>0){
        time-=1000;
        showtime();
    }else{
        clearInterval(staTime);
        showResult('Game Over',false);
        contGame.classList.add("no-clicking");
    }
}
function showtime(){
    h=parseInt(time%(24*60*60*1000)/(60*60*1000));
    m=parseInt(time%(60*60*1000)/(60*1000));
    s=parseInt(time%(60*1000)/(1000));
    hour.innerHTML=h<10?`0${h}`:h;
    minute.innerHTML=m<10?`0${m}`:m;
    second.innerHTML=s<10?`0${s}`:s;
}

//Function Show Result
function showResult(result,sound){
    resultGame.classList.add('show');
    clearInterval(staTime);
    statePlayer.innerHTML=` ${result} ! <br>The Number Of Tries : <span>${tries.innerHTML}</span>`
    if(sound){
        document.querySelector('.congr').play();
    }else{
        document.querySelector('.gameov').play();
    }
}
againPlay.addEventListener('click',()=>{
    window.location.reload();
})