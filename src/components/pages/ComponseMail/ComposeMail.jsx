import React, { useRef, useState , useEffect} from "react";
import "./ComponseMail.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, EditorState } from "draft-js"; // Import EditorState and convertToRaw
import axios from "axios";
import { postEmail } from "../../../app/slices/fetchEmailsSlice";
import { useDispatch } from 'react-redux'
const email = localStorage.getItem('email')

function ComposeMailForm() {
  const toMailRef = useRef();
  const nameRef = useRef();
  const subjectMailRef = useRef();
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); // Initialize editor state
  const dispatch = useDispatch()
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const sendMailHandler =  () => {
    const mailBody = {
      receiverMail: toMailRef.current.value,
      subject: subjectMailRef.current.value,
      senderName: nameRef.current.value,
      body: convertToRaw(editorState.getCurrentContent()).blocks[0].text,
      isRead: false,
      senderEmail:email
    };
    dispatch(postEmail(mailBody));
  
  };

  return (
    <>
      <div className="form-paper">
        <div className="header">
          <h2 className="title">Compose Mail</h2>
        </div>
        <div className="body">
          <div className="form-field">
            <label className="title">To</label>
            <input
              className="field"
              type="text"
              placeholder="to"
              ref={toMailRef}
            />
          </div>
          <div className="form-field">
            <label className="title">Sender's Name</label>
            <input
              className="field"
              type="text"
              placeholder="Sender's Name"
              ref={nameRef}
            />
          </div>
          <div className="form-field -select">
            <label className="title">Subject</label>
            <input
              className="field"
              type="text"
              placeholder="Subject"
              ref={subjectMailRef}
            />
          </div>
          <div className="form-field -textarea">
            <Editor
              editorState={editorState} // Pass editorState
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange} // Use your custom handler
            />
          </div>
        </div>
        <div className="form-actions">
          <button className="btn btn-default" onClick={sendMailHandler}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default ComposeMailForm;
