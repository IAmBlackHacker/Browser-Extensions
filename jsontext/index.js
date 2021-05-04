function jsonBeautify(data){
	let tabs = 0;
	let modified = "";
	let span = false;
	let stringStart = false;

	for (let i in data){
		data = data.replace(/\s+(?=([^"]*"[^"]*")*[^"]*$)/g, '').replace(/\n/g, '');
		let c = data.charAt(i);

		if(c === '"'){
			stringStart = !stringStart;
			modified += c;
		} else if(!stringStart){
			if( c === '{' || c === '['){
				tabs ++;
				modified += "<span style='color:grey;'>" + c + "</span>" + "\n" + "   ".repeat(tabs);
			}
			else if(c === '}' || c === ']'){
				tabs --;
				if(span){
					modified += "</span>" + "\n" + "   ".repeat(tabs) + "<span style='color:grey;'>" + c + "</span>";
					span = false;
				} else {
					modified += "\n" + "   ".repeat(tabs) + "<span style='color:grey;'>" + c + "</span>";
				}
			}
			else if(c === ','){
				if(span){
					modified += "</span>"+ c + "\n" + "   ".repeat(tabs);
					span = false;
				}else{
					modified += c + "\n" + "   ".repeat(tabs);
				}
			}
			else if(c === ':'){
				if(data.charAt(parseInt(i)+1) === '[' || data.charAt(parseInt(i)+1) === '{'){
					modified += c;
				}else if(data.charAt(parseInt(i)+1) === '"'){
					modified += c + "<span style='color:green;'> ";
					span = true;
				}else{
					modified += c + "<span style='color:blue;'> ";
					span = true;
				}

			}else {
				modified += c;
			}
		} else{
			modified += c;
		}
	}
	document.getElementById("json_content").innerHTML = "<pre>" + modified + "<pre>";
}

function addJsonInputTextBox(){
	let html_code = "<div id='json_box' style='padding: 8px;box-sizing: border-box;border-radius: 8px;position: fixed; top: 20px; right: 10px;background: white;box-shadow: 0 0 5px grey'> " +
		"<div class='header' style='min-width: 300px;'> Json Beautifier <div id='json_box_close' style='background: red;float: right;cursor: pointer;padding: 2px;border-radius: 2px;margin-bottom: 2px;'>X</div></div>" +
		"<div class='body' style='padding-right: 12px;'><textarea style='width: 100%;resize: vertical;padding: 6px;' placeholder='Add new json here, vertically extendiable' rows='12' id='json_text'></textarea></div>" +
		"</div>";
	document.documentElement.innerHTML  += html_code;
}

function showJsonBox(){
	document.getElementById("json_box").hidden = false;
}

if(document.getElementById("json_box") == null){
	let html_data = document.documentElement.innerText;
	document.documentElement.innerHTML = "<div id='json_content'></div>";
	jsonBeautify(html_data);
	addJsonInputTextBox();
	showJsonBox();

	document.addEventListener('keyup', function (e) {
		if (e.target && e.target.id === 'json_text') {
			if (e.target.value.length === 0) {
				jsonBeautify(html_data);
			} else {
				jsonBeautify(e.target.value);
			}
		}
	});

	document.addEventListener('click', function (e) {
		if (e.target && e.target.id === 'json_box_close') {
			document.getElementById("json_box").hidden = true;
		}
	});
} else {
	showJsonBox();
}
