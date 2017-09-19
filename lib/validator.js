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

  notNull() {
    return this._check('is null', v => v == null);
  }

  notEmpty() {
    return this._check('is empty', v => !v.length);
  }

  notZero() {
    return this._check('is zero', v => v === 0);
  }

  positive() {
    return this._check('is negative', v => v < 0);
  }

  string() {
    return this._check('is not a string', v => typeof v !== 'string');
  }

  number() {
    return this._check('is not a number', v => !Number.isFinite(v));
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
