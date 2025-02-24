export function validatePassword(password) {
  const regex =
    /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]{6,}$/;
  return regex.test(password);
}
