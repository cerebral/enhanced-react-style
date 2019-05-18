import pluginTester from 'babel-plugin-tester'
import plugin from '.'

pluginTester({
  plugin,
  babelOptions: {
    babelrc: false,
  },
  snapshot: true,
  tests: [
    {
      title: 'Only static css',
      code: '<div style={{color: "green"}} />',
    },
    {
      title: 'Should bail on non object expression',
      code: '<div style={a} />',
    },
    {
      title: 'Dynamic styles should stay in `style`',
      code: '<div style={{color: a ? "red" : "green"}} /> ',
    },
    {
      title: 'Extract static from dynamic',
      code: '<div style={{background: "blue", color: a ? "red" : "green"}} />',
    },
    {
      title: 'Should bail if `css` property exists',
      code: '<div css={{}} style={{background: "blue"}} />',
    },
    {
      title: 'Ignore bound jsx elements',
      code: 'const div = () => {}; <div style={{some: "other", stuff}} />',
    },
    {
      title: 'Ignore non identifier as element name',
      code: '<animated.div style={{some: "other", stuff}} />',
    },
    {
      title: 'Should work with nested object',
      code:
        '<div style={{color: "green", "&": { ":hover": { color: "blue"}}}} />',
    },
    {
      title: 'Should work with boolean attributes',
      code: '<div allowFullScreen />',
    },
  ],
})
