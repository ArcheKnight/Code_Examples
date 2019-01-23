var hoverLineHeight = 2;
var dropNavBtns = document.getElementsByClassName('drop-nav-btn');
var navLinks = document.getElementsByClassName('nav-link');
var navBtns = document.getElementsByClassName('nav-btn');

document.getElementById('home').addEventListener('click', function (e) {
	window.open(homeLink, '_SELF');
});

for (let i = 0; i < navLinks.length; i++) {
	navLinks[i].addEventListener('mouseenter', function (e) {
		let navBtn = navLinks[i].getElementsByClassName('nav-btn');
		navBtn[0].style.backgroundSize = '100% ' + hoverLineHeight + 'px';
	});

	navLinks[i].addEventListener('mouseleave', function (e) {
		let navBtn = navLinks[i].getElementsByClassName('nav-btn');
		navBtn[0].style.backgroundSize = '0 ' + hoverLineHeight + 'px';
	});
}
for (let i = 0; i < dropNavBtns.length; i++) {
	dropNavBtns[i].addEventListener('mouseenter', function (e) {
		let navBtn = dropNavBtns[i].getElementsByClassName('drop-nav-text');
		navBtn[0].style.backgroundSize = '100% ' + hoverLineHeight + 'px';
	});

	dropNavBtns[i].addEventListener('mouseleave', function (e) {
		let navBtn = dropNavBtns[i].getElementsByClassName('drop-nav-text');
		navBtn[0].style.backgroundSize = '0 ' + hoverLineHeight + 'px';
	});
}

for (let i = 0; i < menuLinks.length; i++) {
	if (menuLinks[i] != '') {
		navBtns[i].addEventListener('mousedown', function (e) {
			if (e.button == 0 || e.button == 1) {
				window.open(menuLinks[i]);
			}
		});
	}
}

let count = 0;
let winCheck = false;
let accessCheck = false;
for (var menu in refs) {
	for (var links in refs[menu]) {
		if (dropNavBtns[count].id == 'FixWIN' && winCheck == false) {
			dropNavBtns[count].addEventListener('mousedown', function (e) {
				if (e.button == 0 || e.button == 1) {
					FixWIN.forEach(function (ele) {
						window.open(ele);
					});
				}
			});
			winCheck = true;
		} else if (dropNavBtns[count].id == 'FixAccess' && accessCheck == false) {
			dropNavBtns[count].addEventListener('mousedown', function (e) {
				if (e.button == 0 || e.button == 1) {
					FixAccess.forEach(function (ele) {
						window.open(ele);
					});
				}
			});
			accessCheck = true;
		} else {
			let link = refs[menu][links];
			dropNavBtns[count].addEventListener('mousedown', function (e) {
				if (e.button == 0 || e.button == 1) {
					window.open(link);
				}
			});
		}

		count++;
	}
}
