import React from 'react';


const Contact=()=> {
  // const onClick = ()=>{
  //   document.getElementById('id01').style.display='none'
  // }
  return (
     <>
     
     <div id = "id01" className="MuiPaper-root jss555 MuiPaper-elevation7 MuiPaper-rounded contact">
     {/* <button type="button" class="close" aria-label="Close" onClick={onClick}>
     <span className = "cross"aria-hidden="true">&times;</span>
     </button> */}
      <form id = 'id01'className="cont" style = {{display:'block'}}>
        <div className="container">
      <p className="company"><b>Company: Geeksynergy Technologies Pvt Ltd</b></p>
      <p className="address"><b>Address: Sanjayanagar, Bengaluru-56</b></p>
      <p className='phno'><b>Phone: XXXXXXXXX09</b></p>
      <p className='email'><b>Email: XXXXXX@gmail.com</b></p>
    </div>
    </form> 
    </div>

{/* <button onclick="document.getElementById('id01').style.display='block'">Login</button>


<div id="id01" class="modal">
  <span onclick="document.getElementById('id01').style.display='none'"
class="close" title="Close Modal">&times;</span>


  <form class="modal-content animate" action="/action_page.php">
    <div class="imgcontainer">
      <img src="img_avatar2.png" alt="Avatar" class="avatar"/>
    </div>

    <div class="container">
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required/>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required/>

      <button type="submit">Login</button>
      <label>
        <input type="checkbox" checked="checked" name="remember"/> Remember me
      </label>
    </div>

    <div class="container">
      <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
      <span class="psw">Forgot <a href="/">password?</a></span>
    </div>
  </form>
</div> */}
  
    </>

  )
}
export default Contact;
