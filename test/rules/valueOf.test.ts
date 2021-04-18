import { checkIf } from '../../src/rules'
import { validateProperty } from '../../src/validation'

type Person = {
  name: string
  age: number
}

type PersonForm = { [P in keyof Person]: string }

describe('Check if "abcde" is', () => {
  const str = 'abcde'

  test('equal to', () => {
    expect(
      validateProperty<PersonForm>([
        'name',
        [
          checkIf.valueOf(str).is.equalTo('abcde'),
          checkIf.valueOf(str).is.equalTo('abcdef'),
        ],
      ]).map(({ isValid }) => isValid)
    ).toEqual([true, false])
  })

  test('equal to', () => {
    expect(
      validateProperty<PersonForm>([
        'age',
        [
          checkIf.valueOf(10).is.equalTo(10),
          checkIf.valueOf(10).is.equalTo(11),
        ],
      ]).map(({ isValid }) => isValid)
    ).toEqual([true, false])
  })

  test('not equal to', () => {
    expect(
      validateProperty<PersonForm>([
        'name',
        [
          checkIf.valueOf(str).is.not.equalTo('abcde'),
          checkIf.valueOf(str).is.not.equalTo('abcdef'),
          checkIf.valueOf(str).is.not.equalTo('abcdefg'),
        ],
      ]).map(({ isValid }) => isValid)
    ).toEqual([false, true, true])
  })
})
