import React, { Component } from 'react';
import { Grid, Paper, Button, Input } from '@material-ui/core';
import 'typeface-roboto';
import Valid from './components/valid';
import validation from './validation';

const style = {
  paper: {
    padding: '30px',
    margin: '30px'
  },
  bg: {
    backgroundColor: 'purple',
    padding: '0px',
    margin: '0px'
  }
};

class App extends Component {
  state = {
    validate: '',
    validation: null
  };

  validateChangeHandler = event => {
    this.setState({ validate: event.target.value });
  };
  submitValidator = email => {
    this.setState({
      validation: validation(email)
    });
  };

  render() {
    return (
      <Grid>
        <Grid container style={style.paper}>
          <Paper style={style.paper}>
            <h4>
              This uses no regex or HTML5 validators, only raw javascript inside
              a react UI
            </h4>
            <Grid item xs={6} style={style.paper}>
              <label>
                <h4>Enter your email address to be validated:</h4>
                <Input type="text" onChange={this.validateChangeHandler} />
              </label>
            </Grid>
            <Button
              variant="raised"
              color="primary"
              onClick={() => this.submitValidator(this.state.validate)}
            >
              Validate Me!
            </Button>
            {this.state.validation ? (
              <Valid validation={this.state.validation} />
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default App;
