import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";

interface IAuth {
  user: {
    _id: string;
    email: string;
    fullName: string;
    phoneNumber: number;
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
  updateUserProfile: (userData: Partial<IAuth>) => void;
}

export const GlobalContext = createContext<IGlobalContext | null>(null);

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IAuth | null>(() => {
    const userData = localStorage.getItem("user");
    try {
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
      localStorage.removeItem("user"); // Remove corrupted data
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem("token")
  );

  const privateRoutes = ["/profile", "/update", "/active-plans", "/payment", "/upload-page"];

  const saveUser = (data: IAuth) => {
    console.log("Saving user data:", data); // Log the data
    setUser(data);
    console.log(data, "This is the user data");
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
    setIsAuthenticated(true);
  };

  const updateUserProfile = (userData: Partial<IAuth>) => {
    setUser((prev) => {
      if (prev) {
        const updatedUser = { ...prev, ...userData };
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
  };

  useEffect(() => {
    if (!isAuthenticated && privateRoutes.includes(window.location.pathname)) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        saveUser,
        isAuthenticated,
        setIsAuthenticated,
        logout,
        updateUserProfile,
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
