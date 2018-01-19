'use strict';
(function() {

	var mainMenu = document.querySelector('.main_menu');
	var mainMenuLinks= mainMenu.querySelectorAll('a');
	var logo = document.querySelector('.main_nav > a');
	var userBlock = document.querySelector('.user_block');
	var userBlockLinks = userBlock.querySelectorAll('a');
	var slide1 =  document.querySelector('[for="slide_1"]');
	var slide2 =  document.querySelector('[for="slide_2"]');
	var slide3 =  document.querySelector('[for="slide_3"]');
	var slides = document.querySelectorAll('.slide');
	var popUp = document.querySelector('.popup_write_us');
	var linkPopUp = document.querySelector('.contacts a');
	var close = popUp.querySelector('.close');

	var arrLinks = [];
	if (mainMenuLinks) arrLinks = arrLinks.concat(Array.prototype.slice.call(mainMenuLinks));
	if (userBlockLinks) arrLinks = arrLinks.concat(Array.prototype.slice.call(userBlockLinks));

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

	function changeArrLinks(className, currentLink, localStorageName, array = arrLinks) {
		for(var i = 0; i < arrLinks.length; i++) {
			if (arrLinks[i].classList.contains(className)) {
				arrLinks[i].classList.remove(className);
				break;
			}
		}
		currentLink.classList.add('active_link');
		if (currentLink.getAttribute('href') != '#') localStorage.setItem(localStorageName, arrLinks.indexOf(currentLink));
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
		for(var i = 0;i < slides.length; i++){
			if(slides[i].classList.contains('active')) {
				slides[i].classList.toggle('active',false);
				if(i+1 == slides.length) {
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