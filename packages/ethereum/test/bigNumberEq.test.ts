import { expect } from 'earljs'
import { BigNumber } from 'ethers'

describe('bigNumberEq', () => {
  it('works', () => {
    expect(BigNumber.from(1)).toEqual(BigNumber.from(1))
    expect(BigNumber.from(1)).toEqual(1)
  })
})
