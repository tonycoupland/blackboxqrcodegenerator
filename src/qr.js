import React from 'react';
import './index.css';

var crypto = require('crypto');
var qrCode = require('qrcode');


class QR extends React.Component {
  constructor() {
    super();

	let key = Buffer.from('blackbox', 'utf-8');
	let date = ''+Math.floor((new Date().getTime() / 86400000) + 2440587.5);

    this.state = {
      key: key,
      date: date,
      qr: '',
      hash: '',
      table: ''
    };
  }

	componentDidMount(){
		let message = Buffer.from(this.props.colour.symbol + this.state.date, 'utf-8');
		let hash = crypto.createHmac('sha256', this.state.key).update(message).digest('hex').substring(0,5);

		let qrData = this.props.colour.symbol + '✨' + hash;
		let qrBytes = Buffer.from(qrData, 'utf-8');

		let segs = [
		    { data: qrBytes, mode: 'bytes' }
		  ];

		qrCode.toDataURL(segs, { errorCorrectionLevel: 'Q', color : {dark : this.props.colour.dark, light: this.props.colour.light} }, (err, url) => {
		    this.setState({
		      qr: url,
		      hash: hash
		    });
		});

	}

  render() {    

    return (
    <div>
      <img alt={this.props.colour.symbol + '✨' + this.state.hash} src={this.state.qr} width="200px" height="200px"/>
    </div>
    );
  }
}




class QRHash extends React.Component {
  constructor() {
    super();

	let key = Buffer.from('blackbox', 'utf-8');
	let date = '2457884';

    this.state = {
	  colours: [
	  	{symbol:'💠', light:'#ffffffff', dark:'#3d53a6ff'},
	  	{symbol:'💟', light:'#ffffffff', dark:'#a23463ff'},
	  	{symbol:'✴️', light:'#ffffffff', dark:'#1b9a83ff'}
	  	],
      key: key,
      date: date
    };
  }

  renderQRCode(colour) {
    return (
    	<QR colour={colour}/>
		);
  }

  render() {    
    return (
      <div>
      {this.renderQRCode(this.state.colours[0])}
      {this.renderQRCode(this.state.colours[1])}
      {this.renderQRCode(this.state.colours[2])}
    </div>
    );
  }
}

export default QRHash;