app.filter("changeCode",function(){
	return function(inputData){
		var changed = "";
		switch (inputData){
			case '101':
			changed = 'boss';
			break;
			case '102':
			changed = 'message';
			break;
			case '103':
			changed = 'cook';
			break;
		}
		return changed;
	}
})