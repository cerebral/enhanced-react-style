# babel-plugin-split-styles

Splitting dynamic and static styles into `style` and `css` prop.
Shoud be used in combination with [@emotion/babel-preset-css-prop](https://github.com/emotion-js/emotion/tree/master/packages/babel-preset-css-prop)

## Example

```js
function App() {
  const [toggle, setToggle] = React.useState(false);
  return (
    <h1
      onClick={() => setToggle(!toggle)}
      style={{ color: 'green', background: toggle ? 'blue' : 'white' }}
    >
      Hello World
    </h1>
  );
}
```

will be transformed to

```js
function App() {
  const [toggle, setToggle] = React.useState(false);
  return (
    <h1
      onClick={() => setToggle(!toggle)}
      css={{ color: 'green' }}
      style={{ background: toggle ? 'blue' : 'white' }}
    >
      Hello World
    </h1>
  );
}
```

splitting up the static and dynamic stylings automatically.
