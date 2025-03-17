import { useState } from "react";
import axios from "axios";
import { baseAPIUrl } from "../config";

interface LogEntry {
  timestamp: string;
  message: string;
}

interface VoiceCommandProps {
  voiceCommandCallBack: (logs: LogEntry[]) => void;
}

const VoiceCommand: React.FC<VoiceCommandProps> = ({ voiceCommandCallBack }) => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  let recognition: SpeechRecognition | null = null;
  let stopTimer: NodeJS.Timeout;

  if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const spokenText = event.results[event.results.length - 1][0].transcript.toLowerCase();
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
        .post(baseAPIUrl+"/api/stop-vm", { name: "example-vm" })
        .then(() => speak("VM has been stopped successfully"))
        .catch(() => speak("Failed to stop VM"));
    } else if (command.includes("logs")) {
      let serviceName = command.split("logs for")[1].trim();
      console.log("Fetching logs for:", serviceName);
      axios
        .get<LogEntry[]>(`${baseAPIUrl}/api/logs/${serviceName}`)
        .then((response) => {
          setLogs(response.data);
          speak("fetching logs successfully for " + serviceName);
          voiceCommandCallBack(response.data);
        })
        .catch((error) => {
          speak("Error fetching logs");
          console.error("Error fetching logs:", error)});
    } else {
      speak("Command not recognized");
    }
  };

  // Start Listening (Stops after 6 seconds)
  const startListening = () => {
    if (!isListening && recognition) {
      recognition.start();
      setIsListening(true);

      stopTimer = setTimeout(() => {
        stopListening();
      }, 6000);
    }
  };

  // Stop Listening
  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      clearTimeout(stopTimer);
    }
  };

  // Speak Response
  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-IN";
    speech.onend = () => startListening();
    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      {/* Start Button */}
      {!isListening ? (
        <button
          onClick={startListening}
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          🎤 Start Voice Command
        </button>
      ) : (
        // Stop Button
        <button
          onClick={stopListening}
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          ⏹ Stop Listening
        </button>
      )}

      <p>{transcript}</p>
    </div>
  );
};

export default VoiceCommand;
