import React from 'react';
import { GoVerified } from 'react-icons/go';
import PropTypes from 'prop-types';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
      }
    
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
      }
    
      /**
       * Set the wrapper ref
       */
      setWrapperRef(node) {
        this.wrapperRef = node;
      }
    
      /**
       * Alert if clicked on outside of element
       */
      handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
         
            this.closeModal();
        }
      }

      closeModal() {
            this.props.onClose();
    }
      
    render() {
        return (
            <div className='modal'>
                <div  className='modal-content'>
                    <div ref={this.setWrapperRef} className="modal-header">
                        <div className='header-with-icon'>
                            <GoVerified size={24} style={{ 'marginRight': '5px' }}></GoVerified>
                            <h2>Kayıt Başarılı!</h2>
                        </div>
                        <span onClick={() => {
                           this.closeModal();
                        }} className="close">&times;</span>
                    </div>
                    <div className="modal-body">
                        <p>Kaydınız başarıyla tamamlandı. Lütfen kayıt olduğunuz hesap ile giriş yapın.</p>
                    </div>
                </div>
            </div>

        )
    }

}
Modal.propTypes = {
    onClose: PropTypes.func
}



