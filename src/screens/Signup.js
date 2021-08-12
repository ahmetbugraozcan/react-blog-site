import { InputAdornment, Button, Input, TextField } from '@material-ui/core';
import { PersonOutline, LockOutlined, MailOutline, FaceOutlined } from '@material-ui/icons';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import AuthService from "../services/AuthService";
import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../components/modal/Modal'



class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = { password: '', email: '', name: '', userName: '', show: false };
  }

  validateAllForms(event) {
    event.preventDefault();

    const body = { name: this.state.name, userName: this.state.userName, email: this.state.email, password: this.state.password };

    //400 alıyoruz bakalım buna
    AuthService.signUp(body).then((value) => {
      console.log("VALUE: ", value)
      if (value) {
        this.setState({ show: true });
      }
    });
  }

  closeModal() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div className='signup-background'>

        {this.state.show && <Modal
          onClose={this.closeModal.bind(this)}
        />

        }
        <div className='signup-container'>
          <h1 className='signup-container-header'>Kaydol</h1>
          <form className='signup-input-container' onSubmit={(event) => { this.validateAllForms(event) }}>
            <div>
              <TextField
                error={this.state.name === ""}
                helperText={this.state.name === "" ? 'Lütfen geçerli bir isim giriniz.' : ' '}
                onChange={event => this.setState({ name: event.target.value })}
                className="single-input-container"
                label="Ad-Soyad"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaceOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="single-input-container">
              <TextField
                error={this.state.userName === ""}
                helperText={this.state.userName === "" ? 'Lütfen geçerli bir kullanıcı adı giriniz.' : ' '}
                onChange={event => this.setState({ userName: event.target.value })}
                className="single-input-container"
                label="Kullanıcı Adı"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="single-input-container">
              <TextField
                error={this.state.email === ""}
                helperText={this.state.email === "" ? 'Lütfen geçerli bir e-posta giriniz.' : ' '}
                onChange={event => this.setState({ email: event.target.value })}
                className="single-input-container"
                label="E-Posta"
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
                label="Şifre"
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
              className='signup-button'
            ><div className='signup-button-text'>Kaydol</div>
            </Button>
            <p className='signup-with-others-paragraph' >Veya</p>
            <div className='social-media-signup-container'>
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
          <div style={{ marginTop: '5%' }}>Zaten bir hesabın var mı?</div>
          <div style={{ marginTop: '3%' }}><Link to='login' className='text-link'><b>Giriş yap</b></Link></div>
        </div>
      </div>
    );
  }

}

export default withStyles({ withTheme: true })(Signup);

