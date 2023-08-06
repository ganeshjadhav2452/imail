
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function NavBar() {
const navigate = useNavigate()
  const logoutHandler =()=>{
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    navigate('/auth')
  }
  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">i-Mail</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Inbox</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/sent">Sent</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/composemail">Componse Mail</Link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Actions
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to="auth">Login</Link></li>
            <li><Link class="dropdown-item" to="auth">signUp </Link></li>
            <li><button class="dropdown-item" onClick={logoutHandler}>Logout </button></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default NavBar;
