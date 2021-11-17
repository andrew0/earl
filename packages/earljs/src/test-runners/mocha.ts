import debug from 'debug'
import mocha, { Suite } from 'mocha'
import { assert } from 'ts-essentials'

import { setTestRunnerIntegration } from '../testRunnerCtx'
import { TestRunnerCtx } from './TestRunnerCtx'

const d = debug('earljs:mocha')

const ctx: TestRunnerCtx = {
  testInfo: {
    suitName: [],
    testName: '',
    testFilePath: '',
  },
  beforeTestCase: (fn) => mocha.beforeEach(fn),
  afterTestCase: (fn) => mocha.afterEach(fn),
}

d('Installing beforeEach hook to get testInfo before each test')
mocha.beforeEach(function () {
  assert(this.currentTest, "Current test not set by mocha. This shouldn't happen.")
  assert(this.currentTest.file, "Current test file path not set by mocha. This shouldn't happen.")
  assert(this.currentTest.parent, "Current test has no parent set by mocha. This shouldn't happen.")

  ctx.testInfo = {
    suitName: makeSuiteName(this.currentTest.parent),
    testName: this.currentTest.title,
    testFilePath: this.currentTest.file,
  }
})

d('Integrating earl with mocha...')
setTestRunnerIntegration(ctx)

function makeSuiteName(testCtx: Suite): string[] {
  if (testCtx.parent) {
    return [...makeSuiteName(testCtx.parent), testCtx.title]
  }
  if (testCtx.title) {
    return [testCtx.title]
  }
  return []
}
