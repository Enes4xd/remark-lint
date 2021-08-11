/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module checkbox-character-style
 * @fileoverview
 *   Warn when list item checkboxes violate a given style.
 *
 *   Options: `Object` or `'consistent'`, default: `'consistent'`.
 *
 *   `'consistent'` detects the first used checked and unchecked checkbox
 *   styles and warns when subsequent checkboxes use different styles.
 *
 *   Styles can also be passed in like so:
 *
 *   ```js
 *   {checked: 'x', unchecked: ' '}
 *   ```
 *
 *   ## Fix
 *
 *   [`remark-stringify`](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify)
 *   formats checked checkboxes using `x` (lowercase X) and unchecked checkboxes
 *   as `·` (a single space).
 *
 *   See [Using remark to fix your Markdown](https://github.com/remarkjs/remark-lint#using-remark-to-fix-your-markdown)
 *   on how to automatically fix warnings for this rule.
 *
 * @example {"name": "ok.md", "setting": {"checked": "x"}, "gfm": true}
 *
 *   - [x] List item
 *   - [x] List item
 *
 * @example {"name": "ok.md", "setting": {"checked": "X"}, "gfm": true}
 *
 *   - [X] List item
 *   - [X] List item
 *
 * @example {"name": "ok.md", "setting": {"unchecked": " "}, "gfm": true}
 *
 *   - [ ] List item
 *   - [ ] List item
 *   - [ ]··
 *   - [ ]
 *
 * @example {"name": "ok.md", "setting": {"unchecked": "\t"}, "gfm": true}
 *
 *   - [»] List item
 *   - [»] List item
 *
 * @example {"name": "not-ok.md", "label": "input", "gfm": true}
 *
 *   - [x] List item
 *   - [X] List item
 *   - [ ] List item
 *   - [»] List item
 *
 * @example {"name": "not-ok.md", "label": "output", "gfm": true}
 *
 *   2:5: Checked checkboxes should use `x` as a marker
 *   4:5: Unchecked checkboxes should use ` ` as a marker
 *
 * @example {"setting": {"unchecked": "💩"}, "name": "not-ok.md", "label": "output", "positionless": true, "gfm": true}
 *
 *   1:1: Incorrect unchecked checkbox marker `💩`: use either `'\t'`, or `' '`
 *
 * @example {"setting": {"checked": "💩"}, "name": "not-ok.md", "label": "output", "positionless": true, "gfm": true}
 *
 *   1:1: Incorrect checked checkbox marker `💩`: use either `'x'`, or `'X'`
 */

import {lintRule} from 'unified-lint-rule'
import {visit} from 'unist-util-visit'
import {pointStart, pointEnd} from 'unist-util-position'
import {generated} from 'unist-util-generated'

const checked = {x: true, X: true}
const unchecked = {' ': true, '\t': true}
const types = {true: 'checked', false: 'unchecked'}

const remarkLintCheckboxCharacterStyle = lintRule(
  'remark-lint:checkbox-character-style',
  (tree, file, option) => {
    const value = String(file)
    const preferred = typeof option === 'object' ? option : {}

    if (preferred.unchecked && unchecked[preferred.unchecked] !== true) {
      file.fail(
        'Incorrect unchecked checkbox marker `' +
          preferred.unchecked +
          "`: use either `'\\t'`, or `' '`"
      )
    }

    if (preferred.checked && checked[preferred.checked] !== true) {
      file.fail(
        'Incorrect checked checkbox marker `' +
          preferred.checked +
          "`: use either `'x'`, or `'X'`"
      )
    }

    visit(tree, 'listItem', (node) => {
      // Exit early for items without checkbox.
      if (typeof node.checked !== 'boolean' || generated(node)) {
        return
      }

      const type = types[node.checked]

      // A list item cannot be checked and empty, according to GFM, but
      // theoretically it makes sense to get the end if that were possible.
      const point =
        /* c8 ignore next 2 */
        node.children.length === 0
          ? pointEnd(node)
          : pointStart(node.children[0])
      // Move back to before `] `.
      point.offset -= 2
      point.column -= 2

      // Assume we start with a checkbox, because well, `checked` is set.
      const match = /\[([\t Xx])]/.exec(
        value.slice(point.offset - 2, point.offset + 1)
      )

      // Failsafe to make sure we don‘t crash if there actually isn’t a checkbox.
      /* c8 ignore next */
      if (!match) return

      const style = preferred[type]

      if (style) {
        if (match[1] !== style) {
          file.message(
            type.charAt(0).toUpperCase() +
              type.slice(1) +
              ' checkboxes should use `' +
              style +
              '` as a marker',
            point
          )
        }
      } else {
        preferred[type] = match[1]
      }
    })
  }
)

export default remarkLintCheckboxCharacterStyle
