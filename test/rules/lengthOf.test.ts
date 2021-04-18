import { checkIf } from '../../src/rules'
import { validateProperty } from '../../src/validation'

type PersonForm = {
  name: string
}

describe('Check if length of "abcde" is', () => {
  const str = 'abcde'

  test('less than', () => {
    expect(
      validateProperty<PersonForm>([
        'name',
        [
          checkIf.lengthOf(str).is.lessThan(5),
          checkIf.lengthOf(str).is.lessThan(6),
          checkIf.lengthOf(str).is.lessThan(7),
        ],
      ]).map(({ isValid }) => isValid)
    ).toEqual([false, true, true])
  })

  test('greater than', () => {
    expect(
      validateProperty<PersonForm>([
        'name',
        [
          checkIf.lengthOf(str).is.greaterThan(3),
          checkIf.lengthOf(str).is.greaterThan(4),
          checkIf.lengthOf(str).is.greaterThan(5),
        ],
      ]).map(({ isValid }) => isValid)
    ).toEqual([true, true, false])
  })

  test('between', () => {
    expect(
      validateProperty<PersonForm>([
        'name',
        [
          checkIf.lengthOf(str).is.betweenFrom(0).to(5),
          checkIf.lengthOf(str).is.betweenFrom(1).to(6),
          checkIf.lengthOf(str).is.betweenFrom(5).to(6),
          checkIf.lengthOf(str).is.betweenFrom(6).to(7),
        ],
      ]).map(({ isValid }) => isValid)
    ).toEqual([true, true, true, false])
  })
})

describe('Error message should be customizable', () => {
  const str = 'abcde'

  test('Custom messages are', () => {
    expect(
      validateProperty<PersonForm>([
        'name',
        [
          {
            ...checkIf.lengthOf(str).is.lessThan(5),
            describe: `Custom message with ${5}`,
          },
          {
            ...checkIf.lengthOf(str).is.lessThan(6),
            describe: `Custom message with ${6}`,
          },
        ],
      ]).map(({ errorMessage }) => errorMessage)
    ).toEqual(['Custom message with 5', 'Custom message with 6'])
  })
})
