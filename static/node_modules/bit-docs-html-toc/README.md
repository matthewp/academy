# bit-docs-html-toc
[![npm version](https://badge.fury.io/js/bit-docs-html-toc.svg)](https://badge.fury.io/js/bit-docs-html-toc)
[![Build Status](https://travis-ci.org/bit-docs/bit-docs-html-toc.svg?branch=master)](https://travis-ci.org/bit-docs/bit-docs-html-toc)

A table of contents for use with [bit-docs-generate-html](https://github.com/bit-docs/bit-docs-generate-html).

![screen shot 2016-11-10 at 10 16 55](https://cloud.githubusercontent.com/assets/724877/20181326/830b44a2-a73c-11e6-923c-5c880164383b.png)

![screen shot 2016-11-10 at 10 15 51](https://cloud.githubusercontent.com/assets/724877/20181334/887fbbe8-a73c-11e6-929b-0ba411cdd63b.png)

![screen shot 2016-11-09 at 17 02 17](https://cloud.githubusercontent.com/assets/724877/20152767/612903ae-a69e-11e6-9fe0-6d781567fd6f.png)


## Use

To use, add bit-docs-html-toc to your bit-docs dependencies in package.json:

```json
{
  ...

  "bit-docs": {
    "dependencies": {
      "bit-docs-html-toc": "$VERSION"
    }
  }
}
```

Where `$VERSION` is the latest version on npm.

In your template add a `<bit-toc>` element:

```html
<bit-toc></bit-toc>
```

## Attributes

`<bit-toc>` supports the following attributes:

### heading-container-selector

By default, all heading tags children of the first `article` tag on the page will
be collected to create the table of contents; if you want to use a different element
just do:

```html
<bit-toc
  heading-container-selector="#my-custom-selector"
>
</bit-toc>
```

The table of contents will be injected into this element at run time.

### depth

By default, only `h2` elements are collected. You
can change to include `<h3>` elements by setting depth like:

```html
<bit-toc depth="2"></bit-toc>
```

Alternatively, the number of child headers that will be included in the TOC, use the
`@outline` tag like so:

```
@outline 2
```

### child-tag

If you want `<li>`'s to be within an `<ol>` instead of a `<ul>`, this
can be configured like:

```html
<bit-toc child-tag="ol"></bit-toc>
```

### scroll-selector

If present, will scroll the `<bit-toc>` element with the `heading-container-selector`:

```html
<bit-toc scroll-selector></bit-toc>
```

`scroll-selector` can also be set to some other element to scroll:

```html
<bit-toc scroll-selector="#some-parent"></bit-toc>
```

## Methods

Call `.highlight()` to force an update of the `active` or `completed`
class names on the `<li>` elements:

```js
document.querySelector("bit-toc").highlight()
```

This happens automatically when the `heading-container-selector`
element is scrolled.
