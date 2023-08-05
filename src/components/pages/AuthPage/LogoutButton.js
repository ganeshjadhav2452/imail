import React from 'react'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LogoutButton() {
    const history = useHistory()
    const logoutClickHandler =()=>{
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        history.replace('/')
    }
  return <button onClick={logoutClickHandler} class="btn text-light  bg-danger btn-outline-danger m-1" >Logout</button>
}

export default LogoutButton