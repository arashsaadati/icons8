$(function() {
		// chrome.tabs.query({active: true}, function(tabs) {
		//   var tab = tabs[0];
		//   tab_title = tab.title;
		//   console.log(tabs);
		//   // chrome.tabs.executeScript(tab.id, {
		//   //   code: 'document.querySelector("h1").textContent'
		//   // }, display_h1);
		// });

		// var item = document.querySelector('.grid-icons__item.grid-icon.is-active a');if (item != undefined) {item.getAttribute('href')}; 
		var tabId = null;
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		  tabId = tabs[0]['id'];
		});
		var icon = '', item = '', result = [];
		const executing = chrome.tabs.executeScript(tabId, {
			code:getIcon()
		}, 
			(res) => { 
				if (res != undefined) {
					download(res[0]);
				}
			});

		// $('form').on('submit', function(e) {
		// 	e.preventDefault();
		// 	input = $(this).find('input[type=text]');
		// 	iconid = input.val()
		// 	$.when(icon(iconid))
		// 	.then(function() {
		// 		input.val('')
		// 	})
		// })
	})

	function getIcon() {
		// alert()
		// console.log(document.querySelector('.grid-icons__item.grid-icon.is-active a'))
		return "item = 'data:image/svg+xml;base64,'+btoa(new XMLSerializer().serializeToString(document.querySelector('.dim__preview-icon svg')))"
		// var result = [];item = document.querySelector('.grid-icons__item.grid-icon.is-active a'); if (item != null) {result['item'] = item.getAttribute('href')};if (document.querySelector('.dim__preview-icon svg') != null) result['icon'] =
		// item = document.querySelector('.grid-icons__item.grid-icon.is-active a').getAttribute('href')
	}

	var download = function(bta) {
		var $a = $("<a>");
		$a.attr("href",bta);
		$("body").append($a);
		$a.attr("download",'icon.svg');
		$a[0].click();
		$a.remove();
		$('#status').html('Downloaded');
		setTimeout(function() {
			window.close();
		}, 1000)
	}

	var icon = function(id) {
		$.get('https://api-icons.icons8.com/siteApi/icons/icon?id='+id+'&language=en-US&svg=true')
		.then(function(res) {
			path = 'data:image/svg+xml;base64,' + res.icon.svg;
			name = res.icon.variants[0].name;
			name = name.replace(/ /g, '_');
			name = name.toLowerCase();
			var $a = $("<a>");
			$a.attr("href",path);
			$("body").append($a);
			$a.attr("download",name+'.svg');
			$a[0].click();
			$a.remove();
			$('#status').html('Downloaded');
			setTimeout(function() {
				window.close();
			}, 1000)
		})
	}