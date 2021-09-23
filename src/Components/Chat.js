import React, { useState, useEffect } from 'react'
import "../Styled-Components/Chat.css"
import { useParams } from 'react-router-dom';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import db from '../firebase';
import Message from '../Components/Message';
import ChatInput from '../Components/ChatInput';

function Chat() {

    const { roomId } = useParams()
    const [roomDetails, setRoomDetails] = useState(null)
    const [roomMessages, setRoomMessages] = useState([])

    useEffect(() => {

        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomDetails(snapshot.data())
            })

            db.collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy("timestamp", "asc")
                .onSnapshot(snapshot => {
                    setRoomMessages(snapshot.docs.map(doc => doc.data()))
                })
        }

    }, [roomId])

    // console.log(roomDetails)
    // console.log(roomMessages)

    return (
        <div className='chat'>
            <div className="chat__header">
                <div className="chat__headerLeft">
                    <h4 className="chat__channelName">
                        <strong># {roomDetails?.name}</strong>
                        <StarBorderOutlinedIcon />
                    </h4>
                </div>
                <div className="chat__headerRight">
                    <p>
                        <InfoOutlinedIcon /> Details
                    </p>
                </div>

            </div>
            <div className="chat__messages">
                {roomMessages.map(({ message, timestamp, user, userImage }, index) => (
                    <Message
                        key={index}
                        message={message}
                        timestamp={timestamp}
                        user={user}
                        userImage={userImage}
                    />
                ))}
            </div>

            <ChatInput channelName={roomDetails?.name} channelId={roomId} />

        </div>
    )
}

export default Chat
