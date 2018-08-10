import React, { Component } from 'react';

class TextField extends Component {
  render() {
    return <input className="pt-input" {...this.props} />;
  }
}

export default TextField;