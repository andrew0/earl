module.exports = {
  require: ['ts-node/register/transpile-only'],
  file: ['./test-setup.ts'],
  extension: ['ts'],
  watchExtensions: ['ts'],
  spec: ['*.test.stub.ts'],
}
