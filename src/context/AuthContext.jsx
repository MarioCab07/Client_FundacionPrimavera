import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Refresh, Login, Logout } from "../services/api.services";
import { setAccessToken, clearAccessToken } from "../services/tokenStore";
import { hasAnyRole, hasRole } from "../tools/tools";
import { ROLES } from "../constants/constants";
import { navigate } from "../services/nav";
import { doRefresh } from "../services/refreshHelper";

const AuthContext = createContext();

export let forceClearSession;
export let pushUserFromRefresh;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const booted = useRef(false);
  pushUserFromRefresh = (u) => setUser(u ?? null);
  forceClearSession = () => {
    clearAccessToken();
    setUser(null);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await doRefresh();
        console.log(data);

        setAccessToken(data.accessToken);
        setUser(data.user || null);
      } catch {
        setUser(null);
      }
    })();
  }, []);

  const loading = user === undefined;

  const login = async (form) => {
    const { data } = await Login(form);
    setAccessToken(data.accessToken);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await Logout();
    } catch {}
    forceClearSession();
  };

  const value = useMemo(
    () => ({
      user: user ?? null,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
      hasRole: (r) => hasRole(user, r),
      hasAnyRole: (rs) => hasAnyRole(user, rs),
      ROLES,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
