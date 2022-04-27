
char_list = []

function toggle_select(clicked_id){
    var element = document.getElementById(clicked_id);
    element.classList.toggle("selected");
    char_list.push(clicked_id)
    console.log(char_list)
  }

function start_game(){
  char_list.push('outro');
  char_list.unshift('intro');
  playNote()
}

function begin_timer(){
  var element = document.getElementById('menu-container');
  element.classList.toggle("hide");
  var element2 = document.getElementById('loading_box');
  element2.classList.toggle("hide");
  console.log('begin timer')
  setTimeout(() => {
    element2.classList.toggle("flashing-background");
    // last call
  }, 60000);
  

}



var index = 0;
var notes = char_list;
var player = document.getElementById('player');

function playNote() {

  console.log(index)

  if (index >= (char_list.length)) {
    stop();
    begin_timer()
    return;
  }
  var note = char_list[index]; // transform the number to the corresponding note ('1' => 'C')
  if (!note) {
    stop();
    return;
  }
  index++; // when 'playNote' is called the next time, the next note will be played
  player.src = `audio/${note}.m4a`;
  player.play(); // when this ends, the 'ended' event will be fired and 'playNote' will be called
}

function stop () {
  player.removeEventListener('ended', playNote); // the last note has been played, remove the event listener
}

player.addEventListener('ended', playNote); 