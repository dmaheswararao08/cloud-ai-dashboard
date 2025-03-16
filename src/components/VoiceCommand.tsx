import { useEffect, useState } from "react";
import axios from "axios";

const VoiceCommand: React.FC = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  useEffect(() => {
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.toLowerCase();
      setTranscript(spokenText);
      handleCommand(spokenText);
    };
    recognition.onend = () => setListening(false);
  }, []);

  const handleCommand = (command: string) => {
    if (command.includes("stop vm")) {
      axios.post("http://localhost:5000/api/stop-vm", { name: "example-vm" })
        .then(() => speak("VM has been stopped successfully"))
        .catch(() => speak("Failed to stop VM"));
    }
  };

  const startListening = () => {
    setListening(true);
    recognition.start();
  };

  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      <button onClick={startListening} disabled={listening}>
        {listening ? "Listening..." : "Start Voice Command"}
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default VoiceCommand;
