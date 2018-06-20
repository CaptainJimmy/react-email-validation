// in theory, HTML5 has it's own built in validator.  with an element of <input
// type="email"> your data could be checked natively, but it still isnt a bad
// idea to validate further.

const emailValidate = email => {
    //first, we validate that there is an @ sign, and it only has two parts
    if (email.split("@").length !== 2) {
        console.log("does not contain 2 parts")
        return false
    }
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

}

module.exports = emailValidate;