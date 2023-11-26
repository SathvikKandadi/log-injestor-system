import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Search from './Components/Search/Search';
import Homepage from './Components/Homepage/Homepage';
import Inject from './Components/Inject/Inject';

function App()
{
  return(
    <Router>
      <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/search' element={<Search />} />
      <Route path='/inject' element={<Inject/>} />
      </Routes>
    </Router>
  )
}

export default App;