import Config from "../resource/Config";
import SendEmail from "./SendEmail";
class DBSubmit {
    constructor() {

    }
    onSubmit(data) {
        var formBody = [];
        for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('include/SubmitHandle.aspx', {
            method: 'POST',
            body: formBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
            .then((res) => {
                return res.text();
            })
            //.then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
            .then(response => {
                if (JSON.parse(response).RecordID) {
                    if (Config.enableEmail == "true") {
                        const emailCotent = JSON.parse(decodeURIComponent(JSON.parse(response).RecordRespone));
                        SendEmail.onEmail(emailCotent, JSON.parse(response).RecordID);
                    } else {
                        setTimeout(() => { window.location.href = Config.lang + "-thankyou.aspx"; }, 1000)
                    }
                    return;
                } else {
                    alert("Submit error!");
                }

            })
            .catch(err => {
                console.log(err);
                console.log("sorry, there are no results for your search");
            });
    }
}

export default (new DBSubmit);