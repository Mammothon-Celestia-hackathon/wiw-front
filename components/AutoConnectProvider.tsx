"use client";

import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";

const AUTO_CONNECT_LOCAL_STORAGE_KEY = "wallet-autoconnect";

export interface AutoConnectContextState {
  autoConnect: boolean;
  setAutoConnect: (autoConnect: boolean) => void;
}

export const AutoConnectContext = createContext<AutoConnectContextState>({
  autoConnect: false,
  setAutoConnect: () => null,
});

export function AutoConnectProvider({ children }: PropsWithChildren) {
  const [autoConnect, setAutoConnect] = useState<boolean>(() => {
    // 초기값을 로컬 스토리지에서 가져옴
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(AUTO_CONNECT_LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    // autoConnect 값이 변경될 때마다 로컬 스토리지에 저장
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTO_CONNECT_LOCAL_STORAGE_KEY, JSON.stringify(autoConnect));
    }
  }, [autoConnect]);

  return (
    <AutoConnectContext.Provider
      value={{
        autoConnect,
        setAutoConnect,
      }}
    >
      {children}
    </AutoConnectContext.Provider>
  );
}

export const useAutoConnect = () => {
  return useContext(AutoConnectContext);
};
