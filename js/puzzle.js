import Info from './game_info.js';

export default class Puzzle {
	static puzzleSize = 4;

	static puzzleArray;

	static finalArray;

	static results = []

	static createPuzzle() {
		if (sessionStorage.getItem('puzzleArray')) {
			this.puzzleArray = JSON.parse(sessionStorage.getItem('puzzleArray'));
			this.puzzleSize = sessionStorage.getItem('puzzleSize');
			this.finalArray = JSON.parse(sessionStorage.getItem('finalArray'));
			Info.seconds = sessionStorage.getItem('seconds');
			this.results = JSON.parse(sessionStorage.getItem('results'));
			if (this.results) {
				this.results.map(() => this.saveResult());
			}
			Info.steps = sessionStorage.getItem('steps') - 1;
			Info.createTimer();
			Info.countOfSteps();
			this.drawPuzzle();
		} else {
			this.newPuzzle();
		}
	}

	static newPuzzle() {
		this.puzzleArray = new Array(this.puzzleSize ** 2)
			.fill(1).map((a, i) => i)
			.sort(() => 0.5 - Math.random());
		this.finalArray = new Array(this.puzzleSize ** 2).fill(1).map((a, i) => i);
		this.finalArray.push(this.finalArray.shift());
		sessionStorage.setItem('finalArray', JSON.stringify(this.finalArray));
		sessionStorage.setItem('originalArray', JSON.stringify(this.puzzleArray));
		sessionStorage.setItem('puzzleArray', JSON.stringify(this.puzzleArray));
		sessionStorage.setItem('puzzleSize', Puzzle.puzzleSize);
		this.drawPuzzle();
	}

	static drawPuzzle() {
		document.querySelector('.puzzle').innerHTML = '';
		for (let i = 0; i < this.puzzleSize; i++) {
			document.querySelector('.puzzle').innerHTML += '<div class="puzzle__row"></div>';
			for (let j = 0; j < this.puzzleSize; j++) {
				const gem = this.puzzleArray[j + this.puzzleSize * i];
				document.querySelector('.puzzle').lastChild.innerHTML += `<div id="gem-${gem}" class='gem' draggable="true">${gem}</div>`;
			}
		}
	}

	
}

document.body.innerHTML
+= `<div class="wrapper">
	<div class="btn__container">
		<button class='btn__container-result'>Results</button>
		<button class='btn__container-restart'>Restart</button>
		<button class='btn__container-stop'>Stop</button>
	</div>
	<div class='result'><span>Records</span></div>
	 <span class='congratulation'>CONGRATULATION</span>
	<div class="info_container">
		<span class="info_container-step">Step: 0</span>
		<span class="info_container-time">Time: 00:00</span>
	</div>
	<div class="puzzle"></div>
	<div class="puzzle__size">
		<button value="3">3x3</button>
		<button value="4">4x4</button>
		<button value="5">5x5</button>
		<button value="6">6x6</button>
		<button value="7">7x7</button>
		<button value="8">8x8</button>
	</div>
</div>
`;

Puzzle.createPuzzle();

