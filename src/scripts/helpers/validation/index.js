import tips from './tips';

export default class CustomFormValid {
  constructor() {
    this.tips = this.getCurrentTips(document.documentElement.lang);
  }

  init = () => {
    const forms = document.querySelectorAll('._valid-form');

    forms.forEach(form => {
      form.querySelectorAll('._valid-input').forEach(elem => {
        if (elem.getAttribute('type') === 'file') {
          elem.addEventListener('input', () => this.check(elem));
          return;
        }

        elem.addEventListener('blur', () => this.check(elem));
      });
    })
  };

  getCurrentTips = (lang) => {
    const currentTips = `tips${lang[0].toUpperCase()}${lang.slice(1)}`;

    return tips[currentTips];
  }

  check = (elem) => {
    const type = elem.getAttribute('data-type') ? elem.getAttribute('data-type') : elem.type;

    if (type && this[type]) {
      return this[type](elem);
    }
  };

  text = (elem) => {
    if (elem.value === "") {
      this.tipMessage(elem, this.tips.required, true);
      return true;
    } else if (elem.value.length < 2) {
      this.tipMessage(elem, this.tips.lengthMinName, true);
      return true;
    }

    this.tipMessage(elem, this.tips.success, false);
    return false;
  };

  name = (elem) => {
    if (elem.value === "") {
      this.tipMessage(elem, this.tips.required, true);
      return true;
    } else if (elem.value.length < 3) {
      this.tipMessage(elem, this.tips.lengthMinName, true);
      return true;
    } else if (!(/^[A-Za-zА-Яа\s\'\-]{2,40}$/.test(elem.value))) {
      this.tipMessage(elem, this.tips.validName, true);
      return true;
    }

    this.tipMessage(elem, this.tips.success, false);
    return false;
  };

  email = (elem) => {
    if (elem.value === "") {
      this.tipMessage(elem, this.tips.requiredMail, true);
      return true;
    } else if (!(/^(([^А-Яа-я<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(elem.value))) {
      this.tipMessage(elem, this.tips.validEmail, true);
      return true;
    }

    this.tipMessage(elem, this.tips.success, false);
    return false;
  };

  tel = (elem) => {
    if (elem.value === "") {
      this.tipMessage(elem, this.tips.requiredPhone, true);
      return true;
    } else if (!(/^[\d\s+()]{1,}$/.test(elem.value))) {
      this.tipMessage(elem, this.tips.onlyNumbers, true);
      return true;
    } else if (elem.value.length <= 5 || elem.value.length > 21) {
      this.tipMessage(elem, this.tips.validPhone, true);
      return true;
    }

    this.tipMessage(elem, this.tips.success, false);
    return false;
  };

  password = (elem) => {
    if (elem.value === "") {
      this.tipMessage(elem, this.tips.required, true);
      return true;
    }

    this.tipMessage(elem, this.tips.success, false);
    return false;
  };

  passwordConfirm = (elem) => {
    const passwordElem = elem.closest('form').querySelector('input[name="password"]');

    if (elem.value === "") {
      this.tipMessage(elem, this.tips.required, true);
      return true;
    } else if (elem.value !== passwordElem.value) {
      this.tipMessage(elem, this.tips.conform, true);
      return true;
    }

    this.tipMessage(elem, this.tips.success, false);
    return false;
  };

  messageText = (elem) => {
    if (elem.value === "") {
      this.tipMessage(elem, this.tips.required, true);
      return true;
    } else if (elem.value.length < 10) {
      this.tipMessage(elem, this.tips.lengthMinMessage, true);
      return true;
    }

    this.tipMessage(elem, this.tips.success, false);
    return false;
  };

  file = elem => {
    if (elem.value === "") {
      this.tipMessage(elem, this.tips.required, true);
      return true;
    } else if (!(/(\.doc|\.docx|\.pdf)$/i.exec(elem.value))) {
      this.tipMessage(elem, this.tips.formatFile, true);
      return true;
    }

    this.tipMessage(elem, this.tips.success, false);
    return false;
  }

  customCheckbox = (elem) => {
    if (!elem.checked) {
      this.tipMessage(elem, this.tips.required, true);
      return true;
    }

    this.tipMessage(elem, this.tips.success, false);
    return false;
  };

  choose = elem => {
    const elemList = elem.closest('.input__wrapper').querySelectorAll('._valid-input');
    const isChecked = [...elemList].some(elem => elem.checked);

    if (!isChecked) {
      this.tipMessage(elem, this.tips.required, true);
      return true;
    }

    this.tipMessage(elem, this.tips.success, false);
    return false;
  }

  tipMessage = (elem, tip, status) => {
    const parent = elem.closest('.input__wrapper');
    
    if (!status) {
      parent.classList.remove('error');
      parent.classList.add('success');
      parent.setAttribute('data-error', tip);
    } else {
      parent.classList.add('error');
      parent.classList.remove('success');
      parent.setAttribute('data-error', tip);
    }
  };

  validate = (form) => {
    let answer = Array.from(form.querySelectorAll('._valid-input')).filter(item => this.check(item));

    return answer.length === 0;
  }
}
