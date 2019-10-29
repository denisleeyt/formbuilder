var lockReload = false;
var onSubmit = false;

$(document).ready(function () {
    document.forms['validateForm'].reset();

    checkEmpty = "if (VAL && VAL.trim().length > 0) return true; else return false;";
    checkName = "if (VAL.match(/^[A-Za-z ]*[A-Za-z ][A-Za-z ]*$/)) return true; else return false;";
    checkRegionCode = "if (VAL.match(/^[0-9]+$/) && VAL.length <= 3) return true; else return false;";
    checkPhoneLength = "if (VAL.match(/^[0-9]+$/) && VAL.length == 8) return true; else return false;";
    checkContactNo = "if(VAL.match(/^[0-9\- ]+$/) && (VAL.substr(0,1).match(/[0-9]/)) && VAL.length >= 8) return true; else return false;";
	checkFaxNo = "if((isOptional(SelfID)) || VAL.match(/^[0-9\- ]+$/) && (VAL.substr(0,1).match(/[0-9]/)) && VAL.length >= 8) return true; else return false;";
    checkEmail = "if (((VAL.indexOf('.@') == -1) && (VAL.indexOf('..') == -1) && VAL.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) && VAL.match(/^[^\\W][a-zA-Z0-9\\_\\-\\.]+([a-zA-Z0-9\\_\\-\\.]+)*\\@[a-zA-Z0-9\\_\\-\\.]+([a-zA-Z0-9]+)[^\\W]*\\.[a-zA-Z]{2,4}$/))) return true; else return false;";
	checkSyndicate = "if (isSyndicate() && (!VAL || VAL.trim().length == 0)) return false; else return true;";
	checkBreezeupparticipant = "if (isBreezeupAttend() && (!VAL || VAL.trim().length == 0)) return false; else return true;";
    checkSaleparticipant = "if ((isSaleAttend()|| isAgentAttend()) && (!VAL || VAL.trim().length == 0)) return false; else return true;";
    
	checkConfirmPurchaser = "if (isConfirmPurchaser()) return true; else return false;";
	
	checkEmptyAgent = "if (notAgentAttend() || (VAL && VAL.trim().length > 0)) return true; else return false;";
	checkEmailAgent = "if (notAgentAttend() || (((VAL.indexOf('.@') == -1) && (VAL.indexOf('..') == -1) && VAL.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) && VAL.match(/^[^\\W][a-zA-Z0-9\\_\\-\\.]+([a-zA-Z0-9\\_\\-\\.]+)*\\@[a-zA-Z0-9\\_\\-\\.]+([a-zA-Z0-9]+)[^\\W]*\\.[a-zA-Z]{2,4}$/)))) return true; else return false;";
	checkContactNoAgent = "if (notAgentAttend() || (VAL.match(/^[0-9\- ]+$/) && (VAL.substr(0,1).match(/[0-9]/)) && VAL.length >= 8)) return true; else return false;";
	checkFaxNoAgent = "if (notAgentAttend() || ((isOptional(SelfID)) || VAL.match(/^[0-9\- ]+$/) && (VAL.substr(0,1).match(/[0-9]/)) && VAL.length >= 8)) return true; else return false;";
	
	checktotalsumexpend = "if (agentAttendBreezeUPOnly() || notAgentAttend() || $('input[name=\"totalsum-radio\"]:checked').val()) return true; else return false;"
	checktotalsum = "if (agentAttendBreezeUPOnly() || notAgentAttend() || (limitTotalSum() && (VAL && VAL.trim().length > 0 && parseInt(VAL) > 0 && VAL.match(/^[0-9\- ]+$/))) || !limitTotalSum()) return true; else return false;";
	
	checkConfirmAgent = "if (notAgentAttend() || $('#confirm_agent:checked').length > 0) return true; else return false;";
	
	
	$("#firstname").validate({
        expression: checkEmpty,
        message: error_msg.firstname
    });
	$("#lastname").validate({
        expression: checkEmpty,
        message: error_msg.lastname
    });
	$("#hkjcmembershipno").validate({
        expression: checkEmpty,
        message: error_msg.hkjcmembershipno
    });	
	$("#tel").validate({
        expression: checkContactNo,
        message: error_msg.tel
    });
	$("#email").validate({
        expression: checkEmail,
        message: error_msg.email
    });
	$("#fax").validate({
        expression: checkFaxNo,
        message: error_msg.fax
    });
	$('#horseimportpermittype').validate({
        expression: "return $('input[name=\"permit-type\"]:checked').val()",
        message: error_msg.checkbox
    });
	$('#ownertype').validate({
        expression: "return $('input[name=\"owner-type\"]:checked').val()",
        message: error_msg.checkbox
    });
	$("#syndicate_name").validate({
        expression: checkSyndicate,
        message: error_msg.syndicate_name
    });
	$("#ba_account").validate({
        expression: checkSyndicate,
        message: error_msg.ba_account
    });
	$('#breezeupattend').validate({
        expression: "return $('input[name=\"breezeup-radio\"]:checked').val()",
        message: error_msg.checkbox
    });
	
	$('#breeze-up-participant').validate({
        expression: checkBreezeupparticipant,
        message: error_msg.selectparticipant
    });
	
	
	$('#breezeupusb').validate({
        expression: "return $('input[name=\"breezeup-usb-radio\"]:checked').val()",
        message: error_msg.checkbox
    });	
	
	$('#i_confirm_purchaser').validate({
        expression: checkConfirmPurchaser,
        message: error_msg.confirm
    });	
	
	$('#purchaseattend').validate({
        expression: "return $('input[name=\"purchase-radio\"]:checked').val()",
        message: error_msg.checkbox
    });	
	
	$('#sale-participant').validate({
        expression: checkSaleparticipant,
        message: error_msg.selectparticipant
    });
	

	$("#agentname").validate({
        expression: checkEmptyAgent,
        message: error_msg.agentname
    });
	$("#agentaddress").validate({
        expression: checkEmptyAgent,
        message: error_msg.agentaddress
    });
	$("#agenttel").validate({
        expression: checkContactNoAgent,
        message: error_msg.agenttel
    });
	$("#agentbusinessno").validate({
        expression: checkEmailAgent,
        message: error_msg.agentbusinessno
    });
	$("#agentfax").validate({
        expression: checkFaxNoAgent,
        message: error_msg.agentfax
    });	
	

	$('#totalsumexpend').validate({
        expression: checktotalsumexpend,
        message: error_msg.checkbox
    });
	
	$('#totalsum').validate({
        expression: checktotalsum,
        message: error_msg.totalsum
    });
	

	$('#i_confirm_agent').validate({
        expression: checkConfirmAgent,
        message: error_msg.confirm
    });
	
	
    $("#v_captcha").validate({
        expression: checkEmpty,
        message: error_msg.captcha
    });

});


    nowDate = new Date();
    $("#capImg").attr("src", "/common/lib/captcha.ashx?" + nowDate.getTime() + "&guid=" + $("#u_gid").html());


    $("#capReload").on("click", function () {
        if (!lockReload) {
            lockReload = true;

            $.get("/common/lib/guidgen.aspx", function (data) {

                $("#u_gid").html(data);

                nowDate = new Date();
                $("#capImg").attr("src", "/common/lib/captcha.ashx?" + nowDate.getTime() + "&guid=" + $("#u_gid").html());

                setTimeout(function () {
                    lockReload = false;
                }, 1000);

            });

        }
    });

	//fix for iphone
    $("#confirm_purchaser").click(function () {
        if ($('#confirm_purchaser:checked').length > 0) {
			$("#i_confirm_purchaser").removeClass('ErrorField');
            $("#i_confirm_purchaser").parent().find(".ValidationErrors").remove();
        }
    });
	//fix for iphone
    $("#confirm_agent").click(function () {
        if ($('#confirm_agent:checked').length > 0) {
			$("#i_confirm_agent").removeClass('ErrorField');
            $("#i_confirm_agent").parent().find(".ValidationErrors").remove();
        }
    });

    $(".btn_reset").on("click", function () {
		resetForm();
    });
	
    $(".btn_submit").on("click", function () {
        if (!onSubmit) {
            $("#validateForm").submit();
        }
    });

    $("#validateForm").on("submit", function () {
		setSyndicateFields();
		setAgentAuthorizationFields();
		setTermsFields();
        setTimeout(function () {
            if ($(".ValidationErrors").length == 0) {
                changeSubmitButton(true);
                captchaValidate();
            }else{
				$('.important-box').animate({
					scrollTop: 0},
				50);
				$('html,body').animate({
					scrollTop: $(".ValidationErrors").eq(0).parent().offset().top - 30},
				200);	
			}
        }, 1);
        return false;
    });

    $("#v_captcha").on("focusout", function () {
        $(this).val($(this).val().toUpperCase());
    });
	
	
