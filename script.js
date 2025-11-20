//your JS code here. If required.
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
      const audio = new Audio(`sounds/${soundName}.mp3`);
      
      // Store reference to current audio
      currentAudio = audio;
      
      // Add playing class to button
      buttonElement.classList.add('playing');
      
      // Play the audio
      audio.play();
      
      // Remove playing class when audio ends
      audio.addEventListener('ended', function() {
        buttonElement.classList.remove('playing');
        currentAudio = null;
      });
      
      // Handle errors (in case audio file doesn't exist)
      audio.addEventListener('error', function() {
        console.error(`Could not load sound: ${soundName}.mp3`);
        buttonElement.classList.remove('playing');
        currentAudio = null;
      });
    }

    function stopAllSounds() {
      // Stop current audio if playing
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
      }
      
      // Remove playing class from all buttons
      buttons.forEach(btn => {
        btn.classList.remove('playing');
      });
    }