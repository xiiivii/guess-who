export const html = `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Guess game</title>
  </head>
  <body>
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
      }

      body {
        font-family: sans-serif;
      }

      #form:not(.visible),
      #answers:not(.visible) {
        display: none;
      }
    </style>

    <style>
      #form {
        font-size: 20px;

        display: flex;
        align-items: center;
        justify-content: center;

        box-sizing: border-box;

        padding: 5px;
        margin: 20px auto;

        text-align: center;
        max-width: 400px;
      }

      .form {
        display: flex;
        flex-direction: column;
      }

      .input {
        font: inherit;
        resize: none;
        margin: 15px 0;
      }

      .submit {
        font: inherit;
        padding: 5px;
      }

      .success {
        flex-direction: column;
        align-items: center;
        gap: 15px;

        display: none;

        user-select: none;
      }

      .success.visible {
        display: flex;
      }

      summary {
        font-weight: bold;
        cursor: pointer;
      }

      .id {
        font-weight: bold;
        font-size: 40px;
        border-radius: 50%;
        border: 5px dashed;
        width: 80px;
        height: 80px;
        line-height: 80px;
        margin: 15px auto;
      }
    </style>

    <style>
      #answers {
        padding: 5px;
      }

      .table {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        border-collapse: collapse;
      }

      .table th,
      .table td {
        border: 1px solid;
        padding: 4px 6px;
        vertical-align: top;
        text-align: left;
      }

      .table .row-empty td {
        text-align: center;
      }

      .table th:first-child,
      .table .row-answer td:first-child {
        width: 3ch;
      }

      .table .row-answer td:first-child {
        text-align: right;
      }
    </style>

    <div id="form">
      <form class="js-form form">
        Напиши какой-нибудь интересный факт о себе и нажми кнопку "Отправить"

        <textarea class="input" name="text" placeholder="Писать здесь!" rows="3" required=""></textarea>

        <button class="submit">Отправить</button>
      </form>

      <div class="js-form-success success"></div>
    </div>

    <div id="answers">
      <table class="js-answers-table table"></table>
    </div>

    <script>
      function getType() {
        return location.href.includes('answers=1') ? 'answers' : 'form';
      }
    </script>

    <script>
      (function () {
        if (getType() !== 'form') {
          return;
        }

        document.getElementById('form').classList.add('visible');

        var $form = document.querySelector('.js-form');
        var $formSuccess = document.querySelector('.js-form-success');

        function showId(id) {
          $form.style.display = 'none';

          $formSuccess.classList.add('visible');
          $formSuccess.innerHTML = [
            'Запомни свой номер и никому<br>его не показывай!',
            '<details>',
            '<summary>Нажми сюда,<br>чтобы узнать номер</summary>',
            '<div class="id">' + id + '</div>',
            '<summary>',
          ].join('');
        }

        function getId() {
          return window.localStorage.getItem('id');
        }

        function saveId(id) {
          window.localStorage.setItem('id', id);
        }

        (function () {
          const savedId = getId();

          if (savedId) {
            showId(savedId);
          }
        })();

        $form.addEventListener('submit', function (event) {
          event.preventDefault();

          var url = '/api/answers?text=' + new FormData($form).get('text');
          var options = { method: 'POST' };

          fetch(url, options)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              var id = data.responseObject.id;

              showId(id);
              saveId(id);
            });
        });
      })();
    </script>

    <script>
      (function () {
        if (getType() !== 'answers') {
          return;
        }

        document.getElementById('answers').classList.add('visible');

        var $table = document.querySelector('.js-answers-table');

        fetch('/api/answers')
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            var answers = data.responseObject;

            var html = ['<tr>', '<th>№</th>', '<th>Факт</th>', '</tr>'];

            if (answers.length === 0) {
              html.push([
                '<tr class="row-empty">',
                '<td colspan="2">Ни один человек не заполнил факт о себе</td>',
                '</tr>',
              ]);
            } else {
              html.push(
                answers.map(function (answer) {
                  return [
                    '<tr class="row-answer">',
                    '<td>' + answer.id + '</td>',
                    '<td>' + answer.text + '</td>',
                    '</tr>',
                  ];
                })
              );
            }

            $table.innerHTML = html.flat(Infinity).join('');
          });
      })();
    </script>
  </body>
</html>
`;