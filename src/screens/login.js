import { InputAdornment, Button, Input, TextField } from '@material-ui/core';
import { LockOutlined, MailOutline } from '@material-ui/icons';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import AuthService from "../services/AuthService";
import StorageService from "../services/StorageService";
import { Link } from 'react-router-dom';
import React from 'react';
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject("UserStore")
@observer
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { password: '', email: '', };
        console.log("LOGİN: ", props.UserStore.user);
        //giriş yapmış kullanıcı varsa burada kontrol edip homepage e yönlendirebiliriz
    }



    validateForms(event) {
        event.preventDefault();

        const body = { email: this.state.email, password: this.state.password };

        //if valid ...
        AuthService.login(body).then(
            (res) => {
                if (res) {
                    this.props.UserStore.setUser(JSON.parse(res));
                    this.props.history.push({
                        pathname: '/',
                    });
                    //  this.props.history.push({
                    //      pathname: '/',
                    //      state: {
                    //          user: res
                    //      }
                    //  });
                }
                // else {
                //     alert("Kullanıcı adı veya şifre yanlış")
                //     console.log("GİRİŞ YAPILAMADI")
                // }

                //   window.location.reload();
            },
            (error) => {
                alert("Kullanıcı adı veya şifre yanlış")
                console.log("GİRİŞ YAPILAMADI")
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log("ERROR LOGIN : ", resMessage)

                //   setLoading(false);
                //   setMessage(resMessage);
            }
        );


        // AuthService.login(body).then((res) => {
        //     if (res) {
        //         var r = this;
        //         console.log('RESPONSE : ', res);
        //         var user = JSON.parse(res);
        //         this.props.UserStore.setUser({
        //             name: user.name,
        //             userName: user.userName,
        //             email: user.email,
        //             password: user.password,
        //         });
        //         // StorageService.setToken(user);
        //         // this.props.history.push({
        //         //     pathname: '/',
        //         // });
        //         // this.props.history.push({
        //         //     pathname: '/',
        //         //     state: {
        //         //         user: res
        //         //     }
        //         // });
        //     } else {
        //         alert("Kullanıcı adı veya şifre yanlış")
        //         console.log("GİRİŞ YAPILAMADI")
        //     }
        // });
    }
    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <h1 className='login-container-header'>Giriş Yap</h1>
                    <form className='login-input-container' onSubmit={(event) => { this.validateForms(event) }}>
                        <div className="single-input-container">
                            <TextField
                                id='email'
                                type='email'
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
                                id='password'
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





export default withRouter(Login);