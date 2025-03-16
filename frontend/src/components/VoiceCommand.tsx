import { useState } from "react";
import axios from "axios";

const VoiceCommand: React.FC = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  let recognition: SpeechRecognition | null = null;

  if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.continuous = true; // Keep listening after each command
    recognition.lang = "en-IN"; // Set Indian English
    recognition.onresult = (event) => {
      const spokenText =
        event.results[event.results.length - 1][0].transcript.toLowerCase();
      setTranscript(spokenText);
      handleCommand(spokenText);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
  } else {
    console.error("Speech recognition is not supported in this browser.");
  }

  // Handle Voice Commands
  const handleCommand = (command: string) => {
    if (command.includes("stop vm")) {
      axios
        .post("http://localhost:5000/api/stop-vm", { name: "example-vm" })
        .then(() => speak("VM has been stopped successfully"))
        .catch(() => speak("Failed to stop VM"));
    } else {
      speak("command not existied");
    }
  };

  // Start Listening
  const startListening = () => {
    if (!isListening && recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  // Speak Response
  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-IN";
    speech.onend = () => startListening(); // Restart after speaking
    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      <button
        onClick={startListening}
        disabled={isListening}
        style={{
          padding: "10px 15px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: isListening ? "red" : "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        🎤{isListening ? "Listening..." : "Start Voice Command"}
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default VoiceCommand;
