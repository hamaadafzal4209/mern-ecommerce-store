import './Navbar.css'
import logo from "../../assets/nav-logo.svg"
import navProfile from "../../assets/nav-profile.svg"

function Navbar() {
  return (
    <div className='navbar'>
      <img className='nav-logo' src={logo} alt="" />
      <img className='nav-profile' src={navProfile} alt="" />
    </div>
  )
}

export default Navbar
