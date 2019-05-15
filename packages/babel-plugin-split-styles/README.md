# babel-plugin-split-styles

Split static and constant styles.

## How does it work?

The first thing to know is that you are going to write all your styling inline. This might sound crazy, but you have to leave your deep knowledge of styling vs css, classnames and everything else behind. Think about the best possible developer experience you can imagine, where none of this knowledge and mental overhead is needed. You just define your styles:

```js
import React from 'react'

function App() {
  const [toggle, setToggle] = React.useState(false)
  return (
    <h1
      onClick={() => setToggle(!toggle)}
      style={{
        color: 'green',
        background: toggle ? 'blue' : 'white'
      }}
    >
      Hello World
    </h1>
  )
}
```

Note that we are defining one static style, named **color**. We are also defining a dynamic style named **background**. This tool understands the difference and will make the static part a class and the dynamic part an inline style.

```js
import React from 'react'

function App() {
  const [toggle, setToggle] = React.useState(false)
  return (
    <h1
      onClick={() => setToggle(!toggle)}
      className="emotion-efoie3"
      style={{ background: toggle ? 'blue' : 'white' }}
    >
      Hello World
    </h1>
  )
}
```

What is also important to notice here is that you can still just import React as normal. You do not need any special `jsx` imports or similar.

### What about selectors?

```js
import React from 'react'

function App() {
  const [toggle, setToggle] = React.useState(false)
  return (
    <h1
      onClick={() => setToggle(!toggle)}
      style={{
        color: 'red',
        '&': {
          ':hover': {
            color: 'blue'
          }
        }
      }}
    >
      Hello World
    </h1>
  )
}
```

The "&" property is used to identify that you are using a selector. This is especially important for typing.

### But everything inline?

Yeah! Because that means there is only one way to define styling. It is the most straight forward and simplest way to think about styling. But you might worry about messy code? That is just a matter of structure. For example, emotion and other libraries allows:

```js
import styled from '@emotion/styled'

export const Wrapper = styled.div({
  color: 'red'
})
```

But there is no need for a custom API taking too many assumptions, causing issues with dynamic behaviour and leaking props to the DOM. Any time you think an element has too many inline styling, just move it to a function component:

```js
import React from 'react'

const Header = ({ onClick, children }) => (
  <h1
    onClick={onClick}
    style={{
      color: 'red',
      '&': {
        ':hover': {
          color: 'blue'
        }
      }
    }}
  >
    {children}
  </h1>
)

function App() {
  const [toggle, setToggle] = React.useState(false)
  return <Header onClick={() => setToggle(!toggle)}>Hello World</Header>
}
```

This is exactly what `styled.div` does, but you are in control of it.

## Summary

The important thing here is the developer experience. You never think about underlying technologies, you just use the `style` attribute and style up your components. They are automatically optimized for dynamic/static behaviour and even doing server side rendering automatically extracts critical CSS for you.
