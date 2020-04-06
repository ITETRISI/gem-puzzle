export default class Info {
	static seconds = 0;

	static steps = 0;

	static currentInterval;

	static activeTime = true;

	static createTimer() {
		if (this.activeTime) {
			this.currentInterval = setInterval(() => this.setTimer(), 1000);
			this.activeTime = false;
		}
	}

	static setTimer() {
		const time = document.querySelector('.info_container-time');
		this.seconds++;
		time.innerHTML = `Time: ${(Math.floor(this.seconds / 60) < 10 ? '0' : '')}${Math.floor(this.seconds / 60)}:${this.seconds % 60 < 10 ? '0' : ''}${this.seconds % 60}`;
		sessionStorage.setItem('seconds', this.seconds);
	}

	static countOfSteps() {
		const step = document.querySelector('.info_container-step');
		step.innerHTML = `Step: ${++this.steps}`;
		sessionStorage.setItem('steps', this.steps);
	}

	static clearInfo() {
		clearInterval(Info.currentInterval);
		this.activeTime = true;
		this.seconds = 0;
		this.steps = 0;
		document.querySelector('.info_container-step').innerHTML = 'Step: 0';
		document.querySelector('.info_container-time').innerHTML = 'Time: 00:00';
		sessionStorage.setItem('steps', this.steps);
		sessionStorage.setItem('seconds', this.seconds);
	}

	static stopTimer() {
		clearInterval(Info.currentInterval);
		this.activeTime = true;
	}
}
