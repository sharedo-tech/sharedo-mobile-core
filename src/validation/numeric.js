import { hasValue } from "./util";

const compare = (value, comparator, message) => {
    if (hasValue(value)) {
        const number = Number.parseFloat(value)

        if (!Number.isNaN(number) && !comparator(number)) {
            return message;
        }
    }

    return true;
}

const isNumber = (message = "Value must be a number.") => value => {
    if (hasValue(value) && Number.isNaN(Number.parseFloat(value))) {
        return message;
    }

    return true;
}

const isInteger = (message = "Value must be a whole number.") => value => {
    if (hasValue(value) && !Number.isInteger(Number.parseFloat(value))) {
        return message;
    }

    return true;
}

const greaterThan = (minValue, message) => value => {
    if (!message) {
        message = `Value must be greater than ${minValue}`;
    }

    return compare(value, number => number > minValue, message);
}

const greaterThanOrEqualTo = (minValue, message) => value => {
    if (!message) {
        message = `Value must be greater than or equal to ${minValue}`;
    }

    return compare(value, number => number >= minValue, message);
}

const lessThan = (minValue, message) => value => {
    if (!message) {
        message = `Value must be less than ${minValue}`;
    }

    return compare(value, number => number < minValue, message);
}

const lessThanOrEqualTo = (minValue, message) => value => {
    if (!message) {
        message = `Value must be less than or equal to ${minValue}`;
    }

    return compare(value, number => number <= minValue, message);
}

export {
    isNumber,
    isInteger,
    greaterThan,
    lessThan,
    greaterThanOrEqualTo,
    lessThanOrEqualTo
}