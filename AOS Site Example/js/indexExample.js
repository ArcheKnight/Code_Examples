var concatWins = {
	textBox: {
		Description: ''
	},
	copyBox: {
		Description: '',
		method: function() {
			$('#winCopy').focus();
			$('#winCopy').select();
			
			if($('#winCopy').val() != '') {
				document.execCommand('copy');
				$('.winCopied').text('Copied to clipboard').show().fadeOut(1800);
			}
		}
	},
	resetBtn: {
		Description: '',
		method: function() {
			$('#winText').val('');
			$('#winCopy').val('');
			$('#winText').focus();
		}
	},
	goBtn: {
		Description: 'Clicking this button will concatenate all non-interrupted 9 digit numbers in the text box above.',
		method: function() {
			let len = 9;
			
			var winText = $('#winText').val();
			
			if(winText != '') {
				winText = helperFunctions.createString(winText, len);
				winText = helperFunctions.finalConcat(winText);
			
				$('#winCopy').val(winText);
			}
		}
	},
	winToQBClasses: {
		Description: '',
		method: function() {
			concatWins.goBtn.method();
			let x = $('#winCopy').val();
			concatWins.resetBtn.method();
			let result = '';
			for (let i = 0; i < x.length; i++) {
				result += x[i].replace(' ', '+');
			}
			if (result != '') { /* Opens windows to all relevant destinations in original */ }
		}
	},
	winToQBRoster: {
		Description: '',
		method: function() {
			concatWins.goBtn.method();
			let x = $('#winCopy').val();
			concatWins.resetBtn.method();
			let result = '';
			for (let i = 0; i < x.length; i++) {
				result += x[i].replace(' ', '+');
			}
			if (result != '') { /* Opens windows to all relevant destinations in original */ }
		}
	},
	winToEverywhere: {
		Description: '',
		method: function() {
			concatWins.goBtn.method();
			concatWins.copyBox.method();
			let x = $('#winCopy').val();
			concatWins.resetBtn.method();
			let result = '';
			for (let i = 0; i < x.length; i++) { result += x[i].replace(' ', '+'); }
			if (result != '') {
				// Opens windows to all relevant destinations in original
			}
		}
	}
}

var concatTickets = {
	textBox: {
	},
	copyBox: {
		Description: '',
		method: function() {
			$('#ticketCopy').focus();
			$('#ticketCopy').select();
			
			if ($('#ticketCopy').val() != '') {
				document.execCommand('copy');
				$('.ticketCopied').text('Copied to clipboard').show().fadeOut(1200);
				// Opens windows to all relevant destinations in original
			}
		}
	},
	resetBtn: {
		method: function() {
			$('#ticketText').val('');
			$('#ticketCopy').val('');
			$('#ticketText').focus();
		}
	},
	goBtn: {
		method: function() {
			let len = 6;
			var ticketText = $('#ticketText').val();
			var ticketArr = helperFunctions.createString(ticketText,len);
			var finalString = ticketArr.reduce(function(total, num) {
				return total + ' OR ' + num;
			});

			$('#ticketCopy').val(finalString);
		}
	}
}

var copyResponses = {
	resetBtn: {
		method: function() {
			$('#responseText').val('');
			$('#responseDrop').val('');
		}
	},
	goBtn: {
		method: function() {
			$('#responseText').focus();
			$('#responseText').select();

			if($('#responseText').val() != '') {
				document.execCommand('copy');
				$('.responseCopied').text('Copied to clipboard').show().fadeOut(1200);
			}
		}
	},
	change: {
		method: function() {
			$('#responseText').val(this.value);
		}
	},
	ready: {
		method: function() {
			
			for(let i = 0; i < resArray.length; i++) {
				var opt = document.createElement('option');
				opt.innerHTML = resArray[i]['Name'];
				opt.value = resArray[i]['Text'];
				document.getElementById('responseDrop').appendChild(opt);
			}
		}
	}
}

var helperFunctions = {
	createString: function(text, len) {
		var newText = text.replace(/\n/g,'/');
		var res = newText.split('');
		var test = '';
		var final =[];
		var x = 0;
		
		res.forEach(function(char) {
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
				final.forEach(function(ele) {
					if (ele == test) {
						count++;
					}
				});
				if (count == 0) { final.push(test); }
				test = '';
				x = 0;
			}
		});
		
		return final;
	},
	finalConcat: function(arr) {
		let x = arr.reduce(function(concat, ele) {
			return concat + ' OR ' + ele;
		});
		
		return x;
	}
}

$('#winGo').click(concatWins.goBtn.method);
$('#winReset').click(concatWins.resetBtn.method);
$('#winCopy').click(concatWins.copyBox.method);
$('#winEverywhere').click(concatWins.winToEverywhere.method);
$('#winToQBClasses').click(concatWins.winToQBClasses.method);
$('#winToQBRoster').click(concatWins.winToQBRoster.method);

$('#responseGo').click(copyResponses.goBtn.method);
$('#responseReset').click(copyResponses.resetBtn.method);
$('#responseDrop').change(copyResponses.change.method);
$('#responseDrop').ready(copyResponses.ready.method);

$('#ticketGo').click(concatTickets.goBtn.method);
$('#ticketReset').click(concatTickets.resetBtn.method);
$('#ticketCopy').click(concatTickets.copyBox.method);

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('googleSearch').addEventListener('keydown', function(e) {
		if (e.keyCode == 13) {
			openPages.googleSearch();
		}
	});
});