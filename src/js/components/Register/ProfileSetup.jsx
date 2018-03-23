import { Form, Input, Tooltip, Icon, Checkbox, Button } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { profile_setup } from '../../actions/registerAction';

@connect((store) => {
  return {
    username: store.register.username,
    // states
    sending: store.register.sending,
    error: store.register.error,
  };
})
class ProfileSetup extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values['username'] = this.props.username;
        this.props.dispatch(profile_setup(values));
      }
    });
  }

  render() {
    const getFieldDecorator = this.props.form.getFieldDecorator;
    const FormItem = Form.Item;    

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8, offset: 1 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 6 },
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
          label={(
            <span>
              Name
            </span>
          )}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Description&nbsp;
              <Tooltip title="Talk about yourself.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('description', {
            rules: [{ required: false, whitespace: true }],
          })(
            <Input.TextArea />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Save</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedProfileSetup = Form.create({})(ProfileSetup);
export { WrappedProfileSetup }
export default WrappedProfileSetup;