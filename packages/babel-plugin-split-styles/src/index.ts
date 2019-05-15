// Path is an object expression;
function splitStaticAndDynamic(t, path) {
  const dynamicStyle = path.node.properties.filter(
    (node) =>
      t.isConditionalExpression(node.value) || t.isLogicalExpression(node.value)
  )
  const staticStyle = path.node.properties.filter(
    (node) =>
      !(
        t.isConditionalExpression(node.value) ||
        t.isLogicalExpression(node.value)
      )
  )
  return {
    dynamicStyle,
    staticStyle,
  }
}

function extractStylesFromPath(t, path) {
  if (t.isObjectExpression(path.node)) {
    return {
      path: path,
      styles: splitStaticAndDynamic(t, path),
    }
  }
  // TODO: Should we support conditionals here?
  // e.g. style={a ? b : c} or {a || b}
}

export default function(babel) {
  const { types: t } = babel

  return {
    name: 'babel-plugin-split-styles',
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      JSXOpeningElement(path) {
        const isIdentifier = t.isJSXIdentifier(path.node.name)
        const hasBinding =
          isIdentifier && path.scope.hasBinding(path.node.name.name)

        if (!isIdentifier || hasBinding) {
          path.skip()
        }
      },
      JSXAttribute(path) {
        if (
          !t.isObjectExpression(path.node.value.expression) ||
          path.node.name.name !== 'style' ||
          path.parent.attributes.some((node) => node.name.name === 'css')
        ) {
          return
        }

        if (t.isJSXExpressionContainer(path.node.value)) {
          const extracted = extractStylesFromPath(
            t,
            path.get('value.expression')
          )
          if (extracted) {
            const { dynamicStyle, staticStyle } = extracted.styles

            if (dynamicStyle.length === 0) {
              path.remove()
            } else {
              // Replace all current styles with just the dynamic ones
              extracted.path.replaceWith(t.objectExpression(dynamicStyle))
            }

            if (staticStyle.length !== 0) {
              path.parentPath.node.attributes.unshift(
                t.jsxAttribute(
                  t.jsxIdentifier('css'),
                  t.jsxExpressionContainer(t.objectExpression(staticStyle))
                )
              )
            }
          }
        }
      },
    },
  }
}
