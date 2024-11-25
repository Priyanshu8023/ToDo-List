import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <div className="logo">TaskFlow</div>
        <div className="sidebar">
            <button className="sidecont">Home</button>
            <button className="sidecont">About Us</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
