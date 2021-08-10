import { TextField ,InputAdornment } from '@material-ui/core';
import {PersonOutline} from '@material-ui/icons';


const backgroundImage = require('../assets/images/loginbackground.jpg');

const Login = () => {
    return (
        <div className='login-background'>
            <div className='login-container'>
                <h1 className='login-container-header'>Giriş Yap</h1>
                <div className='login-input-container'>
                    <TextField 
                     InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutline   />
                          </InputAdornment>
                        ),
                      }}
                    InputLabelProps={{ shrink: true }}
                    label='Kullanıcı Adı'
                    placeholder='Kullanıcı Adınızı Giriniz'
                    />
                    {/* <TextField 
                     InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutline   />
                          </InputAdornment>
                        ),
                      }}
                    InputLabelProps={{ shrink: true }}
                    label='Kullanıcı Adı'
                    placeholder='Kullanıcı Adınızı Giriniz'
                    /> */}
                
                </div>
            </div>
        </div>
    );
}

export default Login;