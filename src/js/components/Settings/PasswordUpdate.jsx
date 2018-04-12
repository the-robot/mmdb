import { Form, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { update_password } from '../../actions/settings/securityAction';

@connect((store) => {
  return {
    token: store.auth.token,
  };
})
class PasswordUpdate extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // remove confirmation password
        delete values['confirm_password'];
       
        update_password(this.props.token, values)
          .then((response) => {
            message.success('Password updated');
            this.props.form.resetFields();
          })

          .catch((err) => {
            message.error(err.response.data);
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
    if (value && value !== form.getFieldValue('new_password')) {
      callback("Passwords don't match");
    } else {
      callback();
    }
  }

  render() {
    const getFieldDecorator = this.props.form.getFieldDecorator;
    const FormItem = Form.Item;    

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 6, offset: 1},
        lg: { span: 6, offset: 3},
        xl: { span: 6, offset: 3},
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
          span: 24,
          offset: 0,
        },
        md: {
          span: 6,
          offset: 10,
        },
        lg: {
          span: 6,
          offset: 10,
        },
        xl: {
          span: 4,
          offset: 10,
        }
      },
    };

    return (
      <Form onSubmit={ this.handleSubmit }>
        <h6 style={{ paddingBottom: 10 }}> Password Update </h6>
        <FormItem
          {...formItemLayout}
          label="Old Password"
        >
          {getFieldDecorator('old_password', {
            rules: [{
              required: true, message: 'Please input your old password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="New Password"
        >
          {getFieldDecorator('new_password', {
            rules: [{
              required: true, message: 'Please input your new password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Confirm New Password"
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
          <Button type="primary" htmlType="submit"
                  style={{ width: '100%' }}>Update Password</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedPasswordUpdate = Form.create({})(PasswordUpdate);
export { WrappedPasswordUpdate }
export default WrappedPasswordUpdate;