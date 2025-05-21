import { createContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { toast } from 'react-toastify';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  checkAuth: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, this would connect to a backend API
  const checkAuth = useCallback(() => {
    setIsLoading(true);
    try {
      // Simulate checking local storage for user token
      const userData = localStorage.getItem('auction_user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes - in real app, this would validate with backend
      if (email && password.length >= 6) {
        const mockUser = {
          id: '123456',
          name: email.split('@')[0],
          email,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
        };
        
        setUser(mockUser);
        localStorage.setItem('auction_user', JSON.stringify(mockUser));
        toast.success('Login successful! Welcome back.');
        return true;
      } else {
        toast.error('Invalid credentials. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again later.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes - would normally make backend API call
      if (name && email && password.length >= 6) {
        const mockUser = {
          id: `user_${Date.now()}`,
          name,
          email,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
        };
        
        setUser(mockUser);
        localStorage.setItem('auction_user', JSON.stringify(mockUser));
        toast.success('Registration successful! Welcome to BidHub.');
        return true;
      } else {
        toast.error('Please fill all required fields with valid information.');
        return false;
      }
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again later.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auction_user');
    setUser(null);
    toast.info('You have been logged out');
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    checkAuth,
  }), [user, isLoading, login, register, logout, checkAuth]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};