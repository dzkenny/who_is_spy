import React, { useState } from 'react';
import SettingComponent from '../../pages/watingRoom/setting';
import ChatRoom from '../chatRoom';
import InfoComponent from '../../pages/gamingRoom/info';

type LeftPanelType = {
    type: 'waiting' | 'gaming'
}

const LeftPanel = ({ type }: LeftPanelType) => {
    const [tab, setTab] = useState(0);

    return (
        <div className="gaming-info-content">
            <div className="info-tabs">
                <div onClick={e => setTab(0)} className={`info-tab ${tab === 0 ? 'selected-tab' : ''}`}>
                    資訊
                </div>
                <div onClick={e => setTab(1)} className={`info-tab ${tab === 1 ? 'selected-tab' : ''}`}>
                    聊天
                </div>
            </div>
            {
                tab === 0 ? 
                    (
                    type === 'waiting' ? <SettingComponent /> : <InfoComponent />) :
                    <ChatRoom />
            }
        </div>
    )
}

export default LeftPanel;