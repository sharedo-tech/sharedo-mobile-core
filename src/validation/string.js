import { hasValue } from "./util";

const minLength = (length, message) => value => {
  if (!message) {
    message = `Value must be at least ${length} characters in length.`;
  }

  if (hasValue(value) && value.length < length) {
    return message;
  }

  return true;
}

const maxLength = (length, message) => value => {
  if (!message) {
    message = `Value cannot exceed ${length} characters in length.`;
  }

  if (hasValue(value) && value.length > length) {
    return message;
  }

  return true;
}

export {
  minLength,
  maxLength
}