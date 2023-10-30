// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0-or-later

import { parse } from './parser.mjs';

window.addEventListener('load', () => {
  const $input = document.querySelector('#input');

  const $outputSection = document.querySelector('#output-section');
  const $outputColumn = document.querySelector('.output-column');

  $input.addEventListener('change', () => {
    // Removes all whitespace from the input.
    const input = $input.value.replace(/\s+/g, '');

    // If the input is empty, does nothing.
    if (input === '') {
      return;
    }

    // Clears the output.
    $outputSection.replaceChildren();

    // Outputs the interpreted input.
    addOutput('Input', input);

    // Evaluates the input.
    const result = parse(input);

    // Outputs the result.
    addOutput('Result', result);
  });

  /**
   * Adds an output.
   */
  function addOutput(label, output) {
    const $column = $outputColumn.cloneNode(true);

    const $label = $column.querySelector('.output-label');
    $label.prepend(`${label}:`);

    const $output = $column.querySelector('.output');
    $output.append(output);

    $outputSection.append($column);
  }
});

// @license-end
