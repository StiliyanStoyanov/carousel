// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
export const mod = (n, m) => (n % m + m) % m;
export const setInitialBounds = (index, maxLength) => {
  if (index > maxLength) return maxLength;
  else if (0 > index) return 0;
  else return index;
};