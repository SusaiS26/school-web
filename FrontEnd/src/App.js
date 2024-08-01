
import './App.css';
import Openscreen from './Openscreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Company from './Company';
import SaveDataComponent from './SaveDataComponent';
import Homepage from './Homepage';
import Tamil from './Tamil';



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route excat path='/' element={<Homepage />} />
          <Route excat path='/open' element={<Openscreen />} />
          <Route excat path='/company' element={<Company />} />
          <Route excat path='/SaveDataComponent' element={<SaveDataComponent />} />
          <Route excat path='/Tamil' element={<Tamil />}></Route>
        </Routes>
      </Router>
    </>

  );
}

export default App;
