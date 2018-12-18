import React from 'react';
import PropTypes from 'prop-types';

const Content = props => {
  const { children } = props.children;
  //const { handleChangeFieldRegister } = props.handleChangeFieldRegister;   

  //<main>{...props}</main>
  //<main children={children} userState={props.userState} />
  
  
  console.log(props); 
  /*let props = {
    children:children,
    userState:props.userState
  }*/
  return (
    
    
    <main>{props.children}</main>
    
  );
};

Content.propTypes = {
  children: PropTypes.element.isRequired,
  //handleChangeFieldRegister: PropTypes.func.isRequired
};

export default Content;
