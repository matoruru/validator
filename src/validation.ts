export type ValidationResult = {
  isValid: boolean
  errorMessage: string
}

export type PropertyValidationResult<T> = {
  propertyName: keyof T
} & ValidationResult

export type PropertyValidationResults<T> = PropertyValidationResult<T>[]

export const shouldSatisfy = <T>(
  propertyName: keyof T,
  errorMessage: string,
  p: () => boolean
): PropertyValidationResult<T> => ({
  propertyName,
  errorMessage,
  isValid: p(),
})

export type Validator = {
  describe: string
  satisfy: () => boolean
}

export type ValidatePropertyArgs<T> = [keyof T, Validator[]]

export const validateProperty = <T>([
  propertyName,
  validators,
]: ValidatePropertyArgs<T>): PropertyValidationResult<T>[] =>
  validators.map(({ describe, satisfy }: Validator) =>
    shouldSatisfy<T>(propertyName, describe, satisfy)
  )

export const getResultsByName = <T>(
  results: PropertyValidationResult<T>[],
  propertyName: keyof T
): ValidationResult[] =>
  results.filter((result) => result.propertyName === propertyName)

export const getNumberOfErrors = <T>(
  results: PropertyValidationResult<T>[]
): number => results.filter((result) => !result.isValid).length
