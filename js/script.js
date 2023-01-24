const wordText = document.querySelector('.word');
const hintText = document.querySelector('.hint span');
const timerText = document.querySelector('.time b');
const inputField = document.querySelector('input');
const refreshBtn = document.querySelector('.refresh-word');
const checkBtn = document.querySelector('.check-word');

let correctWord, timer;

const initTimer = maxTime => {
	clearInterval(timer);
	timer = setInterval(() => {
		if (maxTime > 0) {
			maxTime--;
			return (timerText.innerText = maxTime);
		}
		clearInterval(timer);
		alert(
			`Se acabo el tiempo! ${correctWord.toUpperCase()} es la palabra correcta.`
		);
		initGame();
	}, 1000);
};

const initGame = () => {
	initTimer(30);
	let randomObj = words[Math.floor(Math.random() * words.length)];
	let wordArray = randomObj.word.split('');
	for (let i = wordArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
	}
	wordText.innerText = wordArray.join('');
	hintText.innerText = randomObj.hint;
	correctWord = randomObj.word.toLocaleLowerCase();
	inputField.value = '';
	inputField.setAttribute('maxlength', correctWord.length);
};
initGame();

const checkWord = () => {
	let userWord = inputField.value.toLocaleLowerCase();
	if (!userWord) return alert(`Por favor ingrece una palbra para validar`);
	if (userWord !== correctWord)
		return alert(`Oops! ${userWord} no es la palabra correcta`);
	alert(`Felicidades! ${userWord.toLocaleUpperCase()} es la palabra correcta`);
	initGame();
};
refreshBtn.addEventListener('click', initGame);
checkBtn.addEventListener('click', checkWord);
