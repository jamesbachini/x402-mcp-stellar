export const SCALAR_7 = BigInt(10000000);
export const SCALAR_9 = BigInt(1000000000);
export const SCALAR_12 = BigInt(1000000000000);
export function toFixed(x, decimals = 7) {
    return BigInt(Math.floor(x * 10 ** decimals));
}
export function toFloat(x, decimals = 7) {
    return Number(x) / 10 ** decimals;
}
export function mulFloor(x, y, denominator) {
    return mulDivFloor(x, y, denominator);
}
export function mulCeil(x, y, denominator) {
    return mulDivCeil(x, y, denominator);
}
export function divFloor(x, y, denominator) {
    return mulDivFloor(x, denominator, y);
}
export function divCeil(x, y, denominator) {
    return mulDivCeil(x, denominator, y);
}
// Performs floor(x * y / z)
function mulDivFloor(x, y, z) {
    const r = x * y;
    return r / z;
}
// Performs ceil(x * y / z)
function mulDivCeil(x, y, z) {
    const r = x * y;
    const remainder = r % z;
    return r / z + (remainder > 0n ? 1n : 0n);
}
