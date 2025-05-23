import { createContext, useEffect, useReducer, useCallback, useMemo } from "react";
import supabase from "../../supabase/supabaseClient";

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const Types = {
  INITIAL: "INITIAL",
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  LOGOUT: "LOGOUT",
};

const reducer = (state, action) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: action.payload.isInitialized,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

export function SupaBaseConnectionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      // await supabase.auth.signOut();

      dispatch({
        type: Types.INITIAL,
        payload: {
          isInitialized: true,
          isAuthenticated: false,
          user: null,
        },
      });

      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      const user = sessionData?.session?.user;

      // Fix: Do not throw if no user, just set not authenticated
      if (!user) {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isInitialized: false,
            isAuthenticated: false,
            user: null,
          },
        });
        return;
      }

      const { data: userData, error: errorGetProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (errorGetProfile) throw errorGetProfile;

      dispatch({
        type: Types.INITIAL,
        payload: {
          isInitialized: false,
          isAuthenticated: true,
          user: userData,
        },
      });
    } catch (error) {
      console.error({ error });
      dispatch({
        type: Types.INITIAL,
        payload: {
          isInitialized: false,
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.session) {
      const user = data.session.user;

      const { data: userData, error: errorGetProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (errorGetProfile) throw errorGetProfile;

      dispatch({
        type: Types.INITIAL,
        payload: {
          isInitialized: false,
          isAuthenticated: true,
          user: userData,
        },
      });
      window.location.href = "/login";
      return;
    }

    dispatch({
      type: Types.LOGIN,
      payload: {
        isAuthenticated: true,
        user: null,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (email, password, firstName) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
          },
          emailRedirectTo: "hiiiiiii",
        },
      });

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: data,
        },
      });
    },
    []
  );

  const logout = useCallback(async () => {
    await supabase.auth.signOut();

    dispatch({
      type: Types.LOGOUT,
    });
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
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      login,
      logout,
      register,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
