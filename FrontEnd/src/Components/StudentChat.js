import React, { useEffect, useState,useRef } from "react";
import { TextField, Button, Container, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import instance from "../Axios/axios";
import socketIOClient from "socket.io-client";
import styled from "@mui/material/styles/styled";
import moment from 'moment'
const socketConnection = socketIOClient("http://localhost:3001");

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "lightblue",
  color: "black",
}));

const StyledMessageInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(2),
  "& .MuiOutlinedInput-input": {
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledChatBox = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "60vh",
  padding: theme.spacing(2),
   overflowY: "scroll",
   borderRadius: "8px", // Add border radius for rounded corners
  boxShadow: theme.shadows[3], // Add a slight shadow for depth
  backgroundColor: "gray",
  color: "black",
}));

const StyledMessageContainer = styled("div")(({ theme, isFromUser }) => ({
  display: "flex",
  justifyContent: isFromUser ? "flex-end" : "flex-start", // Adjust alignment based on isFromUser
  marginBottom: "8px",
}));

const StyledMessageContent = styled("div")(({ theme, isFromUser }) => ({
  maxWidth: "70%", // Limit message width for readability
  padding: "8px",
  borderRadius: "8px",
  backgroundColor: isFromUser ? "green" : "white", // Adjust background color
  color: isFromUser ? "white" : "black", // Adjust text color
}));

function StudentChat() {
  const chatBoxRef=useRef()
 
  const { tutorId } = useParams();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const User = JSON.parse(localStorage.getItem("UserInfo"));

  const cId = [User._id, tutorId].sort().join("-");

  const handleMessageSubmit = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
    if (newMessage.trim() === "") return;
    const messageTime = new Date();
const formattedMessageTime = moment(messageTime).format('MMMM Do YYYY, h:mm:ss a')
    const message = {
      isFrom: User.firstName, // Store sender's name here
      content: newMessage,
      commonId: cId,
      reciever: tutorId,
      from: User._id,
      timestamp: new Date().toISOString(),
      time:formattedMessageTime
    };
    console.log(message, "poi");
    socket?.emit("sendMessage", message);

    setMessages((prevMessages) => [
      ...prevMessages,
      { content: newMessage, isFrom: User.firstName },
    ]);
   

    setNewMessage("");
   
  };

  useEffect(() => {
    instance.get(`/auth/get-message/${cId}`).then((res) => {
      console.log(res,'po')
      setMessages(res?.data);
    });
  }, []);

  useEffect(() => {
    setSocket(socketConnection);

    socket?.emit("studentMessage", User._id);

    socket?.emit("join room", cId);

    socket?.on("recieveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  
  }, [socket]);
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <StyledContainer maxWidth="sm">
      <StyledChatBox elevation={3} ref={chatBoxRef} >
        {messages.map((message, index) => (
          <StyledMessageContainer
            key={index}
            isFromUser={message.isFrom === User.firstName} // Check if the message is from the user
          >
         <StyledMessageContent isFromUser={message.isFrom === User.firstName}>
  <div style={{
      fontWeight: "bold",
      marginBottom: "3px",
      fontSize:'15px',
      color: message.isFrom === User.firstName ? "white" : "black",
    }}>{message.isFrom}</div>
  <div>{message.content} <br />
  <span style={{
                  fontSize: '12px', // Adjust font size as needed
                  color: message.isFrom === User.firstName ? 'lightgray' : 'darkgray', // Set colors for tutor and user
                }}>
                  {message.time}
                </span>
                </div>
</StyledMessageContent>
          </StyledMessageContainer>
        ))}
      </StyledChatBox>
      <StyledMessageInput
        label="Type your message..."
        variant="outlined"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        
      />
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleMessageSubmit}
      >
        Send
      </StyledButton>
    </StyledContainer>
  );
}

export default StudentChat;
