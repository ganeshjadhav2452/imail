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
import { deleteEmail } from "../../../app/slices/fetchEmailsSlice";
function RenderMail() {
  const dispatch = useDispatch();
  let { receivedEmails } = useSelector((state) => state.fetchedData);
  const [isHovered, setIsHovered] = useState(false);
  let serverId = ''
  let count = 1;
  if (receivedEmails === null) {
    receivedEmails = {};
  }

  const deleteClickHandler = (e) => {
    console.log(e)
    // dispatch(deleteEmail(serverId))
  };
  useEffect(() => {
    setInterval(() => {
      dispatch(fetchInboxEmails());
    }, 2000);
  }, []);
  return (
    <main>
      <section className="glass">
        <div className="games">
          <div
            className="status"
            style={{ marginTop: "-40px", marginBottom: " 10px" }}
          ></div>
          <div className="cards">
            {Object.keys(receivedEmails).map((serverId) => {
              const mail = receivedEmails[serverId];
              serverId = serverId
              return (
                <div key={serverId}
                onMouseEnter={()=>setIsHovered(true)}
                onMouseLeave={()=>setIsHovered(false)}
                  className="card"
                  onClick={() => dispatch(updateSingleObj(mail))}
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/viewemail/${serverId}`}
                  >
                    <div className="card-info">
                      <p>{count++}</p>
                      <h4>{mail.senderName}</h4>
                      <p>{mail.subject}</p>

                      <img
                        style={{ height: "2rem" }}
                        src={mail.isRead === false ? signOfNotRed : signOfRed}
                        id="valorant"
                      />
                    </div>
                  </Link>
               { isHovered &&  <button
                    onClick={ ()=> dispatch(deleteEmail(serverId))}
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
