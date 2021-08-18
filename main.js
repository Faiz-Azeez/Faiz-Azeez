let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Agar tum sath ho",
    artist: "Arijit singh",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "Audio0.mp3"
  },
    {
    name: "King song",
    artist: "Broke For Free",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "Audio_One.mp3"
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "Audio_Three.mp3"
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "Audio_Two.mp3",
  },
  {
    name: "daspasito",
    artist: "Chad Crouch",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "Audio_four.mp3",
  },
  {
    name: "Thop pir Aao",
    artist: "Hindi",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "audio5.mp3",
  },
  {
    name: "Llal bindi",
    artist: "Hindi",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "audio6.mp3",
  },
  {
    name: "Akul i love u",
    artist: "Hindi",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "audio7.mp3",
  },
  {
    name: "kahab",
    artist: "Hindi",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "audio8.mp3",
  },
  {
    name: "tuje kitina chahne",
    artist: "Arijit singh",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "audio10.mp3",
  },


];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
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
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

var audio, canvas, context, audioctx, analyser, oscillator, freqArr, barHeight, source, colorSelect, canvasC, contextC, grd1, grd2;
var windowWidth, windowHeight, topDiv, vol, myTime;
var bigBars = 0;
var colorStyle = 0;
var pastIndex = 900;
var WIDTH = 1024;
var HEIGHT = 350;
var INTERVAL = 128;//256;
var SAMPLES = 2048;//4096;//1024;//512;//2048; //this is the main thing to change right now
var r = 0;
var g = 0;
var b = 255;
var x = 0;
var currVol = .3;

//1. NEED TO FIX ISSUE OF ONLY BEING ABLE TO PLAY ONE SONG BEFORE THE PROGRAM CRASHES>> FIXED
//2. RESOLVE ISSUE OF SCALING THE BARS BASED ON MAX FREQUENCY>> BECOMES NON-ISSUE IF FFT SIZE IS SAME AS INTERVAL
//3. NEED TO ADD OPTION TO CHOOSE COLOR PALETTE>> DONE
//4. NEED TO ADD VOLUME SLIDER
//5. NEED TO ORGANIZE LAYOUT AND CSS >>DONE
//6. NEED TO MAKE BACKGROUND EFFECTS >>DONE
//7. MAYBE ADD SONGS TO QUEUE? SHUFFLE FROM FOLDER?

function initialize(){
    canvas = document.getElementById("cnv1"); //drawing the canvas
    context = canvas.getContext("2d");
    audio = document.getElementById("audio");
    audio.volume = .3;
    vol = document.getElementById("volumeSlider");
    colorSelect = document.getElementById("colorSelect");
    //audio.src = document.getElementById("audioFile");

    audioctx = new AudioContext(); //setting up audio analyzer to get frequency info
    analyser = audioctx.createAnalyser();
    analyser.fftSize = SAMPLES;

    oscillator = audioctx.createOscillator();
    oscillator.connect(audioctx.destination);

    source = audioctx.createMediaElementSource(audio);
    source.connect(analyser);
    source.connect(audioctx.destination);

    freqArr = new Uint8Array(analyser.frequencyBinCount);

    barHeight = HEIGHT;
    /////////////////////////////////////////////////////////////////////
    canvasC = document.getElementById("circlecnv");
    contextC = canvasC.getContext("2d");

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    canvasC.width = windowWidth;
    canvasC.height = windowHeight;

    var canvasTop = document.getElementById("topcnv");
    var contextTop = canvasTop.getContext("2d");

    canvasTop.width = windowWidth;
    canvasTop.height = 75;

    contextTop.fillStyle = "rgb(" + 128 + "," + 128 + "," + 128 + ")";
    contextTop.fillRect(0,0, windowWidth, 75);

    topDiv = document.getElementById("UI");
    topDiv.onmouseout = function(){myTime = setTimeout(mouseOutUI, 3000)}

    window.requestAnimationFrame(draw);
}

audioFile.onchange = function(){ //plays the user's uploaded audio file when it is uploaded
    audio = document.getElementById("audio");
    var reader = new FileReader();
    reader.onload = function(e){
        audio.src = this.result;
        audio.controls = true;
        audio.crossOrigin = "anonymous";
        //
        /*source = audioctx.createMediaElementSource(audio);
        source.connect(analyser);
        source.connect(audioctx.destination); //from online help*/
        //colorStyle = Math.round(Math.random() * 6); //random color palete if you switch songs
        //
        audio.play();
        audioctx.resume();
    }
    reader.readAsDataURL(this.files[0]);
    window.requestAnimationFrame(draw);
}

function changeColor(){
    if(colorSelect.selectedIndex == 0){
        colorStyle = 0;
    }
    else if(colorSelect.selectedIndex == 1){
        colorStyle = 1;
    }
    else if(colorSelect.selectedIndex == 2){
        colorStyle = 2;
    }
    else if(colorSelect.selectedIndex == 3){
        colorStyle = 3;
    }
    else if(colorSelect.selectedIndex == 4){
        colorStyle = 4;
    }
    else if(colorSelect.selectedIndex == 5){
        colorStyle = 5;
    }
    else{
        colorStyle = 6;
    }
}

