import pluginTester from 'babel-plugin-tester';
import plugin from '../src';

pluginTester({
  plugin,
  babelOptions: {},
  tests: [
    {
      title: 'Only static css',
      code: '<div style={{color: "green"}} />',
      snapshot: true
    },
    {
      title: 'Dynamic styles should stay in `style`',
      code: '<div style={{color: a ? "red" : "green"}} /> ',
      snapshot: true
    },
    {
      title: 'Extract static from dynamic',
      code: '<div style={{background: "blue", color: a ? "red" : "green"}} />',
      snapshot: true
    },
    {
      title: 'Bail if `css` prop was used',
      code: '<div css={{background: "blue"}} style={{color: "green"}} />',
      snapshot: true
    },
    {
      title: 'Ignore bound jsx elements',
      code: 'const div = () => {}; <div style={{some: "other", stuff}} />',
      snapshot: true
    },
    {
      title: 'Ignore non identifier as element name',
      code: '<animated.div style={{some: "other", stuff}} />',
      snapshot: true
    }
  ]
});
