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

interface IAuth {
  user: {
    _id: string;
    email: string;
    fullName: string;
    phoneNumber: number;
    aadharNumber: number;
    panNumber: number;
    role: string;
    lastLogin: string;
    registrationDate: string;
  };
  token: string;
}

interface IGlobalContext {
  user: IAuth | null;
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

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token")
  );

  const privateRoutes = ["/profile", "/update", "/active-plans", "/payment", "/upload-page","/pricing"];

  const saveUser = (data: IAuth) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
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
    navigate("/login");
  };

  useEffect(() => {
    // Check if the current route is a private route
    const isPrivateRoute = privateRoutes.some(route => 
      location.pathname.startsWith(route)
    );

    // Redirect logic
    if (isPrivateRoute && !isAuthenticated) {
      navigate("/login");
    }
  }, [location.pathname, isAuthenticated, navigate]);

  return (
    <GlobalContext.Provider 
      value={{ 
        user, 
        saveUser, 
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