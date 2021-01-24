import logo from './luna.png';
import './App.css';
import Luna from './luna/luna';

function App() {

  return (
    <header className="App-header">
        <Luna/>
        <img src={logo} alt="" width="40%"/>
    </header>
  );
}

export default App;
