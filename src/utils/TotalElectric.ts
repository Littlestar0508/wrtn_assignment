type TotalElectricType = {
  chk: boolean;
  evCharger: string;
  consumption: number | string;
  residents: string;
  year: number;
};

const totalElectric = ({
  chk,
  evCharger,
  consumption,
  residents,
  year,
}: TotalElectricType) => {
  if (chk) {
    if (evCharger === "yes") return Number(consumption) * 2 * year * 12;
    else return Number(consumption) * year * 12;
  } else {
    if (evCharger === "yes") return Number(residents) * 75 * 2 * year * 12;
    else return Number(residents) * 75 * year * 12;
  }
};

export default totalElectric;
