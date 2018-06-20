import React, {Component} from 'react';
import {Grid, Paper, Button} from '@material-ui/core';
import 'typeface-roboto';

const style = {
  paper: {
    "padding": "30px",
    "margin": "30px"
  }
}

const validation = {
  message: (email) => {
    return "Message Here"
  },
  boolean: (email) => {
    console.log("email received in validation.boolean", email)
  }
}

class App extends Component {
  state = {
    validate: "",
    validateOutcome: null,
    //validateMessage: ""
  }

  validator = (event) => {
    this.setState({validate: event.target.value})
  }
  submitValidator = (email) => {
    console.log(email)
    this.setState({
      validateOutcome: validation.boolean(email)
    })

  }

  render() {
    return (
      <div className="App">
        <Grid container style={style.paper}>
          <Paper style={style.paper}>
            <Grid item xs={6} style={style.paper}>
              <label>
                <h2>Enter your email address to be validated:</h2>
                <input type="text" onChange={this.validator}/>
              </label>
            </Grid>
            <Button
              variant="raised"
              color="primary"
              onClick={() => this.submitValidator(this.state.validate)}>
              Validate Me!
            </Button>
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default App;
