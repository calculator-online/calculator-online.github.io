import AsciiMathParser from './third_party/asciimath2tex.mjs';

const asciiMathParser = new AsciiMathParser();

const DEBUG = true;
const PROGRAM_NAME = document.title;
const TIMEOUT = 2000;

$(() => {
  const $calculatorForm = $('#calculator-form');
  const $inputField = $('#input-field');
  const $results = $('#results');
  const $throbber = $('#throbber');
  const $timeout = $('#timeout');

  $throbber.hide();
  $timeout.hide();

  function addResults(heading, results, notes) {
    if (DEBUG) {
      console.log('Results:', results);
    }

    $results.append(
      $('<section>').append(
        $('<h2>').text(`${heading}:`),
        results.map((result, i) => (
          $('<p>').append(
            katex.renderToString(asciiMathParser.parse(String(result))),
            notes != null && notes[i] != null && notes[i] !== false
              ? [document.createTextNode(' '), $('<small>').html(notes[i])]
              : null,
          )
        )),
      ),
    );
  }

  let previousInput;
  let worker;
  let timer;

  $calculatorForm.submit((event) => {
    event.preventDefault();

    const input = $inputField.val().trim();

    if (input === '' || input === previousInput) {
      return;
    }

    previousInput = input;

    $results.empty();
    $throbber.show();
    $timeout.hide();

    if (worker) {
      worker.terminate();
    }

    if (timer) {
      clearTimeout(timer);
    }

    worker = new Worker('scripts/worker.js');
    worker.postMessage(input);

    timer = setTimeout(() => {
      $throbber.hide();
      $timeout.show();

      worker.terminate();
      worker = null;

      timer = null;
    }, TIMEOUT);

    let isFirstOutput = true;

    $(worker).on('message', (event) => {
      if (isFirstOutput) {
        addResults('Input', [input]);
        isFirstOutput = false;
      }

      const output = event.originalEvent.data;

      // End of output
      if (output === true) {
        $throbber.hide();

        worker.terminate();
        worker = null;

        clearTimeout(timer);
        timer = null;

        return;
      }

      addResults(...output);
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
