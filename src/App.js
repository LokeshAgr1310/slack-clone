import './App.css';
import Header from './Components/Header'
import SideBar from './Components/SideBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Chat from './Components/Chat'
import Login from './Components/Login'
import { useStateValue } from './StateProvider';

function App() {

  const [{ user }] = useStateValue();

  return (
    <div className="app">

      <Router>
        {!user ? (<Login />) : (
          <>
            <Header />
            <div className="app__body">
              <SideBar />

              <Switch>

                <Route path="/room/:roomId">
                  <Chat />
                </Route>

                <Route path="/">
                  <h1>Welcome</h1>
                </Route>

              </Switch>

            </div>
          </>
        )}

      </Router>

    </div>
  );
}

export default App;
