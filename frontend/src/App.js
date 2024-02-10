import './App.css';
import MainRender from './Pages/MainRender';
import AdminPanel from './Pages/AdminPanel';
import profile from './Components/profile';
import { Routes, Route } from 'react-router-dom';
import ManageOrg from './Pages/ManageOrg';
import Orgprofile from './Pages/Orgprofile';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={MainRender} />
        <Route path='/admin' Component={AdminPanel} />
        <Route path='/profile' Component={profile} />
        <Route path='/manage' Component={ManageOrg} />
        <Route path="/organization/org_2c9B6noA6mdZHjxfwvUMTV3L4MR" Component={Orgprofile} />
      </Routes>
    </div>
  );
}

export default App;
