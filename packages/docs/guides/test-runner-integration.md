---
title: Test runner integration
---

By integrating with a test runner you get:

- snapshot testing support

Currently only integration with `mocha` is supported. To enable, simply import
`earljs/mocha` in your test setup file, you can put it in `.mocharc.js`:

```js
// test/setup.js
import 'earljs/mocha'
```

```js
// .mocharc.js
module.exports = {
  file: ['./test/setup.js'],
  // ...
}
```

That's it!
