import LogListen from "./pages/LogListen";
import Collection from "./pages/Collection";
import Stats from "./pages/Stats";
import AddAlbum from "./pages/AddAlbum.jsx"
import {Routes, Route, Link} from 'react-router-dom';

function App(){
  return(
    <div>
      <nav>
        <Link to="/">Collection</Link>
        <Link to="/log">Log a listen</Link>
        <Link to="/stats">Show stats</Link>
        <Link to="/add">Add album</Link>
      </nav>
      <Routes>
        <Route path ="/" element = {<Collection />}></Route>
        <Route path= "/log" element = {<LogListen />}></Route>
        <Route path ="/stats" element = {<Stats />}></Route>
        <Route path ="/add" element = {<AddAlbum />}></Route>
      </Routes>
    </div>
  )
}
export default App;
