<h1 align="center">
  @potloc/spready
</h1>

<p align="center">
   Conditional spread operator for human. A readable way to spread an array or an object conditionally.
</p>

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="@potloc/spready is released under the MIT license." />
  </a>

  <a href="CODE_OF_CONDUCT.md">
    <img src="https://img.shields.io/badge/Contributor%20Covenant-2.1-blue.svg" alt="The code of conduct of @potloc/spready." />
  </a>

  <a href="CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>

  <a href="http://commitizen.github.io/cz-cli/">
    <img src="https://img.shields.io/badge/commitizen-friendly-blue.svg" alt="Commitizen friendly" />
  </a>
</p>

## A bit of context

At Potloc we like it when our code is easy to read, write and self-explanatory. One thing we often do is to use the spread operator, but sometimes based on certain condition we do not want to execute a specif spread operation. There are multiple ways to achive this, but none are "easy to read, write and self-explanatory". Here are some examples:

### conditional assignment using a if block

The example below is easy to read and write, but might not be as self-explanatory because of the usaged Object.assign. Also where is the the famous spread operator that we has developpers love?

```ts
function buildConfig(host: string, isSecure: boolean) {
  const config = { host, ssl: false, protocol: "http" };

  if (isSecure) {
    Object.assign(config, { ssl: true, protocol: "https" });
  }

  return config;
}
```

### Inline conditional spread using the conditional operator

The example below is not easy to read, write or even self-explanatory. It looks likes someones is trying to be a bit too smart, but at least it uses our beloved spread operator!

```ts
const buildConfig = (host: string, isSecure: boolean) => ({
  host,
  ssl: false,
  protocol: "http",
  ...(isSecure ? { ssl: true, protocol: "https" } : {}),
});
```

### Then, what?!

Since we are developpers, we've decided to write a small piece of code to make the conditionnal spread easy to read, write and self-explanatory. Boom 💥 spready was born! Here is the same example using it.

```ts
import spready from "@potloc/spready";

const buildConfig = (host: string, isSecure: boolean) => ({
  host,
  ssl: false,
  protocol: "http",
  ...spready({ ssl: true, protocol: "https" }).if(isSecure),
});
```

If you are not yet convinced go to the [usage section](#usage) for more examples.

## Getting Started 🚀

Install `@potloc/spready` using the package manager of your chose, import it and start using it!

### Using npm

```bash
npm install @potloc/spready
```

### Using pnpm

```bash
pnpm add @potloc/spready
```

### Using yarn

```bash
yarn add @potloc/spready
```

## Usage

### With `if` method

It returns the object passed in parameter if the condition is thruty.

```ts
import spready from "@potloc/spready";

// { foo: "bar", baz: "qux" }
const a = {
  foo: "bar",
  ...spready({ baz: "qux" }).if(true),
};

// { foo: "bar" }
const b = {
  foo: "bar",
  ...spready({ baz: "qux" }).if(false),
};
```

### With `unless` method

It returns the object passed in parameter if the condition is falsy.

```ts
import spready from "@potloc/spready";

// { foo: "bar" }
const a = {
  foo: "bar",
  ...spready({ baz: "qux" }).unless(true),
};

// { foo: "bar", baz: "qux" }
const b = {
  foo: "bar",
  ...spready({ baz: "qux" }).unless(false),
};
```

### With a callback

It can also conditionally invoke code if we pass a callback in parameter.

```ts
import spready from "@potloc/spready";

// it will also log "Hello World!"
// { foo: "bar", baz: "qux" }
const a = {
  foo: "bar",
  ...spready(() => {
    console.log("Hello World!");

    return { baz: "qux" };
  }).if(true),
};

// it won't log "Hello World!"
// { foo: "bar" }
const b = {
  foo: "bar",
  ...spready(() => {
    console.log("Hello World!");

    return { baz: "qux" };
  }).if(false),
};
```

### JSX example

It can increase the readability of your JSX code.

```tsx
import spready from "@potloc/spready";

const SumitButton = (props) => {
  const { isSubmitting } = props;

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      {...spready({ className: "is-loading" }).if(isSubmitting)}
    >
      Submit
    </button>
  );
};
```

## Code of Conduct

Potloc is dedicated to building a welcoming, diverse, safe community. We expect everyone participating in the Potloc community to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it. Please follow it. In the Potloc community, we work hard to build each other up and create amazing things together.

## How to Contribute 🤝

Pull requests are welcome. If you'd like to contribute to @potloc/spready, that's awesome, and we ❤️ you. Check out our [guide to contributing](CODE_OF_CONDUCT.md) for more information.

## Need help?

You can have a look at the [discussions secion](https://github.com/potloc/spready/discussions) to see if someone else has faced the same issue. Do not hesitate to open a new discussion using the [Q&A category](https://github.com/potloc/spready/discussions/new?category=q-a) and we'll try our best to reply to you as soon as possible.

## License

Licensed under the [MIT license](LICENSE).
