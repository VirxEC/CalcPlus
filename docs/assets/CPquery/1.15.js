function $(query) {
	try {
		if (query == undefined) {
			return;
		} else {
			query = query.toString();
			var local = function(item2) {
				if (item2 == undefined) {
					return localStorage.getItem(query);
				}
				return localStorage.setItem(query, item2);
			}

			var session = function(item2) {
				if (item2 == undefined) {
					return sessionStorage.getItem(query);
				}
				return sessionStorage.setItem(query, item2);
			}

			var select = function() {
				return document.querySelector(query);
			}

			var create = function() {
				return document.createElement(query);
			}

			var css = {
				append: function(item) {
					var sheet = window.document.styleSheets[parseInt(query)];
					sheet.insertRule(item, sheet.cssRules.length);
				},
				replace: function(item) {
					var sheet = window.document.styleSheets[parseInt(query)];
					for (var i=0; i<sheet.cssRules.length; i++) {
						sheet.deleteRule(i);
					}
					sheet.insertRule(item, sheet.cssRules.length);
				},
				delete: function(index) {
					var sheet = window.document.styleSheets[query];
					sheet.deleteRule(index);
				}
			};

			var element;
			query = query.split("#");
			if (query.length == 2) {
				query = query[1];
				element = document.getElementById(query);
			} else {
				query = query.toString().split(".");
				if (query.length == 2) {
					query = query[1];
					element = document.getElementsByClassName(query);
				} else  {
					element = document.getElementsByTagName(query);
				}
			}

			var checked = function(value) {
				if (value == undefined) {
					return element.checked;
				}
				element.checked = value;
			}

			var click = function(code) {
				return element.addEventListener("click", code);
			}

			var val = function() {
				return element.value;
			}

			var get = function() {
				return element;
			}

			var html = {
				append: function(item) {
					element.innerHTML += item;
				},
				replace: function(item) {
					element.innerHTML = item;
				}
			};

			var text = {
				append: function(item) {
					element.textContent += item;
				},
				replace: function(item) {
					element.textContent = item;
				}
			};
			return {
				local: local,
				session: session,
				select: select,
				create: create,
				css: css,
				checked: checked,
				click: click,
				val: val,
				get: get,
				html: {
					append: html.append,
					replace: html.replace
				},
				text: {
					append: text.append,
					replace: text.replace
				}
			}
		}
	} catch(err) {
		throw new Error(err);
	}
}