import React, {Component} from 'react';
import {Grid, Paper, Button} from '@material-ui/core';
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
  //make sure email has content and is a string
  if (email && (typeof email === 'string')) {
    console.log(`${email} received in validation, has content, is string`);

    // does the email contain an @ sign, and it only has two parts. This is here
    // before the variables (breaking style because it is quicker to do a check on
    // large errors before parsing)

    if (email.split('@').length !== 2) {
      console.log(`${email} does not contain 2 parts`);
      return {message: `${email} does not contain 2 parts`, outcome: false}
    }

    // does the email contain comments? if so, strip them off and change the current
    // working email to a comment less email for better parsing  This is more a
    // setup for parsing than a rule

    let comment = ""
    let workingEmail = ""
    if (email.indexOf('(') !== -1 && email.indexOf(')') !== -1) {
      console.log(`${email} contains comments`)
      let beforeOpenParen = email.split('(')[0]
      comment = email
        .split('(')[1]
        .split(')')[0]
      let afterCloseParen = email.split(')')[1]
      workingEmail = beforeOpenParen + afterCloseParen

      console.log(`Working email: ${workingEmail} post edit with a comment: ${comment} `)
    } else {
      console.log(`${email} contains no comments, setting it to workingEmail`)
      workingEmail = email
    }

    // reusable variables for quick reference l1ater
    let localName = workingEmail.split('@')[0];
    let domain = workingEmail.split('@')[1];
    let tld = domain.split('.')[
      domain
        .split('.')
        .length - 1
    ];

    // MAIN RULES BODY  make sure the localName has at least 1 char but less than 64
    if (localName.split('').length < 1) {
      console.log(' localName less than one letter');
      return {message: `${email}'s local name (username) has less than one charachter`, outcome: false}
    }
    if (localName.split('').length > 63) {
      console.log(' localName has too many chars');
      return {message: `${email}'s local name (username) has too many chars, must be less than 64`, outcome: false}
    }

    // make sure the domain has at least 1 dot
    if (domain.split('.').length < 2) {
      console.log('domain less than one dot');
      return {message: `${email}'s domain has less than one dot`, outcome: false}
    }

    // function to check for valid charachters in usernames but outside the comments
    // (if present) with no quotes function to check for valid charachters in
    // username but outside the comments (if present) with no quotes function to
    // check for valid charachters in domain and TLD but outside the comments(if
    // present) domain has at least 2 charachters uppercase and lowercase Latin
    // letters A to Z and a to z; digits 0 to 9, provided that top-level domain
    // names are not all-numeric; hyphen -, provided that it is not the first or
    // last character. check to see that the domain and TLD only have alphanumeric
    // charachters Email is valid with comments
    if (comment) {
      console.log(`${email} contains comments`)
      // TO ADD, check for valid charachters outside the comment
      return {message: `${email}'s is technically valid, but contains comments`, outcome: true}
    }
    return {message: `${email}'s is valid`, outcome: true}
  } else {
    console.log(typeof email)
    return {message: `${email}'s is not a string or is undefined`, outcome: false}
  }
};

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

class App extends Component {
  state = {
    validate: '',
    validation: null,
    //validateMessage: ""
  };

  validateChangeHandler = event => {
    this.setState({validate: event.target.value});
  };
  submitValidator = email => {
    console.log(email);
    //console.log(`validateOutcome: ${validation(email)}`);
    this.setState({
      validation: validation(email)
    }, () => console.log(`State Set: ${this.state.validation.message} and ${this.state.validation.outcome}`));
  };

  render() {
    return (
      <Grid>
        <Grid container style={style.paper}>
          <Paper style={style.paper}>
            <Grid item xs={6} style={style.paper}>
              <label>
                <h2>Enter your email address to be validated:</h2>
                <input type="text" onChange={this.validateChangeHandler}/>
              </label>
            </Grid>
            <Button
              variant="raised"
              color="primary"
              onClick={() => this.submitValidator(this.state.validate)}>
              Validate Me!
            </Button>
            {this.state.validation
              ? (<Valid validation={this.state.validation}/>)
              : null}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default App;
