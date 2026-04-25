/**
 * @fileoverview Data formatting utilities (Currency, Numbers, Phone).
 */

/**
 * Formats a number to 2 decimal places (e.g. for GPA).
 * @param {number} num 
 */
export const formatDecimal = (num) => {
  return Number(num).toFixed(2);
};

/**
 * Formats a number as a currency string (EGP).
 * @param {number} amount 
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
  }).format(amount);
};

/**
 * Formats a phone number string.
 * @param {string} phone 
 */
export const formatPhone = (phone) => {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

/**
 * Truncates text with ellipsis.
 */
export const truncateText = (text, limit = 100) => {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + '...';
};
