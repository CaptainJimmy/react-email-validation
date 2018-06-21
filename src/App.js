import React, { Component } from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import 'typeface-roboto';
import Valid from './components/valid';

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

const validation = email => {
  //make sure email has content
  if (email) {
    console.log('email received in validation', email);

    //first, we validate that there is an @ sign, and it only has two parts
    if (email.split('@').length !== 2) {
      console.log('does not contain 2 parts');
      return false;
    }
    let localName = email.split('@')[0];
    let domain = email.split('@')[1];
    let tld = domain.split('.')[domain.split('.').length - 1];
    console.log(localName, domain, tld);
    //make sure the localName has at least 1 char
    if (localName.split('').length < 1) {
      console.log(' localName less than one letter');
      return false;
    }
    // make sure the domain has at least 1 dot
    if (domain.split('.').length < 2) {
      console.log('domain less than one dot');
      return false;
    }
    return true;
    // check to see that the username (local-part) consists of legal charachters:
    // alphanumerics digits 0-9 special characters !#$%&'*+-/=?^_`{|}~; dot .,
    // provided that it is not the first or last character unless quoted, and
    // provided also that it does not appear consecutively unless quoted (e.g.
    // John..Doe@example.com is not allowed but "John..Doe"@example.com is allowed);
    // space and "(),:;<>@[\] characters are allowed with restrictions (they are
    // only allowed inside a quoted string, as described in the paragraph below, and
    // in addition, a backslash or double-quote must be preceded by a backslash);
    // comments are allowed with parentheses at either end of the local-part; e.g.
    // john.smith(comment)@example.com and (comment)john.smith@example.com are both
    // equivalent to john.smith@example.com. check to see that the domain consists
    // of legal format and charachters has at least 1 charachter and the top level
    // domain has at least 2 charachters uppercase and lowercase Latin letters A to
    // Z and a to z; digits 0 to 9, provided that top-level domain names are not
    // all-numeric; hyphen -, provided that it is not the first or last character.
    // check to see that the domain and TLD only have alphanumeric charachters
  } else {
    return false;
  }
};

class App extends Component {
  state = {
    validate: '',
    validateOutcome: null,
    submitted: false
    //validateMessage: ""
  };

  validator = event => {
    this.setState({ validate: event.target.value });
  };
  submitValidator = email => {
    console.log(email);
    console.log(`validateOutcome: ${validation(email)}`);
    this.setState(
      {
        validateOutcome: validation(email),
        submitted: true
      },
      () => console.log(`State Set: ${this.state.validateOutcome}`)
    );
  };

  render() {
    return (
      <Grid>
        <Grid container style={style.paper}>
          <Paper style={style.paper}>
            <Grid item xs={6} style={style.paper}>
              <label>
                <h2>Enter your email address to be validated:</h2>
                <input type="text" onChange={this.validator} />
              </label>
            </Grid>
            <Button
              variant="raised"
              color="primary"
              onClick={() => this.submitValidator(this.state.validate)}
            >
              Validate Me!
            </Button>
            {this.state.submitted ? (
              <Valid validated={this.state.validateOutcome} />
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default App;
