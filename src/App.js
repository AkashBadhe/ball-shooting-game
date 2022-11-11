
import './App.css';
import Game from './components/Game';

function App() {

  const TOTAL_ITEMS = 8;
  // Total number circles.

  return (
    <div className="App">
      <Game targetCount={TOTAL_ITEMS} />
    </div>
  );
}

export default App;
