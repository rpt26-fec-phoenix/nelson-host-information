import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hostName: '',
      dateJoin: '',
      hostDescription: '',
      isSuperHost: false,
      isVerified: false,
      profilePic: '',
      reviewCount: 0
    };
  }

  componentDidMount() {
    this.getHost();
  }

  getHost() {
    let url = window.location.href;
    let listingID = url.split('/')[3];

    $.ajax({
      url: `/${listingID}/host`,
      type: 'GET',
      success: (res) => {
        this.setState({
          hostName: res[0].hostName,
          dateJoin: res[0].dateJoin,
          hostDescription: res[0].hostDescription,
          isSuperHost: res[0].isSuperHost,
          isVerified: res[0].isVerified,
          profilePic: res[0].profilePic,
          reviewCount: res[0].reviewCount
        });
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }


  render() {
    return (
      <div className="App" style={{
        height: '100%',
        paddingTop: '48px',
        paddingLeft: '40px',
        paddingRight: '40px',
        maxWidth: '1280px',
        minWidth: '744px',
        marginLeft: '10%',
        marginRight: '10%'
      }}>
        {console.log(this.state)}
        <div>
          <img style={{
            borderRadius: '56%',
            height: '64px',
            width: '64px',
            background: 'white',
            display: 'inline-block'
          }}
          src={this.state.profilePic}/>
          <HostNameStyle>hosted by host name, date joined</HostNameStyle>
        </div>
        <div style={{borderBottomWidth: '1px', borderBottomStyle: 'solid', color: '#DDDDDD', paddingTop: '48px'}}></div>
      </div>
    );
  }
}

const HostNameStyle = styled.div`
  color: rgb(34, 34, 34);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;
const HostJoinedDateStyle = styled.div `
  color: rgb(113, 113, 113);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;

const HostDescriptionStyle = styled.div `
  color: var(--html-text-color, #222222);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  word-break: break-word;
  padding-right: 19%
`;


ReactDOM.render(<App />, document.getElementById('Host'));