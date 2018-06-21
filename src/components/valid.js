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
  const message = props.validation.outcome
    ? (
      <div style={styles.success}>
        <h2>
          {props.validation.message}
        </h2>
      </div>
    )
    : (
      <div style={styles.fail}>
        <h2>{props.validation.message}</h2>
      </div>
    );

  return message;
};
export default valid;
