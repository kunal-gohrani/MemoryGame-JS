const images = [{
        name: 'pizza',
        image: 'Images/pizza.jpeg'
    },
    {
        name: 'pizza',
        image: 'Images/pizza.jpeg'
    },
    {
        name: 'coke',
        image: 'Images/coke.jpeg'
    },
    {
        name: 'coke',
        image: 'Images/coke.jpeg'
    },
    {
        name: 'roll',
        image: 'Images/roll.jpeg'
    },
    {
        name: 'roll',
        image: 'Images/roll.jpeg'
    },
    {
        name: 'chicken',
        image: 'Images/chicken.jpg'
    },
    {
        name: 'chicken',
        image: 'Images/chicken.jpg'
    },
    {
        name: 'garlic bread',
        image: 'Images/garlic.jpg'
    },
    {
        name: 'garlic bread',
        image: 'Images/garlic.jpg'
    },
    {
        name: 'burger',
        image: 'Images/burger.jpeg'
    },
    {
        name: 'burger',
        image: 'Images/burger.jpeg'
    }
]

let squares = document.querySelectorAll('.square');
squares = Array.from(squares);
let cardsChosenIds = [];
let cardsChosen = [];
let cardsWon = [];
let score = 0;
let timerElement;
let seconds = 20;
let winStreak = 0;
const generateRandomNumber = (ids) => {
    let flag = 0;
    let random;
    while (flag == 0) {
        random = Math.floor(Math.random() * images.length);
        if (!ids.includes(random)) {
            flag = 1;
            break;
        }
    }

    return random;


};

const flipCard = (e) => {
    const elem = e.target;
    let cardId = elem.dataset.id;
    elem.setAttribute('src', images[cardId].image);
    cardsChosenIds.push(cardId);
    cardsChosen.push(elem);
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 200);
    }
};

const checkForMatch = () => {
    const cardOneId = cardsChosen[0].dataset.id;
    const cardTwoId = cardsChosen[1].dataset.id;
    const imageOne = images[cardOneId].name;
    const imageTwo = images[cardTwoId].name;
    if (imageOne == imageTwo && cardOneId !== cardTwoId) {
        cardsChosen.forEach(cur => {
            cur.removeEventListener('click', flipCard);
            cur.setAttribute('src', 'Images/white.jpg');
        });
        score += 1;
        document.querySelector('#score').textContent = score;
        if (score === images.length / 2) {
            alert('YOU WON!!');
            clearInterval(timerElement);
            winStreak += 1;
            document.querySelector('#winStreak').textContent = winStreak;
        }
    } else {
        cardsChosen.forEach(cur => {
            cur.setAttribute('src', 'Images/blank.jpg');
        });

    }
    cardsChosen = [];
};

const time = () => {
    seconds -= 1;
    document.querySelector('#timer').textContent = seconds;
    if (seconds == 0) {
        alert('YOU HAVE LOST THE GAME!');
        Array.from(document.querySelectorAll('img')).forEach(cur => {
            cur.removeEventListener('click', flipCard);
        });
        clearInterval(timerElement);
        winStreak = 0;
    }
};

const init = () => {
    let ids = [];
    let random;
    // squares.forEach(cur => {
    //     random = generateRandomNumber(ids);
    //     cur.setAttribute('data-id', random.toString());
    //     console.log(cur.getAttribute('data-id'));
    //     ids.push(random);
    //     cur.addEventListener('click', flipCard);
    // });
    document.querySelector('.container').innerHTML = '';
    score = 0;
    seconds = 20;
    document.querySelector('#score').textContent = score;
    document.querySelector('#winStreak').textContent = winStreak;
    cardsChosenIds = [];
    cardsChosen = [];
    cardsWon = [];
    for (let i = 1; i <= 12; i++) {
        random = generateRandomNumber(ids);
        ids.push(random);
        card = document.createElement('img');
        card.setAttribute('src', 'Images/blank.jpg');
        card.setAttribute('data-id', random.toString());
        card.addEventListener('click', flipCard);
        document.querySelector('.container').appendChild(card);
    }

    document.querySelector('#timer').textContent = seconds;
    timerElement = setInterval(time, 1000);
};

document.querySelector('#reset').addEventListener('click', init);
init();