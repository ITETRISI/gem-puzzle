class Puzzle {
	static puzzleSize = 5;

	static createPuzzle() {
		let array = new Array(this.puzzleSize**2).fill(1).map((a,i) => i).sort((a, b) => 0.5 - Math.random())
		let puzzle = []
		for(let i = 0; i < this.puzzleSize; i++){
			puzzle.push(new Array(this.puzzleSize))
			for(let j = 0; j < this.puzzleSize; j++){
				puzzle[i][j] = array[j+this.puzzleSize*i]
			}
		}
		this.drawPuzzle(puzzle);
	}

	static drawPuzzle(puzzle) {
		puzzle.forEach((row,i) => {
			document.querySelector('.puzzle').innerHTML += `<div class="puzzle__row"></div>`
			row.forEach( gem => {
				document.querySelector(`.puzzle`).lastChild.innerHTML += `<span>${gem}</span>`
			})
		})
	}
}

document.body.innerHTML = `<div class="wrapper>
<div class="btn__container">
	<button></button>
	<button></button>
	<button></button>
	<button></button>
</div>
<div class="info">
	<span>Ходов:</span>
	<span>Время: 10:10</span>
</div>
<div class="puzzle"></div>
</div>`

Puzzle.createPuzzle()