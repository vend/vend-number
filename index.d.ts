declare module 'vend-number' {
  import { BigNumber } from 'bignumber.js'

  interface Stringable {
    toString(): string
  }

  // RoundingMode is not exported in bignumber.js 5.0.0 so have to copy and paste the declaration from bignumber.js to
  // here in order to use the type. RoundingMode is available in bignumber.js 6.0.0+
  enum RoundingMode {
    /** Rounds away from zero */
    ROUND_UP = 0,
    /** Rounds towards zero */
    ROUND_DOWN = 1,
    /** Rounds towards Infinity */
    ROUND_CEIL = 2,
    /** Rounds towards -Infinity */
    ROUND_FLOOR = 3,
    /**
     * Rounds towards nearest neighbour. If equidistant, rounds away from zero
     */
    ROUND_HALF_UP = 4,
    /**
     * Rounds towards nearest neighbour. If equidistant, rounds towards zero
     */
    ROUND_HALF_DOWN = 5,
    /**
     * Rounds towards nearest neighbour. If equidistant, rounds towards even neighbour
     */
    ROUND_HALF_EVEN = 6,
    /**
     * Rounds towards nearest neighbour. If equidistant, rounds towards `Infinity`
     */
    ROUND_HALF_CEIL = 7,
    /**
     * Rounds towards nearest neighbour. If equidistant, rounds towards `-Infinity`
     */
    ROUND_HALF_FLOOR = 8,
    /**
     * The remainder is always positive. Euclidian division: `q = sign(n) * floor(a / abs(n))`
     */
    EUCLID = 9
  }

  export const ROUNDING_MODES = {
    ROUND_UP: RoundingMode.ROUND_UP,
    ROUND_DOWN: RoundingMode.ROUND_DOWN,
    ROUND_CEIL: RoundingMode.ROUND_CEIL,
    ROUND_FLOOR: RoundingMode.ROUND_FLOOR,
    ROUND_HALF_UP: RoundingMode.ROUND_HALF_UP,
    ROUND_HALF_DOWN: RoundingMode.ROUND_HALF_DOWN,
    ROUND_HALF_EVEN: RoundingMode.ROUND_HALF_EVEN,
    ROUND_HALF_CEIL: RoundingMode.ROUND_HALF_CEIL,
    ROUND_HALF_FLOOR: RoundingMode.ROUND_HALF_FLOOR,
  } as const

  export default class VendNumber extends BigNumber {
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
    static isFinite(value: any): boolean
  }

  export function vn(value?: Stringable): VendNumber
  export function round(value?: Stringable, decimalPoints?: number, roundingMode?: RoundingMode): string
  export function add(...values: Stringable[]): number
  export function subtract(...values: Stringable[]): number
  export function multiply(...values: Stringable[]): number
  export function divide(...values: Stringable[]): number
  export function sumBy<T, K extends keyof T>(collection: T[], property: K, decimalPoints: number): string
  export function isFinite(value: any): boolean
}
