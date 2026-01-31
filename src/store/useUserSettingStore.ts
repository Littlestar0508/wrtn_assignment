import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserSettingState = {
  homeType: string;
  residents: string;
  smartMeter: string;
  evCharger: string;

  setHomeType: (homeType: string) => void;
  setResidents: (residents: string) => void;
  setSmartMeter: (smartMeter: string) => void;
  setEvCharger: (evCharger: string) => void;
};

export const useUserSettingStore = create<UserSettingState>()(
  persist(
    (set) => ({
      homeType: "",
      residents: "",
      smartMeter: "",
      evCharger: "",

      setHomeType: (homeType) => set({ homeType }),
      setResidents: (residents) => set({ residents }),
      setSmartMeter: (smartMeter) => set({ smartMeter }),
      setEvCharger: (evCharger) => set({ evCharger }),
    }),
    {
      name: "user-setting-storage",
    },
  ),
);
