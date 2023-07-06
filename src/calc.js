// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0-or-later

window.addEventListener('load', () => {

const $input = document.querySelector('#input');

const $outputSection = document.querySelector('#output-section');
const $individualOutputSection = (
  document.querySelector('.individual-output-section')
);

$input.addEventListener('change', () => {
  // Removes all whitespace from the input.
  const input = $input.value.replace(/\s+/g, '');

  // If the input is empty, does nothing.
  if (input === '') {
    return;
  }

  // Clears the output.
  $outputSection.innerHTML = '';

  // Outputs the interpreted input.
  addOutput('Input', input);

  // Evaluates the input.
  const result = Expression.parse(input);

  // Outputs the result.
  addOutput('Result', result);
}, false);

/**
 * Adds an output.
 */
function addOutput(label, output) {
  const $section = $individualOutputSection.cloneNode(true);

  const $label = $section.querySelector('.output-label');
  $label.insertBefore(document.createTextNode(label), $label.firstChild);

  const $output = $section.querySelector('.output');
  $output.textContent = output;

  $outputSection.appendChild($section);
}

}, false);

// @license-end
