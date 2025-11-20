// Get all buttons
const buttons = document.querySelectorAll('.btn');

// Store currently playing audio
let currentAudio = null;

// Add click event to each button
buttons.forEach(button => {
  button.addEventListener('click', function() {
    const soundName = this.getAttribute('data-sound');
    
    // If stop button is clicked
    if (soundName === 'stop') {
      stopAllSounds();
      return;
    }
    
    // Stop any currently playing sound
    stopAllSounds();
    
    // Play the selected sound
    playSound(soundName, this);
  });
});

function playSound(soundName, buttonElement) {
  // Create audio element
  const audio = document.createElement('audio');
  audio.src = `sounds/${soundName}.mp3`;
  
  // Add audio element to the DOM so tests can find it
  document.body.appendChild(audio);
  
  // Store reference to current audio
  currentAudio = audio;
  
  // Add playing class to button
  buttonElement.classList.add('playing');
  
  // Play the audio
  audio.play();
  
  // Remove playing class and audio element when audio ends
  audio.addEventListener('ended', function() {
    buttonElement.classList.remove('playing');
    if (audio.parentNode) {
      document.body.removeChild(audio);
    }
    currentAudio = null;
  });
  
  // Handle errors (in case audio file doesn't exist)
  audio.addEventListener('error', function() {
    console.error(`Could not load sound: ${soundName}.mp3`);
    buttonElement.classList.remove('playing');
    if (audio.parentNode) {
      document.body.removeChild(audio);
    }
    currentAudio = null;
  });
}

function stopAllSounds() {
  // Stop current audio if playing
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    
    // Remove audio element from DOM
    if (currentAudio.parentNode) {
      document.body.removeChild(currentAudio);
    }
    
    currentAudio = null;
  }
  
  // Remove playing class from all buttons
  buttons.forEach(btn => {
    btn.classList.remove('playing');
  });
}