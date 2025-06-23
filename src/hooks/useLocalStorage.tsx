interface IUseLocalStorage<T> {
  setItem: (key: string, values: T) => void;
  getItem: (key: string) => T | null;
  removeItem: (key: string) => void;
  clear: () => void;
}

const useLocalStorage = <T,>(): IUseLocalStorage<T> => {
  const setItem = (key: string, values: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(values));
    } catch (error) {
      console.error(
        `Ошибка при сохранении в localStorage (ключ: ${key}):`,
        error
      );
    }
  };

  const getItem = (key: string): T | null => {
    try {
      const data = localStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : null;
    } catch (error) {
      console.error(
        `Ошибка при загрузке из localStorage (ключ: ${key}):`,
        error
      );
      return null;
    }
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
