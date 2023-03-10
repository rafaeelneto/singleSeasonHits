const filterFunction = (fieldName) => {
  return (newValue) => {
    return (row) => {
      let rowFieldValue = row[fieldName];
      if (rowFieldValue === '') {
        rowFieldValue = 0;
      }
      return rowFieldValue >= newValue[0] && rowFieldValue <= newValue[1];
    };
  };
};

module.exports = { filterFunction };
