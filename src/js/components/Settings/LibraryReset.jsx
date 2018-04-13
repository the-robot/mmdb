import { Button, Row, Col, Modal, Input, message } from 'antd';
import { connect } from 'react-redux';
import React from 'react';
import withSizes from 'react-sizes';

import { reset_library } from '../../actions/settings/libraryAction';

@withSizes(({ width }) => ({
  isTablet: width < 768,
  isLargeTablet: width < 992,
}))
@connect((store) => {
  return {
    token: store.auth.token,
  };
})
export default class LibraryReset extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visible: false,

      delete_verification: null,
      compare_verification: 'RESET',

      // store error messages
      error_verification: null,
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  verifyForm() {
    let error_verification = false;

    if ( !this.state.delete_verification || this.state.delete_verification.length === 0 ) {
      this.setState({error_verification: 'Please enter ' + this.state.compare_verification + ' to verify.'});
      error_verification = true;
    }
    
    if ( !error_verification && this.state.delete_verification != this.state.compare_verification) {
      this.setState({error_verification: 'Verification code is incorrect.'});
      error_verification = true;
    }

    return ( error_verification ? true : false );
  }

  clearErrors() {
    this.setState({
      error_verification:  null,
    });
  }

  handleReset = (e) => {
    // clear error messages, and verify inputs again
    this.clearErrors();

    // do not submit, if there are errors in form
    if (this.verifyForm())
        return;

    reset_library(this.props.token)
    .then((response) => {
      message.success('All library data are removed.');

      // clear form and hide it
      this.setState({
        delete_verification: null,
        visible: false,
      })
    })

    .catch((err) => {
      message.error(err.response.data);
    })
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
          <h6 style={{ color: 'red', fontWeight: 'bold', paddingBottom: 10 }}> Reset Library </h6>
          <p> We'll immediately reset your library data. You will not be able to recover them. </p>
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
            style={{ width: '100%', fontWeight: 'bold' }}>Reset Library</Button>
        </Col>

        <Modal
          title="Are you sure you want to do this?"
          visible={ this.state.visible }

          okText='Reset'
          okType='danger'
          onOk={ this.handleReset }

          cancelText='Cancle'
          onCancel={ this.handleCancel }
        >
          <div>
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
          </div>
        </Modal>
      </Row>
    );
  }
}