const playpause = document.querySelector(".play-pause");
const duration = document.querySelector(".duration");
const foward = document.querySelector(".foward")
const speaker = document.querySelector(".speaker")
const progressBar = document.querySelector(".green-bar");
const track = document.querySelector(".track")

const jsmediatags = window.jsmediatags
let add = document.querySelector(".add-btn").style.display = "none";
let seconds = 0;

let minutes = 0;
let playerSeconds = document.querySelector(".seconds");
let playerMinutes = document.querySelector(".minutes");
let timerInterval;
function clear(){
  seconds = 0;
  minutes = 0;
}


function loadAudio(){
  setTimeout(() => {
    Newaudio.play();
    
    currentPlaying()
  }, 1500);


}
const songName = document.querySelector(".song-name")
const songArtist = document.querySelector(".Artist")
const songAlbum = document.querySelector(".Album")
const songQuality = document.querySelector(".quality")  
const songCover = document.querySelector(".cover")

function setDuration(){
  let duration = document.querySelector(".duration")
  
  duration.innerHTML = "--:--"
      track.innerHTML= ""
    setTimeout(() => {
      duration.innerText = current[0].duration;
      track.innerText = current[0].name.replace(".mp3", "");
      songName.innerText = albumData[current[0].data]?.title || current[0].name.replace(".mp3", "");
      songArtist.innerText = albumData[current[0].data]?.artist || "N/A";
      songQuality.innerText = albumData[current[0].data]?.bitrate ? albumData[current[0].data].bitrate + "kbps" : "N/A";
      songAlbum.innerText = albumData[current[0].data]?.album || "N/A";
      songCover.src= albumData[current[0].data].picture;
      
     
    }, 3000);
    if(typeof duration === "undefined" || duration.innerText === "--:--"){
     Newaudio.pause();
      setTimeout(() => {
        Newaudio.play()
      }, 1500);
    }
    setTimeout(() => {
      safedata()
    }, 3500);
}
function safedata(){
  if(songName.textContent === "undefined"){
    songName.innerText = current[0].name.replace(".mp3", "");
  }else if(songArtist.textContent === "undefined"){
    songArtist.textContent = "N/A"
  }else if(songAlbum.textContent === "undefined"){
    songAlbum.textContent = "N/A"
  }
}

speaker.addEventListener("click",()=>{
  if (Newaudio.volume === 0 ) {
    Newaudio.volume = 1;
    speaker.innerHTML="<i class='fa-solid fa-volume-high'></i>";
  } else {
    Newaudio.volume = 0;
    speaker.innerHTML="<i class='fa-solid fa-volume-xmark'></i>";
  }
});

const Newaudio = new Audio();

  const newFiles = [];

  function shuffletrack() {
    const musicFiles = document.querySelectorAll('.music-file');
    musicFiles.forEach((file, index) => {
      file.innerHTML = newFiles[index].name + " ";
      const newDurationFile = document.createElement('a');
      newDurationFile.classList.add('duration-file');
      newDurationFile.innerText = newFiles[index].duration;
      file.appendChild(newDurationFile);
      currentPlaying()
      lastPlayed = []
      current = []
      nextTrack = []
updateCurrent();      
    });
  }//Tracklist


let lastPlayed = []
let current = []

let nextTrack = []

function shuffle() {
 
  for (let i = 0; i < newFiles.length; i++) {
    const randomIndex = Math.floor(Math.random() * newFiles.length);
    const temp = newFiles[i];
    newFiles[i] = newFiles[randomIndex];
    newFiles[randomIndex] = temp;
  
  }
  shuffletrack()
}

function previous(){
 
  Newaudio.pause()
clear()
nextTrack.unshift(current[0])
current.pop()
if (index > 1) {
  index--;
}
let extracted = lastPlayed.pop()
current[0] = extracted
extracted = ""

setTimeout(() => {
  Newaudio.src = current[0].src;
  setDuration()
  Newaudio.load();
updateTimer() 
}, 2000);


loadAudio();



    }


function next(){
  if (!newFiles.includes(newFiles[index])) {
    Newaudio.pause()
    index = 1;
    updateCurrent()
    currentPlaying() 
     }else{

  
  if(current[0] === nextTrack[0]){
nextTrack.shift()
}
  Newaudio.pause()
  clear()
  current.push(nextTrack[0])
  nextTrack.pop()
  lastPlayed.push(current[0])
  current.shift()
  increaseIndex()
  
  nextTrack.push(newFiles[index])

  setTimeout(() => {
  Newaudio.src = current[0].src;
  setDuration()
  Newaudio.load();
updateTimer() 
}, 1000);

loadAudio()
     }
 
   }

function updateCurrent(){

  nextTrack.shift()
  if (newFiles.length > 0){
    current.push(newFiles[0]);
    nextTrack.push(newFiles[1])
    Newaudio.src = current[0].src;
    Newaudio.load();
    Newaudio.addEventListener('loadedmetadata', () => {
      Newaudio.play();

      isNewaudioLoaded = true;
    });
  }
}
let index = 1;
function increaseIndex(){
index++
}

