import React, { createContext, useEffect, useReducer, useCallback, useMemo } from "react";
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

      // Try to get user profile
      const { data: userData, error: errorGetProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      // If profile doesn't exist, create one
      if (!userData && !errorGetProfile) {
        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert([
            {
              id: user.id,
              email: user.email,
              created_at: new Date().toISOString(),
            },
          ])
          .select()
          .single();

        if (createError) throw createError;
        
        dispatch({
          type: Types.INITIAL,
          payload: {
            isInitialized: false,
            isAuthenticated: true,
            user: newProfile,
          },
        });
      } else if (errorGetProfile) {
        throw errorGetProfile;
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isInitialized: false,
            isAuthenticated: true,
            user: userData,
          },
        });
      }
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
      console.log('user:', user);

      // Try to get user profile
      const { data: userData, error: errorGetProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      // If profile doesn't exist, create one
      if (!userData && !errorGetProfile) {
        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert([
            {
              id: user.id,
              email: user.email,
              created_at: new Date().toISOString(),
            },
          ])
          .select()
          .single();

        if (createError) throw createError;

        dispatch({
          type: Types.INITIAL,
          payload: {
            isInitialized: false,
            isAuthenticated: true,
            user: newProfile,
          },
        });
      } else if (errorGetProfile) {
        throw errorGetProfile;
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isInitialized: false,
            isAuthenticated: true,
            user: userData,
          },
        });
      }

      window.location.href = "/home";
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
        },
      });

      if (error) throw error;

      if (data.user) {
        // Create profile for new user
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: data.user.id,
              email: email,
              first_name: firstName,
              created_at: new Date().toISOString(),
            },
          ]);

        if (profileError) throw profileError;
      }

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

    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: "supabase",
      login,
      register,
      logout,
    }),
    [
      state.isInitialized,
      state.isAuthenticated,
      state.user,
      login,
      register,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a SupaBaseConnectionProvider");
  }

  return context;
};
