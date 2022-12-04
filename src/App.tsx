import "./app.scss";
import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";
const App = () => {
  return (
    <div className="App">
      <Header />
      <MainContent />
    </div>
  );
};

export default App;
