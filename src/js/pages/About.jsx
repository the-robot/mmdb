import React from 'react';

export default class About extends React.Component {
  componentDidMount() {
    document.title = "About MMDB";
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <p style={{
            margin: 0,
            color: '#0F4A8A',
            fontFamily: 'Do Hyeon',
            fontSize: 63,
          }}>MMDB</p>
        </div>

        <h4> About My Movie Database </h4>
        <p style={{ fontSize: 15 }}>
          My Movie Database helps you keep track of your movies and tv shows.
          You can showcase shows you love on your profile and also findout what other
          people are enjoying. If you think the movie trailer you just saw looks awesome, you
          can put that on your watchlist to see later.
        </p>
        
        <p style={{ fontSize: 15 }}>
          With MMDB, you can have your own personalized watchlist as you explore many awesome films on the platform.
        </p>

        <p style={{ fontSize: 15 }}>
          If you encountered any problems while using the app, you can email to <a href="mailto:mmdatabase@gmail.com">mmdatabase@gmail.com</a>
        </p>
      </div>
    );
  }
}
