import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";

const VoiceCommand: React.FC = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript.toLowerCase().includes("stop vm")) {
      axios.post("http://localhost:5000/api/stop-vm", { name: "example-vm" });
    }
  }, [transcript]);

  return (
    <div>
      <button onClick={SpeechRecognition.startListening}>
        {listening ? "Listening..." : "Start Voice Command"}
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default VoiceCommand;
