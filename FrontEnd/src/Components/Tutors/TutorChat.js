import React, { useEffect, useState,useRef} from "react";
import { TextField, Button, Container, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import styled from "@mui/material/styles/styled";
import { useParams } from "react-router-dom";
import instance from "../../Axios/axios";
import moment from 'moment'
const socketConnection = socketIOClient("http://localhost:3001");
console.log("Socket initialized:", socketConnection);

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
  backgroundColor: "gray",
  color: "black",
}));


const StyledMessageContainer = styled("div")(({ theme, isFromTutor }) => ({
  display: "flex",
  justifyContent: isFromTutor ? "flex-end" : "flex-start",
  marginBottom: "8px",
  
}));

const StyledMessageContent = styled("div")(({ theme, isFromTutor }) => ({
  maxWidth: "70%",
  padding: "8px",
  borderRadius: "8px",
  backgroundColor: isFromTutor ? "green" : "white",
  color: isFromTutor ? "white" : "black",
}));

function TutorChat() {
  const chatBoxRef=useRef()

  const { studId } = useParams();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const Tutor = useSelector((state) => state.tutorInfo.tutor);
  const Cid = [studId, Tutor._id].sort().join("-");  



  const handleMessageSubmit = () => {
  

    const messageTime = new Date();
const formattedMessageTime = moment(messageTime).format('MMMM Do YYYY, h:mm:ss a')
    if (newMessage.trim() === "") return;
    const message = {
      isFrom: Tutor.name,
      content: newMessage,
      commonId: Cid,
      reciever: studId,
      from: Tutor._id,
      time:formattedMessageTime
    };
    console.log(message, "op");

    socket?.emit("sendMessage", message);
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: newMessage, isFrom: Tutor.name },
    ]);
    setNewMessage("");
  };
  useEffect(() => {
    instance.get(`/tutor/get-message/${Cid}`).then((res) => {
      setMessages(res?.data);
    });
  }, []);
  useEffect(() => {
    setSocket(socketConnection);
    socket?.emit("tutorMessage", Tutor._id);

    socket?.emit("join room", Cid);

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
      <StyledChatBox elevation={3} ref={chatBoxRef}>
        {messages.map((message, index) => (
          <StyledMessageContainer
            key={index}
            isFromTutor={message.isFrom === Tutor.name}
          >
            <StyledMessageContent isFromTutor={message.isFrom === Tutor.name}>
            <div style={{
      fontWeight: "bold",
      marginBottom: "3px",
      fontSize:'15px',
      color: message.isFrom === Tutor.name ? "white" : "black",
    }}>{message.isFrom}</div>
  <div>{message.content} <br />
  <span style={{
                  fontSize: '12px', // Adjust font size as needed
                  color: message.isFrom === Tutor.name ? 'lightgray' : 'darkgray', // Set colors for tutor and user
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

export default TutorChat;
