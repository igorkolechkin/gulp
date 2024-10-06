import { adminAjax } from '../helpers/requests.js';

export default function sendMessageForm() {
  const forms = document.querySelectorAll('._valid-form');
  if (!forms.length) return;

  forms.forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!window.customFormValid.validate(form)) return;

      try {
        const { success } = await adminAjax(new FormData(form))
        afterAnswer(success, form)
      } catch (e) {
        afterAnswer(false, form)
      }
    })
  })
}

function afterAnswer(status, form) {
  const answerBlock = form.querySelector('.form-answer')

  if (!answerBlock) return

  if (status) {
    answerBlock.innerHTML = form.dataset.success
  } else {
    answerBlock.innerHTML = form.dataset.error
    answerBlock.classList.add('error')
  }

  setTimeout(() => answerBlock.innerHTML = '', 4000)
}