const sortingMethods = {
  asc: (fieldName) => (a, b) => {
    if (a[fieldName] === '' || a[fieldName] === null) return -1;
    if (b[fieldName] === '' || b[fieldName] === null) return 1;
    if (a[fieldName] === b[fieldName]) return 0;
    return Number(a[fieldName]) > Number(b[fieldName]) ? -1 : 1;
  },
  desc: (fieldName) => (a, b) => {
    if (a[fieldName] === '' || a[fieldName] === null) return 1;
    if (b[fieldName] === '' || b[fieldName] === null) return -1;
    if (a[fieldName] === b[fieldName]) return 0;
    return Number(a[fieldName]) < Number(b[fieldName]) ? -1 : 1;
  },
};

module.exports = { sortingMethods };
