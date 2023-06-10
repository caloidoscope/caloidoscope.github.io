const SANITY_QUERY = encodeURIComponent(
    `*[_type == "pages" && id == "main"][0]{
        ...,
        packages[]->,
        testimonials[]->,  
        arrangements[]->{..., "songs": songs[]{title,artist,"url":audioFile.asset->url, "videoUrl":link, isAudioOnly}},
        vocalists[]->{..., "image":image.asset->, "songs": songs[]{title,artist,"url":audioFile.asset->url}},
    }`)
    const SANITY_API_ENDPOINT = `https://y5r9a40r.api.sanity.io/v2021-10-21/data/query/production?query=${SANITY_QUERY}`

//VIDEO JS
function changeVideo (src, index) {
    src = getVideoId(src);
    $(".video-container iframe").remove();
    $('<iframe width="420" height="315" frameborder="0" allowfullscreen frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>')
        .attr("src", (src.indexOf("https://www.youtube.com/embed/")>-1? "" : "https://www.youtube.com/embed/")+src+ "?autoplay=1")
        .appendTo(".video-container");        
    $("html, body").animate({ scrollTop: 0 }, "slow");
    if (index || index>-1){
        document.getElementsByClassName('song-active')[0].classList.remove('song-active');
        document.getElementById('song-'+index).classList.add('song-active');
    }
}
function getVideoId(src){
    src = src.replace('https://youtu.be/', '');
    src = src.replace('https://www.youtube.com/watch?v=','')
    return src
}
function stopVideo(){
    changeVideo('')
}
window.addEventListener('DOMContentLoaded', event => {

    

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible || !navbarCollapsible.classList.contains("home-nav")) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

//AUDIO JS
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
// const durTime = document.querySelector('#durTime');

// Song titles
let songs = ['hey', 'summer', 'ukulele'];
let dir = "";

// Keep rtack of song
let songIndex = 0;
let isSanity = false;

// // Initially load song details into DOM
// loadSong(songs[songIndex]);

function resetIndex(){
	songIndex = 0;
}

function initSongs (selectedDir, selectedSongs){
	dir = selectedDir;
	songs = selectedSongs;
	loadSong(songs[songIndex]);
}

function initSongsSanity(_songs){
	songs = _songs;
	isSanity = true
	loadSong(songs[songIndex]);
}
// Update song details
function loadSong(song) {
	if (isSanity){
		title.innerText = song.title + " - " + song.artist;
		audio.src = song.url;
		cover.src = '../../assets/songs/img/logo.png';
		songIndex = songs.map(_song=>_song.title).indexOf(song.title);
	}
	else {
		if (typeof song === "object") {
			title.innerText = song.title + " - " + song.artist;
			audio.src = `../../assets/songs/audio/${dir}/${song.file}`;
			cover.src = '../../assets/songs/img/logo.png';
			songIndex = songs.map(_song=>_song.title).indexOf(song.title);
		}
		else {
			title.innerText = song;
			audio.src = `../../assets/songs/audio/${dir}/${song}.mp3`;
			cover.src = '../../assets/songs/img/logo.png';
			songIndex = songs.indexOf(song);
		}
	}
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('svg.ap').classList.remove('fa-play');
  playBtn.querySelector('svg.ap').classList.add('fa-pause');
  audio.play();
  audio.muted = false;
  document.getElementsByClassName('song-active')[0].classList.remove('song-active');
  document.getElementById('song-'+songIndex).classList.add('song-active');
}

// Pause songs
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('svg.ap').classList.add('fa-play');
  playBtn.querySelector('svg.ap').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	// get_sec_d (duration);

	// change duration DOM
	// durTime.innerHTML = min_d +':'+ sec_d;
		
};

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);
