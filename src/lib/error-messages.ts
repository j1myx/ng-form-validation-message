export const errorMessages = {
  min: {
    message: '{label} must not be less than {min}.',
    rExp: 'min|actual'
  },
  max: {
    message: '{label} must not be greater than {max}.',
    rExp: 'max|actual'
  },
  required: {
    message: '{label} cannot be empty.'
  },
  requiredTrue: {
    message: '{label} must be true.'
  },
  email: {
    message: '{label} is not a valid email address.'
  },
  minlength: {
    message: '{label} should contain at least {requiredLength} character(s).',
    rExp: 'requiredLength|actualLength'
  },
  maxlength: {
    message: '{label} should contain at most {requiredLength} character(s).',
    rExp: 'requiredLength|actualLength'
  },
  pattern: {
    message: '{label} has an invalid format.',
    rExp: 'requiredPattern|actualValue'
  }
};
