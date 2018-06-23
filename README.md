# react-email-validation

An email validation application using React, no regex or filters. The validator is portable and can be used in a React or a Node environment.

## Explanation:

This is actually two different components that are not necessarily dependent, and could easily be separated and reused.

## Packages Used:

[*] create-react-app
[*] Jest test suite
[*] React 16
[*] material-ui

### Deployment:

The app is deployed at [https://react-email-validator.firebaseapp.com](https://react-email-validator.firebaseapp.com) for testing purposes as a built application.

#### User Interface

The console/UI is built with React, Material UI, create-react-app. It is a simple class component that displays the outcome of the algorithm as a functional component in a sort of 'flash message'. A more traditional regex algorithm could be changed out with a change of an import call. Some adjustment would need to be made to the 'Valid' component should the algorithm change its return.

#### Email Validation Algorithm

The algorithm is built to be portable, reusable, and modular. It is meant to be imported into a React application through import or as a require in a node application. The code is well commented, but the API is listed below. Since the module does not use regex, an series of arrays of legal charachters is used to validated the different portions of an email.

The validation portion contains two files, and one Jest testing case:
_validation.js:_ the main module
_validChars.js:_ the validation array tables used for comparison.
_validation.test.js_ the test portion of the application

##### Installing the entire application

_Clone the repo:_
`$ git clone https://github.com/CaptainJimmy/react-email-validation.git`

_Install the dependencies_

```shell
$ cd react-email-validation
$ npm install
```

_Start the React Dev Server_
`$ npm start`

##### Using the the module only

_Clone the repo:_

```shell
$ git clone https://github.com/CaptainJimmy/react-email-validation.git
```

_*Move the module files into your application*_

```shell
$ cd react-email-validation
$ cp validation.js /your/new/path/here
$ cp validChars.js /your/new/path/here
```

_*Import the module into a React or similar application*_
_In your React application:_

```javascript
import validate from './validation.js';
```

_In your Node application:_

```javascript
const validate = require('./validation.js');
```

_Testing:_

```shell
$ jest validate.test.js
```

##### Algorithm API

To interact with the algorithm, simply send it the email string to validate:

```javascript
validate(email);
```

validate will return an object with 3 properties:

> _message:_ (String) for displaying in a UI or CLI
>
> _outcome:_ (Boolean)
>
> _result:_ (String) contains success, failure, or warning, for content or component styling

#### Email Standards Definition

[Email Standards Wiki: https://en.wikipedia.org/wiki/Email_address ](https://en.wikipedia.org/wiki/Email_address)
