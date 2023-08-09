"use strict";

let scrollToBlock = (className) => {
	console.log(document.querySelector(`.${className}`));
	document.querySelector(`.${className}`).scrollIntoView({behavior: 'smooth', block: 'start'});
}

let getIndexButton = (btn, btns) => {
	let count = 0;
	for (let button of btns) {
		if (button === btn) {
			break;
		}
		count++;
	}
	return count;
}

let clickSliderButton = (btn) => {
	if (btn.className === 'slider__button_active') { return; }

	let prntBlock = btn.parentElement.parentElement.parentElement;
	prntBlock.querySelector('.slider__button_active').className = 'slider__button';
	btn.className = 'slider__button_active slider__button';
	let indexButton = getIndexButton(btn, btn.parentElement.parentElement.parentElement.querySelectorAll('.slider__button'));
	prntBlock.querySelector('.imageSlider').style.transform = `translateX(-${indexButton*100}%)`;
}

let clickArrow = (btn) => {
	let prntBlock = btn.parentElement.parentElement;
	let arr = prntBlock.querySelectorAll('.slider__button');

	let indexButton = getIndexButton(
		prntBlock.querySelector('.slider__button_active'),
		arr
	)

	prntBlock.querySelector('.slider__button_active').className = 'slider__button';
	
	if (btn.className.baseVal === 'arrowSlider rightArrow') {
		indexButton++;
	} else {
		indexButton--;
	}

	if (indexButton >= arr.length) {
		indexButton = 0;
	} else if (indexButton < 0) {
		indexButton = arr.length - 1;
	}

	prntBlock.querySelectorAll('.slider__button')[indexButton].className = 'slider__button_active slider__button';
	prntBlock.querySelector('.imageSlider').style.transform = `translateX(-${indexButton*100}%)`;

}

let buttons = document.querySelectorAll('.slider__button');

for (let button of buttons) {
	button.onclick = () => {clickSliderButton(button)};
}

for (let arrow of document.querySelectorAll('.arrowSlider')) {
	arrow.onclick = () => {clickArrow(arrow)};
}