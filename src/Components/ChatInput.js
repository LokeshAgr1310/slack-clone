import React, { useState } from 'react'
import "../Styled-Components/ChatInput.css"
import { useStateValue } from '../StateProvider';
import db from '../firebase'
import firebase from "firebase/compat/app"

function ChatInput({ channelName, channelId }) {

    const [{ user }] = useStateValue();
    const [input, setInput] = useState('')

    const chatInputHandler = (e) => {
        e.preventDefault();
        if (channelId) {
            db.collection('rooms')
                .doc(channelId)
                .collection('messages')
                .add({
                    message: input,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: user?.displayName,
                    userImage: user?.photoURL
                })
            setInput('')
        }
    }

    return (
        <div className="chatInput">
            <form>
                <input
                    type="text"
                    placeholder={`Message # ${channelName?.toLowerCase()}`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" onClick={chatInputHandler}>SEND</button>
            </form>
        </div>
    )
}

export default ChatInput
