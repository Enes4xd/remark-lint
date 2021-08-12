<!--This file is generated-->

# remark-lint-ordered-list-marker-value

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Warn when the list item marker values of ordered lists violate a given
style.

Options: `'single'`, `'one'`, or `'ordered'`, default: `'ordered'`.

When set to `'ordered'`, list item bullets should increment by one,
relative to the starting point.
When set to `'single'`, bullets should be the same as the relative starting
point.
When set to `'one'`, bullets should always be `1`.

## Fix

[`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
retains the number of the first list item bullet, and by default
increments the other items.
Pass
[`incrementListMarker: false`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#optionsincrementlistmarker)
to not increment further list items.

See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
on how to automatically fix warnings for this rule.

## Presets

This rule is included in the following presets:

| Preset | Setting |
| - | - |
| [`remark-preset-lint-markdown-style-guide`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-preset-lint-markdown-style-guide) | `'one'` |

## Example

##### `ok.md`

###### In

```markdown
The default value is `ordered`, so unless changed, the below
is OK.

1.  Foo
2.  Bar
3.  Baz

Paragraph.

3.  Alpha
4.  Bravo
5.  Charlie

Unordered lists are not affected by this rule.

*   Anton
```

###### Out

No messages.

##### `ok.md`

When configured with `'one'`.

###### In

```markdown
1.  Foo
1.  Bar
1.  Baz

Paragraph.

1.  Alpha
1.  Bravo
1.  Charlie
```

###### Out

No messages.

##### `not-ok.md`

When configured with `'one'`.

###### In

```markdown
1.  Foo
2.  Bar
```

###### Out

```text
2:1-2:8: Marker should be `1`, was `2`
```

##### `also-not-ok.md`

When configured with `'one'`.

###### In

```markdown
2.  Foo
1.  Bar
```

###### Out

```text
1:1-1:8: Marker should be `1`, was `2`
```

##### `ok.md`

When configured with `'single'`.

###### In

```markdown
1.  Foo
1.  Bar
1.  Baz

Paragraph.

3.  Alpha
3.  Bravo
3.  Charlie

Paragraph.

0.  Delta
0.  Echo
0.  Foxtrot
```

###### Out

No messages.

##### `ok.md`

When configured with `'ordered'`.

###### In

```markdown
1.  Foo
2.  Bar
3.  Baz

Paragraph.

3.  Alpha
4.  Bravo
5.  Charlie

Paragraph.

0.  Delta
1.  Echo
2.  Foxtrot
```

###### Out

No messages.

##### `not-ok.md`

When configured with `'ordered'`.

###### In

```markdown
1.  Foo
1.  Bar
```

###### Out

```text
2:1-2:8: Marker should be `2`, was `1`
```

##### `not-ok.md`

When configured with `'💩'`.

###### Out

```text
1:1: Incorrect ordered list item marker value `💩`: use either `'ordered'`, `'one'`, or `'single'`
```

## Install

This package is [ESM only][esm]:
Node 12+ is needed to use it and it must be `imported`ed instead of `required`d.

[npm][]:

```sh
npm install remark-lint-ordered-list-marker-value
```

This package exports no identifiers.
The default export is `remarkLintOrderedListMarkerValue`.

## Use

You probably want to use it on the CLI through a config file:

```diff
 …
 "remarkConfig": {
   "plugins": [
     …
     "lint",
+    "lint-ordered-list-marker-value",
     …
   ]
 }
 …
```

Or use it on the CLI directly

```sh
remark -u lint -u lint-ordered-list-marker-value readme.md
```

Or use this on the API:

```diff
 import {remark} from 'remark'
 import {reporter} from 'vfile-reporter'
 import remarkLint from 'remark-lint'
 import remarkLintOrderedListMarkerValue from 'remark-lint-ordered-list-marker-value'

 remark()
   .use(remarkLint)
+  .use(remarkLintOrderedListMarkerValue)
   .process('_Emphasis_ and **importance**')
   .then((file) => {
     console.error(reporter(file))
   })
```

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

[build-badge]: https://github.com/remarkjs/remark-lint/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-lint/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-lint.svg

[coverage]: https://codecov.io/github/remarkjs/remark-lint

[downloads-badge]: https://img.shields.io/npm/dm/remark-lint-ordered-list-marker-value.svg

[downloads]: https://www.npmjs.com/package/remark-lint-ordered-list-marker-value

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-lint-ordered-list-marker-value.svg

[size]: https://bundlephobia.com/result?p=remark-lint-ordered-list-marker-value

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: https://github.com/remarkjs/remark-lint/blob/main/license

[author]: https://wooorm.com
