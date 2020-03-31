class Puzzle {
	static puzzleSize = 4;

	static createPuzzle() {
		let puzzle = []
		for(let i = 0; i < this.puzzleSize; i++){
			puzzle.push(new Array(this.puzzleSize).fill(i*this.puzzleSize).map((a,j) => a+j))
			puzzle[i].sort((a, b) => 0.5 - Math.random())
			puzzle.sort((a, b) => 0.5 - Math.random())
		}
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