import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login'
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

import { loadUser } from './actions/userActions';
import store from './store';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} exact />
          <Route path="/password/reset/:token" element={<NewPassword />} exact />
          <ProtectedRoute path="/me" element={<Profile />} exact />
          <ProtectedRoute path="/me/update" element={<UpdateProfile />} exact />
          <ProtectedRoute path="/update/password" element={<UpdatePassword />} exact />

        </Routes>
        <Footer />
      </Router>
  );
}

export default App;
