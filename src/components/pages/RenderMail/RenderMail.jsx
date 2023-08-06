import React, { useState, useEffect } from "react";
import "./RenderMail.css";
import { useDispatch,useSelector } from "react-redux";
import { fetchInboxEmails,updateSingleObj } from "../../../app/slices/fetchEmailsSlice";
import signOfRed from '../../../assets/signOfRead.png'
import signOfNotRed from '../../../assets/signOfNotRead.png'
import { Link } from "react-router-dom";
function RenderMail() {
  const dispatch = useDispatch()
  let {receivedEmails} = useSelector((state)=> state.fetchedData)

if(receivedEmails === null){
  receivedEmails = {}
  
}

  useEffect(()=>{
    setInterval(()=>{
      dispatch(fetchInboxEmails())
    },2000)
  },[])
  return (
    <main>
      <section className="glass">
        <div className="games">
          <div
            className="status"
            style={{ marginTop: "-40px", marginBottom: " 10px" }}
          >
          
          
          </div>
          <div className="cards">



           { Object.keys(receivedEmails).map((serverId)=>{
            const mail = receivedEmails[serverId]
            return(
              <Link style={{textDecoration:'none'}} to={`/viewemail/:${serverId}`}>
              <div className="card" onClick={()=>dispatch(updateSingleObj(mail))}>
           
           <div className="card-info" >
          
             <h4>{mail.senderName}</h4>
             <p>{mail.subject}</p>
       
           <img style={{height:'2rem'}} src={mail.isRead === false? signOfNotRed:signOfRed} id="valorant"/>
           </div>
         
          
         </div>
              </Link>
              
            )
           }) }



          </div>
        </div>
      </section>
    </main>
  );
}

export default RenderMail;
