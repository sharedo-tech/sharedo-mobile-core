export * from "./general";
export * from "./numeric";
export * from "./string";

const validate = (value, ...rules) => {
  const errors = [];

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    const result = rule(value);

    if (typeof (result) === "string" && result.length > 0) {
      errors.push(result);
    }
  }

  return errors;
}

export {
  validate
}