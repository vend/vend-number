declare module 'vend-number' {
  import { BigNumber, RoundingMode } from 'bignumber.js'

  interface Stringable {
    toString(): string
  }

  declare export default class VendNumber extends BigNumber {
    constructor (value?: Stringable)

    static readonly ROUNDING_MODES: {
      ROUND_UP: RoundingMode,
      ROUND_DOWN: RoundingMode,
      ROUND_CEIL: RoundingMode,
      ROUND_FLOOR: RoundingMode,
      ROUND_HALF_UP: RoundingMode,
      ROUND_HALF_DOWN: RoundingMode,
      ROUND_HALF_EVEN: RoundingMode,
      ROUND_HALF_CEIL: RoundingMode,
      ROUND_HALF_FLOOR: RoundingMode
    }

    static vn(value?: Stringable): VendNumber
    static round(value?: Stringable, decimalPoints?: number, roundingMode?: RoundingMode): string
    static add(...values: Stringable[]): number
    static subtract(...values: Stringable[]): number
    static multiply(...values: Stringable[]): number
    static divide(...values: Stringable[]): number
    static sumBy<T, K extends keyof T>(collection: T[], property: K, decimalPoints: number): string
    static isFinite(value: number | string | BigNumber): boolean
  }
}
