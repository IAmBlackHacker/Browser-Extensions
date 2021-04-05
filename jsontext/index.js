function jsonBeautify(){
	var data = document.documentElement.innerText.replace(/ /g, '');
	var tabs = 0;
	var modified = "";
	var span = false;
	var stringStart = false;
	for (i in data){
		var c = data.charAt(i);
		if( c == '{' || c == '['){
			tabs ++;
			modified += "<span style='color:grey;'>" + c + "</span>" + "\n" + "   ".repeat(tabs);
		}
		else if(c == '}' || c == ']'){
			tabs --;
			if(span){
				modified += "</span>" + "\n" + "   ".repeat(tabs) + "<span style='color:grey;'>" + c + "</span>";
				span = false;
			} else {
				modified += "\n" + "   ".repeat(tabs) + "<span style='color:grey;'>" + c + "</span>";
			}
		}
		else if(c == ','){
			if(span){
				modified += "</span>"+ c + "\n" + "   ".repeat(tabs);
				span = false;
			}else{
				modified += c + "\n" + "   ".repeat(tabs);
			}
		}
		else if(c == ':' && !stringStart){
			if(data.charAt(parseInt(i)+1) == '[' || data.charAt(parseInt(i)+1) == '{'){
				modified += c;
			}else{
				modified += c + "<span style='color:green;'> ";
				span = true;
			}

		}else if(c == '"'){
			stringStart = !stringStart;
			modified += c;
		}
		else{
			modified += c;
		}
	}
	document.documentElement.innerHTML = "<pre>" + modified + "<pre>";
}

jsonBeautify();