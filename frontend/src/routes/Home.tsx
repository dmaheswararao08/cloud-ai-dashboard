import Dashboard from "../components/Dashboard";
import VoiceCommand from "../components/VoiceCommand";

const Home: React.FC = () => {
  return (
    <div>
      <h3>Dashbord</h3>
      <VoiceCommand />
      <Dashboard />
    </div>
  );
};

export default Home;
