import React from 'react'
import '../Styled-Components/SideBarOptions.css'
import { useHistory } from 'react-router-dom';
import db from '../firebase';

function SideBarOptions({ Icon, title, addChannelOptions, id }) {

    const history = useHistory();

    const selectChannel = () => {
        if (id) {
            history.push(`/room/${id}`)
        } else {
            history.push(title)
        }
    }

    const addChannel = () => {
        // change it to a modal 
        const channelName = prompt('Please enter channel name');
        if (channelName) {
            db.collection('rooms').add({
                name: channelName,
            })
        }
    }


    return (
        <div
            className='sidebarOptions'
            onClick={addChannelOptions ? addChannel : selectChannel}
        >
            {Icon && <Icon className='sidebarOptions__icon' />}
            {Icon ?
                <h3>{title}</h3>
                : <h3 className='sidebarOptions__channel'>
                    <span className='sidebarOptions__hash'># </span>{title}
                </h3>
            }
        </div>
    )
}

export default SideBarOptions
