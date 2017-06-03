let storage = { getItem: () => {}, setItem: () => {} };

if (typeof localStorage==='object') {
  storage = localStorage;
}

export default storage;
