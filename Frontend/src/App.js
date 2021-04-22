import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DrawingRoom from './pages/drawing-room/drawing-room.page';
import CreateLanguage from './components/admin-board/create-language.component';
import CreateWord from './components/admin-board/create-word.component';
import DrawingRoomSettings from './pages/drawing-room/settings/drawing-room-settings.page';
import Home from './pages/home/home.component';

function App() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path={["/", "/create-room"]} component={Home}/>
                <Route exact path={"/:roomId"} component={DrawingRoomSettings}/>
                <Route exact path={"/draw/:roomId"} component={DrawingRoom} />
                <Route exact path={"/admin/create-language"} component={CreateLanguage} />
                <Route exact path={"/admin/create-word"} component={CreateWord} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
