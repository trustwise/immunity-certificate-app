/**
 * Generic utilities
 */

export const generatePepper = (length) => (Math.random().toString(36) + '00000000000000000').slice(2, length + 2);

export const isEmptyObject = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

export const formatDate = (date) => `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
