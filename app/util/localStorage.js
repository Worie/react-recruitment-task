const hasStorage = ((() => {
  try {
    const tmp = 'checkIfLocalStorageSupported';
    localStorage.setItem(tmp, tmp);
    localStorage.removeItem(tmp);
    return true;
  } catch (err) {
    return false;
  }
})());

let result;

if (hasStorage) {
  result = localStorage;
} else {
  // TODO: handle, fallback to cookies for example
  throw new Error('localStorage is unsupported');
}

export default result;
