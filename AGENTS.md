## Code style

Declare every function as an arrow function assigned to a `const` — no `function`
declarations or function expressions, anywhere. React components included:

```tsx
const Brand = ({ name, href }: Props) => {
  return <a href={href}>{name}</a>;
};

export default Brand;
```

Name the `const` rather than exporting an anonymous arrow, so the component shows
up under its own name in React DevTools and stack traces.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
