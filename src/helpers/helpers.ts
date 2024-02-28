export const persistLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify({ ...value }));
};

export const getLocalStorage = <T>(key: string): T | null => {
  const storedValue = localStorage.getItem(key);

  if (storedValue) {
    try {
      const parsedValue: T = JSON.parse(storedValue);
      return parsedValue;
    } catch (error) {
      console.error(
        `Error parsing localStorage value for key '${key}':`,
        error
      );
      return null;
    }
  }

  return null;
};

export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

interface Data {
  [key: string]: string;
}

export const evaluateSuggestionFilter = (data: Data) => {
  let iterado = 0;
  for (const clave in data) {
    if (data[clave] !== "") {
      iterado++;
    }
  }
  return iterado;
};
