function jsonBeautify(){
	let data = document.documentElement.innerText.replace(/ /g, '');
	let tabs = 0;
	let modified = "";
	let span = false;
	let stringStart = false;

	for (let i in data){
		let c = data.charAt(i);

		console.log(c);
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
	document.documentElement.innerHTML = "<pre>" + modified + "<pre>";
}

jsonBeautify();