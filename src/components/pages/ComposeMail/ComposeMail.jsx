import React, { useRef, useState } from "react";
import "./ComponseMail.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, EditorState } from "draft-js"; // Import EditorState and convertToRaw
import axios from "axios";
const email = localStorage.getItem('email').replace('@','').replace('.','')

function ComposeMailForm() {
  const toMailRef = useRef();
  const subjectMailRef = useRef();
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); // Initialize editor state

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const sendMailHandler = async () => {
    const mailBody = {
      receiverMail: toMailRef.current.value,
      subject: subjectMailRef.current.value,
      body: convertToRaw(editorState.getCurrentContent()).blocks[0].text,
      isRead: false,
    };
    console.log(mailBody);
    try {
      await axios(
        `https://imail-b07c6-default-rtdb.firebaseio.com/emails/${email}/sent.json`,
        {
          method: "POST",
          data: mailBody,
        }
      );

      await axios(
        `https://imail-b07c6-default-rtdb.firebaseio.com/emails/${email}/receive.json`,
        {
          method: "POST",
          data: mailBody,
        }
      );
    } catch (error) {
      console.log(error);
    }
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
