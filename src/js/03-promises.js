import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  submit: document.querySelector('.submit'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function generatePromises() {
  const amount = parseInt(refs.amount.value);
  const delay = parseInt(refs.delay.value);
  const step = parseInt(refs.step.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay + (i - 1) * step);
  }
}

refs.form.addEventListener('submit', submit);

function submit(event) {
  event.preventDefault();
  generatePromises();
  refs.form.reset();
}
