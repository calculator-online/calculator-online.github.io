// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0-or-later

const $input = document.querySelector('#input');

const $outputSection = document.querySelector('#output-section');
const $individualOutputSection = (
  document.querySelector('.individual-output-section')
);

$input.addEventListener('change', () => {
  const input = $input.value.trim();

  if (input === '') {
    return;
  }

  // Clears the output.
  $outputSection.replaceChildren();

  // Outputs the interpreted input.
  addOutput('Input', input);

  // Evaluates the input.
  const result = evaluate(input);

  // Outputs the result.
  addOutput('Result', result);
});

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

/**
 * Evaluates an input.
 */
function evaluate(input) {
  return input;
}

// @license-end
