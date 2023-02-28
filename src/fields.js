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
export const fields = {
  id: {
    label: `ID`,
    sort: 'desc',
    visible: true,
  },
  Rank: {
    label: `Rank`,
    visible: true,
    sort: 'normal',
    filter: {
      active: false,
      type: 'range',
      value: [0, 500],
      default: [0, 500],
      filterFn: filterFunction('Rank'),
    },
  },
  Player: {
    label: `Player's Name`,
    visible: true,
  },
  AgeThatYear: {
    label: `Age that Year`,
    visible: true,
    filter: {
      active: false,
      type: 'range',
      value: [0, 100],
      default: [0, 100],
      filterFn: filterFunction('AgeThatYear'),
    },
  },
  Hits: {
    label: `# Hits`,
    visible: true,
    sort: 'normal',
    filter: {
      active: false,
      type: 'range',
      value: [0, 400],
      default: [0, 400],
      filterFn: filterFunction('Hits'),
    },
  },
  Year: {
    label: `Year`,
    visible: false,
  },
  Bats: {
    label: `Bats`,
    visible: false,
  },
};
