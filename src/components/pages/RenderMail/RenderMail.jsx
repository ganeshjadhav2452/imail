import React, { useState, useEffect } from "react";
import "./RenderMail.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInboxEmails,
  updateSingleObj,
} from "../../../app/slices/fetchEmailsSlice";
import signOfRed from "../../../assets/signOfRead.png";
import signOfNotRed from "../../../assets/signOfNotRead.png";
import binIcon from "../../../assets/dustbin.png";
import { Link } from "react-router-dom";
import { deleteEmail,getSentEmails } from "../../../app/slices/fetchEmailsSlice";

function RenderMail({render}) {
  console.log(render)
  const dispatch = useDispatch();
  let { receivedEmails,sentEmails } = useSelector((state) => state.fetchedData);
  const [isHovered, setIsHovered] = useState(false);

console.log(sentEmails)
  let count = 1;

  if (receivedEmails === null) {
    receivedEmails = {};
  }
  if (sentEmails === null) {
    sentEmails = {};
  }


  useEffect(() => {
    if(render ==='inbox'){
      setInterval(() => {
        dispatch(fetchInboxEmails());
      }, 2000);
    }
   
   if(render === 'sent'){
    dispatch(getSentEmails());
   }
  }, [render]);
  return (
    <main>
      <section className="glass">
        <div className="games">
          <div
            className="status"
            style={{ marginTop: "-40px", marginBottom: " 10px" }}
          ></div>
          <div className="cards">
            {Object.keys(render === 'inbox'? receivedEmails:sentEmails).map((serverId) => {
              const mail = render === 'inbox' ? receivedEmails[serverId]: sentEmails[serverId];
           
              return (
                <div key={serverId}
                onMouseEnter={()=>setIsHovered(true)}
                onMouseLeave={()=>setIsHovered(false)}
                  className="card"
                  onClick={() => dispatch(updateSingleObj(mail))}
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/viewemail/${serverId}/${render}`}
                  >
                    <div className="card-info">
                      <p>{count++}</p>
                      <h4>{render === 'inbox' ? mail.senderName: mail.receiverMail}</h4>
                      <p>{mail.subject}</p>

                   { render === 'inbox'?  <img
                        style={{ height: "2rem" }}
                        src={mail.isRead === false ? signOfNotRed : signOfRed}
                        id="valorant"
                      />
                      :null}
                    </div>
                  </Link>
               { isHovered &&  <button
                    onClick={ ()=> dispatch(deleteEmail(serverId,render))}
                    className="deleteBtn"
                    style={{ height: "2rem", border: "none" ,background:'inherit'}}
                  >
                    <img
                      style={{ height: "2rem", border: "none" }}
                      src={binIcon}
                      id="deleteicon"
                    />
                  </button>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default RenderMail;
