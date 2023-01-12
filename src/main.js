import './index.css';

const clickerElement = document.getElementById('clicker');
const countElement = document.getElementById('count');
const perSeconds = document.getElementById('per-seconds');
const total = document.getElementById('total');

let count = 0;
let clickPerSeconds = 0;
let totalCount = 0;

const store = [
  {
    label: 'Bonus',
    count: 0,
    price: 10,
    multiplier: 1,
  },
];

clickerElement.addEventListener('click', () => {
  updateCount(1);
  updateTotalCount(1);
  console.log('click', count);
});

function updateCount(nb) {
  count += nb;
  countElement.textContent = count.toFixed(0) + ' cookies';
  perSeconds.textContent = 'Par secondes: ' + clickPerSeconds.toFixed(1);
}

function updatePrice(clone, price) {
  const priceElement = clone.querySelector('.price');
  priceElement.innerHTML = 'Price : ' + price + ' 🍌';
}

function updateTotalCount(nb) {
  totalCount += nb;
  total.textContent = 'Total: ' + totalCount.toFixed();
}

document.addEventListener('DOMContentLoaded', () => {
  const bonuses = document.getElementById('bonuses');
  const bonusTemplate = document.getElementById('template-bonus');

  for (const bonus of store) {
    const clone = bonusTemplate.cloneNode(true);
    const multiplier = clone.querySelector('.multiplier');

    clone.onclick = () => {
      const multiplier = bonus.multiplier * 0.1;

      if (count < bonus.price) {
        return;
      }

      count -= bonus.price;
      clickPerSeconds += multiplier;

      if (bonus.price < 50) {
        bonus.price *= 2;
      } else if (bonus.price >= 50 && bonus.price < 200) {
        bonus.price *= 3;
      } else if (bonus.price >= 200) {
        bonus.price *= 4;
      }

      updatePrice(clone, bonus.price);

      setInterval(() => {
        updateCount(multiplier);
        updateTotalCount(multiplier);
      }, 1000);
    };

    updatePrice(clone, bonus.price);
    multiplier.innerHTML = 'Multiplier: x' + bonus.multiplier;

    bonuses.appendChild(clone);
  }

  bonusTemplate.remove();

  //const button = document.getElementById('show-div');
  const hiddenDiv = document.getElementById('timer');

  button.addEventListener('click', () => {
    hiddenDiv.style.display = 'block'; // affiche la div
    setTimeout(() => {
      hiddenDiv.style.display = 'none'; // cache la div après 30 secondes
    }, 30000);
  });

  var timeLeft = 30;
  var elem = document.getElementById('timer');

  var timerId = setInterval(countdown, 1000);

  function countdown() {
    if (timeLeft == -1) {
      clearTimeout(timerId);
      doSomething();
    } else {
      elem.innerHTML = 'Bonus : ' + timeLeft + ' sec. remaining';
      timeLeft--;
    }
  }
});