function resetForm(){
	document.getElementById("validateForm").reset();
	$('html,body').animate({
		scrollTop: 0},
	200);	
	$("#syndicatenamefield").hide();
	$(".numberOfPurchaserDiv").hide();
	$(".numberOfBreezeUpDiv").hide();
	$("#section-d").hide();
	$(".ValidationErrors").remove();
	$(".ErrorField").removeClass('ErrorField');
	$('.numberOfBreezeUp button').removeClass("active");
	$('.numberOfSale button').removeClass("active");
	
	$('#syndicate_fields').val('');
	$("#breeze-up-participant").val('');
	$("#sale-participant").val('');
	$("#agent-authorization").val('');
	
	if(window.location.href.indexOf('-forms-ch') > -1){
		$("#mLang").val("ch");
	}else{
		$("#mLang").val("en");
	}
}
function setSyndicateFields(){
	$("#syndicate_fields").val('');
	var syndicateName = $("#syndicate_name").val();
	var baaccount = $("#ba_account").val();
	$("#syndicate_fields").val(syndicateName+'--baaccount--'+baaccount);
}
function setTermsFields(){
	var mpurchaser;
	var magent;
	if ($('#confirm_purchaser:checked').length > 0) {
		mpurchaser = 1;
	}else{
		mpurchaser = 0;
	}
	if ($('#confirm_agent:checked').length > 0) {
		magent = 1;
	}else{
		magent = 0;
	}
	$("#mterms").val(mpurchaser+"."+magent);
}
function setAgentAuthorizationFields(){
	$('#agent-authorization').val('');
	var agentname = encodeURI($('#agentname').val());
	var agentaddress = encodeURI($('#agentaddress').val());
	var agenttel = encodeURI($('#agenttel').val());
	var agentbusinessno = encodeURI($('#agentbusinessno').val());
	var agentfax = encodeURI($('#agentfax').val());
	
	var mText = '{"data" :[' +
	'{"agentname":"'+agentname+'"},' +
	'{"agentaddress":"'+agentaddress+'"},' +
	'{"agenttel":"'+agenttel+'"},' +
	'{"agentbusinessno":"'+agentbusinessno+'"},' +
	'{"agentfax":"'+agentfax+'"}]}';
	
	$('#agent-authorization').val(mText);
}
function captchaValidate() {
    var formRecord = new Record();
    formRecord.initData(formRecord);
    var formDB = new DB(formRecord);
    formDB.submitData(JSON.stringify(formRecord.mainRecord), formDB, dbResultHandle);
}

