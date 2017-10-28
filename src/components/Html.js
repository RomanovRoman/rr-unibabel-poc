import React, { PropTypes } from 'react';
import serialize from 'serialize-javascript';


class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    style: PropTypes.string,
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    state: PropTypes.object,
    children: PropTypes.string,
  };

  render() {
    const { title, description, style, scripts, state, children } = this.props;
    return (
      <html className="no-js" lang="ru">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{ title }</title>
          <meta name="description" content={ description } />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          { style &&
            <style id="css" dangerouslySetInnerHTML={{ __html: style }} />
          }
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
          { state && (
            <script
              dangerouslySetInnerHTML={{ __html:
              `window.APP_STATE=${ serialize(state, { isJSON: true }) }` }}
            />
          )}
          { scripts &&
            scripts.map(script => <script key={script} src={script} />)
          }
        </body>
      </html>
    );
  }
}


export default Html;
