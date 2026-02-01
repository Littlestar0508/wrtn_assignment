import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserSettingState = {
  homeType: string;
  residents: string;
  smartMeter: string;
  meterRate: string;
  evCharger: string;
  purchase: boolean;

  setHomeType: (homeType: string) => void;
  setResidents: (residents: string) => void;
  setSmartMeter: (smartMeter: string) => void;
  setMeterRate: (smartMeter: string) => void;
  setEvCharger: (evCharger: string) => void;
  setPurchase: (purchase: boolean) => void;
  resetSetting: () => void;
};

export const useUserSettingStore = create<UserSettingState>()(
  persist(
    (set) => ({
      homeType: "",
      residents: "",
      smartMeter: "",
      meterRate: "",
      evCharger: "",
      purchase: false,

      setHomeType: (homeType) => set({ homeType }),
      setResidents: (residents) => set({ residents }),
      setSmartMeter: (smartMeter) => set({ smartMeter }),
      setMeterRate: (meterRate) => set({ meterRate }),
      setEvCharger: (evCharger) => set({ evCharger }),
      setPurchase: (purchase) => set({ purchase }),
      resetSetting: () =>
        set({
          homeType: "",
          residents: "",
          smartMeter: "",
          meterRate: "",
          evCharger: "",
          purchase: false,
        }),
    }),
    {
      name: "user-setting-storage",
    },
  ),
);
