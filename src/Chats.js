import React from "react";
// import "./Chats.css";
import Chat from "./Chat";

function Chats() {
    return (
        <div className="chats">
            <Chat
            name="Mark"
            message="Yo Whats up"
            timestamp="40 seconds ago"
            profilePic="..."
            />
            <Chat
            name="Sarah"
            message="Ola"
            timestamp="55 minutes ago"
            profilePic="..."
            />
            <Chat
            name="Ellen"
            message="Hi!"
            timestamp="3 days ago"
            profilePic="..."
            />
        </div>
    );
}

export default Chats;