var dbResultHandle = function (msg) {
    if (isXML(msg)) {
        WATracker.trackClickEvent("1819HKIS_SFORM");
        setTimeout(function () {
            window.location.replace((window.location.href.indexOf('-forms-ch') > -1 ? 'ch' : 'en') + '-thank-you.aspx');
        }, 800);
    } else {
        if (msg == "step1_false") {
            $("#captchaInputDiv").append('<span id="WrongCaptcha" class="ValidationErrors">' + error_msg.captcha_wrong + '</span>');
        } else {
			if(msg.indexOf('step3_invalid_') > -1){
				var eMsg = msg.split("step3_invalid_");
				var dbMsg = "";		
				for(var i=0; i < eMsg.length; i++){
					if(eMsg[i] != undefined && eMsg[i] != null && eMsg[i] !=""){
						var mmm = eMsg[i];
						if(dberror_msg[mmm] && dberror_msg[mmm] !=""){
							dbMsg += dberror_msg[mmm]+"\n";	
						}
					}
				}
				if(dbMsg !=""){
					alert(dbMsg);
				}else{
					alert(error_msg.submission);
				}
			}else{	
				alert(error_msg.submission);
			}
        }
        changeSubmitButton(false);
    }
}

function showHideSectionD(){
	if($('input[type=radio][name=purchase-radio]:checked').val() == "sale_attend_no_but_agent"){
		$("#section-d").show();
	}else if($('input[type=radio][name=breezeup-radio]:checked').val() == "breezeup_yes_agent"){
		$("#section-d").show();
    }else{
		//Not Attend
		$("#section-d").find(".ValidationErrors").remove();
		$("#section-d").find(".ErrorField").removeClass("ErrorField");
		$("#section-d").hide();
	}
}

