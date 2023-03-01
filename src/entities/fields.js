import { filterFunction } from '../utils/filterMethod';
import { Field } from './Field';

const generateRangeFilterOptions = (field, min, max) => ({
  active: false,
  type: 'range',
  value: [min, max],
  default: [min, max],
  filterFn: filterFunction(field),
});

export const fields = {
  id: new Field(`ID`, 'desc', true),
  Rank: new Field(
    `Rank`,
    undefined,
    true,
    generateRangeFilterOptions('Rank', 0, 500)
  ),
  Player: new Field(`Player's Name`, undefined, true),
  AgeThatYear: new Field(
    `Age that Year`,
    undefined,
    true,
    generateRangeFilterOptions('AgeThatYear', 0, 100)
  ),
  Hits: new Field(
    `# Hits`,
    'normal',
    true,
    generateRangeFilterOptions('Hits', 0, 400)
  ),
  Year: new Field(`Year`, false),
  Bats: new Field(`Bats`, false),
};
