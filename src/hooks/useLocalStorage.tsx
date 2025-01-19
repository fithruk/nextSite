interface IUseLocalStorage<T> {
  setItem: (key: string, values: T) => void;
  getItem: (key: string) => T | null;
  removeItem: (key: string) => void;
  clear: () => void;
}

const useLocalStorage = <T,>(): IUseLocalStorage<T> => {
  const setItem = (key: string, values: T) => {
    localStorage.setItem(key, JSON.stringify(values));
  };

  const getItem = (key: string): T | null => {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  const clear = () => {
    localStorage.clear();
  };

  return { setItem, getItem, removeItem, clear };
};
export { useLocalStorage };
