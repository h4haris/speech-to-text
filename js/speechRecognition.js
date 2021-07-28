if ("webkitSpeechRecognition" in window) {

  // Speech Recognition Stuff goes here

  console.log("Speech Recognition is Available")
  
  let speechRecognition = new webkitSpeechRecognition();
  
  console.log(speechRecognition)

  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = document.querySelector("#select_dialect").value;

  speechRecognition.onstart = () => {
    // Show the Status Element
    document.querySelector("#status").style.display = "inline";
  };

  speechRecognition.onend = () => {
    // Hide the Status Element
    document.querySelector("#status").style.display = "none";
  };

  speechRecognition.onError = () => {
    // Hide the Status Element
    document.querySelector("#status").style.display = "none";
  };

  let final_transcript = "";

  speechRecognition.onresult = (event) => {
    // Create the interim transcript string locally because we don't want it to persist like final transcript
    let interim_transcript = "";

    // Loop through the results from the speech recognition object.
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }

    // Set the Final franscript and Interim transcript.
    document.querySelector("#final").innerHTML = final_transcript;
    document.querySelector("#interim").innerHTML = interim_transcript;
  };

  document.querySelector("#start").onclick = () => {
    speechRecognition.start();
    enableDisableButtons(true, false);
  };
  document.querySelector("#stop").onclick = () => {
    speechRecognition.stop();
    enableDisableButtons(false, true);
  };

  enableDisableButtons(false, true);

} else {
  console.log("Speech Recognition Not Available")
}

function enableDisableButtons(disableStart, disableStop) {
  document.querySelector("#start").disabled = disableStart;
  document.querySelector("#stop").disabled = disableStop;

  enableDisableSelectors(disableStart);
}

function enableDisableSelectors(disabled) {
  document.querySelector("#select_language").disabled = disabled;
  document.querySelector("#select_dialect").disabled = disabled;
}
