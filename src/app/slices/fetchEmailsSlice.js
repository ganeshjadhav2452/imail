import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const email = localStorage.getItem("email").replace("@", "").replace(".", "");
const fetchEmailsSlice = createSlice({
  name: "fetchEmails",
  initialState: {
    sentEmails: {},
    receivedEmails: {},
    singleObj:{},
    sendEmailError: {
      flag: false,
      errorMessage: "",
    },
    receiveEmailError: {
      flag: false,
      errorMessage: "",
    },
    sentEmailError: {
      flag: false,
      errorMessage: "",
    },
  },
  reducers: {
    updateSentEmails(state, action) {
      state.sentEmails = action.payload;
    },
    updateRecivedEmails(state, action) {
      state.receivedEmails = action.payload;
    },
    updateSingleObj(state, action) {
      state.singleObj = action.payload;
    },
  },
});

export const { updateRecivedEmails, updateSentEmails,updateSingleObj } =
  fetchEmailsSlice.actions;
export default fetchEmailsSlice.reducer;

export const postEmail = (mailBody) => {
  const receiverMail = mailBody.receiverMail.replace("@", "").replace(".", "");
  return async (dispatch, getState) => {
    try {
      await axios.post(
        `https://imail-b07c6-default-rtdb.firebaseio.com/emails/${receiverMail}/receive.json`,
        {
          ...mailBody,
        }
      );

      await axios.post(
        `https://imail-b07c6-default-rtdb.firebaseio.com/emails/${email}/sent.json`,
        {
          ...mailBody,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSentEmails = ({ mailBody }) => {
  return async (dispatch, getState) => {
    try {
      const sentResponse = await axios.get(
        `https://imail-b07c6-default-rtdb.firebaseio.com/emails/${email}/sent.json`
      );
      console.log(sentResponse);
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchInboxEmails = () => {
  return async (dispatch, getState) => {
    try {
      const receivedResponse = await axios.get(
        `https://imail-b07c6-default-rtdb.firebaseio.com/emails/${email}/receive.json`
      );

      dispatch(updateRecivedEmails(receivedResponse.data))
    } catch (error) {
        console.log(error)
    }
  };
};


export const updateIsReadToTrue = (id,obj) => {
  return async (dispatch, getState) => {
    try {
      const updateResponse = await axios.put(
        `https://imail-b07c6-default-rtdb.firebaseio.com/emails/${email}/receive/${id}.json`,{...obj,isRead:true}
      );

      
      dispatch(updateSingleObj({...obj,isRead:true}))
    } catch (error) {
        console.log(error)
    }
  };
};
