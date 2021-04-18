import { Validator } from '../validation'

export type LengthOfType = {
  is: {
    lessThan: (n: number) => Validator
    greaterThan: (n: number) => Validator
    betweenFrom: (
      n1: number
    ) => {
      to: (n2: number) => Validator
    }
  }
}

export const lengthOf = ({ length }: string): LengthOfType => ({
  is: {
    lessThan: (n: number): Validator => ({
      describe: `Length should be less than ${n}.`,
      satisfy: () => length < n,
    }),
    greaterThan: (n: number): Validator => ({
      describe: `Length should be greater than ${n}.`,
      satisfy: () => length > n,
    }),
    betweenFrom: (n1: number) => ({
      to: (n2: number) => ({
        describe: `Length should be between from ${n1} to ${n2}.`,
        satisfy: () => n1 <= length && length <= n2,
      }),
    }),
  },
})
