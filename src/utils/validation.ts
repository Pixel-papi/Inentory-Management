export const isValidEmail = (email: string): boolean => {
  const trimmed = email.trim();
  if (!trimmed) return false;
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(trimmed.toLowerCase());
};

export const isNonEmpty = (value: string): boolean => value.trim().length > 0;

export const isPositiveNumber = (value: string): boolean => {
  const n = Number(value);
  return !Number.isNaN(n) && n > 0;
};

export const isNonNegativeInteger = (value: string): boolean => {
  const n = Number(value);
  return Number.isInteger(n) && n >= 0;
};
