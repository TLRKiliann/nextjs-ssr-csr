# nextjs-ssr-csr

## Pre-rendering

By default, Next.js pre-renders every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.

Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called hydration.)

## Two forms of Pre-rendering

Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering. The difference is in when it generates the HTML for a page.

Static Generation (Recommended): The HTML is generated at build time and will be reused on each request.
Server-side Rendering: The HTML is generated on each request.

Next.js recommend using Static Generation over Server-side Rendering for performance reasons. Statically generated pages can be cached by CDN with no extra configuration to boost performance. However, in some cases, Server-side Rendering might be the only option.

You can also use Client-side data fetching along with Static Generation or Server-side Rendering. That means some parts of a page can be rendered entirely by client side JavaScript.

## Server-side Rendering

If a page uses Server-side Rendering, the page HTML is generated on each request.

To use Server-side Rendering for a page, you need to export an async function called getServerSideProps. This function will be called by the server on every request.

For example, suppose that your page needs to pre-render frequently updated data (fetched from an external API). You can write getServerSideProps which fetches this data and passes it to Page like below:

```
export default function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
```

## Static Generation (Recommended): 

The HTML is generated at build time and will be reused on each request. To make a page use Static Generation, either export the page component, or export getStaticProps (and getStaticPaths if necessary). It's great for pages that can be pre-rendered ahead of a user's request. You can also use it with Client-side Rendering to bring in additional data.

## Server-side Rendering: 

The HTML is generated on each request. To make a page use Server-side Rendering, export getServerSideProps. Because Server-side Rendering results in slower performance than Static Generation, use this only if absolutely necessary.