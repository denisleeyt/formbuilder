var lockReload = false;
var submitted = false;
var dataContent = "";

function DB(Record) {
    this.record = Record;
}


function getQueryStringValue(key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

DB.prototype = {
    constructor: DB,
    submitData: function (jsonString, db, callback) {
        db.submitForm(jsonString, db, callback);
    },
    submitForm: function (jsonString, db, callback) {
        var postValues = {};
        var dataValues = "";
        try {
            dataValues = JSON.parse(jsonString);
        } catch (e) {
            return;
        }
        dataValues = sortObject(dataValues);
        var countData = Object.keys(dataValues).length;
        var i = 0;
        postValues['insertContent'] = {};
        postValues['insertContent']['sessionID'] = $("#u_gid").html();
        postValues['insertContent']['captcha'] = $("#v_captcha").val().toUpperCase();
        postValues['insertContent']['Name'] = $(".mainField[data-key='data3']").val();
        postValues['insertContent']['mobile'] = $(".mainField[data-key='data6']").val();

		postValues['insertContent']['agentname'] = encodeURI($('#agentname').val());
		postValues['insertContent']['agentaddress'] = encodeURI($('#agentaddress').val());
		postValues['insertContent']['agenttel'] = encodeURI($('#agenttel').val());
		postValues['insertContent']['agentbusinessno'] = encodeURI($('#agentbusinessno').val());
		postValues['insertContent']['agentfax'] = encodeURI($('#agentfax').val());
		
        $.each(dataValues, function (key, value) {
            postValues['insertContent'][i] = {}
            postValues["insertContent"][i][0] = key
            postValues["insertContent"][i][1] = value
            i++;
        });
        postValues["insertCount"] = countData;
        postValues["mode"] = addMode;
        dataContent = postValues["insertContent"];
        $.ajax({
            url: 'include/db-submit.aspx',
            data: postValues,
            type: "POST",
            dataType: 'text',
            success: function (msg) {
                callback(msg);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                callback("error");
            }
        });
    }
}

function Record() { }
Record.prototype = {
    constructor: Record,
    mainRecord: {},
    initData: function (formRecord) {
        var skipArray = [];
        var radioArray = [];
        var checkboxArray = [];
		var dataRadioVal;
        $("#validateForm .mainField").each(function (k, v) {
            if ($.inArray($(v).attr("data-key"), skipArray) == -1 && $.inArray($(v).attr("data-key"), radioArray) == -1 && $.inArray($(v).attr("data-key"), checkboxArray) == -1) {
                if ($(v).attr("type") == "radio") {
					if($("input[name='" + $(v).attr("name") + "']:checked").val() == undefined || $("input[name='" + $(v).attr("name") + "']:checked").val() == null){
						dataRadioVal = "N/A";
					}else{
						dataRadioVal = $("input[name='" + $(v).attr("name") + "']:checked").val();						
					}
                    formRecord.mainRecord[$(v).attr("data-key")] = dataRadioVal;
                    radioArray.push($(v).attr("data-key"));
                } else if ($(v).attr("type") == "checkbox") {
                    if ($("input[type='checkbox'][name='" + $(v).attr("name") + "']:checked").length == 0) {
                        formRecord.mainRecord[$(v).attr("data-key")] = false;
                    } else {
                        formRecord.mainRecord[$(v).attr("data-key")] = true;
                    }
                    checkboxArray.push($(v).attr("data-key"));
                } else if ($("#validateForm .mainField[data-key='" + $(v).attr("data-key") + "']").length < 2) {
                    formRecord.mainRecord[$(v).attr("data-key")] = $(v).val();
                } else {
                    $("#validateForm .mainField[data-key='" + $(v).attr("data-key") + "']").each(function (i, j) {
                        if (i == 0) {
                            formRecord.mainRecord[$(j).attr("data-key")] = $(j).val();
                        } else {
                            formRecord.mainRecord[$(j).attr("data-key")] = formRecord.mainRecord[$(j).attr("data-key")] + "__" + $(j).val();
                        }
                    })
                }
                skipArray.push($(v).attr("data-key"));
            }

        })
        formRecord.mainRecord = sortObject(formRecord.mainRecord);

    }
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

function sortObject(myObj) {

    keys = [];
    var k = i = len = "";
    var newMyObj = {};

    for (k in myObj) {
        if (myObj.hasOwnProperty(k)) {
            keys.push(k);
        }
    }
    keys.sort(function (a, b) { return parseInt(a.replace("data", "")) - parseInt(b.replace("data", "")) })

    len = keys.length;

    for (i = 0; i < len; i++) {
        k = keys[i];
        newMyObj[k] = myObj[k];
    }

    return newMyObj;
}