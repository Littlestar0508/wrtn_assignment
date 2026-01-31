import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserSettingState = {
  homeType: string;
  residents: string;
  meterRate: string;
  evCharger: string;

  setHomeType: (homeType: string) => void;
  setResidents: (residents: string) => void;
  setMeterRate: (smartMeter: string) => void;
  setEvCharger: (evCharger: string) => void;
};

export const useUserSettingStore = create<UserSettingState>()(
  persist(
    (set) => ({
      homeType: "",
      residents: "",
      meterRate: "",
      evCharger: "",

      setHomeType: (homeType) => set({ homeType }),
      setResidents: (residents) => set({ residents }),
      setMeterRate: (meterRate) => set({ meterRate }),
      setEvCharger: (evCharger) => set({ evCharger }),
    }),
    {
      name: "user-setting-storage",
    },
  ),
);