/*function maxIndex(arr){ //finds the highest-numbered index with a nonzero value
    var maxIndex = 0;
    for(var i = 1; i < arr.length; i++){
        if(arr[i] != 0){
            maxIndex = i;
        }
    }
    return maxIndex;
}*/

function drawSides(){
    //this is for the circular colors that come in from the sides of the screen
    grd1 = contextC.createRadialGradient(windowWidth/2, windowHeight/2, 800 - (bigBars*40), windowWidth/2, windowHeight/2, 2400);
    if(colorStyle == 0){
        grd1.addColorStop(1,"fuchsia");
        grd1.addColorStop(0,"black"); //ORIGINAL rgb color cycle
    }
    else if(colorStyle == 1){
        grd1.addColorStop(1,"red");
        grd1.addColorStop(0,"black"); //red color gradient depending on height of bar
    }
    else if(colorStyle == 2){
        grd1.addColorStop(1,"orange");
        grd1.addColorStop(0,"black"); //orange color gradient depending on height of bar
    }
    else if(colorStyle == 3){
        grd1.addColorStop(1,"yellow");
        grd1.addColorStop(0,"black"); //yellow color gradient depending on height of bar
    }
    else if(colorStyle == 4){
        grd1.addColorStop(1,"LightGreen");
        grd1.addColorStop(0,"black"); //green color gradient depending on height of bar
    }
    else if(colorStyle == 5){
        grd1.addColorStop(1,"DodgerBlue");
        grd1.addColorStop(0,"black"); //blue color gradient depending on height of bar
    }
    else{
        grd1.addColorStop(1,"fuchsia");
        grd1.addColorStop(0,"black"); //purple color gradient depending on height of bar
    }

    contextC.fillStyle = grd1;
    contextC.fillRect(0,0,windowWidth,windowHeight);
}

function draw(){
    if(!audio.paused){
        bigBars = 0;
        r = 0;
        g = 0;
        b = 255;
        x = 0;
        context.clearRect(0,0,WIDTH, HEIGHT);
        analyser.getByteFrequencyData(freqArr);
        for(var i = 0; i < INTERVAL; i++){
            if(/*i <= 50 &&*/ barHeight >= (240 /* currVol*/)){
                bigBars++;
            }
            //max = 900; //default placeholder
            var num = i;
            barHeight = ((freqArr[num] - 128) * 2) + 2;
            if(barHeight <= 1){
                barHeight = 2;
            }

            r = r + 10; //this is for the color spectrum
            if(r > 255){
                r = 255;
            }
            g = g + 1;
            if(g > 255){
                g = 255;
            }
            b = b - 2;
            if(b < 0){
            b = 0;
            }

            if(colorStyle == 0){
                context.fillStyle = "rgb(" + r + "," + g + "," + b + ")"; //rgb color cycle
            }
            else if(colorStyle == 1){
                context.fillStyle = "rgb(" + ((2/3)*(barHeight)) + "," + (0*(barHeight)) + "," + (0*(barHeight)) + ")"; //red color gradient depending on height of bar
            }
            else if(colorStyle == 2){
                context.fillStyle = "rgb(" + (1*(barHeight)) + "," + (.6*(barHeight)) + "," + (0*(barHeight)) + ")"; //orange color gradient depending on height of bar
            }
            else if(colorStyle == 3){
                context.fillStyle = "rgb(" + (.95*(barHeight)) + "," + (.85*(barHeight)) + "," + (0*(barHeight)) + ")"; //yellow color gradient depending on height of bar
            }
            else if(colorStyle == 4){
                context.fillStyle = "rgb(" + (0*(barHeight)) + "," + ((2/3)*(barHeight)) + "," + (0*(barHeight)) + ")"; //green color gradient depending on height of bar
            }
            else if(colorStyle == 5){
                context.fillStyle = "rgb(" + (.58*(barHeight/10)) + "," + (0*(barHeight)) + "," + (1*(barHeight)) + ")"; //blue color gradient depending on height of bar
            }
            else{
                context.fillStyle = "rgb(" + (1*(barHeight)) + "," + (0*(barHeight)) + "," + (1*(barHeight)) + ")"; //purple color gradient depending on height of bar
            }

            context.fillRect(x, HEIGHT - barHeight, (WIDTH/INTERVAL) - 1 , barHeight);
            x = x + (WIDTH/INTERVAL);
        }
    }

    if(bigBars >= 1){
        drawSides();
    }
    else{
        contextC.clearRect(0,0,windowWidth,windowHeight);
    }
    window.requestAnimationFrame(draw);
}

function mouseOverUI(){
    clearTimeout(myTime);
    UI.style.opacity = 1;
}

function mouseOutUI(){
    clearTimeout(myTime);
    UI.style.opacity = 0;
}

function changeVolume(){
    currVol = (vol.value/100);
    audio.volume = currVol;
}
