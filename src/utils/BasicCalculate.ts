type BasicCalculateProps = {
  residents: string;
  purchase: boolean;
  electronicCar: string;
  meter: string;
};

const basicCalculate = ({
  residents,
  purchase,
  electronicCar,
  meter,
}: BasicCalculateProps) => {
  let pay = 0;

  let initE = 75 * Number(residents);
  if (electronicCar === "yes") initE *= 2;

  if (meter === "fixed") {
    pay += 120 * initE;

    return [
      { date: 0, pay },
      { date: 1, pay: pay * (1 - 1 * 0.2) * 12 },
      { date: 2, pay: pay * (1 - 2 * 0.2) * 24 },
      { date: 3, pay: pay * (1 - 3 * 0.2) * 36 },
    ];
  }

  if (meter === "flex") {
  }
};

export default basicCalculate;
