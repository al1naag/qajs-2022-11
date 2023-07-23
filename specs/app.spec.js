import { describe, expect, test } from '@jest/globals'
import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

describe('nameIsValid function', () => {
  test('imports without the error', () => {
    expect(nameIsValid).toBeTruthy()
    expect(typeof nameIsValid).toBe('function')
  })
  test('Should return true for valid name', () => {
    expect(nameIsValid('Name')).toBe(true)
  })
  test('Should return false if spaces in the string', () => {
    expect(nameIsValid('Name ')).toBe(false)
  })
  test('Should return false if the string has length < 2', () => {
    expect(nameIsValid('N')).toBe(false)
  })
  test('Should return true if the string has length = 2', () => {
    expect(nameIsValid('Na')).toBe(true)
  })
  test('Should return false if the argument is a number', () => {
    expect(nameIsValid(2)).toBe(false)
  })
  test('Should return false if the argument is a empty string', () => {
    expect(nameIsValid('')).toBe(false)
  })
  test('Should return false if the argument is undefined', () => {
    expect(nameIsValid(undefined)).toBe(false)
  })
  test('Should return false if the argument is null', () => {
    expect(nameIsValid(null)).toBe(false)
  })
})

describe('fullTrim function', () => {
  test('imports without the error', () => {
    expect(fullTrim).toBeTruthy()
    expect(typeof fullTrim).toBe('function')
  })
  test('Should remove all trailing and leading spaces', () => {
    expect(fullTrim(' Name Lastname ')).toBe('NameLastname')
  })
  test('Should remove leading spaces', () => {
    expect(fullTrim(' Name')).toBe('Name')
  })
  test('Should remove trailing spaces', () => {
    expect(fullTrim('Name ')).toBe('Name')
  })
  test('Should return an empty string if the argument is empty string', () => {
    expect(fullTrim('')).toBe('')
  })
  test('Should return an empty string if the argument is null', () => {
    expect(fullTrim(null)).toBe('')
  })
  test('Should return an empty string if the argument is undefined', () => {
    expect(fullTrim(undefined)).toBe('')
  })
  test('throws error when argument is a number', () => {
    expect(() => fullTrim(2)).toThrow()
  })
})

describe('getTotal function', () => {
  test('imports without the error', () => {
    expect(getTotal).toBeTruthy()
    expect(typeof getTotal).toBe('function')
  })
  test.each`
    price | quantity | discount | expected
    ${10} | ${10}    | ${0}     |${100}
    ${10} | ${0}     | ${0}     |${0}
    ${0}  | ${10}    | ${0}     |${0}
    ${10} | ${10}    | ${10}    |${90}
    ${10} | ${10}    | ${'?'}   |${'error'}
    ${'?'}| ${10}    | ${'10'}  |${'error'}
    ${10} | ${'?'}   | ${'10'}  |${'error'}
    ${10} | ${10}    | ${-5}    |${'error'}
`('returns $expected when $price * $quantity - $discount', ({ price, quantity, discount, expected }) => {
    if (expected === 'error') {
      expect(() => getTotal(price, quantity, discount)).toThrow()
    } else {
      expect(price * quantity - discount).toBe(expected)
    }
  })
})
