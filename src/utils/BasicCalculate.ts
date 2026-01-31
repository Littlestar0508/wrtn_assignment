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

  if (meter === "fixed") {
    if (purchase) pay += 200000;
    let initE = 75 * Number(residents);
    if (electronicCar === "yes") initE *= 2;
    pay += 120 * initE;

    return [
      { date: 0, pay },
      { date: 1, pay: pay * (1 - 1 * 0.2) },
      { date: 2, pay: pay * (1 - 2 * 0.2) },
      { date: 3, pay: pay * (1 - 3 * 0.2) },
    ];
  }
};

export default basicCalculate;
