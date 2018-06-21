import React from 'react';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const styles = {
  success: {
    backgroundColor: green[600],
    color: 'white',
    margin: '5px',
    padding: '5px',
    borderRadius: '10px',
    border: '2px'
  },
  fail: {
    backgroundColor: red[600],
    color: 'white',
    margin: '5px',
    padding: '5px',
    borderRadius: '10px',
    border: '2px'
  }
};
const valid = props => {
  const pickle = props.validated ? (
    <div style={styles.success}>
      <h2> {props.validated ? 'Email address is valid' : null}</h2>
    </div>
  ) : (
    <div style={styles.fail}>
      <h2>{props.validated ? null : 'Email address is not valid'}</h2>
    </div>
  );

  return pickle;
};
export default valid;
