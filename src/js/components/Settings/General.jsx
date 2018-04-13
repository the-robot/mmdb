import { Avatar, Button, Divider, Icon, Input, Row, Col, Select, DatePicker, Spin, Upload, message } from 'antd';
import { connect } from 'react-redux'
import React from 'react';
import moment from 'moment';
import withSizes from 'react-sizes';

import { get_profile, reset_profile } from '../../actions/profile/profileAction';
import { ENGINE_METHOD_DIGESTS } from 'constants';
import { update_profile } from '../../actions/settings/generalAction';

@withSizes(({ width }) => ({
  isTablet: width < 768,
  isLargeTablet: width < 992,
}))
@connect((store) => {
  return {
    username: store.auth.username,
    token: store.auth.token,

    // profile data
    name: store.profile.name,
    avatar: store.profile.avatar,
    gender: store.profile.gender,
    birthday: store.profile.birthday,
    location: store.profile.location,
    description: store.profile.description,

    // profile state
    profile_fetched: store.profile.fetched,
  };
})
export default class General extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // check if profile is initialized or not
      profile_init: false,

      name: null,
      avatar: null,
      gender: null,
      birthday: null,
      location: null,
      description: null,

      // store pre-uploaded avatar
      avatar_uploaded: [],
    }
  }

  initializeFormValues() {
    this.setState({
      profile_init: true,
  
      name: this.props.name,
      avatar: this.props.avatar,
      gender: this.props.gender,
      birthday: this.props.birthday,
      location: this.props.location,
      description: this.props.description,
    });
  }

  handleSubmit() {
    let values = {
      name: this.state.name,
      gender: this.state.gender,
      birthday: this.state.birthday,
      location: this.state.location,
      description: this.state.description,
    }

    // get image file object
    if (this.state.avatar_uploaded.length != 0)
      values['avatar'] = this.state.avatar_uploaded[0]

    if (values.name != this.props.name ||
        values.gender != this.props.gender ||
        values.birthday != this.props.birthday ||
        values.location != this.props.location ||
        values.description != this.props.description ||
        this.state.avatar_uploaded.length != 0) {

      this.props.dispatch(update_profile(this.props.token, values));
      // clear pre-uploaded image
      this.setState({ avatar_uploaded: [] });
    }
  }

  render() {
    if ( !this.props.profile_fetched && this.props.username != undefined ) {
      this.props.dispatch(get_profile( this.props.username ));
    }

    // name is must have input field.
    // if state.name is undefined and profile is already fetched
    // save props data into state
    if ( this.props.profile_fetched && this.state.profile_init == false  ) {
      this.initializeFormValues();
    }

    // if profile is not fetched yet, show loading
    if ( !this.props.profile_fetched ) {
      return (
        <div>
          <div style={{ textAlign: 'center' }}>
            <Spin/>
          </div>
        </div>
      );
    }

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
          message.error('Image must smaller than 2MB');
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
      <Row type="flex" justify="start">
        <Col 
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 6, offset: 0 }}
          lg={{ span: 6, offset: 0 }}
          xl={{ span: 5, offset: 0 }}
        >
          <div style={{ textAlign: (this.props.isTablet ? 'center' : 'left') }}>
            <h6 style={{ paddingBottom: 10 }}> Profile Picture </h6>

            <div style={{ paddingLeft: (this.props.isTablet ? 0 : 10) }}>
              { this.props.avatar
              ? <img
                  src={ this.props.avatar }
                  style={{ height: 135, width: 150, borderRadius: '50%' }}
                />

              : <Avatar style={{ backgroundColor: '#3E91F7', paddingTop: 50, 
                  height: 135, width: 150, borderRadius: '50%', fontSize: 50
                }}>
                { this.state.name != null
                ? this.state.name.charAt(0).toUpperCase()
                : '' 
                }
                </Avatar>
              }

              <div style={{ paddingTop: 10, paddingBottom: 20 }}>
                <Upload {...upload_avatar_props}>
                  <Button>
                    <Icon type="upload"/> Select Image
                  </Button>
                </Upload>
              </div>
            </div>
          </div>
        </Col>

        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 17, offset: 1 }}
          lg={{ span: 17, offset: 1 }}
          xl={{ span: 18, offset: 1 }}
        >
          <div>
            <h6> Name </h6>
            <Input
              style={{ width: (this.props.isLargeTablet ? '100%' : '60%') }}
              value={ this.state.name }
              onChange={evt => this.setState({name: evt.target.value})}
            />
          </div>

          <div style={{ paddingTop: 30 }}>
            <h6> Birthday </h6>
              <DatePicker
                style={{ width: (this.props.isLargeTablet ? '100%' : '40%') }}
                value={ this.state.birthday != null ? moment(this.state.birthday, 'YYYY-MM-DD') : null }
                onChange={evt => this.setState({
                  birthday: evt != null ? evt.format('YYYY-MM-DD') : null,
                })}
              />
          </div>

          <div style={{ paddingTop: 30 }}>
            <h6> Gender </h6>
            <Select
              style={{ width: (this.props.isLargeTablet ? '100%' : '30%') }}
              defaultValue={ this.props.gender ? this.props.gender : null }
              onChange={ evt => this.setState({gender: evt}) }>
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="It's a secret">It's a secret</Select.Option>
            </Select>
          </div>

          <div style={{ paddingTop: 30 }}>
            <h6> Location </h6>
            <Input
              style={{ width: (this.props.isLargeTablet ? '100%' : '60%') }}
              value={ this.state.location }
              onChange={evt => this.setState({location: evt.target.value})}
            />
          </div>

          <div style={{ paddingTop: 30 }}>
            <h6> Bio </h6>
            <Input.TextArea
              style={{ width: (this.props.isLargeTablet ? '100%' : '80%')  }}
              autosize={{ minRows: 4, maxRows: 6 }}
              maxLength="200"
              placeholder="Tell us about yourself"
              value={ this.state.description }
              onChange={evt => this.setState({description: evt.target.value})}
            />
          </div>

          <div style={{ paddingTop: 35 }}>
            <Button
              type="primary"
              style={{ width: (this.props.isLargeTablet ? '100%' : '25%')}}
              onClick={() => this.handleSubmit()}
            >
              Update Profile
            </Button>
          </div>
          
        </Col>
      </Row>
    );
  }
}