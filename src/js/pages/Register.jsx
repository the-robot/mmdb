import { Row, Col, Steps, Popover } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { WrappedRegisterForm } from '../components/Register/RegisterForm';
import { WrappedProfileSetup } from '../components/Register/ProfileSetup';
import CompleteMessage from '../components/Register/CompleteMessage';

import { reset } from '../actions/authentication/registerAction';

@connect((store) => {
  return {
    register_step: store.register.registration_step,
  };
})
export default class Register extends React.Component {
  componentWillUnmount() {
    //this.props.dispatch(reset());
  }

  render() {
    const STEP_COMPONENTS = [<WrappedRegisterForm />, <WrappedProfileSetup />, <CompleteMessage/>];
    const Current_Component = STEP_COMPONENTS[this.props.register_step];

    return (
      <div style={{ textAlign: 'center'}}>
        <h2> My Movie Database - Registration </h2>

        <Row type="flex" justify="center" style={{ padding: 42 }}>
          <Col span={12}>
            <Steps current={ this.props.register_step }>
              <Steps.Step title="Sign up" />
              {/* <Steps.Step title="Confirmation" /> */}
              <Steps.Step title="Profile setup" />
              <Steps.Step title="Complete" />
            </Steps>
          </Col>
        </Row>

        <Row type="flex" justify="center">
          <Col span={24}>
            { Current_Component }
          </Col>
        </Row>
      </div>
    );
  }
}