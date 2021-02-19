const logApiError = (res, statusCode, customMessage, err = '', stack = '') => {
  let errorObj = {
    Error: {
      message: customMessage,
      fullError: err.toString(),
    },
  };

  console.error(err);
  console.error(stack);
  return res.status(statusCode).json(errorObj);
};

const logServerError = (customMessage, err) => {
  Error(customMessage);
};

const renameKeys = async (obj, newKeyObj) => {
  // use a new keyobject parir value to rename keys in an object
  Object.keys(newKeyObj).map(key => {
    obj[newKeyObj[key]] = obj[key];
    delete obj[key];
  });
};

const findAndUpdateKeyDifferences = async (obj, newObj) => {
  let updatedFields = [];

  for (const key in newObj) {
    if (obj[key] !== newObj[key]) {
      obj[key] = newObj[key];

      if (obj._doc[key] === newObj[key]) updatedFields.push(key);
    }
  }
  return updatedFields;
};

module.exports = { logApiError, logServerError, findAndUpdateKeyDifferences, renameKeys };
