import { keccak256, toHex } from 'viem';

export const getCellType = (id: number, isAirplanePart: boolean, isAirplaneHead: boolean): number => {
  if (isAirplaneHead) return 2;
  if (isAirplanePart) return 1;
  return 0;
};

export const getCellHash = (id: number): string => {
  const input = new TextEncoder().encode(id.toString());
  return toHex(keccak256(input));
};

export const getCellInfo = (id: number, isAirplanePart: boolean, isAirplaneHead: boolean): string => {
  const hash = getCellHash(id);
  const type = getCellType(id, isAirplanePart, isAirplaneHead);
  return `${hash}:${type}`;
};