import React from "react";
import "./Chat.css";
import { Link } from "react-router-dom";

function Chat({ id, name, message, profilePic, timestamp }) {
    return (
        <Link to={`/chat/${id}`}>
        <div className="chat">
            <div className="chat__details">
                <h2>{name}</h2>
                <p>{message}</p>
            </div>
            <p className="chat__timestamp">{timestamp}</p>
        </div>
        </Link>
    )
}

export default Chat;