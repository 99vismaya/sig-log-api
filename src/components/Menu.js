import {Link} from 'react-router-dom'
import React from 'react';


const Navbar=()=> {
  return (
    <>
    <nav className= {"navbar navbar-expand-lg navbar-light bg-light fixed-top" } style={{"backgroundColor":"rgb(78, 104, 236)"}}>
      <div className="container-fluid"style={{"backgroundColor":"rgb(78, 104, 236)"}}>
      <Link className="navbar-brand" style={{color:"white"}} to="/Api">Kannada Movies Hub </Link>
      {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
      <span className="navbar-toggler-icon"></span>
      </button> */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" style={{color:"white"}} to="/Contact">Company Info</Link>
        </li>
      </ul>
      </div>
      </div>
      
    </nav>
    </>
  )
}
export default Navbar;
