import { ValidationConfig } from "../interfaces/validationConfig";

export function validator(data: Record<string, any>, config: ValidationConfig): string[] {
  const errors: string[] = [];

  function validate(
    validateMethod: string,
    data: string,
    config: { value: number | string; message: string }
  ): string | undefined {
    let statusValidate = false;
    switch (validateMethod) {
      case "isRequired":
        statusValidate = data.trim() === "";
        break;
      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case "min": {
        statusValidate = typeof config.value === "number" ? data.length < config.value : false;
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(validateMethod, data[fieldName], {
        value: config[fieldName][validateMethod].value,
        message: config[fieldName][validateMethod].message,
      });
      if (error) {
        errors.push(error);
      }
    }
  }
  return errors;
}
