const validate = require('./validation');
const goodEmails = [
  'email@email.com',
  'email(comment)@email.com',
  'email@email(comment).com',
  'email@emae33.cm',
  'email-email@email.com',
  'email.email@email.com',
  'email" "email@email.com',
  'simple@example.com',
  'disposable.style.email.with+symbol@example.com',
  'other.email-with-hyphen@example.com',
  'fully-qualified-domain@example.com',
  'user.name+tag+sorting@example.com',
  'x@example.com',
  'example-indeed@strange-example.com',
  '"very.(),:;<>[]".VERY."very\\ "very".unusual"@strange.example.com',
  "#!$%&'*+-/=?^_`{}|~@example.org",
  'ema#@email.com'
];

goodEmails.forEach(email => {
  test(`Email true ${email}`, () => {
    expect(validate(email)).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        outcome: true,
        result: expect.any(String)
      })
    );
  });
});

const badEmails = [
  'email@em$ail.com',
  'email(comment@email.com',
  '@email.com',
  'email@3333.33',
  'email@email',
  'email"@email.com',
  'Abc.example.com',
  'A@b@c@example.com',
  'a"b(c)d,e:f;g<h>i[jk]l@example.com',
  'this is"notallowed@example.com',
  'this still"not\\allowed@example.com',
  '1234567890123456789012345678901234567890123456789012345678901234+x@example.com',
  'john..doe@example.com',
  'john.doe@example..com'
];

badEmails.forEach(email => {
  test(`Email falsies ${email}`, () => {
    expect(validate(email)).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        outcome: false,
        result: expect.any(String)
      })
    );
  });
});
