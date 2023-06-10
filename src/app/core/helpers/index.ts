export function calculatePlayerPercentage(currValue: number, allValue: number) {
  return (currValue / allValue) * 100;
}

export const thousandsSeparator = (amount: number) =>
  amount
    .toLocaleString('fr', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(',00', '');

export const getTimeInMilliseconds = (milliseconds: number | string) => {
  if (typeof milliseconds == 'number') {
    const hours = `0${new Date(milliseconds).getHours() - 1}`.slice(-2);
    const minutes = `0${new Date(milliseconds).getMinutes()}`.slice(-2);
    const seconds = `0${new Date(milliseconds).getSeconds()}`.slice(-2);

    const time = `${minutes}:${seconds}`;
    return time;
  } else {
    return milliseconds;
  }
}
