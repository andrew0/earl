import { buildSmartEqResult, SmartEqRule } from 'earljs/internals'
import { BigNumber } from 'ethers'

export const bigNumberEq: SmartEqRule = (actual, expected) => {
  if (actual instanceof BigNumber) {
    if (!(expected instanceof BigNumber)) {
      return actual.eq(expected)
    }
  }
  return undefined
}
