import React from 'react';
import JCText from "./JCText";
import JCSubmit from "./JCSubmit";
import JCRadio from "./JCRadio";
import JCCheckbox from "./JCCheckbox";
import JCTextarea from "./JCTextarea";
import JCCaptcha from "./JCCaptcha";
import JCFreehtml from "./JCFreehtml";
import WSSText from "./WSSText.js";
import WSSDatePicker from "./WSSDatePicker.js";

class Factory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: this.props.info
        };
    }
    switchStatement(type) {
        let submit = 1;
        let captcha = 1;
        switch (type) {
            case "WSSDatePicker":
                return <WSSDatePicker info={this.state.info} handleFormState={this.props.handleFormState} validate={this.props.validate} allValue={this.props.allValue} />
            case "WSSText":
                return <WSSText info={this.state.info} handleFormState={this.props.handleFormState} validate={this.props.validate} allValue={this.props.allValue} />
            case "JCText":
                return <JCText info={this.state.info} />
            case "JCRadio":
                return <JCRadio info={this.state.info} />
            case "JCCheckbox":
                return <JCCheckbox info={this.state.info} />
            case "JCTextarea":
                return <JCTextarea info={this.state.info} />
            case "JCFreehtml":
                return <JCFreehtml info={this.state.info} />
            case "JCSubmit":
                if (submit == 1) {
                    submit++;
                    return <JCSubmit info={this.state.info} formStatus={this.props.formStatus} />
                } else {
                    return "";
                }
            case "JCCaptcha":
                if (captcha == 1) {
                    captcha++;
                    return <JCCaptcha info={this.state.info} />
                } else {
                    return "";
                }

            default:
                return <JCText info={this.state.info} />

        }
    }
    render() {
        const Tag = this.props.info.type;
        return (<React.Fragment>
            {this.switchStatement(Tag)}
        </React.Fragment>);
    }
}

export default Factory