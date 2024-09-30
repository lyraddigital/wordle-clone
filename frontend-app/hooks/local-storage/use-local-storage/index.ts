import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    const localStorageStringValue = localStorage.getItem(key);

    if (localStorageStringValue === null) {
      return undefined;
    }

    const localStorageValue = JSON.parse(localStorageStringValue) as T;

    setValue(localStorageValue);
  }, [key, setValue]);

  const updateValue = useCallback(
    (setStateAction: SetStateAction<T>) => {
      const newValue =
        typeof setStateAction === "function"
          ? (setStateAction as (prevState: T) => T)(value)
          : (setStateAction as T);

      localStorage.setItem(key, JSON.stringify(newValue));

      setValue(setStateAction);
    },
    [key, setValue, value]
  );

  return [value, updateValue];
};

export default useLocalStorage;
