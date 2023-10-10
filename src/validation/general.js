import { hasValue } from "./util";

const required = (message = "Value required.") => value => {
    if (!hasValue(value)) {
        return message;
    }

    return true;
}

export {
    required
}