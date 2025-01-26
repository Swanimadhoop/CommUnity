// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ChatMessages = ({ postId, closeChat }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   // Fetch messages for the specific post
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/v1/posts/${postId}/messages`);
//         setMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     if (postId) {
//       fetchMessages();
//     }
//   }, [postId]); // Re-fetch when postId changes

//   // Send message handler
//   const handleSendMessage = async () => {
//     if (newMessage.trim()) {
//       try {
//         const response = await axios.post(
//           `http://localhost:4000/api/v1/posts/${postId}/messages`,
//           { message: newMessage }
//         );
//         setMessages((prevMessages) => [...prevMessages, response.data]);
//         setNewMessage(""); // Clear input after sending
//       } catch (error) {
//         console.error("Error sending message:", error);
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     setNewMessage(e.target.value); // Capture message input
//   };

//   return (
//     <div style={{
//       position: "fixed",
//       bottom: "20px",
//       right: "20px",
//       width: "300px",
//       background: "white",
//       border: "1px solid #ddd",
//       padding: "10px",
//       boxShadow: "0 0 10px rgba(0,0,0,0.2)",
//     }}>
//       <button onClick={closeChat} style={{ position: "absolute", top: "5px", right: "5px" }}>X</button>
//       <h3>Chat about this Post</h3>
//       <div style={{ maxHeight: "300px", overflowY: "auto" }}>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <p>{msg.message}</p>
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={newMessage}
//         onChange={handleInputChange}
//         placeholder="Type a message..."
//         style={{
//           width: "100%",
//           padding: "10px",
//           marginTop: "10px",
//         }}
//       />
//       <button
//         onClick={handleSendMessage}
//         style={{
//           width: "100%",
//           padding: "10px",
//           backgroundColor: "#007BFF",
//           color: "white",
//           border: "none",
//           marginTop: "5px",
//           cursor: "pointer",
//           pointerEvents: newMessage.trim() ? 'auto' : 'none',
//         }}
//       >
//         Send
//       </button>
//     </div>
//   );
// };

// export default ChatMessages;
