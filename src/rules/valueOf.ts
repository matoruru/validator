import { Validator } from '../validation'

export type ValueOfType<T> = {
  is: {
    equalTo: (b: T) => Validator
    not: {
      equalTo: (b: T) => Validator
    }
  }
}

export const valueOf = <T>(a: T): ValueOfType<T> => ({
  is: {
    equalTo: (b: T): Validator => ({
      describe: `This should be ${b}.`,
      satisfy: () => a === b,
    }),
    not: {
      equalTo: (b: T): Validator => ({
        describe: `This should not be ${b}.`,
        satisfy: () => a !== b,
      }),
    },
  },
})
