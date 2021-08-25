export const getStorage = (key: string): string => {
    return localStorage.getItem(key) || "{}";
}

export const setStorage = (key: string, value: string): void => {
    localStorage.setItem(key, value);
}