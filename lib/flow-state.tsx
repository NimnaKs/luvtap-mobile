import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type LoginMethod = 'Google' | 'Apple' | 'Phone';
export type LanguageStyle = 'English' | 'Sinhala' | 'Tamil' | 'Mixed';
export type PlatformType = 'WhatsApp' | 'Messenger' | 'Telegram' | 'Instagram';
export type ReminderType =
  | 'Did they eat?'
  | 'Reached home?'
  | 'Goodnight text'
  | 'University check-in'
  | 'Work reminder'
  | 'Custom';

export type LovedOne = {
  name: string;
  relationship: string;
  platform: PlatformType;
  phoneNumber: string;
};

type FlowState = {
  loginMethod: LoginMethod | null;
  languageStyle: LanguageStyle | null;
  lovedOne: LovedOne;
  reminderType: ReminderType | null;
  notificationsEnabled: boolean;
};

type FlowContextValue = {
  state: FlowState;
  setLoginMethod: (method: LoginMethod) => void;
  setLanguageStyle: (style: LanguageStyle) => void;
  setLovedOne: (next: LovedOne) => void;
  setReminderType: (type: ReminderType) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  resetFlow: () => void;
};

const initialState: FlowState = {
  loginMethod: null,
  languageStyle: null,
  lovedOne: {
    name: 'Sarah',
    relationship: 'Partner',
    platform: 'WhatsApp',
    phoneNumber: '',
  },
  reminderType: null,
  notificationsEnabled: false,
};

const FlowContext = createContext<FlowContextValue | null>(null);

export function AppFlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FlowState>(initialState);

  const value = useMemo<FlowContextValue>(
    () => ({
      state,
      setLoginMethod: (loginMethod) =>
        setState((current) => ({ ...current, loginMethod })),
      setLanguageStyle: (languageStyle) =>
        setState((current) => ({ ...current, languageStyle })),
      setLovedOne: (lovedOne) => setState((current) => ({ ...current, lovedOne })),
      setReminderType: (reminderType) =>
        setState((current) => ({ ...current, reminderType })),
      setNotificationsEnabled: (notificationsEnabled) =>
        setState((current) => ({ ...current, notificationsEnabled })),
      resetFlow: () => setState(initialState),
    }),
    [state]
  );

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useAppFlow() {
  const context = useContext(FlowContext);

  if (!context) {
    throw new Error('useAppFlow must be used within AppFlowProvider');
  }

  return context;
}
