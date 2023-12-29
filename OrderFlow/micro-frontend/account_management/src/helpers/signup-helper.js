// Validation for email

export const validateEmailHelper = (
  setIsValidEmail,
  isValidEmail,
  email,
  setIsAlertIcon,
  setIsEmail
) => {
  //Regex for email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  setIsValidEmail(emailPattern.test(email));
  setIsAlertIcon(emailPattern.test(email));

  const element = document.getElementById("email");
  if (!isValidEmail) {
    element.classList.add("validation-check");
    setIsAlertIcon(true);
  } else {
    setIsAlertIcon(false);
    element.classList.remove("validation-check");
  }

  if (!email) {
    element.classList.add("validation-check");
    setIsEmail(false);
    setIsValidEmail(true);
    setIsAlertIcon(true);
  } else {
    setIsEmail(true);
  }
};



// Validation for password

export const validatePasswordHelper = (
  setIsValidPassword,
  password,
  isValidPassword,
  setIsPassword
) => {
  //Regex for password
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
  setIsValidPassword(passwordPattern.test(password));

  const element = document.getElementById("password");

  if (!isValidPassword) {
    element.classList.add("validation-check");
  } else {
    element.classList.remove("validation-check");
  }

  if (!password) {
    element.classList.add("validation-check");
    setIsPassword(false);
    setIsValidPassword(true);
  } else {
    setIsPassword(true);
  }
};



// Validation for Registration form

export const validateRegistration = (
  setIsFirstName,
  isAlertIcon,
  setIsAlertIcon,
  setIsLastName,
  details,
  setIsMobile,
  setIsBusiness
) => {
  //first name regex
  // const fpattern = /^[A-Za-z]+$/;
  // fpattern.test(fname)

  //last name regex
  // const lpattern = /^[A-Za-z]+$/;
  // lpattern.test(fname)

  const firstName = details.fname;
  const lastName = details.lname;
  const mobile = details.mobile;
  const business = details.business;

  if (!firstName) {
    setIsFirstName(false);
    document.getElementById("fname").classList.add("validation-check");
  } else {
    setIsFirstName(true);
    document.getElementById("fname").classList.remove("validation-check");
  }

  if (!lastName) {
    setIsLastName(false);
  } else {
    setIsLastName(true);
  }

  if (!mobile) {
    setIsMobile(false);
  } else {
    setIsMobile(true);
  }

  if (!business) {
    setIsBusiness(false);
  } else {
    setIsBusiness(true);
  }
};
