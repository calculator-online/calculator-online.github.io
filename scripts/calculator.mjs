import AsciiMathParser from './third_party/asciimath2tex.mjs';

const asciiMathParser = new AsciiMathParser();

const PROGRAM_NAME = document.title;
const TIMEOUT = 5000;

$(() => {

const $calculatorForm = $('#calculator-form');
const $inputField = $('#input-field');
const $throbber = $('#throbber');
const $results = $('#results');
const $timeout = $('#timeout');

$throbber.hide();
$timeout.hide();

function addResults(heading, results) {
  $results.append(
    $('<section>').append(
      $('<h2>').text(`${heading}:`),
      results.map((result) => (
        $('<p>').append(
          katex.renderToString(asciiMathParser.parse(result)),
        )
      )),
    ),
  );
}

let previousInput;

$calculatorForm.submit((event) => {
  event.preventDefault();

  const input = $inputField.val().trim();

  if (input === '' || input === previousInput) {
    return;
  }

  previousInput = input;

  $throbber.show();
  $results.empty();
  $timeout.hide();

  const worker = new Worker('scripts/worker.js');
  worker.postMessage(input);

  const timer = setTimeout(() => {
    worker.terminate();
    $throbber.hide();
    $timeout.show();
  }, TIMEOUT);

  let isFirstResult = true;

  $(worker).on('message', (event) => {
    if (isFirstResult) {
      addResults('Input', [input]);
      isFirstResult = false;
    }

    const result = event.originalEvent.data;

    // End of results
    if (result === true) {
      clearTimeout(timer);
      $throbber.hide();
      return;
    }

    addResults(...result);
  });

  document.title = `${input} - ${PROGRAM_NAME}`;
  history.pushState(null, '', `#${encodeURIComponent(input)}`);
});

$(window).on('hashchange', () => {
  const input = location.hash.replace(/^#/, '');

  if (input === '') {
    return;
  }

  $inputField.val(decodeURIComponent(input));
  $calculatorForm.submit();
});

$(window).trigger('hashchange');

});
