import { doRefresh } from "./refreshHelper";
import { setAccessToken } from "./tokenStore";

let didInitialRefresh = false;

export async function bootStrapAuth() {
  if (didInitialRefresh) return;
  didInitialRefresh = true;
  try {
    const { data } = await doRefresh();
    setAccessToken(data.accessToken);
    pushUserFromRefresh?.(data.user);
  } catch { }
}