import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const users: Record<string, { username: string; password: string }> = {
  'demo@example.com': { username: 'Demo User', password: 'password123' },
  'test@user.com': { username: 'Test User', password: 'testpass' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function login(email: string, password: string) {
    const stored = users[email];
    if (stored && stored.password === password) {
      setUser({ email, username: stored.username });
      return true;
    }
    return false;
  }

  function signup(email: string, username: string, password: string) {
    if (users[email]) return false;
    users[email] = { username, password };
    setUser({ email, username });
    return true;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
