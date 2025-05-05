export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
export const validatePassword = (pass) => /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/.test(pass);
export const validateName = (name) => name.length >= 20 && name.length <= 60;
export const validateAddress = (addr) => addr.length <= 400;
