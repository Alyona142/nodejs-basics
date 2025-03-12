import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  return isKnownOrder ? sortOrder : SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const keysOfStudent = [
    '_id',
    'name',
    'age',
    'gender',
    'avgMark',
    'onDuty',
    'createdAt',
    'updatedAt',
  ];

  return keysOfStudent.includes(sortBy) ? sortBy : '_id';
};

export const parseSortParams = (query) => {
  return {
    sortOrder: parseSortOrder(query.sortOrder),
    sortBy: parseSortBy(query.sortBy),
  };
};
