const KEY = "tm_token";
export const TokenStorage = {
    get: () => localStorage.getItem(KEY),
    set: (val:string) => localStorage.setItem(KEY, val),
    clear: () => localStorage.removeItem(KEY),
    isAuthed: () => !!localStorage.getItem(KEY)
}

