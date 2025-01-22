import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";

type HookProps = {
  storageKey: string;
  apiRoute: string;
  email: string;
  token: string;
};

const useLoadFromStorageOrServer = <T,>({
  storageKey,
  apiRoute,
  email,
  token,
}: HookProps): T | null => {
  const storage = useLocalStorage<T>();
  const [data, setData] = useState<T | null>(null);

  const loadFromStore = (key: string): T | null => {
    const storedData = storage.getItem(key);
    return storedData ? storedData : null;
  };

  const loadFromServer = async (email: string, token: string): Promise<T> => {
    const { data, status } = await axios.get<T>(apiRoute, {
      params: { email, token },
    });
    if (status === 200) {
      storage.setItem(storageKey, data);
      return data;
    }
    throw new Error("Failed to fetch data from server");
  };

  useEffect(() => {
    (async () => {
      const dataFromStore = loadFromStore(storageKey);
      if (dataFromStore) {
        setData(dataFromStore);
      } else {
        try {
          const dataFromServer = await loadFromServer(email, token);
          setData(dataFromServer);
        } catch (error) {
          console.error("Error loading data:", error);
        }
      }
    })();
  }, []); //storageKey, apiRoute, email, token

  return data;
};

export { useLoadFromStorageOrServer };
