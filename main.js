let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let pre_btn = document.querySelector(".pre-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let current_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let current_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "This is My",
    artist: "Ady Suleiman",
    image: "1.jpg",
    path: "1.mp3"
  },
  {
    name: "State of Mind",
    artist: "Ady Suliman",
    image: "1.jpg",
    path: "2.mp3"
  },
  {
    name: "Rollin (Feat. Future, Khalid)",
    artist: "Calvin Harris",
    image: "2.jpg",
    path: "3.mp3",
  },
  {
    name: "Heatstroke (feat. Young Thug, Pharrell Williams & Ariana Grande)",
    artist: "Calvin Harris",
    image: "2.jpg",
    path: "1-3.mp3",
  },
  {
    name: "Cash Out (ft. ScHoolboy Q, PARTYNEXTDOOR & DRAM)",
    artist: "Calvin Harris",
    image: "2.jpg",
    path: "1-2.mp3",
  },
  {
    name: "Slide (feat. Frank Ocean & Migos)",
    artist: "Calvin Harris",
    image: "2.jpg",
    path: "1-1.mp3",
  },
  {
    name: "Prayers Up (feat.Travis Scott & A-Trak)",
    artist: "Calvin Harris",
    image: "2.jpg",
    path: "1-5.mp3",
  },
  {
    name: "Holiday (feat. Snoop Dogg, John Legend, & Take off)",
    artist: "Calvin Harris",
    image: "2.jpg",
    path: "1-6.mp3",
  },  
  {
    name: "Skrt on Me (feat. Nicki Minaj)",
    artist: "Calvin Harris",
    image: "2.jpg",
    path: "1-7.mp3",
  },
  {
    name: "Feels (feat. Pharrell Williams, Katy Perry, & Big Sean)",
    artist: "Calvin Harris",
    image: "2.jpg",
    path: "1-8.mp3",
  },
  {
    name: "Faking it (feat. Kehlani & Lil Yachty)",
    artist: "Calvin Harris",
    image: "2.jpg",
    path: "1-9.mp3",
  },
  {
    name: "Hard to Love (feat. Jessie Reyez)",
    artist: "Calvin Harris",
    image: "2.jpg",
    path: "1-10.mp3",
  },
];


function bgchanger(track_index){
  if(track_index>1 && track_index<12){
      document.getElementById('bgch').style.backgroundImage = "url(\"2.jpg\")"; 
      document.getElementById('colorch').style.filter = 'none';
      document.getElementById('colorch').style.color = 'antiquewhite';
      document.getElementById('button_colorch').style.filter ='none';
      document.getElementById('button_colorch').style.color ='antiquewhite';
      document.getElementById('time_colorch').style.filter = 'none';
      document.getElementById('time_colorch').style.color = 'antiquewhite';
      document.getElementById('volume_colorch').style.filter = 'none';
      document.getElementById('volume_colorch').style.color = 'antiquewhite';
    }
  else{
    document.getElementById('bgch').style.backgroundImage = "url(\"1.jpg\")";

    document.getElementById('colorch').style.color = 'rgb(247,247,247)';
    document.getElementById('button_colorch').style.color ='rgb(247,247,247)';
    document.getElementById('time_colorch').style.color = 'rgb(247,247,247)';
    document.getElementById('volume_colorch').style.color = 'rgb(247,247,247)';

  }
  
}




function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  current_track.src = track_list[track_index].path;
  current_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;

  updateTimer = setInterval(seekUpdate, 1000);
  current_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  current_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  current_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  current_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  bgchanger(track_index);
  loadTrack(track_index);
  playTrack();
}

function preTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  bgchanger(track_index);
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = current_track.duration * (seek_slider.value / 100);
  current_track.currentTime = seekto;
}

function setVolume() {
  current_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(current_track.duration)) {
    seekPosition = current_track.currentTime * (100 / current_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(current_track.currentTime / 60);
    let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(current_track.duration / 60);
    let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    current_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


