import React, { Component, Fragment } from 'react'
import QrReader from 'react-qr-reader'

import { Button } from '/core/forms/fields';


class LegacyQrReader extends Component {
  constructor(props) {
    super(props);
    this.handleScan = this.handleScan.bind(this);
    this.openImageDialog = this.openImageDialog.bind(this);
  }
  handleError(err) {
    console.error(err);
  }
  handleScan(result) {
    const { onScan } = this.props;
    onScan(result);
  }
  openImageDialog() {
    this.refs.qrReader1.openImageDialog();
  }
  render() {
    const { disabled } = this.props;
    return(
      <Fragment>
        <QrReader
          ref="qrReader1"
          className="qr-reader"
          delay={100}
          onError={this.handleError}
          onScan={this.handleScan}
          legacyMode
        />
        <Button onClick={this.openImageDialog} disabled={disabled}>
          {disabled ? 'Loading...' : 'Scan QR Code'}
        </Button>
      </Fragment>
    )
  }
}

export default LegacyQrReader;
