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
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Transfer from './pages/Transfer';
import ViewAllAccounts from './pages/ViewAllAccounts';
import RequestNewAccount from './pages/RequestNewAccount';
import CloseAccount from './pages/CloseAccount';
import ViewTransactions from './pages/ViewTransactions';

import AdminLogin from './pages/AdminLogin';
import ViewAllBanks from './pages/ViewAllBanks';
import CreateNewBank from './pages/CreateNewBank';
import CloseBank from './pages/CloseBank';
import ViewAllBranches from './pages/ViewAllBranches';
import CreateNewBranch from './pages/CreateNewBranch';
import CloseBranch from './pages/CloseBranch';
import OnboardNewUsers from './pages/OnboardNewUsers';
import CloseUserAccounts from './pages/CloseUserAccounts';
import NoRequests from './pages/NoRequests';


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
        <Route path='/deposit' element={<Deposit />} />
        <Route path='/withdraw' element={<Withdraw />} />
        <Route path='/transfer' element={<Transfer />} />
        <Route path='/viewallaccounts' element={<ViewAllAccounts />} />
        <Route path='/requestnewaccount' element={<RequestNewAccount />} />
        <Route path='/closeaccount' element={<CloseAccount />} />
        <Route path='/viewtransactions' element={<ViewTransactions />} />

        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/viewallbanks' element={<ViewAllBanks />} />
        <Route path='/createnewbank' element={<CreateNewBank />} />
        <Route path='/closebank' element={<CloseBank />} />
        <Route path='/viewallbranches' element={<ViewAllBranches />} />
        <Route path='/createnewbranch' element={<CreateNewBranch />} />
        <Route path='/closebranch' element={<CloseBranch />} />
        <Route path='/onboardnewusers' element={<OnboardNewUsers />} />
        <Route path='/closeuseraccounts' element={<CloseUserAccounts />} />
        <Route path='/norequests' element={<NoRequests />} />
        

        <Route path='*' element = {<NotFound />} />

      </Routes>

    </BrowserRouter>
    </>
  );
  
}

export default App;
