---
title: Mocks
---

Mocks are dummy objects simulating behaviour of more complicated real world
objects. **Earl** supports only function mocks for now.

## Creating typesafe mocks

Mocks are basically a dummy functions which are easy to control and their usage
can be inspected later.

To create a mock do:

```typescript
import { mockFn } from 'earljs'

// mock: Mock<[number, number], number>
const mock = mockFn<[number, number], number>()
```

This creates a mock function expecting two numbers as an input and returning
another number. As with everything in **earl**, we try to be fully typesafe,
that's why you need to pass type arguments between angle brackets `<`, `>`.

Alternatively, you can pass function type as a type argument:

```typescript
// mock: Mock.Of<(a: number, b: number) => number>
const mock = mockFn<(a: number, b: number) => number>()
```

If you leave out type arguments both input and output of the mock will be typed
as `any`.

## Configuring mocks

Mocks in **earl** needs to be configured first, if you call this mock now you
will get `MockNotConfigured` Error.

```typescript
import { mockFn } from 'earljs'

const mock = mockFn<[number, number], number>()
mock.returns(42) // make it always return 42

console.log(mock(2, 2)) // 42
console.log(mock(2, 2)) // 42
console.log(mock(2, 2)) // 42

// when called with args 2 and 2 return 4
mock.given(2, 2).returnsOnce(4)

console.log(mock(2, 2)) // 4
```

There are various ways of configuring mocks, explore all of them in
[API reference](/docs/api/api-reference#mocks).

## Asserting mocks

**earl** provides a couple of validators to work with mocks:

```typescript
const mock = mockFn<[number, number], number>()
mock.returns(42) // make it always return 42

mock(2, 2)

// expect that it was called with 2 and 2
expect(mock).toHaveBeenCalledWith([2, 2])

// expect that it was exactly once with 2 and 2
expect(mock).toHaveBeenCalledExactlyWith([[2, 2]])
```

Alternatively to `toHaveBeenCalledExactlyWith` and `toHaveBeenCalledWith`, you
can define all expected arguments using `given` and assert they were passed with
`toBeExhausted`.

```ts
const mock = mockFn<(_: number) => number>()
  .given(2)
  .returnsOnce(4)
  .given(3)
  .returnsOnce(9)

expect(mock).toBeExhausted()
```

Learn more from [API reference](/docs/api/api-reference#mocks).
