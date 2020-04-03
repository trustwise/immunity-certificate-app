/**
 * Generic utilities
 */

export const generatePepper = (length) => (Math.random().toString(36) + '00000000000000000').slice(2, length + 2).toUpperCase();

export const formatDate = (date) => `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
