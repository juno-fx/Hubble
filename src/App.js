import {Navbar, Row, Col} from "react-bootstrap";
import hubble from './hubble.png';
import luna from './luna.png';
import './App.css';
import Luna from './luna/luna';

function App() {

    return (
        <>
            <Navbar>
                <Navbar.Brand>
                    <img src={hubble} alt="" width="5%"/>
                </Navbar.Brand>
            </Navbar>
            <header className="App-header">
                <Luna/>
                <img src={luna} alt="" width="40%"/>
            </header>
        </>
    );
}

export default App;
