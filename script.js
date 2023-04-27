const playpause = document.querySelector(".play-pause");
const duration = document.querySelector(".duration");
const foward = document.querySelector(".foward")

const progressBar = document.querySelector(".green-bar");
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
function setDuration(){
  let duration = document.querySelector(".duration")
      duration.innerHTML = ""
      duration.innerText = current[0].duration
}

playpause.addEventListener("click", () => {
  if (Newaudio.paused && newFiles.length > 0) {
    Newaudio.play();
    setDuration();
    timerInterval = setInterval(updateTimer, 995);
  } else {
    Newaudio.pause();
    clearInterval(timerInterval);
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

function next(){
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
 }, 1500);


  setTimeout(() => {
    Newaudio.play();
    currentPlaying()
  }, 1500);
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

 
    });
  }
}
let index = 1;
function increaseIndex(){
  index++
}

Newaudio.addEventListener("ended",()=>{
  clear()
  if(index === newFiles.length){
    Newaudio.pause()
    current.shift()
    index = 1;
    updateCurrent();

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


  setTimeout(() => {
    Newaudio.play();
    currentPlaying()
  }, 1500);
     }
 

 
 
 
  clearInterval(timerInterval);


    Newaudio.addEventListener("canplay", function() {
      Newaudio.play(); // Play the new audio source
    });


    timerInterval = setInterval(updateTimer, 1000);
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

  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }

  const progress = Newaudio.currentTime / Newaudio.duration;
  const progressBarWidth = progress * 100;
  progressBar.style.width = `${progressBarWidth}%`;




}
//////reproduccion
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
  for(let i = 0; i < files.length; i++){
    const file = files[i];
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
 let audio = new Audio();
    audio.addEventListener("loadedmetadata", () => {
      file.duration = audio.duration;
      const duration = formatDuration(audio.duration);
      const musicDuration = document.createTextNode(` (${duration})`);
      trackDuration.appendChild(musicDuration);

      newFiles[i].duration = duration;
    });
    audio.src = URL.createObjectURL(file);

    Newaudio.src = URL.createObjectURL(file)
    const newFile = {name: file.name, src: audio.src};
        newFiles.push(newFile);
  
        clear();
  }{
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
   timerInterval = setInterval(updateTimer, 1000);
}