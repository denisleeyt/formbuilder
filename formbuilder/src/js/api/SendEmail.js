import Config from "../resource/Config";
import DataHandler from "./DataHandler";
class SendEmail {
    constructor() {

    }
    onEmail(data, RecordID) {
        var emailContent = DataHandler.filterEmail(data, RecordID);
        var emailBody = [];
        for (var property in emailContent) {
            var encodedKey = property;
            var encodedValue = emailContent[property];
            emailBody.push(encodedKey + "=" + encodedValue);
        }
        emailBody = emailBody.join("&");
        fetch('include/email-submit.aspx', {
            method: 'POST',
            body: emailBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
            .then((res) => {
                return res.text();
            })
            //.then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
            .then(response => {
                console.log(response);
                //setTimeout(() => { window.location.href = Config.lang + "-thankyou.aspx"; }, 1000)
                return;
            })
            .catch(err => {
                console.log(err);
                console.log("sorry, there are no results for your search");
            });
    }
}

export default (new SendEmail);