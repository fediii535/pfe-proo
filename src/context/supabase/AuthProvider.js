import { AuthResponse } from "@supabase/supabase-js";
import {
  createContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { supabase } from "../../supabase/SupaBase";
// NOTE: Ensure that supabase is only initialized ONCE in your app (singleton pattern).
// Multiple initializations can cause "Multiple GoTrueClient instances detected" warning.

export type AuthUserType = null | Record<string, any>;

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
};

export type JWTContextType = {
  method: string;
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (
    email: string,
    password: string,
    firstName: string
  ) => Promise<AuthResponse>;
  logout: () => void;
};

enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
}

type Payload = {
  [Types.INITIAL]: {
    isInitialized: boolean;
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  switch (action.type) {
    case Types.INITIAL:
      return {
        isInitialized: action.payload.isInitialized,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case Types.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case Types.REGISTER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case Types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<JWTContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function SupaBaseConnectionProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !sessionData.session?.user) {
        throw new Error("No active session");
      }

      const { user } = sessionData.session;

      const { data: userData, error: errorGetProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (errorGetProfile) throw errorGetProfile;

      dispatch({
        type: Types.INITIAL,
        payload: {
          isInitialized: true,
          isAuthenticated: true,
          user: userData,
        },
      });
    } catch (error) {
      console.error({ error });
      dispatch({
        type: Types.INITIAL,
        payload: {
          isInitialized: true,
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.session?.user) {
      const { user } = data.session;

      const { data: userData, error: errorGetProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (errorGetProfile) throw errorGetProfile;

      dispatch({
        type: Types.LOGIN,
        payload: {
          isAuthenticated: true,
          user: userData,
        },
      });

      // Redirect to dashboard or home after login (not /login)
      window.location.href = "/dashboard";
    }
  }, []);

  const register = useCallback(
    async (email: string, password: string, firstName: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstName },
          emailRedirectTo: "https://your-redirect-url.com",
        },
      });

      if (error) throw error;

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: data.user,
        },
      });
    },
    []
  );

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    dispatch({ type: Types.LOGOUT });
    // Redirect to login page after logout
    window.location.href = "/login";
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: "jwt",
      login,
      register,
      logout,
    }),
    [state, login, register, logout]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

// export type ActionMapType<M extends { [index: string]: any }> = {
//   [Key in keyof M]: M[Key] extends undefined
//     ? { type: Key }
//     : { type: Key; payload: M[Key] };
// };
