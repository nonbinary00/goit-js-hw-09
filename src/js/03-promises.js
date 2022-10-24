// 
import Notiflix from 'notiflix';

//Refs
const { delayValue, stepValue, amountValue, formEl } = {
  delayValue: document.querySelector("[name='delay']"),
  stepValue: document.querySelector("[name='step']"),
  amountValue: document.querySelector("[name='amount']"),
  formEl: document.querySelector('.form'),
};






function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
