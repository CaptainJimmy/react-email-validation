# react-email-validation

An email validation application using React, no regex or filters

## Explanation:

This is actually two different components that are not necessarily, and could easily be separated and reused.

### Deployment:

The app is deployed at [https://react-email-validator.firebaseapp.com](https://react-email-validator.firebaseapp.com) for testing purposes as a built application.

#### User Interface

The console/UI is built with React, Material UI, create-react-app. It is a simple class component that displays the outcome of the algorithm as a functional component in a sort of 'flash message'. A more traditional regex algorithm could be changed out with a change of an import call. Some adjustment would need to be made to the 'Valid' component should the algorithm change its return.

#### Email Validation Algorithm

The algorithm is built to be portable, reusable, and modular. It is meant to be imported into a React application through import or as a require in a node application. The code is well commented, but the API is listed below. Since the module does not use regex, an series of arrays of legal charachters is used to validated the different portions of an email.

The validation portion contains two files:
_validation.js:_ the main module
_validChars.js:_ the validation array tables used for comparison.

##### Installing the entire application

_Clone the repo:_
`$ git clone https://github.com/CaptainJimmy/react-email-validation.git`

_Install the dependencies_
``` shell
$ cd react-email-validation
$ npm install
```

_Start the React Dev Server_
```$ npm start```

##### Using the the module only

_Clone the repo:_
``` shell
$ git clone https://github.com/CaptainJimmy/react-email-validation.git
```

_Move the module files into your application_
``` shell
$ cd react-email-validation
$ cp validation.js /your/new/path/here
$ cp validChars.js /your/new/path/here
```

_Import the module into a React or similar application_
In your React application:
```import validate from './validation.js'```

In your Node application:
```const validate = require('./validation.js')```

##### Algorithm API

To interact with the algorithm, simply send it the email string to validate:
```validate(email)```

validate will return an object with 3 properties:
_message:_ (String) for displaying in a UI or CLI
_outcome:_ (Boolean)
_result:_ (String) contains success, failure, or warning, for content or component styling

#### Email Standards Definistion

[Email Standards Wiki:](https://en.wikipedia.org/wiki/Email_address)
