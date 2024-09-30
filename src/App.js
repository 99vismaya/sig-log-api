import './App.css';
import './style.css';
import React,{useState} from "react";
import Signup from './components/Signup';
import Login from './components/Login';
import Api from './components/Api';
import Menu from './components/Menu';
import Contact from './components/Contact';
import Alert from './components/Alert';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


function App() {
  const showAlert = (message, type) => {
    setAlert({
        msg: message,
        type: type
    })
     setTimeout(()=>{
     setAlert("")
     },1500)
  }
  const [alert, setAlert] = useState(null)
  return (
    
  
    <Router>
    <>
    <Menu/>
    <Alert alert = {alert}/>
    <Routes>
    <Route path="/"  element= {<Signup/>}>
    </Route>
    <Route path= "/Login"  element= {<Login/>}>
    </Route>
    <Route path= "/Api"  element= {<Api key ="api" showAlert={showAlert}/>}>
    </Route>
    <Route path= "/Contact" element= {<Contact/>}>
    </Route> 
    </Routes>
    </>
    </Router>
    
  
  );
}

export default App;
