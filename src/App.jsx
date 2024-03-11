
//components
import Notes from './components/notes/Notes';
import DataProvider from './context/DataProvider';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import Archives from './components/archives/Archives';
import DeleteNotes from './components/delete/DeleteNotes';



function App() {
  return (
    <DataProvider>

      <Router>
        <Routes>
          <Route path="/" index element={<Signup />} />
          <Route path="/signin" index element={<Signin />} />
          <Route path="/note" index element={<Notes />} />
          <Route path='/archive' element={<Archives />} />
          <Route path='/delete' element={<DeleteNotes />} />
        </Routes>
      </Router>
          </DataProvider>
  );
}

export default App;
