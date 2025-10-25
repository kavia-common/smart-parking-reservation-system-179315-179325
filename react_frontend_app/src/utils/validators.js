export function emailValidator(email) {
  return typeof email === 'string' && /\S+@\S+\.\S+/.test(email);
}
export function passwordValidator(pw) {
  return typeof pw === 'string' && pw.length >= 6;
}
