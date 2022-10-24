// 
import Notiflix from 'notiflix';

const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const btnSubmit = document.querySelector('button[type="submit"]');
//console.log(btnSubmit);

function createPromise(position, delay) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
    return promise;
  }
  
  btnSubmit.addEventListener('click', e => {
    e.preventDefault();
    let firstDelay = Number(delay.value);
    let delayStep = Number(step.value);
    for (let i = 0; i < amount.value; i++) {
      createPromise(1 + i, firstDelay + i * delayStep)
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

// btnSubmit.addEventListener('click', e => {
//   e.preventDefault();
//   let firstDelay = Number(delay.value);
//   let delayStep = Number(step.value);
//   for (let i = 0; i < amount.value; i++){
//     createPromise(1 + i, firstDelay + i * delayStep)
//       .then(({ position, delay }) => {
//         console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
//   }
// })

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
