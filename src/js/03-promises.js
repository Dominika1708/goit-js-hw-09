import Notiflix from 'notiflix';

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    let setTime = setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  for (let i = 1; i <= Number(amount.value); i += 1) {
    let stepTime = Number(delay.value) + Number(step.value) * (i - 1);
    createPromise(i, stepTime)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
