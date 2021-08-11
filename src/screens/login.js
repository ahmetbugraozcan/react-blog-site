import { InputAdornment, Button, Input } from '@material-ui/core';
import { PersonOutline, LockOutlined, MailOutline, FaceOutlined } from '@material-ui/icons';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import AuthService from "../services/AuthService";



function myFunction(event) {
  event.preventDefault();
  const fakeData ={ name: 'ahmet', userName: 'ahmetbugra', email: 'gmail', password: 'password' };


  const body =  { name: event.target.name.value, userName: event.target.userName.value, email: event.target.email.value, password: event.target.password.value };

  //400 alıyoruz bakalım buna
  AuthService.signUp(body).then((value)=> {
   console.log("VALUE: " , value)
  });
  


}

const Login = () => {
  return (
    <div className='login-background'>
      <div className='login-container'>
        <h1 className='login-container-header'>Giriş Yap</h1>
        <form className='login-input-container' onSubmit={(event) => { myFunction(event) }}>
          <div className="single-input-container">
            <label htmlFor='name'>Ad-Soyad</label>
            <Input className='input-field' name='name' placeholder='İsminizi Giriniz.' startAdornment={<InputAdornment position="start">
              <FaceOutlined />
            </InputAdornment>} >
            </Input>
          </div>
          <div className="single-input-container">
            <label htmlFor='userName'>Kullanıcı Adı</label>
            <Input className='input-field' name='userName' placeholder='Kullanıcı Adınızı Giriniz.' startAdornment={<InputAdornment position="start">
              <PersonOutline />
            </InputAdornment>} >
            </Input>
          </div>
          <div className="single-input-container">
            <label htmlFor='email'>E-Posta</label>
            <Input className='input-field' name='email' placeholder='E-Postanızı Giriniz.' startAdornment={<InputAdornment position="start">
              <MailOutline />
            </InputAdornment>} >
            </Input>
          </div>
          <div className="single-input-container">
            <label htmlFor='password'>Şifre</label>
            <Input className='input-field' name='password' placeholder='Şifre Giriniz.' startAdornment={<InputAdornment position="start">
              <LockOutlined />
            </InputAdornment>} >
            </Input>
          </div>

          {/* <TextField
            className='input-field'
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
            > <input type='text' name='username' /></TextField>
          </label>
          <label>
            <TextField
            className='input-field'
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
            ><input type='text' name='email' /></TextField>
          </label>
          <label>
            <TextField
            className='input-field'
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
            >
              <input type='text' name='password' />
            </TextField> */}

          <Button
            type='submit'
            variant='contained'
            className='login-button'
          ><div className='login-button-text'>Giriş yap</div>
          </Button>
          <p className='login-with-others-paragraph' >Veya</p>
          <div className='social-media-login-container'>
            <Button
              startIcon={<FaGoogle style={{ marginLeft: '10px' }} />}
              variant='contained'
              className='gmail-button'>
              <div className='social-media-button-text'>Gmail ile giriş yap</div>
            </Button>
            <Button
              startIcon={<FaFacebookF color="#FFFFFF" style={{ marginLeft: '10px' }} />}
              variant='contained'
              className='facebook-button'>
              <div className='social-media-button-text'>Facebook ile giriş yap</div>
            </Button>
          </div>
        </form>



      </div>
    </div>
  );
}

export default withStyles({ withTheme: true })(Login);