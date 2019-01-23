var navBtns = document.getElementsByClassName('navigation-button');
var workShow = document.getElementsByClassName('work');

for (let i = 0; i < navBtns.length; i++) {
	navBtns[i].addEventListener('click', function () {
		for (let j = 0; j < navBtns.length; j++) {
			let currentBtn = this;
			let currentWin = '';

			if (currentBtn.id == 'ConcatenateWINsBtn') {
				currentWin = 'ConcatenateWINs';
			} else if (currentBtn.id == 'ConcatenateTicketsBtn') {
				currentWin = 'ConcatenateTickets';
			} else {
				currentWin = 'CopyResponses';
			}

			navBtns[j].classList.remove('active');
			workShow[j].classList.remove('work-show');

			currentBtn.classList.add('active');
			document.getElementById(currentWin).classList.add('work-show');
		}
	});
}

var winCopyText = document.getElementById('winCopyText');
var winTextArea = document.getElementById('winTextArea');
var winCopyBtn = document.getElementById('winCopyBtn');
var winClearBtn = document.getElementById('winClearBtn');
var associateClassesBtn = document.getElementById('associateClassesBtn');

var ticketCopyText = document.getElementById('ticketCopyText');
var ticketTextArea = document.getElementById('ticketTextArea');
var ticketCopyBtn = document.getElementById('ticketCopyBtn');
var ticketClearBtn = document.getElementById('ticketClearBtn');

var responseCopyText = document.getElementById('responseCopyText');
var responseSelect = document.getElementById('responseSelect');
var responseCopyBtn = document.getElementById('responseCopyBtn');
var responseClearBtn = document.getElementById('responseClearBtn');

window.onload = function () {
	clear();
	responseReady();
}

winCopyBtn.onclick = winCopy;
winClearBtn.onclick = clear;
associateClassesBtn.onclick = openAssociateClasses;

ticketCopyBtn.onclick = ticketCopy;
ticketClearBtn.onclick = clear;

responseSelect.onchange = changeResponse;
responseCopyBtn.onclick = responseCopy;
responseClearBtn.onclick = clear;

function clear() {
	winCopyText.value = '';
	winTextArea.value = '';
	ticketCopyText.value = '';
	ticketTextArea.value = '';
	responseSelect.value = '';
	changeResponse();
}

function winCopy() {
	let len = 9;
	var winText = winCopyText.value;

	if (winText != '') {
		winText = helperFunctions.createString(winText, len);
		winText = helperFunctions.finalConcat(winText);

		winTextArea.value = winText;
		winTextArea.select();
		document.execCommand('copy');
	}
}

function openAssociateClasses() {
	winCopy();
	let start = winTextArea.value;
	let search = '';
	
	if (start != '') {
		for (let i = 0; i < start.length; i++) {
			if (start[i] == ' ') {
				search += replace(start[i], '+');
			} else {
				search += start[i];
			}
		}
		
		window.open(AssociateClasses + search);
	}
}

function ticketCopy() {
	let len = 6;
	var ticketText = ticketCopyText.value;

	if (ticketText != '') {
		ticketText = helperFunctions.createString(ticketText, len);
		ticketText = helperFunctions.finalConcat(ticketText);

		ticketTextArea.value = ticketText;
		ticketTextArea.select();
		document.execCommand('copy');
	}
}

function changeResponse() {
	responseCopyText.value = responseSelect.value;
}

function responseCopy() {
	responseCopyText.select();
	document.execCommand('copy');
}

function responseReady() {
	for (let i = 0; i < resArray.length; i++) {
		var opt = document.createElement('option');
		opt.innerHTML = resArray[i]['Name'];
		opt.value = resArray[i]['Text'];
		responseSelect.appendChild(opt);
	}

	responseSelect.value = '';
	changeResponse();
}

var helperFunctions = {
	createString: function (text, len) {
		var newText = text.replace(/\n/g, '/');
		var res = newText.split('');
		var test = '';
		var final = [];
		var x = 0;

		res.forEach(function (char) {
			if (!isNaN(char) && char != ' ' && char != '\t') {
				x++;
				if (test == '') {
					test = char;
				} else {
					test += char;
				}
			} else {
				x = 0;
				test = '';
			}

			if (x === len) {
				let count = 0;
				final.forEach(function (ele) {
					if (ele == test) {
						count++;
					}
				});
				if (count == 0) {
					final.push(test);
				}
				test = '';
				x = 0;
			}
		});

		return final;
	},
	finalConcat: function (arr) {
		let x = arr.reduce(function (concat, ele) {
			return concat + ' OR ' + ele;
		});

		return x;
	}
}
