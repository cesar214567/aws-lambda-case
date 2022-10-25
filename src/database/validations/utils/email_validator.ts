const strings = [
  'gmail.com',
  'hotmail.com',
  'yahoo.es'
];

const validateEndings = (email:string) => {
  return strings.some(s => email.endsWith(s));
}

export const validateEmails = (email:string) => {
  return /^[\w-.]+@/.test(email) && validateEndings(email);
}