Newaudio.addEventListener("ended",()=>{
  clear()
  if (!newFiles.includes(newFiles[index])) {
    Newaudio.pause()
    index = 1;
    updateCurrent()
    currentPlaying() 
     }else{
      
      setDuration()
 current.push(nextTrack[0])
  nextTrack.pop()
  lastPlayed.push(current[0])
  current.shift()
  increaseIndex()
  nextTrack.push(newFiles[index])

  setTimeout(() => {
  Newaudio.src = current[0].src;
  Newaudio.load();
 }, 1500);


 loadAudio()
     }
 

 
 
 
  clearInterval(timerInterval);


    Newaudio.addEventListener("canplay", function() {
      Newaudio.play(); // Play the new audio source
    });


    timerInterval = setInterval(updateTimer, 995);
   setTimeout(() => {
    clear();
    setDuration()
        
   }, 2000);
 
    

  
 


})






////formatear y barra de duracion



function formatDuration(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
function updateTimer() {
  playerMinutes.innerText = minutes.toString().padStart(2, "0");
  playerSeconds.innerText = seconds.toString().padStart(2, "0");

  seconds++;

  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }

  const progress = Newaudio.currentTime / Newaudio.duration;
  const progressBarWidth = progress * 100;
  progressBar.style.width = `${progressBarWidth}%`;




}
//////reproduccion
let albumData = []


function currentPlaying() {
  const musicListed = document.querySelectorAll(".music-file");
  const currentSample = current[0].name;
  for (let i = 0; i < musicListed.length; i++) {
    const index = musicListed[i].textContent.indexOf(currentSample);
    if (index >= 0) {
      musicListed[i].classList.add("active");
    } else {
      musicListed[i].classList.remove("active");
    }
  }
}
let totalFiles = 0;

function create_playlist(files){
  const playlist = document.querySelector('.playlist');
  let data = newFiles.length - 1;
  
  for(let i = 0; i < files.length; i++){
    const file = files[i];
    data = newFiles.length - 1;
    const music = document.createElement("li");
    music.classList.add("music-file")
    const trackDuration = document.createElement("a")
    const musicName = document.createTextNode(file.name);
    const tracklist = document.querySelector(".track-list")
   
    tracklist.appendChild(music)
    trackDuration.classList.add(".duration-file")
    
    music.appendChild(musicName);
    music.appendChild(trackDuration) 
    playlist.appendChild(music);
    data++;
    let audio = new Audio();
    bitrate = null;
    audio.addEventListener("loadedmetadata", () => {
      jsmediatags.read(file, {
        
        onSuccess: function(tag) {
          console.log(tag);
             const fileSizeInKb = file.size / 1024;
          const durationInSeconds = parseInt(audio.duration);
         bitrate = Math.round((fileSizeInKb * 8) / durationInSeconds);
       
          const { artist, title, album, picture} = tag.tags;
          
          const blob = new Blob([picture.data], { type: picture.format });
          const objectURL = window.URL.createObjectURL(blob);
          
          albumData[i] = { artist, title, album, picture: objectURL, bitrate: bitrate };
          file.duration = audio.duration;
          const duration = formatDuration(audio.duration);
          const musicDuration = document.createTextNode(` (${duration})`);
          trackDuration.appendChild(musicDuration);
          newFiles[i].duration = duration;
        
       
         
        
        }, 
        onError: function(error){
          console.log(error);
        }   
      });
    });

    audio.src = URL.createObjectURL(file);
    const newFile = {name: file.name, src: audio.src, data: data};
    newFiles[i] = newFile;
    data++;

    clear();
  }
{
    totalFiles += files.length; 
  }
 lastPlayed = []
current = []
nextTrack = []

  updateCurrent()
  setTimeout(() => {
    setDuration()
  currentPlaying()
   }, 2000); 
   timerInterval = setInterval(updateTimer, 995);
}
document.body.addEventListener("keypress", (e) => {
  if (e.key === " ") {
    playpause.focus();
    e.preventDefault();
  } else if (e.key === "m" || e.key === "M") {
    Newaudio.muted = !Newaudio.muted;
    e.preventDefault();
    if (Newaudio.muted) {
      speaker.innerHTML = "<i class='fa-solid fa-volume-xmark'></i>";
    } else {
      speaker.innerHTML = "<i class='fa-solid fa-volume-high'></i>";
    }
  }
});

playpause.addEventListener("keypress", (e) => {
  if (e.key === " ") {
    if (Newaudio.paused) {
      Newaudio.play();
  
      timerInterval = setInterval(updateTimer, 995);
    } else {
      Newaudio.pause();
      clearInterval(timerInterval);
    }

  }
});

let isNewaudioLoaded = false;



// Teclas especiales
function handleUpDownKeys(e) {
  if (!isNewaudioLoaded) { // audio cargado
    return;
  }

  if (e.key === "ArrowUp") {

    Newaudio.currentTime += 10;
    seconds = Math.floor(Newaudio.currentTime % 60);
minutes = Math.floor(Newaudio.currentTime / 60)
   
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    updateTimer();
      Newaudio.play();
  
  } else if (e.key === "ArrowDown") {
 Newaudio.currentTime -= 10;

 seconds = Math.floor(Newaudio.currentTime % 60);
    
 minutes = Math.floor(Newaudio.currentTime / 60)
  } if (Newaudio.currentTime === 0) {
    Newaudio.currentTime = 0;
    clear();
  }

}

// boton pausa
document.body.addEventListener("keydown", handleUpDownKeys);

playpause.addEventListener("click", () => {
    clearInterval(timerInterval);
  if (Newaudio.paused && newFiles.length > 0) {
    Newaudio.play();
    setDuration();
    timerInterval = setInterval(updateTimer, 995);
  } else {
    Newaudio.pause();
    clearInterval(timerInterval);
  }
});
