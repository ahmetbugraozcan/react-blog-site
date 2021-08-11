import { TextField, InputAdornment, Button, StepButton } from '@material-ui/core';
import { PersonOutline, LockOutlined, MailOutline, Facebook} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";


const backgroundImage = require('../assets/images/loginbackground.jpg');

const useStyles = makeStyles({
  facebookButton: {
    background: 'blue',
  },
  root: {
    width: '100%',
    marginTop: '10px',
  },
  login: {
    marginTop: "20px",
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
});

const Login = () => {
  const classes = useStyles();
  return (
    <div className='login-background'>
      <div className='login-container'>
        <h1 className='login-container-header'>Giriş Yap</h1>
        <div className='login-input-container'>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutline />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
            label='Kullanıcı Adı'
            placeholder='Kullanıcı Adınızı Giriniz'
          />
          <TextField
            style={{ marginTop: '20px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutline />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
            label='E-Posta'
            placeholder='E-Postanızı giriniz'
          />
          <TextField
            style={{ marginTop: '20px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
            label='Şifre'
            placeholder='Şifrenizi Giriniz'
          />
          <Button variant='contained' className={classes.login}
          >Giriş Yap
          </Button>
          <p className='login-with-others-paragraph' >Veya</p>
          <div className='social-media-login-container'>
            <Button variant='contained' className='gmail-button'>
              Gmail ile giriş yap
            </Button>
            <Button
            startIcon={<Facebook/>}
            variant='contained'
            className='facebook-button'>
              Facebook ile giriş yap
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(useStyles, { withTheme: true })(Login);