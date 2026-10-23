"use client";

import React, { createContext, useContext, useState } from "react";
import { DEFAULT_STORE_SETTINGS, StoreSettings } from "./settings";

interface StoreSettingsContextType {
  settings: StoreSettings;
}

const StoreSettingsContext = createContext<StoreSettingsContextType>({
  settings: DEFAULT_STORE_SETTINGS,
});

export function StoreSettingsProvider({
  initialSettings,
  children,
}: {
  initialSettings?: StoreSettings;
  children: React.ReactNode;
}) {
  const [settings] = useState<StoreSettings>(initialSettings || DEFAULT_STORE_SETTINGS);

  return (
    <StoreSettingsContext.Provider value={{ settings }}>
      {children}
    </StoreSettingsContext.Provider>
  );
}

export function useStoreSettings(): StoreSettings {
  const context = useContext(StoreSettingsContext);
  return context?.settings || DEFAULT_STORE_SETTINGS;
}
