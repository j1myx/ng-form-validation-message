const en = {
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

const es = {
  min: {
    message: '{label} no debe ser menor a {min}.',
    rExp: 'min|actual'
  },
  max: {
    message: '{label} no debe ser mayor que {max}.',
    rExp: 'max|actual'
  },
  required: {
    message: '{label} no puede estar vacío.'
  },
  requiredTrue: {
    message: '{label} debe ser verdadero.'
  },
  email: {
    message: '{label} no es una dirección de correo electrónico válida.'
  },
  minlength: {
    message: '{label} debe contener al menos {requiredLength} caracter(es).',
    rExp: 'requiredLength|actualLength'
  },
  maxlength: {
    message: '{label} debe contener como máximo {requiredLength} caracter(es).',
    rExp: 'requiredLength|actualLength'
  },
  pattern: {
    message: '{label} tiene un formato no válido.',
    rExp: 'requiredPattern|actualValue'
  }
};

export const errorMessages = {
  en,
  es
};
