import { useEffect, useState } from "react";
import axios from "axios";
import { baseAPIUrl } from "../config";

interface LogEntry {
  timestamp: string;
  message: string;
}

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [serviceName, setServiceName] = useState(""); // Service Name from Input
  const [searchQuery, setSearchQuery] = useState(""); // Log Filter Query
  const [isListening, setIsListening] = useState(false);

  // Fetch logs based on the service name
  useEffect(() => {
    if (serviceName) {
      axios
        .get<LogEntry[]>(`${baseAPIUrl}/api/logs/${serviceName}`)
        .then((response) => {
          setLogs(response.data);
          speak(`Logs for ${serviceName} fetched successfully.`);
          setFilteredLogs(response.data);
        })
        .catch((error) => console.error("Error fetching logs:", error));
    }
  }, [serviceName]);

  // Filter logs based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = logs.filter((log) =>
        log.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLogs(filtered);
    } else {
      setFilteredLogs(logs);
    }
  }, [searchQuery, logs]);

  // Voice Search Functionality for Service Name
  const startListeningForService = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setServiceName(transcript.trim()); // Set service name from voice input
    };

    recognition.start();
  };

  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-IN";
    window.speechSynthesis.speak(speech);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Service Logs</h3>

      {/* Service Name Input + Voice Search */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Enter Service Name..."
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          style={{ padding: "10px", width: "250px", fontSize: "16px" }}
        />
        <button
          onClick={startListeningForService}
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: isListening ? "red" : "blue",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          🎤 {isListening ? "Listening..." : "Voice Input"}
        </button>
      </div>

      {/* Logs Search Input */}
      {/* <input
        type="text"
        placeholder="Search logs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: "10px", width: "100%", fontSize: "16px", marginBottom: "15px" }}
      /> */}

      {/* Logs Display */}
      <pre style={{ border: "1px solid gray", padding: "10px", maxHeight: "300px", overflowY: "auto" }}>
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log, index) => (
            <div key={index}>
              [{log.timestamp}] {log.message}
            </div>
          ))
        ) : (
          <p>No logs found.</p>
        )}
      </pre>
    </div>
  );
};

export default Logs;
