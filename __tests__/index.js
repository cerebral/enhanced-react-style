import pluginTester from 'babel-plugin-tester';
import plugin from '../src';

pluginTester({
  plugin,
  babelOptions: {
    babelrc: false
  },
  snapshot: true,
  tests: [
    {
      title: 'Only static css',
      code: '<div style={{color: "green"}} />'
    },
    {
      title: 'Should bail on non object expression',
      code: '<div style={a} />'
    },
    {
      title: 'Dynamic styles should stay in `style`',
      code: '<div style={{color: a ? "red" : "green"}} /> '
    },
    {
      title: 'Extract static from dynamic',
      code: '<div style={{background: "blue", color: a ? "red" : "green"}} />'
    },
    {
      title: 'Merge static styles into `css` prop',
      code:
        '<div css={{background: "blue"}} style={{color: "green", background: a ? "red" : "green"}} />'
    },
    {
      title: 'Bail if `css` prop is not a object expression',
      code:
        '<div css={other} style={{color: "green", background: a ? "red" : "green"}} />'
    },
    {
      title: 'Ignore bound jsx elements',
      code: 'const div = () => {}; <div style={{some: "other", stuff}} />'
    },
    {
      title: 'Ignore non identifier as element name',
      code: '<animated.div style={{some: "other", stuff}} />'
    }
  ]
});
