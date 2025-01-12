import { User } from "@/api";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

export interface IAuth {
  user: {
    _id: string;
    email: string;
    fullName: string;
    phoneNumber: number;
    aadharNumber: number;
    panNumber: number;
    role: string;
    profilePictureUrl?:string;
    lastLogin: string;
    registrationDate: string;
    address?: string;
    alternativePhone?: string;
    gstProfile?: {
      gstNumber: string;
      gstPassword: string;
      gstPortalLoginId: string;
      gstrType: string;
      returnType: string;
      tradeName: string;
      additionalTradeName: string;
    };
    incomeTaxProfile?: {
      itrType: string;
      password: string;
      bankDetails: {
        accountNumber: string;
        ifscCode: string;
      };
    };
    dateOfBirth?: string;
    fathersName?: string;
    state?: string;
  };
  token: string;
}

interface IGlobalContext {
  isVisibleForm:any;
  user: IAuth | null;
  setIsVisibleForm: Dispatch<SetStateAction<any>>;
  saveUser: (data: IAuth) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
  updateUserProfile: (userData: Partial<IAuth['user']>) => void;
}

export const GlobalContext = createContext<IGlobalContext | null>(null);

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<IAuth | null>(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    try {
      return userData && token ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    }
  });
  const refreshUserData = async (token: string) => {
    try {
      const response = await User.getDetails();
      console.log(response,"ssss");
      
      if (response.success) {
        const userData = await response.data.user;
        console.log(userData);
        saveUser({ user: userData, token });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error refreshing user data:', error);
      return false;
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token")
  );

  const [isVisibleForm,setIsVisibleForm] = useState(false);
  // const [isInitialized, setIsInitialized] = useState(false);
  const privateRoutes = ["/profile", "/update", "/active-plans", "/payment", "/upload-page","/pricing"];
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (token) {
        try {
          // If we have stored user data, use it immediately
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
          }

          // Refresh user data in the background
          const refreshSuccess = await refreshUserData(token);
          if (!refreshSuccess && storedUser) {
            // If refresh failed but we have stored data, keep using it
            console.warn('Could not refresh user data, using stored data');
          }
        } catch (error) {
          console.error("Error during authentication initialization:", error);
          logout();
        }
      } else {
        // Clear invalid data
        logout();
      }
      
      // setIsInitialized(true);
    };

    initializeAuth();
  }, [navigate]);

  const saveUser = (data: IAuth) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    // localStorage.setItem("token", data.token);
    setIsAuthenticated(true);
  };

  const updateUserProfile = (userData: Partial<IAuth['user']>) => {
    setUser((prev) => {
      if (prev) {
        const updatedUser = { 
          ...prev, 
          user: { ...prev.user, ...userData } 
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      }
      return prev;
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
    setIsVisibleForm(false);
  };

  useEffect(() => {
    // Check if the current route is a private route
    const isPrivateRoute = privateRoutes.some(route => 
      location.pathname.startsWith(route)
    );

    // Redirect logic
    if (isPrivateRoute && !isAuthenticated) {
      // navigate("/login");
      setIsVisibleForm(true);
    }
  }, [location.pathname, isAuthenticated, navigate]);
  return (
    <GlobalContext.Provider 
      value={{ 
        user, 
        saveUser,
        isVisibleForm,
        setIsVisibleForm, 
        isAuthenticated, 
        setIsAuthenticated, 
        logout, 
        updateUserProfile 
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;