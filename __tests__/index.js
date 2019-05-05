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
    }
  ]
});
