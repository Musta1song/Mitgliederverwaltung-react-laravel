import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MemberList from './components/MemberList/MemberList';
import StartPage from './components/Startpage/StartPage';
import AddMember from './components/AddMember/AddMember';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar></Navbar>
      </header>
      <BrowserRouter>
      <Routes>
          <Route index element={<StartPage />} />
          <Route path="/list" element={<MemberList />} />
          <Route path="/add" element={<AddMember />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
