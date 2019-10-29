import Config from "../resource/Config";
class DataHandler {
    constructor() {
        this.formId = "validateForm";
    }

    getFormData(formId) {
        var unindexed_array = $("#" + formId + " .mainField").serializeArray();
        return unindexed_array;
    }
    filterData() {
        let postValues = {};
        //postValues['sessionID'] = $("#u_gid").html();
        postValues['sessionID'] = $("#u_gid").html();
        postValues["captcha"] = $("#Captcha").val().toUpperCase();
        $(".mainField").each(function (k, v) {
            if ($(v).attr("data-servervalid") != undefined && $(v).attr("data-servervalid") != "") {
                $(JSON.parse($(v).attr("data-servervalid"))).each(function (i, j) {
                    postValues[$(v).attr("name")] = j.type + "__" + $(v).val();
                })
            }
        })
        postValues["mode"] = Config.addMode;
        const data = this.getFormData(this.formId);
        const filterObjectData = this.filterFormObjectData(data);
        postValues["formContent"] = encodeURIComponent(JSON.stringify(filterObjectData));
        return postValues;
        //console.log(JSON.stringify(data));
    }
    filterEmail(data, refID) {
        let postValues = {};
        postValues["mode"] = "email";
        postValues["mailLang"] = Config.lang;
        postValues["refID"] = refID;

        let emailContent = Config.emailTemplate;
        let tempKey = "";
        for (let key in data) {
            tempKey = "{" + key + "}";
            emailContent = emailContent.replace(tempKey, encodeURIComponent(data[key]));
        }
        postValues["emailContent"] = emailContent;
        return postValues;
    }
    filterFormObjectData(data) {
        var newObj = {};
        var i = "";
        for (i in data) {
            var item = data[i];
            if (newObj[item.name] === undefined) {
                newObj[item.name] = item.value;
            } else {
                newObj[item.name] += "," + item.value;
            }

        }
        return newObj;
    }
     htmlReplacement(data) {
        const escapeMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        };
        let value = "";
        value = String(data).replace(/[&<>"'\/]/g, function (s) {
            return escapeMap[s];
        });
        return value;
      }
}

export default (new DataHandler);