import { renderToReadableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../../src/app/App';

export const onRequestGet: PagesFunction = async (context) => {
  const { request } = context;
  const url = new URL(request.url);

  const stream = await renderToReadableStream(
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Code Grimoire</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="stylesheet" href="/static/style.css" />
      </head>
      <body>
        <base href="/" />
        <div id="root">
          <StaticRouter location={url.pathname}>
            <App />
          </StaticRouter>
        </div>
        <script type="module" src="/static/index.js"></script>
      </body>
    </html>,
    {
      bootstrapScripts: ['/static/index.js'],
    }
  );

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
};

