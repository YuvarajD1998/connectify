 
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Alert from '@mui/material/Alert';


function App() {
  const { user } = useContext(AuthContext);

  function Redirect({ to }) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
    return null;
  }
  
  return (<>
  
  <BrowserRouter>
  <Routes>
    <Route path='/'  element={user?<Home/>:<Redirect to='/login'/>} />
    <Route path='/register' element={<Register/>} />
    {/* <Route path='/login' element={<Login/>} /> */}


    <Route
    path="/login"
    element={user?<Redirect to="/" />:<Login />}
  />
    <Route path='/profile/:username' element={<Profile/>} />
  
  </Routes>
  </BrowserRouter>
  
  </>
  )
    
}

export default App;
