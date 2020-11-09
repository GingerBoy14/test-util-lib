describe('Objects', () => {
  it('obj toBe obj', () => {
    expect({ a: 5 }).toBe({ a: 5 })
  })
  it('obj toEqual obj', () => {
    expect({ a: 5 }).toEqual({ a: 5 })
  })
})
describe('second summary', () => {
  it('array length = 5', () => {
    expect([1, 2, 3, 4, 5]).toEqual(5)
  })
})
