const KEY = 'puzzle1-hideMessage';

const clear = () => localStorage.removeItem(KEY);
const setHidden = () => localStorage.setItem(KEY, 'hidden');
const isSetHidden = () => localStorage.getItem(KEY) === 'hidden';

export default {
  clear,
  setHidden,
  isSetHidden
}
