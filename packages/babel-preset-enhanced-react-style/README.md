# babel-preset-enhanced-react-style

Automatically splits static and dynamic styling from the **style** attribute into CSS class names and inline styles.

## Motivation

Writing styles is a hassle and though great iterations has been done with css-in-js libraries we still have to think about a few things. Things like... this dynamic css, how many class names will it produce? And this prop... will it be passed into the DOM as well? And do I really have to set up all this stuff to get automatic class creation?

We wanted to see if we could just make this stuff work. So basically you just style up your elements and to not think any more on it. One attribute **style** and just add the rules, them being dynamic or not.

## How to install

```
npm install babel-preset-enhanced-react-style
```

**babel config**

```
{
  "presets": ["@babel/react", "babel-preset-enhanced-react-style"]
}
```

**babel config (TYPESCRIPT)**

```
{
  "presets": ["@babel/typescript", "@babel/react", "babel-preset-enhanced-react-style"]
}
```

Currently you have to manually augment React to allow the **&** property, in your **index**:

```ts
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

declare module 'react' {
  interface CSSProperties {
    '&'?: {
      [selector: string]: Omit<CSSProperties, '&'>
    }
  }
}
```

**NOTE!** We will find a way to automate this

## How to use

Basically just start using the **style** attribute as normal. When you look at the element inspector in the browser you will see it splits out static styling to class names.

```ts
const MyComponent: React.FunctionComponent = ({ width }) => {
  return (
    <div
      style={{
        color: 'red',
        width: width + 'px'
      }}
    />
  )
}
```

### Selectors

You can now use CSS selectors behind the **&** prop:

```ts
const MyComponent: React.FunctionComponent = ({ width }) => {
  return (
    <div
      style={{
        color: 'red',
        '&': {
          ':hover': {
            color: 'blue'
          }
        }
      }}
    />
  )
}
```

Selectors can not be dynamic.

### Organize

Typically you want to define some element more explicitly. Do that by defining them as their own components:

```ts
const Header: React.FunctionComponent = ({ children }) => (
  <h1
    style={{
      color: '#333',
      fontSize: 28
    }}
  >
    {children}
  </h1>
)
```

### Server side rendering

It just works, critical CSS is extracted with `renderToString`.

## Big thanks

To [emotion](https://emotion.sh) which is an awesome css-in-js library. We are just lowering the threshold to use it... to the extent you do not even know you are using it :)
