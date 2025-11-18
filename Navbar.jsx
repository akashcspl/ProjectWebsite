import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from './images/mesaverdelogo.jpg';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-sunset-gradient px-3">
      <NavLink className="navbar-brand" to="/">
        <img src={logo} alt="logo" className="mvlogo" />
      </NavLink>

      {/* Toggler for mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/faqs">FAQs</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/aboutus">About Us</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/contactus">Contact Us</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/viewtransactions">View Transactions</NavLink></li>
          <li className="nav-item dropdown">
            <NavLink
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Services
            </NavLink>

            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><NavLink className="dropdown-item" to="/deposit">Deposit</NavLink></li>
              <li><NavLink className="dropdown-item" to="withdraw">Withdraw</NavLink></li>
              <li><NavLink className="dropdown-item" to="/transfer">Transfer</NavLink></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <NavLink
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account Management
            </NavLink>

            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><NavLink className="dropdown-item" to="viewallaccounts">View All Accounts</NavLink></li>
              <li><NavLink className="dropdown-item" to="/requestnewaccount">Request New Account</NavLink></li>
              <li><NavLink className="dropdown-item" to="closeaccount">Close Account</NavLink></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <NavLink
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Banks
            </NavLink>

            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><NavLink className="dropdown-item" to="viewallbanks">View All Banks</NavLink></li>
              <li><NavLink className="dropdown-item" to="/createnewbank">Create New Bank</NavLink></li>
              <li><NavLink className="dropdown-item" to="closebank">Close Bank</NavLink></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <NavLink
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Branches
            </NavLink>

            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><NavLink className="dropdown-item" to="viewallbranches">View All Branches</NavLink></li>
              <li><NavLink className="dropdown-item" to="/createnewbranch">Create New Branch</NavLink></li>
              <li><NavLink className="dropdown-item" to="closebranch">Close Branch</NavLink></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <NavLink
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              User Actions
            </NavLink>

            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><NavLink className="dropdown-item" to="onboardnewusers">Onboard New Users</NavLink></li>
              <li><NavLink className="dropdown-item" to="/closeuseraccounts">Close User Accounts</NavLink></li>
            </ul>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          {isLoggedIn ? (
            <>
              <li className="nav-item"><NavLink className="nav-link" to="/accounts">Accounts</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/profile">Profile</NavLink></li>
              {/* Dropdown here */}
              {/* <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </NavLink>

                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><NavLink className="dropdown-item" to="/loans">Loans</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/investments">Investments</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/insurance">Insurance</NavLink></li>
                </ul>
              </li> */}
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/signup">Sign Up</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
