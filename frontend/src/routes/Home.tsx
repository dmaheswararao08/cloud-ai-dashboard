import { useState } from "react";
import Dashboard from "../components/Dashboard";
import VoiceCommand from "../components/VoiceCommand";

const Home: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const voiceCommandCallBack = (inputLogs: any) => {
    if (inputLogs.length > 0) {
      setLogs(inputLogs);
    } else {
      setLogs([]);
    }
    console.log("Voice Command", inputLogs);
  };
  return (
    <div>
      <h3>Dashbord</h3>
      <VoiceCommand voiceCommandCallBack={voiceCommandCallBack} />
      <Dashboard showLogs={logs} />
    </div>
  );
};

export default Home;
