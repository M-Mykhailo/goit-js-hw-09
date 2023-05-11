import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onBtnSubmit);

function onBtnSubmit(evt) {
  evt.preventDefault();

  let delay = Number(formEl.delay.value);
  let step = Number(formEl.step.value);
  let amount = Number(formEl.amount.value);

  if (delay < 0 || step < 0 || amount <= 0) {
    return Notiflix.Notify.info('❌ Incorrect field value!');
  }

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
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
    delay += step;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}
