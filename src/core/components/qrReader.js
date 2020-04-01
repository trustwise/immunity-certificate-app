import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

class LegacyModeExample extends Component {
  constructor(props){
    super(props)
    this.handleScan = this.handleScan.bind(this)
    this.openImageDialog = this.openImageDialog.bind(this)
  }
  handleScan(result){
    if(result){
      this.props.setFieldValue('personalCode', result);
      this.props.submitForm && this.props.submitForm();
    }
  }
  handleError(err){
    console.error(err)
  }
  openImageDialog() {
    this.refs.qrReader1.openImageDialog()
  }
  render(){
    return(
      <div>
        <QrReader
          ref="qrReader1"
          className="qr-reader"
          delay={100}
          onError={this.handleError}
          onScan={this.handleScan}
          legacyMode
        />
        <input type="button" value="Scan QR Code" onClick={this.openImageDialog} />
      </div>
    )
  }
}

export default LegacyModeExample;