const validChars = require('./validChars');

//This module validates an email without regex or an outside validator.  It can be used and imported as a react module or required for node applications.
//It takes in a string of an email and returns an object with 3 properties:
// message:  (String) for displaying in a UI or CLI
// outcome: (Boolean)
// result: (String) contains success, failure, or warning, for content or component styling
//
// this algorithm is broken down into 3 main parts:
//
// Pre Parse Validation
//=====================
//
// some easy checks are done to weed out the larger mistakes such as no username, 2 @'s etc
// if a comments field is found in either the domain or the username the comments are stripped out as to not create a false negative
//
// Domain Name and TLD Validation
//==============================
//
// Make sure the domain adheres to the standard, does not contain illegal characters or illegal formatting such as all numbers in the domain or TLD
//Chars are checked against an array of allowed characters.  All alphabetic chars are verified in lower case.
//
// User Name (localname) Validation
//=================================
//
// make sure the localname adheres to the standard, does not contain illegal chars, adheres to length restrictions
//if quotes are found they are stripped off because they adhere to different rules as long as there are two quotes and they are surrounding that char.  one quote is a failure because it is not to standard
//Chars are checked against an array of allowed characters.  All alphabetic chars are verified in lower case.

const validation = email => {
  //
  //Pre Parse Validation
  //======================
  //
  //make sure email has content and is a string

  if (email && typeof email === 'string') {
    // does the email contain an @ sign?, Does it it only have two parts? This is
    // here before the variables because it is quicker to do a check on large errors
    // before parsing and possibly breaking the code.

    if (email.split('@').length !== 2) {
      return {
        message: `${email} does not contain 2 parts`,
        outcome: false,
        result: 'failure'
      };
    }

    // does the email contain comments? if so, strip the comments off and change the current
    // working email to a comment-less email for better parsing  This is more a
    // setup for parsing than a rule

    let comment = '';
    let workingEmail = '';
    if (email.indexOf('(') !== -1 && email.indexOf(')') !== -1) {
      let beforeOpenParen = email.split('(')[0];
      comment = email.split('(')[1].split(')')[0];
      let afterCloseParen = email.split(')')[1];
      workingEmail = beforeOpenParen + afterCloseParen;
    } else {
      workingEmail = email;
    }

    // parsed reusable variables for quick reference later
    let localName = workingEmail.split('@')[0];
    let domain = workingEmail.split('@')[1];
    let domainName = domain.split('.')[domain.split('.').length - 2];
    let tld = domain.split('.')[domain.split('.').length - 1];
    //
    //
    // MAIN RULES BODY
    //================
    //
    //
    //make sure the domain has at least 1 dot
    if (domain.split('.').length < 2) {
      return {
        message: `${email}'s domain has less than one dot`,
        outcome: false,
        result: 'failure'
      };
    }

    //
    //DOMAIN CHECKS
    //==============
    // first check for length of TLD and domain name to be less than 2 chars

    if (domainName.length < 2 || tld.length < 2) {
      return {
        message: `${email}'s domain has less than the required two chars`,
        outcome: false,
        result: 'failure'
      };
    } else {
      //

      //The reference below calls domainValidChar function, which checks for most of the
      // rules applicable to domain  and returns a boolean

      if (!domainValidChar(domain)) {
        return {
          message: `${email}'s domain contains a non-allowed character or a character in a not allowed position`,
          outcome: false,
          result: 'failure'
        };
      }

      // The function domainValidChar below makes sure the domain has at least 2 charachters uppercase and lowercase Latin letters A to
      // Z and a to z; digits 0 to 9, provided that  domain names are not
      // all-numeric; hyphen -, provided that it is not the first or last character.
      // it also check to see that the domain and TLD only have alphanumeric chars. It returns a boolean for pass/fail
      //
      function domainValidChar(dom) {
        const domArray = dom.split('');
        let result = true;

        domArray.forEach(letter => {
          if (validChars.domain.normal.indexOf(letter.toLowerCase()) < 0) {
            result = false;
          }
        });
        if (
          domArray[0] === '.' ||
          domArray[-1] === '.' ||
          domArray[0] === '-' ||
          domArray[-1] === '-' ||
          dom.indexOf('..') > -1
        ) {
          result = false;
        } else {
          dom.split('.').forEach(word => {
            if (word[0] === '-' || word[word.length - 1] === '-') {
              result = false;
            }
          });
          dom.split('.').forEach(word => {
            let numberCounter = 0;
            word.split('').forEach(letter => {
              if (validChars.domain.numeric.includes(letter)) {
                numberCounter++;
              }
            });
            if (numberCounter === word.length) {
              result = false;
            }
          });
          return result;
        }
      }
    }

    //USERNAME CHECKS!
    //=================
    //
    //make sure the localName has at least 1 char but less than 64
    if (localName.length < 1) {
      return {
        message: `${email}'s local name (username) has less than one character`,
        outcome: false,
        result: 'failure'
      };
    }
    if (localName.length > 63) {
      return {
        message: `${email}'s local name (username) has too many chars, must be less than 64`,
        outcome: false,
        result: 'failure'
      };
    }
    //The reference below calls userNameValidator function, which checks for most of the
    // rules applicable to username legal and illegal chars and returns a boolean
    if (!userNameValidator(localName)) {
      return {
        message: `${email}'s username contains a non-allowed character or a character in a not allowed position`,
        outcome: false,
        result: 'failure'
      };
    }

    // if email passes above rules but has a comment, it sends this message with a
    // warning
    if (comment) {
      return {
        message: `${email}'s is technically valid, but contains comments`,
        outcome: true,
        result: 'warning'
      };
    }

    //success!
    return { message: `${email}'s is valid`, outcome: true, result: 'success' };
  } else {
    //failure on type
    return {
      message: `${email}'s is not a string or is undefined`,
      outcome: false,
      result: 'failure'
    };
  }
  //The function below, userNameValidator checks for illegal characters by comparing the letters against an array, and checks for the presence of quotes.
  //quotes are allowed in the user name provided there are 2 of them.  the content of the quotes is compared against a different array,
  // making sure the characters inside the quotes are legal.  The function returns a boolean for pass/fall

  function userNameValidator(name) {
    const nameArray = name.split('');
    const quoteCheck = nameArray.filter(charachter => {
      return charachter === '"';
    });
    let result = true;

    //check for illegal charachters.  any return of a -1 is a failure, because it is not in the allowed charachters, however quoted emails are dealt with below
    nameArray.forEach(letter => {
      if (validChars.user.normal.indexOf(letter.toLowerCase()) < 0) {
        result = false;
      }
    });
    if (name.includes('..')) {
      result = false;
    }
    //check for presence of quotes.  Two quotes "" is has other charachters that are allowed inside quotes, such as spaces.  A single quote without a matching partner is not allowed, so the previous algo will detect it.
    if (quoteCheck.length === 2) {
      let beforeOpenQuote = name.split('"')[0];
      let afterOpenQuote = name.split('"')[2];
      let quote = name.split('"')[1];
      let nameNoQuotes = beforeOpenQuote + afterOpenQuote;

      //reset the result flag so we dont' get a false negative
      result = true;
      quote.split('').forEach(letter => {
        if (
          validChars.user.onlyInQuotes.indexOf(letter.toLowerCase()) < 0 &&
          validChars.user.normal.indexOf(letter.toLowerCase()) < 0
        ) {
          result = false;
        }
        nameNoQuotes.split('').forEach(letter => {
          if (validChars.user.normal.indexOf(letter.toLowerCase()) < 0) {
            result = false;
          }
        });
      });
    }
    return result;
  }
};

module.exports = validation;
