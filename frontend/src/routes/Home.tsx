import Dashboard from "../components/Dashboard";
import VoiceCommand from "../components/VoiceCommand";

const Home: React.FC = () => {
  return (
    <div>
      <h1>AI-Powered Cloud Management</h1>
      <VoiceCommand />
      <Dashboard />
    </div>
  );
};

export default Home;
