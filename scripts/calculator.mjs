import AsciiMathParser from './third_party/asciimath2tex.mjs';

const asciiMathParser = new AsciiMathParser();

$(() => {

const $calculatorForm = $('#calculator-form');
const $inputField = $('#input-field');
const $calculatingIndicator = $('#calculating-indicator');
const $calculationResults = $('#calculation-results');

function addResults(heading, results) {
  $calculationResults.append(
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

$calculatorForm
  .submit((event) => {
    event.preventDefault();

    $calculatingIndicator.show();

    const input = $inputField.val().trim();

    if (input === '' || input === previousInput) {
      return;
    }

    previousInput = input;

    history.pushState(null, null, `#${encodeURIComponent(input)}`);

    $calculationResults.empty();

    addResults('Input', [input]);
  })
  .submit(() => {
    $calculatingIndicator.hide();
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
