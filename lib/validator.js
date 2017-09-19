class Validator {
  constructor(attributes, name) {
    this._attributes = attributes;
    this._name = name;
  }

  withField(name) {
    this._field = name;
    return this;
  }

  get field() {
    return this._field;
  }

  get value() {
    return this._attributes[this._field];
  }

  // TODO: make each of the following use a better description of the problem

  notNull() {
    return this._check('is invalid', v => v == null);
  }

  notEmpty() {
    return this._check('is invalid', v => !v.length);
  }

  notZero() {
    return this._check('is invalid', v => v === 0);
  }

  positive() {
    return this._check('is invalid', v => v < 0);
  }

  string() {
    return this._check('is invalid', v => typeof v !== 'string');
  }

  number() {
    return this._check('is invalid', v => !Number.isFinite(v));
  }

  includedIn(validValues) {
    return this._check('is invalid', v => !validValues.includes(v));
  }

  _check(problem, test) {
    if (test(this.value)) {
      throw new Error(`${this._name} ${this.field} ${problem}`);
    }
    return this;
  }
}

module.exports = {
  Validator,
};
