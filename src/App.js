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

        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
