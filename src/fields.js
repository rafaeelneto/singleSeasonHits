export const fields = {
  id: {
    label: `ID`,
    sort: 'desc',
  },
  Rank: {
    label: `Rank`,
    visible: true,
    sort: 'normal',
    filter: 'range',
  },
  Player: {
    label: `Player's Name`,
    visible: true,
  },
  AgeThatYear: {
    label: `Age that Year`,
    visible: true,
    filter: 'range',
  },
  Hits: {
    label: `# Hits`,
    visible: true,
    sort: 'normal',
    filter: 'range',
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
