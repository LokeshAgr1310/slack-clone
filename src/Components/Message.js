import React from 'react'
import { useStateValue } from '../StateProvider'
import "../Styled-Components/Message.css"

function Message({ message, timestamp, user, userImage }) {

    const [{ user: userInfo }] = useStateValue();
    return (
        <div className={`message ${userInfo?.displayName === user && "userMessage"}`}>
            <img src={userImage} alt="" />
            <div className="message__info">
                <h4>
                    {user}
                    <span className="message__timestamp">
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                </h4>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