$('.numberOfBreezeUp button').on( "vclick click", function() {
	$('.numberOfBreezeUp button').removeClass("active");
	$(this).addClass("active");
	var mVal = $(this).attr('data-value');
	$("#breeze-up-participant").val(mVal);
	$(".numberOfBreezeUp").find(".ValidationErrors").remove();
	$("#breeze-up-participant").removeClass('ErrorField');
});
$('.numberOfSale button').on( "vclick click", function() {
	$('.numberOfSale button').removeClass("active");
	$(this).addClass("active");
	var mVal = $(this).attr('data-value');
	$("#sale-participant").val(mVal);
	$(".numberOfSale").find(".ValidationErrors").remove();
	$("#sale-participant").removeClass('ErrorField');
});

$('input[type=radio][name=owner-type]').on('change', function() {
	$("#syndicate_name").val("");
	$("#syndicatenamefield").find(".ValidationErrors").remove();
	$("#syndicate_name").removeClass("ErrorField");
	$("#ba_account").val("");
	$("#ba_account").find(".ValidationErrors").remove();
	$("#ba_account").removeClass("ErrorField");
	if($('input[type=radio][name=owner-type]:checked').val() == "Syndicate"){
		$("#syndicatenamefield").show();
	}else{
		$("#syndicatenamefield").hide();
	}
});
$('input[type=radio][name=breezeup-radio]').on('change', function() {
	$('.numberOfBreezeUp button').removeClass("active");
	$("#breeze-up-participant").val('');
	$(".numberOfBreezeUp").find(".ValidationErrors").remove();
	$("#breeze-up-participant").removeClass('ErrorField');
	if($('input[type=radio][name=breezeup-radio]:checked').val() == "breezeup_yes"){
		$("#numberOfBreezeUpDivAgent").hide();
		$("#numberOfBreezeUpDivMyself").show();
		$("#numberOfBreezeUpDivRemark").show();
	}else if($('input[type=radio][name=breezeup-radio]:checked').val() == "breezeup_yes_agent"){
		$("#numberOfBreezeUpDivMyself").hide();
		$("#numberOfBreezeUpDivAgent").show();
		$("#numberOfBreezeUpDivRemark").show();
    }else{
		$(".numberOfBreezeUpDiv").hide();
	}
	showHideSectionD();
});
$('input[type=radio][name=purchase-radio]').on('change', function() {
	$('.numberOfSale button').removeClass("active");
	$("#sale-participant").val('');
	//Attend
	$(".numberOfSale").find(".ValidationErrors").remove();
	$("#sale-participant").removeClass('ErrorField');
	//Not Attend
	$("#section-d").find(".ValidationErrors").remove();
	$("#section-d").find(".ErrorField").removeClass("ErrorField");
	$("#section-c").find(".ValidationErrors").remove();
	$("#section-c").find(".ErrorField").removeClass("ErrorField");
	if($('input[type=radio][name=purchase-radio]:checked').val() == "sale_attend_yes"){
		$("#numberOfPurchaserDivAgent").hide();
		$("#numberOfPurchaserDivMyself").show();
		$("#numberOfPurchaserDivRemark").show();
	}else if ($('input[type=radio][name=purchase-radio]:checked').val() == "sale_attend_no_but_agent"){
		$("#numberOfPurchaserDivMyself").hide();
		$("#numberOfPurchaserDivAgent").show();
		$("#numberOfPurchaserDivRemark").show();
	}else{
		$(".numberOfPurchaserDiv").hide();
	}
	
	showHideSectionD();	
	if($(this).val() == "sale_attend_no_but_agent"){
		$('html,body').animate({
			scrollTop: $("#purchaseattend").offset().top},
        200);	
	}
});
$('input[type=radio][name=totalsum-radio]').on('change', function() {
	$("#totalsum").val('');
	$("#totalsumfield").find(".ValidationErrors").remove();
	$("#totalsum").removeClass('ErrorField');
	if($('input[type=radio][name=totalsum-radio]:checked').val() == "yes_limitation"){
		$("#totalsumfield").show();
	}else{
		$("#totalsumfield").hide();
	}
});

	

