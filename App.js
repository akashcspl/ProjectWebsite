import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import FAQs from "./pages/FAQs";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminLogin from './pages/AdminLogin';
import SignUp from './pages/SignUp';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Transfer from './pages/Transfer';
import ViewAllAccounts from './pages/ViewAllAccounts';
import RequestNewAccount from './pages/RequestNewAccount';
import CloseAccount from './pages/CloseAccount';
import ViewTransactions from './pages/ViewTransactions';


function App() {
  return (
    <>

    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/deposit' element={<Deposit />} />
        <Route path='/withdraw' element={<Withdraw />} />
        <Route path='/transfer' element={<Transfer />} />
        <Route path='/viewallaccounts' element={<ViewAllAccounts />} />
        <Route path='/requestnewaccount' element={<RequestNewAccount />} />
        <Route path='/closeaccount' element={<CloseAccount />} />
        <Route path='/viewtransactions' element={<ViewTransactions />} />

        <Route path='*' element = {<NotFound />} />

      </Routes>

    </BrowserRouter>
    </>
  );
  
}

export default App;
