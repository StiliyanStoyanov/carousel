// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
export const mod = (n, m) => (n % m + m) % m;