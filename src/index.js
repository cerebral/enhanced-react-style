// Path is an object expression;
function splitStaticAndDynamic(t, path) {
  const dynamicStyle = t.objectExpression(
    path.node.properties.filter(
      node =>
        t.isConditionalExpression(node.value) ||
        t.isLogicalExpression(node.value)
    )
  );
  const staticStyle = t.objectExpression(
    path.node.properties.filter(
      node =>
        !(
          t.isConditionalExpression(node.value) ||
          t.isLogicalExpression(node.value)
        )
    )
  );
  return {
    dynamicStyle,
    staticStyle
  };
}

function extractStylesFromPath(t, path) {
  if (t.isObjectExpression(path.node)) {
    return {
      path: path,
      styles: splitStaticAndDynamic(t, path)
    };
  }
  // TODO: Should we support conditionals here?
  // e.g. style={a ? b : c} or {a || b}
}

export default function(babel) {
  const { types: t } = babel;

  return {
    name: 'babel-plugin-split-styles',
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      JSXOpeningElement(path) {
        const isIdentifier = t.isJSXIdentifier(path.node.name);
        const hasBinding =
          isIdentifier && path.scope.hasBinding(path.node.name.name);

        if (!isIdentifier || hasBinding) {
          path.skip();
        }
      },
      JSXAttribute(path, state) {
        if (path.node.name.name !== 'style') {
          return;
        }

        // Bail out if css prop is used
        // TODO: Might be possible to
        // add static props to css props
        if (
          path.parentPath.node.attributes.some(node => node.name.name === 'css')
        ) {
          return;
        }

        if (t.isJSXExpressionContainer(path.node.value)) {
          const extracted = extractStylesFromPath(
            t,
            path.get('value.expression'),
            state
          );
          if (extracted) {
            const { dynamicStyle, staticStyle } = extracted.styles;

            if (dynamicStyle.properties.length === 0) {
              path.remove();
            } else {
              // Replace all current styles with just the dynamic ones
              extracted.path.replaceWith(dynamicStyle);
            }

            if (staticStyle.properties.length !== 0) {
              const cssProp = t.jsxAttribute(
                t.jsxIdentifier('css'),
                t.jsxExpressionContainer(staticStyle)
              );
              path.parentPath.node.attributes.unshift(cssProp);
            }
          }
        }
      }
    }
  };
}
