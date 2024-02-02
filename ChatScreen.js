import React from "react";
import Avatar from "material-ui.core/Avarar";
import "./ChatScreen.css";

function ChatScreen() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            name: 'Ellen',
            image: '...',
            message: 'Whats up'
        },
        {
            name: 'Ellen',
            image: '...',
            message: 'Hows it going!'
        },
        {
            name: 'Ellen',
            image: '...',
            message: 'Whats up'
        }
    ]);

    const handleSend = e => {
        e.preventDefault();

        setMessages([...messages, {message: input}]);
        setInput("");
    }
    return (
        <div className="chatScreen">
            <p className="chatScreen__timestamp">
                YOU MATCHED WITH ELLEN ON 10/08/20
            </p>
            {messages.map((message) => 
                message.name ? (
                
                <div className="chatScreen__message">
                    <Avatar
                    className="chatScreen__image"
                    alt={message.name}
                    src={message.image}
                    />
                    <p className="chatScreen__text">{message.message}</p>
                </div>
                ) : (
                    <div className="chatScreen__message">
                        <p className="chatScreen__textUser">{message.message}</p>
                    </div>
                )
            )}
            <form className="chatScreen__input">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="chatScreen_inputField"
                    placeholder="Type a message..."
                    type="text" 
                />
                <button onClick={handleSend} type="submit" className="chatScreen_inputButton">SEND</button>
            </form>
        </div>
        
    );
}

export default ChatScreen;