import React from 'react';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';

const styles = {
  "success": {
    backgroundColor: green[600],
    color: 'white',
    margin: '5px',
    padding: '5px',
    borderRadius: '10px',
    border: '2px'
  },
  "failure": {
    backgroundColor: red[600],
    color: 'white',
    margin: '5px',
    padding: '5px',
    borderRadius: '10px',
    border: '2px'
  },
  "warning": {
    backgroundColor: orange[600],
    color: 'white',
    margin: '5px',
    padding: '5px',
    borderRadius: '10px',
    border: '2px'
  }
};
const valid = props => (
  <div style={styles[props.validation.result]}>
    <h2>
      {props.validation.message}
    </h2>
  </div>
)

export default valid;
