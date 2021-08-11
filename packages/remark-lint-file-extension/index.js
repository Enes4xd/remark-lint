/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module file-extension
 * @fileoverview
 *   Warn when the file extension differ from the preferred extension.
 *
 *   Does not warn when given documents have no file extensions (such as
 *   `AUTHORS` or `LICENSE`).
 *
 *   Options: `string`, default: `'md'` — Expected file extension.
 *
 * @example {"name": "readme.md"}
 *
 * @example {"name": "readme"}
 *
 * @example {"name": "readme.mkd", "label": "output", "positionless": true}
 *
 *   1:1: Incorrect extension: use `md`
 *
 * @example {"name": "readme.mkd", "setting": "mkd"}
 */

import {lintRule} from 'unified-lint-rule'

const remarkLintFileExtension = lintRule(
  'remark-lint:file-extension',
  fileExtension
)

export default remarkLintFileExtension

function fileExtension(tree, file, option) {
  var ext = file.extname
  var preferred = typeof option === 'string' ? option : 'md'

  if (ext && ext.slice(1) !== preferred) {
    file.message('Incorrect extension: use `' + preferred + '`')
  }
}
