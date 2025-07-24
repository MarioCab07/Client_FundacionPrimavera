import api from "./api.services";

let refreshPromise = null;
export const doRefresh= ()=> {
  if (!refreshPromise) {
    refreshPromise = api.post("/auth/refresh").finally(() => (refreshPromise = null));
  }
  return refreshPromise;
}