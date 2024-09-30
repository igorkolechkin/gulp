import { adminAjax } from '../helpers/requests';

// TODO split logic in particular method; await catch

export default function sendMessageForm() {
  const forms = document.querySelectorAll('.message-form');
  if (!forms.length) return;

  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!window.customFormValid.validate(form)) return;

      const body = new FormData(form);

      adminAjax(body)
        .then(answer => {
          const formAnswerBlock = form.querySelector('.message-form__server-answer')
          if (!formAnswerBlock) return

          if (answer.success) {
              formAnswerBlock.innerHTML = form.dataset.success
          } else {
              formAnswerBlock.innerHTML = form.dataset.error
              formAnswerBlock.classList.add('error')
          }

          form.reset()

          setTimeout(() => formAnswerBlock.innerHTML = '', 4000)
        })
    })
  })
}