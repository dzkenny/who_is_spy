import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, Typography, TextField } from '@material-ui/core';
import './styles.css';
import { useHistory } from 'react-router';
import { useStores } from '../../stores';
import { saveUsername } from '../../actions/app';
import { ActionState } from '../../models/common';
const SpyImg = require('../../assets/images/spy.png').default;


const LoginPage = () => {
    const stores = useStores();
    const history = useHistory();

    const [username, setUsername] = useState('');

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    }

    const onSave = () => {
        saveUsername({ stores, history, username });
    }

    const disabled = stores.appStore.loginState === ActionState.IN_PROGRESS;

    return (
        <div className="page">
            <Card className="card">
                <CardContent>
                    <div className="toolbar">
                    <Typography className="title" gutterBottom variant="h5" component="h2">歡迎遊玩 "誰是臥底"</Typography>
                        <img src={SpyImg} className="logo" />
                    </div>
                    <TextField
                        fullWidth
                        label="用戶名稱"
                        value={username}
                        disabled={disabled}
                        onChange={(e) => handleUsernameChange(e)}
                    />
                </CardContent>
                <CardActions className="footer">
                    <Button disabled={disabled} size="small" color="primary" onClick={onSave}>確認</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default LoginPage;