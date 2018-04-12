import { Button, Row, Col, Modal, Input, message } from 'antd';
import { connect } from 'react-redux';
import React from 'react';
import withSizes from 'react-sizes';

@withSizes(({ width }) => ({
  isTablet: width < 768,
  isLargeTablet: width < 992,
}))
@connect((store) => {
  return {
    username: store.auth.username,
  };
})
export default class AccountDelete extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visible: false,

      username: null,
      delete_verification: null,
      compare_verification: 'DELETE',
      password: null,

      // store error messages
      error_username: null,
      error_verification: null,
      error_password: null,
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  verifyForm() {
    let error_username = false;
    let error_verification = false;

    if ( !this.state.username || this.state.username.length === 0 ) {
      this.setState({error_username: 'Please enter the username.'});
      error_username = true;
    }
    
    if ( !this.state.delete_verification || this.state.delete_verification.length === 0 ) {
      this.setState({error_verification: 'Please enter `DELETE` below to verify.'});
      error_verification = true;
    }
    
    if ( !error_username && this.state.username != this.props.username) {
      this.setState({error_username: 'Username is incorrect.'});
    }
  
    if ( !error_verification && this.state.delete_verification != this.state.compare_verification) {
      this.setState({error_verification: 'Verification code is incorrect.'});
    }

    if ( !this.state.password || this.state.password.length === 0 ) {
      this.setState({error_password: 'Please enter the password.'})
    }
  }

  clearErrors() {
    this.setState({
      error_username: null,
      error_verification:  null,
      error_password: null,
    });
  }

  handleDelete = (e) => {
    // clear error messages, and verify inputs again
    this.clearErrors();
    this.verifyForm();

    // this.setState({
    //   visible: false,
    // });

    console.log(this.state.username);
    console.log(this.state.password);
    console.log(this.state.delete_verification);
  }

  handleCancel = (e) => {
    // remove error messages on close
    this.clearErrors();

    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <Row type="flex" justify="start">
        <Col span={24}>
          <h6 style={{ color: 'red', fontWeight: 'bold', paddingBottom: 10 }}> Delete Account </h6>
          <p> Once you delete your account, there is no going back. Please be certain. <br/>
              We'll immediately delete all your data. </p>
        </Col>

        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 6, offset: 0 }}
          lg={{ span: 6, offset: 0 }}
          xl={{ span: 5, offset: 0 }}
        >
          <Button
            type="danger"
            onClick={ this.showModal }
            style={{ width: '100%', fontWeight: 'bold' }}>Delete Account</Button>
        </Col>

        <Modal
          title="Are you sure you want to do this?"
          visible={ this.state.visible }

          okText='Delete'
          okType='danger'
          onOk={ this.handleDelete }

          cancelText='Cancle'
          onCancel={ this.handleCancel }
        >
          <div>
            <p style={{ fontWeight: 'bold', marginBottom: 5 }}> Username: </p>
            <div style={{ paddingBottom: 5 }}>
              <Input
                type="text"
                style={{ width: '100%' }}
                value={ this.state.username }
                onChange={evt => this.setState({username: evt.target.value})}
              />
            </div>
            <p style={{ color: 'red' }}>{ this.state.error_username }</p>

            <p style={{ marginBottom: 5 }}>
              <b> To verify, type</b> <i>{ this.state.compare_verification }</i> <b>below:</b>
            </p>
            <div style={{ paddingBottom: 5 }}>
              <Input
                type="text"
                style={{ width: '100%' }}
                value={ this.state.delete_verification }
                onChange={evt => this.setState({delete_verification: evt.target.value})}
              />
            </div>
            <p style={{ color: 'red' }}>{ this.state.error_verification }</p>

            <p style={{ fontWeight: 'bold', marginBottom: 5 }}> Password: </p>
            <div>
              <Input
                type="password"
                style={{ width: '100%' }}
                value={ this.state.password }
                onChange={evt => this.setState({password: evt.target.value})}
              />
            </div>
            <p style={{ color: 'red' }}>{ this.state.error_password }</p>
          </div>
        </Modal>
      </Row>
    );
  }
}