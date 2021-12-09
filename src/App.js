import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
//Styles
import './styles/globals.scss';

//Components
import Home from "./components/Home/Home";
import CreateExercise from "./components/CreateExercise/CreateExercise";
import Navbar from "./components/Navbar/Navbar";
import EditExercise from "./components/EditExercise/EditExercise";

function App() {
  return (
    <div className="app">
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create-exercise' element={<CreateExercise />} />
        <Route path='/exercises/:id/edit' element={<EditExercise />} />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
