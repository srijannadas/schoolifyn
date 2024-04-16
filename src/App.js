import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import { AuthProvider } from './components/Context/AuthContext';
// import useAuth from './hooks/userAuth';
import HomeSecure from './components/Home/HomeSecure';
import Register from './components/Register/Register';
import VerificationPage from './components/Register/VerificationPage';
import PasswordlessOTPLoginForm from './components/Login/PasswordLessOTPLogin';
import Login2FA from './components/Login/Login2FA';
import ProfilePage from './components/Profile/Profile';
import AdminHome from './components/AdminPanel/Home';
import CompleteProfile from './components/Profile/CompleteProfile'
import Notes from './components/Notes/Notes';

function App() {
  // const isLogin = useAuth();
  return (
    <div>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/verify/:token' element={<VerificationPage/>}/>
          <Route path='/OTPLogin/' element={<PasswordlessOTPLoginForm/>}/>
          <Route path='/Login2FA/' element={<Login2FA/>}/>
          <Route path='/profile/' element={<ProfilePage/>}/>
          <Route path='/profile/complete' element={<CompleteProfile/>}/>
          <Route path='/Notes' element={<Notes/>}/>
          <Route path="/admin" element={<AdminHome/>}/>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
