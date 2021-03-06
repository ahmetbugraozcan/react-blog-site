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
import { inject, observer } from 'mobx-react';

class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.state = { password: '', email: '', name: '', username: '', show: false };
  }

  validateAllForms(event) {
    event.preventDefault();

    const body = { name: this.state.name, username: this.state.username, email: this.state.email, password: this.state.password };

    // AuthService.signUp(body).then((value) => {
    //   console.log("VALUE: ", value)
    //   if (value) {
    //     this.setState({ show: true });
    //   }
    // });

    AuthService.signUp(body).then(
      (response) => {
        // setMessage(response.data.message);
        // setSuccessful(true);
        console.log("SIGNUP SAYFASI RESPONSE : ", response)
        if (response) {
          this.setState({ show: true });
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log("ERROR SIGNUP : ", resMessage)

        // setMessage(resMessage);
        // setSuccessful(false);
      }
    );
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
                id='name'
                type='name'
                name='name'
                error={this.state.name === ""}
                helperText={this.state.name === "" ? 'L??tfen ge??erli bir isim giriniz.' : ' '}
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
                id='username'
                type='username'
                name='username'
                error={this.state.username === ""}
                helperText={this.state.username === "" ? 'L??tfen ge??erli bir kullan??c?? ad?? giriniz.' : ' '}
                onChange={event => this.setState({ username: event.target.value })}
                className="single-input-container"
                label="Kullan??c?? Ad??"
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
                id='email'
                type='email'
                name='email'
                error={this.state.email === ""}
                helperText={this.state.email === "" ? 'L??tfen ge??erli bir e-posta giriniz.' : ' '}
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
                id='password'
                name='password'
                error={this.state.password === ""}
                helperText={this.state.password === "" ? 'L??tfen ge??erli bir ??ifre giriniz.' : ' '}
                onChange={event => this.setState({ password: event.target.value })}
                className="single-input-container"
                label="??ifre"
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
                <div className='social-media-button-text'>Gmail ile giri?? yap</div>
              </Button>
              <Button
                startIcon={<FaFacebookF color="#FFFFFF" style={{ marginLeft: '10px' }} />}
                variant='contained'
                className='facebook-button'>
                <div className='social-media-button-text'>Facebook ile giri?? yap</div>
              </Button>
            </div>
          </form>
          <div style={{ marginTop: '5%' }}>Zaten bir hesab??n var m???</div>
          <div style={{ marginTop: '3%' }}><Link to='login' className='text-link'><b>Giri?? yap</b></Link></div>
        </div>
      </div>
    );
  }

}

export default Signup;

