import jsx from '@babel/plugin-transform-react-jsx'
import pragmatic from '@emotion/babel-plugin-jsx-pragmatic'
import emotion from 'babel-plugin-emotion'
import splitStyles from 'babel-plugin-split-styles'

let pragmaName = '___EmotionJSX'

// pull out the emotion options and pass everything else to the jsx transformer
// this means if @babel/plugin-transform-react-jsx adds more options, it'll just work
// and if babel-plugin-emotion adds more options we can add them since this lives in
// the same repo as babel-plugin-emotion

export default (
  api,
  {
    sourceMap = undefined,
    autoLabel = undefined,
    labelFormat = undefined,
    instances = undefined,
    ...options
  } = {}
) => {
  return {
    plugins: [
      [
        pragmatic,
        {
          export: 'jsx',
          module: '@emotion/core',
          import: pragmaName,
        },
      ],
      splitStyles,
      [jsx, { pragma: pragmaName, pragmaFrag: 'React.Fragment', ...options }],
      [
        emotion,
        {
          sourceMap,
          autoLabel,
          labelFormat,
          instances,
          cssPropOptimization: true,
        },
      ],
    ],
  }
}
