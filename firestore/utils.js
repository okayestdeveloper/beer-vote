/**
 * Return a new object that copies fields from a given object, omitting one or
 * more fields specified by an array of field names. Warning: this is a shallow
 * copy.
 *
 * @param {object} obj the object to omit fields from
 * @param {Array<string>} fields the list of fields to omit
 */
const omit = (obj, fields = []) => {
  const ret = {};

  for (let key in obj) {
    if (!fields.includes(key)) {
      ret[key] = obj[key];
    }
  }

  return ret;
};

module.exports = { omit };
