import { InputAdornment, Button, Input, TextField } from '@material-ui/core';
import { PersonOutline, LockOutlined, MailOutline, FaceOutlined } from '@material-ui/icons';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import AuthService from "../services/AuthService";
import { Link } from 'react-router-dom';
import React from 'react';

class Login extends React.Component {

    state = { password: '', email: '', };


    validateForms(event) {
        event.preventDefault();

        const body = { email: this.state.email, password: this.state.password};

         AuthService.login(body).then((res) => {
          if(res){
            console.log("VALUE: ", res)
          }else{
              console.log("GİRİŞ YAPILAMADI")
          }
         });
    }
    render() {

        return (<div className='login-background'>
            <div className='login-container'>
                <h1 className='login-container-header'>Giriş Yap</h1>
                <form className='login-input-container' onSubmit={(event) => { this.validateForms(event) }}>
                    {/* <div className="single-input-container">
                        <label htmlFor='email'>E-Posta</label>
                        <Input 
                        error={this.state.email === ""}
                        errorText={"Errr"}
                        helperText={this.state.email === "" ? 'Empty!' : ' '}
                        onChange={event => this.setState({ email: event.target.value })}
                        className='input-field' name='email' placeholder='E-Postanızı Giriniz' startAdornment={<InputAdornment position="start">
                            <MailOutline />
                        </InputAdornment>} >
                        </Input>
                    </div> */}
                   <div className="single-input-container">
                   <TextField
                        error={this.state.email === ""}
                        helperText={this.state.email === "" ? 'Lütfen geçerli bir email giriniz.' : ' '}
                        onChange={event => this.setState({ email: event.target.value })}
                        className="single-input-container"
                        placeholder="E-posta"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailOutline />
                                </InputAdornment>
                            ),
                        }}
                    />
                   </div>
                    <div className="single-input-container">
                        <TextField
                            error={this.state.password === ""}
                            helperText={this.state.password === "" ? 'Lütfen geçerli bir şifre giriniz.' : ' '}
                            onChange={event => this.setState({ password: event.target.value })}
                            className="single-input-container"
                            placeholder="Şifre"
                            type='password'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlined />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <Button
                        type='submit'
                        variant='contained'
                        className='login-button'
                    ><div className='login-button-text'>Giriş Yap</div>
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
                <div style={{ marginTop: '5%' }}>Hesabın yok mu?</div>
                <div style={{ marginTop: '3%' }}><Link to='signup' className='text-link'><b>Hemen Kaydol</b></Link></div>
            </div>
        </div>
        );

    }
}





export default Login;