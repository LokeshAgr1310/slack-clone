import React, { useState, useEffect } from 'react'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

import '../Styled-Components/SideBar.css'
import SideBarOptions from './SideBarOptions'
import db from '../firebase';
import { useStateValue } from '../StateProvider';


function SideBar() {

    const [channels, setChannels] = useState([])

    const [{ user }] = useStateValue();

    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
            })))
        ))

    }, [channels])

    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>Clever Programmer</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        {user?.displayName}
                    </h3>
                </div>
                <CreateIcon />
            </div>
            <SideBarOptions Icon={InsertCommentIcon} title="Threads" />
            <SideBarOptions Icon={InboxIcon} title="Mentions & reactions" />
            <SideBarOptions Icon={DraftsIcon} title="Saved items" />
            <SideBarOptions Icon={BookmarkBorderIcon} title="Channel browser" />
            <SideBarOptions Icon={PeopleAltIcon} title="People & user groups" />
            <SideBarOptions Icon={AppsIcon} title="Apps" />
            <SideBarOptions Icon={FileCopyIcon} title="File browser" />
            <SideBarOptions Icon={ExpandLessIcon} title="Show less" />
            <hr />
            <SideBarOptions Icon={ExpandMoreIcon} title="Channels" />
            <hr />
            <SideBarOptions Icon={AddIcon} title="Add Channel" addChannelOptions />

            {/* Connect to firebase and list all the channels using SideBarOptions */}
            {channels.map(channel => (
                <SideBarOptions title={channel.name} id={channel.id} key={channel.id} />
            ))}
        </div>
    )
}

export default SideBar
