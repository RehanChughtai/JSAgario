'use strict';
//Task 1
//Returns Student ID
function id() {
  return "UP837518";
}

//Task 2
function updateLeaderBoard(playerNames, me) {
  //Retrieves top10 from library
  const top10 = document.getElementById("top10");
  while (top10.firstChild) {
    top10.removeChild(top10.firstChild);
    //Removes last person on leaderboard, when leaderboard is updated
  }
  const maxCount = Math.min(playerNames.length, 10);
  //Shows top 10 on leaderboard
  for (let i = maxCount - 1; i >= 0 ; i--) {
    const li = document.createElement("li");
    const name = document.createTextNode(playerNames[i]);
    li.appendChild(name);
    if (playerNames[i] === me) {
      li.className = "myself";
    }
    top10.insertBefore(li, top10.childNodes[0]);
    //When Name is entered are play is clicked,
    //Name enters top of the leaderboard
  }
}

//Task 3
function nickChanged(event){
  //Calls nick from library
  const nick = window.nick.value;
  document.getElementById("playername").textContent = nick;
  //Displays playername
  event.stopPropagation();
  //Allows use of p in name input, even though p is a hotkey.

}
//Intiation Function
function init() {

  window.nick.addEventListener("input", nickChanged);
  window.nick.addEventListener("keydown", nickChanged);
  //Allows input when p window appears.

  document.getElementById('c1').addEventListener('click',function (e) {
    //Colour starts at first colour in colour array, adds on by one every click.
    color_index+=1;
    //Colour is grouped to 4. Every 4 clicks it will return to start of array.
    color_index=color_index % 4;
  });

  document.getElementById('play').addEventListener('click',function (e) {

    const newPlayer = window.nick.value;

    const count = window.top10.children.length;
    const names = new Array(count);

    names[0] = newPlayer;
    //Adds newPlayer added to top of the leaderboard

    for(let i=0; i<count-1; i++)
    {
       names[i+1] = window.top10.children[i].textContent;
       //Displays new player on leaderboard
    }

    window.player.classList.toggle("hidden");

    updateLeaderBoard(names, newPlayer);

  });

}
//Task 4
//Used scalerange from lib.js to update the scalerange
function updateStep(){
  step = parseInt(window.scalerange.value);
}

//Task 5
// code as given, Please add a explanation to help my understanding.
function leaders(count) {

  if (count > window.top10.children.length)
  //Retrieved window.top10.children.length from lib.js
  {
    count = window.top10.children.length;
  }
  const names = new Array(count);
  //Created new array
  for(let i=0; i<count; i++)
  {
     names[i] = window.top10.children[i].textContent;
     //put i variable in constant to view content of top10 leaderboard
  }
  return names;
}

// Initated a 2 new variables, to call colours array in lib.js
  let color_index=0;

//This function was copied from lib.js to make task 6 work.
  function mouseMoved(e) {
    // position of the pointer within the canvas
    pointer.x = (e.pageX - canvas.offsetLeft);
    pointer.y = (e.pageY - canvas.offsetTop);
    // position of the pointer relative to the centre of the canvas
    pointer.xOffset = pointer.x-halfWidth;
    pointer.yOffset = pointer.y-halfHeight;
    // TODO calulate angle and unit vector radius
    // based on mouse.xOffset and mouse.yOffset .
    pointer.radius =
    Math.min(
      Math.sqrt(
        Math.pow(pointer.xOffset,2) +
        Math.pow(pointer.yOffset,2)
      ),
      limitOfAcceleration
    ) / limitOfAcceleration * step;
    pointer.angle = Math.atan2(pointer.yOffset,pointer.xOffset).toFixed(3);
    //Task 6
    //New variable created, Rounded number to avoid decimals.
    let degree=Math.round(pointer.angle*180/Math.PI);
    if (degree<0)
      degree=degree+360;
    //If number is below 0, 360 will show instead of negative numbers
    pointer.degrees=degree;
    redraw();
  }
//Task 7
  function drawUserPos(){
      const xPos = halfWidth;
      const yPos = halfHeight;
      context.beginPath();
      context.arc(xPos, yPos,step, 0, 2 * Math.PI, false);
      //Create Circle
      context.fillStyle = colours[color_index];
      //Fill circle with colour array from lib.js
      context.fill();
      //Fill circle with colour
  }

  function drawPointerPos(){
          const xPos = pointer.x;
          const yPos = pointer.y;
          context.beginPath();
          context.arc(xPos, yPos,pointer.radius/step*50, 0, 2 * Math.PI, false);
          context.strokeStyle='black';
          context.stroke();
          //Make outline of pointer black
  }

window.addEventListener("load", init);
