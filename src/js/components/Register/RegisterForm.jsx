import { Form, Input, Tooltip, Icon, Checkbox, Button, message } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { signup, get_token } from '../../actions/authentication/registerAction';

@connect((store) => {
  return {
    // states
    sending: store.register.sending,
    error: store.register.error,
  };
})
class RegisterForm extends React.Component {
  state = {
    confirmDirty: false,
    registerButtonClickable: true,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // remove redundant confirm_password and agreeement attribute
        delete values.confirm_password;
        delete values.agreement;

        this.props.dispatch({type: "REGISTRATION_SENDING"});

        // chain axios calls
        signup(values)
          .then((response) => {
            this.props.dispatch({ type: "REGISTRATION_SIGNUP_SUCCESS" });

            // if registration successful
            // get token for profile setup
            get_token(values.username, values.password)
              .then((response) => {
                this.props.dispatch({type: "REGISTRATION_SAVE_TOKEN", payload: response.data});
              })

              .catch((err) => {
                this.props.dispatch({type: "REGISTRATION_SIGNUP_REJECTED", payload: err.response});
              })
          })
    
          .catch((err) => {
            // show error message to user
            if ('email' in err.response.data)
              message.error(err.response.data['email'][0])
    
            else if ('username' in err.response.data)
              message.error(err.response.data['username'][0])
    
            else if ('password' in err.response.data)
              message.error(err.response.data['password'][0])
    
            this.props.dispatch({type: "REGISTRATION_SIGNUP_REJECTED", payload: err.response.data});
          })
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback("Passwords don't match");
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  updateRegisterButtonClickable = (e) => {
    this.setState({
      registerButtonClickable: !e.target.checked,
    });
  }

  render() {
    const getFieldDecorator = this.props.form.getFieldDecorator;
    const FormItem = Form.Item;    

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 6, offset: 0},
        lg: { span: 4, offset: 4},
        xl: { span: 4, offset: 5},
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12, offset: 0},
        lg: { span: 8, offset: 0},
        xl: { span: 6, offset: 0},
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 12,
          offset: 6,
        },
      },
    };

    return (
      <Form onSubmit={ this.handleSubmit }>
        <FormItem
          {...formItemLayout}
          label="Email"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid email!',
            }, {
              required: true, message: 'Please input your email!',
            }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Username&nbsp;
              <Tooltip title="Username will be used to login">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm_password', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={ this.handleConfirmBlur } />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox onChange={ this.updateRegisterButtonClickable }>I have read the <a href="">agreement</a></Checkbox>
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit"
            disabled={ this.state.registerButtonClickable }>Register</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegisterForm = Form.create({})(RegisterForm);
export { WrappedRegisterForm }
export default WrappedRegisterForm;