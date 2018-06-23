const validChars = require('./validChars');

const validation = email => {
  //make sure email has content and is a string
  if (email && typeof email === 'string') {
    console.log(`${email} received in validation, has content, is string`);

    // does the email contain an @ sign?, Does it it only have two parts? This is
    // here before the variables because it is quicker to do a check on large errors
    // before parsing and possibly breaking the code.

    if (email.split('@').length !== 2) {
      console.log(`${email} does not contain 2 parts`);
      return {
        message: `${email} does not contain 2 parts`,
        outcome: false,
        result: 'failure'
      };
    }

    // does the email contain comments? if so, strip them off and change the current
    // working email to a comment less email for better parsing  This is more a
    // setup for parsing than a rule

    let comment = '';
    let workingEmail = '';
    if (email.indexOf('(') !== -1 && email.indexOf(')') !== -1) {
      console.log(`${email} contains comments`);
      let beforeOpenParen = email.split('(')[0];
      comment = email.split('(')[1].split(')')[0];
      let afterCloseParen = email.split(')')[1];
      workingEmail = beforeOpenParen + afterCloseParen;

      console.log(
        `Working email: ${workingEmail} post edit with a comment: ${comment} `
      );
    } else {
      console.log(`${email} contains no comments, setting it to workingEmail`);
      workingEmail = email;
    }

    // reusable variables for quick reference l1ater
    let localName = workingEmail.split('@')[0];
    let domain = workingEmail.split('@')[1];
    let domainName = domain.split('.')[domain.split('.').length - 2];
    let tld = domain.split('.')[domain.split('.').length - 1];

    // MAIN RULES BODY make sure the domain has at least 1 dot
    if (domain.split('.').length < 2) {
      console.log('domain less than one dot');
      return {
        message: `${email}'s domain has less than one dot`,
        outcome: false,
        result: 'failure'
      };
    }

    // function to check for valid charachters in usernames check for valid
    // charachters in domain and TLD
    //

    const domainValidChar = dom => {
      const domArray = dom.split('');
      let result = true;

      domArray.forEach(letter => {
        if (validChars.domain.normal.indexOf(letter.toLowerCase()) < 0) {
          console.log('found illegal char');
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
        console.log('found illegal char 95', dom, dom.indexOf('..'));
        result = false;
      } else {
        dom.split('.').forEach(word => {
          console.log(word);
          if (word[0] === '-' || word[word.length - 1] === '-') {
            console.log('found illegal char 101');
            result = false;
          }
        });
        dom.split('.').forEach(word => {
          let numberCounter = 0;
          word.split('').forEach(letter => {
            if (validChars.domain.numeric.includes(letter)) {
              console.log('found number');
              numberCounter++;
            }
          });
          if (numberCounter === word.length) {
            console.log('Its all numbers!');
            result = false;
          }
        });

        if (result) {
          console.log('passed inspection');
        } else {
          console.log('failed');
        }
        return result;
      }
    };

    //DOMAIN CHECKS first check for length of TLD and domain name to be less than 2

    if (domainName.length < 2 || tld.length < 2) {
      console.log(
        `${email}'s domain name (${domainName}) or top level domain (${tld})  has less than the required two chars`
      );
      return {
        message: `${email}'s domain has less than the required two chars`,
        outcome: false,
        result: 'failure'
      };
    } else {
      // domain has at least 2 charachters uppercase and lowercase Latin letters A to
      // Z and a to z; digits 0 to 9, provided that top-level domain names are not
      // all-numeric; hyphen -, provided that it is not the first or last character.
      // check to see that the domain and TLD only have alphanumeric
      //
      // all of this is accomplished from the function domainValidChar

      if (!domainValidChar(domain)) {
        console.log(
          `${email}'s domain contains a non-allowed character or a character in a not allowed position`
        );
        return {
          message: `${email}'s domain contains a non-allowed character or a character in a not allowed position`,
          outcome: false,
          result: 'failure'
        };
      }
    }

    //USERNAME CHECKS!
    //
    //make sure the localName has at least 1 char but less than 64
    if (localName.length < 1) {
      console.log(' localName less than one letter');
      return {
        message: `${email}'s local name (username) has less than one character`,
        outcome: false,
        result: 'failure'
      };
    }
    if (localName.length > 63) {
      console.log(' localName has too many chars');
      return {
        message: `${email}'s local name (username) has too many chars, must be less than 64`,
        outcome: false,
        result: 'failure'
      };
    }

    const userNameValidator = name => {
      const nameArray = name.split('');
      const quoteCheck = nameArray.filter(charachter => {
        return charachter === '"';
      });
      let result = true;

      //check for illegal charachters.  any return of a -1 is a failure, because it is not in the allowed charachters, however quoted emails are dealt with below
      nameArray.forEach(letter => {
        if (validChars.user.normal.indexOf(letter.toLowerCase()) < 0) {
          console.log('found illegal char');
          result = false;
        }
      });
      //check for presence of quotes.  Two quotes "" is has other charachters that are allowed inside quotes, such as spaces.  A single quote without a matching partner is not allowed, so the previous algo will detect it.
      if (quoteCheck.length === 2) {
        console.log('two quotes detected');
        let beforeOpenQuote = name.split('"')[0];
        let afterOpenQuote = name.split('"')[2];
        let quote = name.split('"')[1];
        let nameNoQuotes = beforeOpenQuote + afterOpenQuote;
        //reset the result flag so we dont' get a false negative

        result = true;
        //console.log(beforeOpenQuote, afterOpenQuote, quote);
        quote.split('').forEach(letter => {
          if (
            validChars.user.onlyInQuotes.indexOf(letter.toLowerCase()) < 0 &&
            validChars.user.normal.indexOf(letter.toLowerCase()) < 0
          ) {
            console.log(
              'character not allowed, is not in onlyInQuotes, and not in normal',
              letter
            );
            result = false;
          }
          nameNoQuotes.split('').forEach(letter => {
            if (validChars.user.normal.indexOf(letter.toLowerCase()) < 0) {
              console.log(
                'character not allowed in username outside of quotes line 202'
              );
              result = false;
            }
          });
        });
      }
      if (result) {
        console.log('passed inspection');
      } else {
        console.log('failed inspection');
      }
      return result;
    };

    if (!userNameValidator(localName)) {
      console.log(
        `${email}'s username/localName contains a non-allowed character or a character in a not allowed position`
      );
      return {
        message: `${email}'s username contains a non-allowed character or a character in a not allowed position`,
        outcome: false,
        result: 'failure'
      };
    }

    // if email passes above rules but has a comment, it sends this message with a
    // warning
    if (comment) {
      console.log(`${email} contains comments`);
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
    console.log(typeof email);
    return {
      message: `${email}'s is not a string or is undefined`,
      outcome: false,
      result: 'failure'
    };
  }
};

module.exports = validation;
