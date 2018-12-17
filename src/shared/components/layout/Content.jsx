import React from 'react';
import PropTypes from 'prop-types';

const Content = props => {
  const { children } = props;

  console.log(children);

  return (
    <main userState={this.state} _handleSubmit={this._handleSubmit} post={this.post} handleChange={this.handleChange}>
      {children}
    </main>
  );
};

Content.propTypes = {
  children: PropTypes.element.isRequired
};

export default Content;
