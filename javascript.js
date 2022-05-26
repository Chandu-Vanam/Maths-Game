var playing=false;
var score;
var action;
var timeremain;
var correctans;
// // // //if we click on the start/reset 
document.getElementById("start-reset").onclick=
function()
{
    // if we are playing 
    if(playing==true)
    {
        // reload page 
        location.reload();  
    }
    else     
    {
        // we are not playing 
        
        // change mode to playing
        playing=true;
        
        // set score to zero
        score=0;      
        document.getElementById("score-value").innerHTML=score;
        
        // show countdown box 
        show("time-remaining");
        timeremain=60; //when we start we get 60sec
        
        document.getElementById("time-value").innerHTML=timeremain;

        //hide gameover box
        hide("game-over");

        // change button to reset 
        document.getElementById("start-reset").innerHTML="Reset Game";
        

        // reduce time by one sec in loops
        startcountdown(); 

        //generate a new question ans mutliple answers
        generateQA();

    }
}

// if we click on answer box 
for(i=1;i<5;i++)
{
    document.getElementById("box"+i).onclick=function(){
        // if we are playing 
        if(playing==true)
        {
            if(this.innerHTML==correctans)
            {
                //correct
                // increase the Score by 1 
                score+=1;
                document.getElementById("score-value").innerHTML=score;
    
                //hide wrong box
                hide("wrong");
                show("correct");
    
                setTimeout(function(){
                    hide("correct");
                },1000);

                //if corrct ans generate new question
                generateQA();
            }
            else
            {
                //wrong
                // show tryagain 
                hide("correct");
                show("wrong");
    
                setTimeout(function(){
                    hide("wrong");
                },1000);
            }
        }
    }
}

// also correct box for 1 sec 
// generate a new question 
// if ans is wrong 
//functions

//start countdowm
function startcountdown(){
    action=setInterval(function(){
        timeremain-=1;
        
        // we show the try again box for 1 sec 
        document.getElementById("time-value").innerHTML=timeremain;
        
        if(timeremain==0)
        {
            //game over box
            stopcountdown();
            show("game-over");  
            document.getElementById("game-over").innerHTML="<p>game over!</p>  <p>your score is " + score + "</p>";
            
          hide("time-remaining");

          hide("correct");

          hide("wrong");

         playing=false;

         document.getElementById("start-reset").innerHTML="Start Game";

        }
    },1000)
}

//stopcountdowm 
function stopcountdown(){
    clearInterval(action);
}

//hide elements
function hide(id){
    document.getElementById(id).style.display="none";
}
 //show an element
function show(id){
    document.getElementById(id).style.display="block";
}

//generate question ans multiple answers
function generateQA()
{
    var x=1+Math.round(9*Math.random());
    var y=1+Math.round(9*Math.random());

    correctans=x*y;

    document.getElementById("question").innerHTML=
    x + " x " + y;

    var correctposition=1+Math.round(3*Math.random());

    //fill one box with corrct answer
    document.getElementById("box"+correctposition).innerHTML=correctans;

    var answers=[correctans];
    //other box with wrong ans
    for(i=1;i<5;i++){
        if(i!=correctposition)
        {
            //wrong ans
            var wrongans;
            do
            {
                wrongans=(1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
            }while(answers.indexOf(wrongans)>-1)

            document.getElementById("box"+i).innerHTML=wrongans;

            answers.push(wrongans);
        }
    }
}