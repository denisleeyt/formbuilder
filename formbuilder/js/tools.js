function isChecked(id) {
    var ReturnVal = false;
    $("#" + id).find('input[type="radio"]').each(function () {
        if ($(this).is(":checked"))
            ReturnVal = true;
    });
    $("#" + id).find('input[type="checkbox"]').each(function () {
        if ($(this).is(":checked"))
            ReturnVal = true;
    });
    return ReturnVal;
}
function isOptional(SelfID){
	if($('#'+SelfID).attr('data-optional') == "true"){
		if($('#'+SelfID).val().length < 1){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}