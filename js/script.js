'use strict';
(function() {
	var mainMenu = document.querySelector('.main_menu');
	var logo = document.querySelector('.main_nav > a');
	var userBlock = document.querySelector('.user_block');
	if (mainMenu != null) {
		var mainMenuLinks= mainMenu.querySelectorAll('a');
		mainMenu.addEventListener ('click', function (evt) {
			for(var i = 0; i < mainMenuLinks.length; i++) {
				if (mainMenuLinks[i].classList.contains('active_link')) {
					mainMenuLinks[i].classList.remove('active_link');
					break;
				}
			}
			if (localStorage.getItem('userBlock')) {
				userBlockLinks[localStorage.getItem('userBlock')].classList.remove('active_link');
				localStorage.removeItem('userBlock');
			}
			if (evt.target.tagName.toLowerCase() === 'a') {
				evt.target.classList.add('active_link');
				for(i = 0; i < mainMenuLinks.length; i++) {
					if (mainMenuLinks[i].classList.contains('active_link')) {
						localStorage.setItem('mainMenu', i);
						break;
					}
				}
			}
		});
	}
	if (userBlock != null) {
		var userBlockLinks = userBlock.querySelectorAll('a');
		userBlock.addEventListener ('click', function (evt) {
			for(var i = 0; i < userBlockLinks.length; i++) {
				if (userBlockLinks[i].classList.contains('active_link')) {
					userBlockLinks[i].classList.remove('active_link');
					break;
				}
			}
			if (localStorage.getItem('mainMenu')) {
				mainMenuLinks[localStorage.getItem('mainMenu')].classList.remove('active_link');
				localStorage.removeItem('mainMenu');
			}
			if (evt.target.tagName.toLowerCase() === 'a') {
				evt.target.classList.add('active_link');
				for(i = 0; i < userBlockLinks.length; i++) {
					if (userBlockLinks[i].classList.contains('active_link')) {
						localStorage.setItem('userBlock', i);
						break;
					}
				}
			}
		});
	}
	logo.addEventListener('click', function () {
		localStorage.removeItem('mainMenu');
		localStorage.removeItem('userBlock');
	});
	document.addEventListener('DOMContentLoaded', function () {
		if (localStorage.getItem('userBlock')) {
			mainMenuLinks[localStorage.getItem('userBlock')].classList.add('active_link');
		}
		if (localStorage.getItem('mainMenu')) {
			mainMenuLinks[localStorage.getItem('mainMenu')].classList.add('active_link');
		}
	});
})();