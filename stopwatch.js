const minutesLabel = document.getElementById('minutes'); /* we declared it as ID in html*/
const secondsLabel = document.getElementById('seconds'); /* we declared it as ID in html*/
const millisecondsLabel = document.getElementById('milliseconds'); /* we declared it as ID in html*/

const startButton = document.getElementById('startBtn');/* we declared it as ID in html*/
const stopButton = document.getElementById('stopBtn');/* we declared it as ID in html*/
const pauseButton = document.getElementById('pauseBtn');/* we declared it as ID in html*/
const resetButton = document.getElementById('resetBtn');/* we declared it as ID in html*/

const lapList = document.getElementById('laplist');/* we declared it as ID in html*/

/// stopwatch variables

let minutes = 0; /// stopwatch variables
let seconds = 0;/// stopwatch variables
let milliseconds = 0;/// stopwatch variables
let interval;/// stopwatch variables

startButton.addEventListener('click',startTimer); /*function in 25th line*/
stopButton.addEventListener('click',stopTimer); /*function in 32nd line*/
pauseButton.addEventListener('click',pauseTimer); /*function in 40th line*/
resetButton.addEventListener('click',resetTimer); /*function in 45th line*/


function startTimer(){

    interval =  setInterval(updateTimer,10);//10 is timer
    startButton.disabled = true; /*clicking start button should not start the timer from 00:00:00*/

}

function stopTimer(){

    clearInterval(interval);
    addToLapList();
    resetTimerData();
    startButton.disabled = false; //see 28th line. startbutton was permanently disabled. We need to turn it back to normal
}

function pauseTimer(){
    clearInterval(interval);
    startButton.disabled = false;//see 28th line. startbutton was permanently disabled. We need to turn it back to normal
}

function resetTimer(){
    clearInterval(interval);
    resetTimerData();
    startButton.disabled = false;//see 28th line. startbutton was permanently disabled. We need to turn it back to normal

}

function updateTimer(){
    milliseconds++;
    if(milliseconds === 100){  //// 1000  -> 1 seconds = 1000 millseconds. we consider 100 but the time is correct. We are showing uto 2 decimals only
        milliseconds = 0;
        seconds++;
        if(seconds === 60){
            seconds = 0;
            minutes++;
        }
    }

    displayTimer();
}

function displayTimer(){
   millisecondsLabel.textContent = padTime(milliseconds); /*LHS means change milliseconds on display and RHS changes value to 2 digit*/
    secondsLabel.textContent = padTime(seconds); /*LHS means change seconds on display and RHS changes value to 2 digit*/
    minutesLabel.textContent = padTime(minutes);     /*LHS means change minute on display and RHS changes value to 2 digit*/
}

function padTime(time){
    return time.toString().padStart(2,'0'); //2 means 2 digit value. otherwise seconds and minutes will be single digit like 1:1:70. We want 01:01:70*/
} // '0' means that 0 has to be put with any value (preceeded) in order to make it two digit

function resetTimerData(){
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTimer();
}

function addToLapList(){
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
//we used template string character ` ` (above Tab/below Esc key) 
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1}: </span>${lapTime}`;//1) we used template string character ` ` (above Tab/below Esc key). 2) lapList was in 10th line 
    lapList.appendChild(listItem);
}
