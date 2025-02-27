export default function (formData) {
  let errors = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (formData?.name) {
    if (formData.name === "") {
      errors.name = "Name should not be empty.";
    } else if (formData.name.length < 3 || formData.name.length > 30) {
      errors.name = "Name must be between 3 and 30 characters.";
    }
  }

  if (formData.email === "") {
    errors.email = "Email should not be empty.";
  } else if (!email_pattern.test(formData.email)) {
    errors.email = "Invalid email!";
  }

  if (formData.password === "") {
    errors.password = "Password should not be empty.";
  } else if (!password_pattern.test(formData.password)) {
    errors.password =
      "Password must contain a mix of uppercase, lowercase, numbers, and be at least 8 characters long.";
  }
  return errors;
}