/*** Helper ***/
function isOptional(SelfID){
	var ReturnVal = false;
	if($('#'+SelfID).val().length < 1){
		ReturnVal = true;
	}
	return ReturnVal;
}
function isSyndicate(){
	var ReturnVal = false;
	if($('input[name="owner-type"]:checked').val() == "Syndicate"){
		ReturnVal = true;
	}
	return ReturnVal;
}
function isBreezeupAttend(){
	var ReturnVal = false;
	if($('input[name="breezeup-radio"]:checked').val() == "breezeup_yes" || $('input[name="breezeup-radio"]:checked').val() == "breezeup_yes_agent"){
		ReturnVal = true;
	}
	return ReturnVal;
}
function isConfirmPurchaser(){
	var ReturnVal = false;
	if($('#confirm_purchaser:checked').length > 0){
		ReturnVal = true;
	}
	if($('input[name="purchase-radio"]:checked').val() == "sale_attend_no"){
		ReturnVal = true;
	}
	return ReturnVal;
}
function isSaleAttend(){
	var ReturnVal = false;
	if($('input[name="purchase-radio"]:checked').val() == "sale_attend_yes"){
		ReturnVal = true;
	}
	return ReturnVal;
}
function isAgentAttend(){
	var ReturnVal = false;
	if($('input[name="purchase-radio"]:checked').val() == "sale_attend_no_but_agent"){
		ReturnVal = true;
	}
	return ReturnVal;
}
function agentAttendBreezeUPOnly(){
	ReturnVal = false;
	if($('input[name="breezeup-radio"]:checked').val() == "breezeup_yes_agent" && $('input[name="purchase-radio"]:checked').val() != "sale_attend_no_but_agent"){
		var ReturnVal = true;
	}
	return ReturnVal;
}
function notAgentAttend(){
	var ReturnVal = true;
	if($('input[name="purchase-radio"]:checked').val() == "sale_attend_no_but_agent" || $('input[name="breezeup-radio"]:checked').val() == "breezeup_yes_agent"){
		ReturnVal = false;
	}
	return ReturnVal;
}
function limitTotalSum(){
	var ReturnVal = false;
	if($('input[name="totalsum-radio"]:checked').val() == "yes_limitation"){
		ReturnVal = true;
	}
	return ReturnVal;
}
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

function isXML(xml) {
    try {
        xmlDoc = $.parseXML(xml); //is valid XML
        return true;
    } catch (err) {
        // was not XML
        return false;
    }
}

function changeSubmitButton(on_submit) {
    onSubmit = on_submit;
    if (on_submit) {
        $('.submitloading').show();
    } else {
        $('.submitloading').hide();
    }
}