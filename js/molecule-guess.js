(function () {
  var form = document.getElementById('molecule-form');
  if (!form) return;

  var input = document.getElementById('molecule-input');
  var feedback = document.getElementById('molecule-feedback');

  var CALENDLY_URL = 'https://calendly.com/abbydawn/let-s-get-coffee';
  var CORRECT_ANSWERS = ['caffeine', '1,3,7trimethylxanthine', 'trimethylxanthine'];

  function normalize(str) {
    return (str || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9,]/g, '');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var guess = normalize(input.value);
    var isCorrect = guess.length > 0 && CORRECT_ANSWERS.some(function (ans) {
      return guess === normalize(ans);
    });

    if (isCorrect) {
      feedback.innerHTML = 'Correct! <a href="' + CALENDLY_URL + '" target="_blank" rel="noopener noreferrer" class="molecule-inline__link">Let\'s get coffee</a> ☕';
      feedback.className = 'molecule-inline__feedback is-correct';
    } else {
      feedback.textContent = 'Not quite — try again.';
      feedback.className = 'molecule-inline__feedback is-wrong';
      input.focus();
      input.select();
    }
  });
})();
