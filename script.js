
char_list = []

function toggle_select(clicked_id){
    var element = document.getElementById(clicked_id);
    element.classList.toggle("selected");
    char_list.includes(clicked_id) ? char_list.pop(clicked_id) : char_list.push(clicked_id);
  }

function start_game(){
  var element = document.getElementById('menu-container');
  element.classList.toggle("hide");
  var element2 = document.getElementById('loading_box');
  element2.classList.toggle("hide");
  char_list.push('outro');
  char_list.unshift('intro');
  playNote()
}

function begin_timer(){
  setTimeout(() => {
    var element2 = document.getElementById('loading_box');
    element2.classList.toggle("flashing-background");
    // last call
    index = 0;
    char_list = ['last'];
    playNote()
    end_game()
  }, 600000);
}

function end_game() {
  setTimeout(() => {
    location.reload()
    var element = document.getElementById('menu-container');
    element.classList.toggle("hide");
    var element2 = document.getElementById('loading_box');
    element2.classList.toggle("hide");
    element2.classList.toggle("flashing-background");
    // reset variables
    index = 0;
    char_list = [];
  }, 62500);
}


var index = 0;
var notes = char_list;
var player = document.getElementById('player');

function playNote() {

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