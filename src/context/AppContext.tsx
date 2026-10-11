import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appointment, User } from '../types';
import { INITIAL_APPOINTMENTS } from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  user: User | null;
  appointments: Appointment[];
  toast: Toast | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  register: (name: string, email: string, phone: string) => void;
  addAppointment: (newAppt: Omit<Appointment, 'id' | 'referenceNumber' | 'bookedAt' | 'status'>) => Appointment;
  cancelAppointment: (id: string) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_APPOINTMENTS = 'careconnect_appointments_v1';
const STORAGE_KEY_USER = 'careconnect_user_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUser) return JSON.parse(savedUser);
    } catch {
      // Fallback
    }
    // Default demo user for easy testing
    return {
      id: 'demo-user-1',
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      phone: '+1 (555) 234-8901'
    };
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_APPOINTMENTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_APPOINTMENTS;
  });

  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(appointments));
    } catch (e) {
      console.error('Failed to save appointments in localStorage', e);
    }
  }, [appointments]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (e) {
      console.error('Failed to sync user', e);
    }
  }, [user]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 4000);
  };

  const hideToast = () => setToast(null);

  const login = (email: string, name?: string) => {
    const cleanName = name || (email.includes('@') ? email.split('@')[0].replace('.', ' ') : 'Demo Patient');
    const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    const loggedUser: User = {
      id: 'user-' + Date.now(),
      name: formattedName,
      email: email,
      phone: '+1 (555) 987-6543'
    };
    setUser(loggedUser);
    showToast(`Welcome back, ${formattedName}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out of demo session.', 'info');
  };

  const register = (name: string, email: string, phone: string) => {
    const newUser: User = {
      id: 'user-' + Date.now(),
      name,
      email,
      phone
    };
    setUser(newUser);
    showToast(`Account created! Welcome to CareConnect, ${name}.`, 'success');
  };

  const addAppointment = (newAppt: Omit<Appointment, 'id' | 'referenceNumber' | 'bookedAt' | 'status'>): Appointment => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    const created: Appointment = {
      ...newAppt,
      id: 'appt-' + Date.now(),
      referenceNumber: `CC-${year}-${randomCode}`,
      status: 'Confirmed',
      bookedAt: new Date().toISOString()
    };

    setAppointments((prev) => [created, ...prev]);
    showToast(`Appointment confirmed! Reference: ${created.referenceNumber}`, 'success');
    return created;
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Cancelled' as const } : item))
    );
    showToast('Appointment has been cancelled.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        appointments,
        toast,
        login,
        logout,
        register,
        addAppointment,
        cancelAppointment,
        showToast,
        hideToast
      }}
    >
      {children}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#172B46] text-white rounded-xl shadow-xl border border-slate-700 max-w-md animate-fade-in text-sm"
        >
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              toast.type === 'error' ? 'bg-rose-400' : toast.type === 'info' ? 'bg-sky-400' : 'bg-[#56B7AD]'
            }`}
          />
          <span className="flex-1 font-medium">{toast.message}</span>
          <button
            onClick={hideToast}
            className="text-slate-400 hover:text-white transition-colors ml-2 text-xs"
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
