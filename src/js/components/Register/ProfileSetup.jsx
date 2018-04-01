import { Form, Input, Tooltip, Icon, Checkbox, Button, Upload, message } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { profile_setup } from '../../actions/authentication/registerAction';

@connect((store) => {
  return {
    username: store.register.username,
  };
})
class ProfileSetup extends React.Component {
  state = {
    avatar_uploaded: [],
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values['username'] = this.props.username;

        // get image file object
        if (this.state.avatar_uploaded.length != 0) {
          values['avatar'] = this.state.avatar_uploaded[0]
        } else {
          if (values['avatar'])
          delete values['avatar']
        }

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

    const upload_avatar_props = {
      accept: 'image/*',

      onRemove: (file) => {
        this.setState(({ fileList }) => {
          return {
            avatar_uploaded: [],
          };
        });
      },

      beforeUpload: (file) => {
        // const isJPG = file.type === 'image/jpeg';
        // if (!isJPG) {
        //   message.error('You can only upload JPG file!');
        //   return false;
        // }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
          return false;
        }

        this.setState(({ fileList }) => ({
          avatar_uploaded: [file],
        }));

        return false;
      },

      fileList: this.state.avatar_uploaded,
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
            <Input.TextArea autosize={{ minRows: 4, maxRows: 6 }} maxlength="200" />
          )}
        </FormItem>

        <FormItem {...formItemLayout}
          label={(
              <span>
                Profile Picture&nbsp;
              </span>
            )}
          >
            {getFieldDecorator('avatar', {
              rules: [{ required: false }],
            })(
              <Upload {...upload_avatar_props}
              >
                <Button>
                  <Icon type="upload" /> Select Image
                </Button>
              </Upload>
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