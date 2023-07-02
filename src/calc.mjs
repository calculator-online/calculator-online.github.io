// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0-or-later

import antlr4 from 'antlr4';
import ExpressionLexer from '../out/ExpressionLexer.js';
import ExpressionParser from '../out/ExpressionParser.js';
// import ExpressionListener from '../out/ExpressionListener.js';

const $input = document.querySelector('#input');

const $outputSection = document.querySelector('#output-section');
const $individualOutputSection = (
  document.querySelector('.individual-output-section')
);

$input.addEventListener('change', () => {
  const input = $input.value.trim();

  // If the input is whitespace, does nothing.
  if (input === '') {
    return;
  }

  // Clears the output.
  $outputSection.replaceChildren();

  // Outputs the interpreted input.
  addOutput('Input', input);

  // Evaluates the input.
  const chars = new antlr4.InputStream(input);
  const lexer = new ExpressionLexer(chars);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new ExpressionParser(tokens);
  parser.buildParseTrees = true;
  const tree = parser.start();
  const result = tree.toStringTree(parser.ruleNames); // FIXME

  // Outputs the result.
  addOutput('Result', result);
}, false);

/**
 * Adds an output.
 */
function addOutput(label, output) {
  const $section = $individualOutputSection.cloneNode(true);

  const $label = $section.querySelector('.output-label');
  $label.prepend(`${label}:`);

  const $output = $section.querySelector('.output');
  $output.append(output);

  $outputSection.append($section);
}

// @license-end
