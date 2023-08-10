"use strict";

let scrollToBlock = (className) => {
	console.log(document.querySelector(`.${className}`));
	document.querySelector(`.${className}`).scrollIntoView({behavior: 'smooth', block: 'start'});
}

let viewMenu = () => {
	let b = document.querySelector('.menu')

	if (b.style.display === 'block') {
		b.style.display = 'none';
	} else {
		b.style.display = 'block';
	}
}

let openOtherPage = (btn) => {
	if (btn.id.indexOf('pk') + 1) {
		let page = Number(btn.id.replace('pk', ''));
		let xhr = new XMLHttpRequest();
		xhr.open('get', `/get_post/${page}`, true);

		xhr.responseType = 'json';
		
		xhr.onload = () => {
			setInfoFromAjax(xhr.response, page);
		}

		xhr.send()
	}
}

let setInfoFromAjax	= (response, currentPageNumber) => {
	document.querySelector('.modalWindowContent__heading').innerHTML = response['heading1'];
	document.querySelector('.modalWindowContent__underHeading').innerHTML = response['heading2'];
	document.querySelector('.modalWindowContent__text').innerHTML = response['content'];
	document.querySelector('.modalWindow__photo').style.backgroundImage = `url(${response['image']})`;
	document.querySelector('.modalWindow__photo').scrollIntoView({behavior: 'smooth', block: 'start'})
	if (response['has_next']) {
		document.querySelector('.nextPage').id = `pk${currentPageNumber+1}`;
	} else {
		document.querySelector('.nextPage').id = '';
	}
	if (response['has_prev']) {
		document.querySelector('.prevPage').id = `pk${currentPageNumber-1}`;
	} else {
		document.querySelector('.prevPage').id = '';
	}
}

let setModalWindow = (block) => {
	document.querySelector('.modalWindowWrapper').style.animation = 'appearanceOnModal .3s linear forwards';
	document.querySelector('html').style.overflow = 'hidden';
	let page = Number(block.id.replace('pk', ''));

	let xhr = new XMLHttpRequest();
	xhr.open('get', `/get_post/${page}`, true);

	xhr.responseType = 'json';
	
	xhr.onload = () => {
		console.log(xhr.response);
		setInfoFromAjax(xhr.response, page);
	}

	xhr.send()
}

let getIndexButton = (btn) => {
	let count = 0;
	for (let button of buttons) {
		if (button === btn) {
			break;
		}
		count++;
	}
	return count;
}

let setOpacity = (active, dataBlock) => {
	active.style.opacity = '0';
	setTimeout(() => {
		active.innerHTML = dataBlock.innerHTML;
	}, 400)
	setTimeout(() => {
		active.style.opacity = 1;
	}, 500)
}

let clickSliderButton = (btn) => {
	if (btn.className === 'slider__button_active') { return; }

	document.querySelector('.slider__button_active').className = 'slider__button';
	btn.className = 'slider__button_active';
	let indexButton = getIndexButton(btn);

	let activeBlock = document.querySelector('.ArticleText__active');
	let dataBlock = document.querySelectorAll('.ArticleText')[indexButton];
	setOpacity(activeBlock, dataBlock);
	let count = document.querySelectorAll('.imageItem').length;
	document.querySelector('.imageSlider').style.transform = `translateY(-${indexButton*100/count}%)`;
}

let buttons = document.querySelectorAll('.slider__button');

for (let button of buttons) {
	button.onclick = () => {clickSliderButton(button)};
}

for (let i of document.querySelectorAll('.controlModal__item')) {
	i.onclick = () => {
		openOtherPage(i);
	}
}

$(document).ready(function(){
    $('.owl-carousel').owlCarousel({loop: true, autoWidth: true, center: true});
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {  
  		$('.services__blocks').owlCarousel({loop: true, autoWidth: true, center: true});
  		document.querySelector('.services__blocks').className = 'services__blocks mobileServices'
    }
});

document.querySelector('.controlModalClose').onclick = () => {
	document.querySelector('.modalWindowWrapper').style.animation = 'appearanceOffModal .3s linear forwards';
	document.querySelector('html').style.overflowY = 'scroll'
}
