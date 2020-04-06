import Puzzle from './puzzle.js';
import Info from './game_info.js';

class Gems {
	static gem;

	static stack = new Array(2);

	static checkGem() {
		Info.createTimer();
		this.stack.sort((a, b) => a.id.substr(4) - b.id.substr(4));
		if (this.stack[0].id === 'gem-0') {
			const emptyPosition = [].indexOf.call(this.stack[0].parentNode.children, this.stack[0]);
			if (this.stack[0].previousSibling && this.stack[0].previousSibling === this.stack[1]) {
				this.stack[0].classList.add('left');
				this.stack[1].classList.add('right');
				setTimeout(() => this.swapGem(), 250);
			} else if (this.stack[0].nextSibling && this.stack[0].nextSibling === this.stack[1]) {
				this.stack[0].classList.add('right');
				this.stack[1].classList.add('left');
				setTimeout(() => this.swapGem(), 250);
			} else if (this.stack[0].parentNode.previousSibling
				&& this.stack[0].parentNode.previousSibling.children[emptyPosition] === this.stack[1]) {
				this.stack[0].classList.add('up');
				this.stack[1].classList.add('down');
				setTimeout(() => this.swapGem(), 250);
			} else if (this.stack[0].parentNode.nextSibling
				&& this.stack[0].parentNode.nextSibling.children[emptyPosition] === this.stack[1]) {
				this.stack[0].classList.add('down');
				this.stack[1].classList.add('up');
				setTimeout(() => this.swapGem(), 250);
			}
		}
	}

	static swapGem() {
		let [gemOne, gemTwo] = this.stack;
		const puzzle = Puzzle.puzzleArray;
		const duplicatedNode = gemOne.cloneNode();
		gemOne.after(duplicatedNode);
		gemTwo.after(gemOne);
		duplicatedNode.replaceWith(gemTwo);
		gemOne = puzzle.indexOf(+gemOne.id.substr(4));
		gemTwo = puzzle.indexOf(+gemTwo.id.substr(4));
		puzzle[gemTwo] = [puzzle[gemOne], puzzle[gemOne] = puzzle[gemTwo]][0];
		this.stack[0].classList.remove('left', 'right', 'up', 'down');
		this.stack[1].classList.remove('left', 'right', 'up', 'down');
		Info.countOfSteps();
		Puzzle.endGame();
		sessionStorage.setItem('puzzleArray', JSON.stringify(Puzzle.puzzleArray));
		sessionStorage.setItem('puzzleSize', Puzzle.puzzleSize);
	}
}

const puzzle = document.querySelector('.puzzle');

puzzle.addEventListener('dragstart', (event) => {
	event.target.classList.add('drag');
	Gems.stack[0] = event.target;
});

puzzle.addEventListener('dragenter', (event) => {
	if (event.target.classList[0] !== 'puzzle__row') { event.target.classList.add('drop'); }
	Gems.stack[1] = (event.target);
});

puzzle.addEventListener('dragleave', (event) => {
	event.target.classList.remove('drop');
});

puzzle.addEventListener('dragend', (event) => {
	event.target.classList.remove('drag');
	Gems.checkGem();
});

puzzle.addEventListener('click', (event) => {
	Gems.stack[1] = event.target;
	Gems.stack[0] = document.querySelector('#gem-0');
	Gems.checkGem();
});
