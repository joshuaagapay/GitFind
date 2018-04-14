import React, { Component } from 'react';

const withCollection = collection => (WrappedComponent) => {
  return class WithCollection extends Component {
    render() {
      return <WrappedComponent {...this.props} {...this.state} collection={collection} />;
    }
  };
};

export default withCollection;
