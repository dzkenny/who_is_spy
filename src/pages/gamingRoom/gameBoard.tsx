import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Card, CardContent, Typography, Avatar, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import './styles.css';
import { useStores } from '../../stores';
import { useHistory } from 'react-router';
import { reportPlayer } from '../../actions/game';
import * as _ from 'lodash';
import { Player } from '../../models/player';
import AdminIcon from '@material-ui/icons/Star';
import { Avatars } from '../../models/avatar';
import { isMobile } from 'react-device-detect';

const GameBoardComponent = observer(() => {
    const stores = useStores();
    const history = useHistory();

    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [showPlayerDialog, setShowPlayerDialog] = useState(false);
    const { user } = stores.appStore;
    const { room, refresh } = stores.gameStore;
    const { host, players, setting } = room;
    const isHost = user.id === host;

    const onSelectPlayer = (player: Player) => {
        if (!isHost) {
            return;
        }

        if (player.status === 'dead' || (!setting.isRandom && player.identify === 'host')) {
            return;
        }

        setSelectedPlayer(player);
        setShowPlayerDialog(true);
    }

    const onCancelDialog = () => {
        setSelectedPlayer(null);
        setShowPlayerDialog(false);
    }

    const onReportPlayer = () => {
        setShowPlayerDialog(false);
        reportPlayer({
            stores,
            playerId: selectedPlayer ? selectedPlayer.id : ''
        })
    }

    const getImage = (avatar?: string) => {
        const defaultImage = (
            <Avatar>
                <PersonIcon />
            </Avatar>
        );

        if (!avatar) {
            return defaultImage;
        }

        try {
            const selectedAvatar = Avatars.find(a => a.id === avatar);
            const SelectedImage = require(`../../assets/images/cards/${selectedAvatar?.card}`).default;
            return (
                <img
                    className={isMobile ? "mobile-card-image" : "card-image"}
                    src={SelectedImage}
                />
            )
        } catch (err) {
            return defaultImage;
        }

    }

    return (
        <div className="gaming-card-content">
            {
                players.map(player => (
                    <Card
                        key={`card-${player.id}`}
                        className={isMobile ? "mobile-person-card" : "person-card"}
                        onClick={() => onSelectPlayer(player)}
                    >
                        <CardContent
                            className={isMobile ? "mobile-person-card-content" : "person-card-content"}
                        >
                            <div
                                className={isMobile ? "mobile-person-avatar" : "person-avatar"}
                            >
                                {
                                    player.status === 'dead' || (!setting.isRandom && player.id === host) ?
                                        (
                                            <div className="status-layer">
                                                {
                                                    (!setting.isRandom && player.id === host) ? '主持人' :
                                                        player.identify === 'spy' ? '臥底' :
                                                            player.identify === 'blank' ? '白板' :
                                                                '普通人'
                                                }
                                            </div>
                                        ) : null
                                }
                                {
                                    player.id === host ? <AdminIcon className="admin-icon" /> : null
                                }
                                {getImage(player.avatar)}
                            </div>
                            <Typography variant="body1" component="h2">
                                {player.username}
                            </Typography>
                            <Typography variant="body2" component="h2">
                                {player.status === 'alive' ? '生存' : '陣亡'}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            }
            <Dialog open={showPlayerDialog}>
                <DialogTitle>是否確認此玩家</DialogTitle>
                <DialogContent>
                    <Typography className="title" gutterBottom variant="body1" component="h2">
                        {selectedPlayer?.username}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancelDialog} color="primary">取消</Button>
                    <Button onClick={onReportPlayer} color="primary">確定</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
});

export default GameBoardComponent;