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
