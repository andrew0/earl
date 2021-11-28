import { bigNumberEq } from './bigNumberEq'

export const plugin = {
  matchers: {},
  validators: {},
  smartEqRules: [bigNumberEq],
}
