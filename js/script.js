'use strict';
(function() {

	const mainMenu = document.querySelector('.main_menu');
	const mainMenuLinks= mainMenu.querySelectorAll('a');
	const logo = document.querySelector('.main_nav > a');
	const userBlock = document.querySelector('.user_block');
	const userBlockLinks = userBlock.querySelectorAll('a');
	const slide1 =  document.querySelector('[for="slide_1"]');
	const slide2 =  document.querySelector('[for="slide_2"]');
	const slide3 =  document.querySelector('[for="slide_3"]');
	const slides = document.querySelectorAll('.slide');
	const popUp = document.querySelector('.popup_write_us');
	const linkPopUp = document.querySelector('.contacts a');
	const close = popUp.querySelector('.close');

	const arrLinks = [];
	if (mainMenuLinks) arrLinks.push(...mainMenuLinks);
	if (userBlockLinks) arrLinks.push(...userBlockLinks);
	/*
	if (mainMenuLinks) arrLinks = arrLinks.concat(Array.prototype.slice.call(mainMenuLinks));
	if (userBlockLinks) arrLinks = arrLinks.concat(Array.prototype.slice.call(userBlockLinks));
	*/
	logo.addEventListener('click', function () {
		localStorage.removeItem('mainMenu');
		localStorage.removeItem('userBlock');
	});

	document.addEventListener('DOMContentLoaded', function () {
		if (localStorage.getItem('userBlock')) {
			arrLinks[localStorage.getItem('userBlock')].classList.add('active_link');
		}
		if (localStorage.getItem('mainMenu')) {
			arrLinks[localStorage.getItem('mainMenu')].classList.add('active_link');
		}
	});

	if (mainMenuLinks) {
		mainMenu.addEventListener ('click', function (evt) {
			if(evt.target.tagName.toLowerCase() === 'a') {
				changeArrLinks('active_link', evt.target, 'mainMenu');
			}
		});
	}
	
	if (userBlockLinks) {
		userBlock.addEventListener ('click', function (evt) {
			if(evt.target.tagName.toLowerCase() === 'a') {
				changeArrLinks('active_link', evt.target, 'userBlock');
			}
		});
	}

	function changeArrLinks(className, currentLink, localStorageName, arr = arrLinks) {
		for(let el of arr) {
			if (el.classList.contains(className)) {
				el.classList.remove(className);
				break;
			}
		}
		currentLink.classList.add('active_link');
		if (currentLink.getAttribute('href') !== '#') localStorage.setItem(localStorageName, arrLinks.indexOf(currentLink));
	}

	// ----- PopUp ----- 

	linkPopUp.addEventListener('click', function(evt) {
		evt.preventDefault();
		popUp.style.display = 'flex';
		document.addEventListener('keydown', function(e) {
			if (e.keyCode === 27) {
				popUp.style.display = 'none';
			}
		});
	});
	close.addEventListener('click', function(evt) {
		popUp.style.display = 'none';
	});
	close.addEventListener('keydown', function(evt) {
		if (evt.keyCode === 13) {
			popUp.style.display = 'none';
		}
	});
	
	// -----end PopUp ----- 

	// -----Slider -----
	slide1.addEventListener('click', changeSlide);
	slide2.addEventListener('click', changeSlide);
	slide3.addEventListener('click', changeSlide);
	slides[0].classList.add('active');
	slide_1.checked = false;
	function changeSlide(evt){
		evt.preventDefault();
		Array.prototype.forEach.call(slides,function(item){
			item.classList.toggle('active',false);
		});
		Array.prototype.forEach.call(slides,function(item){
			if(item.matches('.'+ evt.target.getAttribute('for'))){
				item.classList.add('active');
			}
		});
	}
	setInterval(function(){
		for(let i = 0;i < slides.length; i++){
			if(slides[i].classList.contains('active')) {
				slides[i].classList.toggle('active',false);
				if(i+1 === slides.length) {
					i=0;
					slides[i].classList.toggle('active');
					break;
				} else {
					slides[i+1].classList.toggle('active');
					break;
				}
			}
		}
	},3000);
	// -----end Slider -----
})();