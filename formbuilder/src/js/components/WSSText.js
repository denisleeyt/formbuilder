import React from 'react';
import styles from "../../css/styles.css";
import { Textbox } from 'react-inputs-validation';

class WSSText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: this.props.info,
            validation: this.props.info.validation //normal , error
        };
    }
    render() {
        const info = this.props.info;
        const colClass = `col-sm-12 col-md-${info.width} col-lg-${info.width} form-group-margin-bottom`;
        const labelName = info.LabelName;
        const parentId = `parent${info.id}`;
        const id = `item${info.id}`;
        const maxlength = info.maxlength;
        const labelClass = `col-form-label ${info.showLabelName == true ? "" : styles.hidden}`;
        const wrapperClass = `inputWrapper rapper${info.id}`;
        let required = false;
        let check = false;
        let mandatoryMsg = "";
        let validPatten = "";
        let validMsg = "";
        const handleFormState = this.props.handleFormState;
        let value = this.props.allValue[`item${info.id}`];
        let validate = this.props.validate;
        info.validation.map((valid, i) => {
            if (valid.type == "checkEmpty") {
                required = true;
                check = true;
                mandatoryMsg = valid.ValidMsg;
            } else if (valid.type == "checkIsChecked") {
                required = true;
                check = true;
                mandatoryMsg = valid.ValidMsg;
            } else {
                validPatten = valid.type;
                validMsg = valid.ValidMsg;
            }
        })
        return (
            <div htmlFor={id} className={colClass} id={parentId}>
                <div dangerouslySetInnerHTML={{ __html: info.Top }} />
                <div className={labelClass}>{labelName}</div>
                <Textbox
                    attributesWrapper={{
                        className: wrapperClass,
                        id: "datepicker" + info.id
                    }}
                    attributesInput={{ // Optional.
                        id: id,
                        className: "mainField validField form-control",
                        name: info.id,
                        maxLength: maxlength,
                        type: 'text',
                        autoComplete: "off"
                    }}
                    validationOption={{
                        name: labelName,
                        required: required,
                        check: check,
                        msgOnError: mandatoryMsg,
                        reg: validPatten,
                        regMsg: validMsg
                    }}
                    value={value}
                    onChange={(name, e) => {
                        handleFormState(id, name, "value");
                    }}
                    onBlur={e => {
                        console.log(e);
                        //handleFormState(id, e.target.value, "value");
                    }}
                    validate={validate}
                    validationCallback={res => {
                        handleFormState(id, res, "error");
                        handleFormState('validate', false);
                    }
                    }

                />
                <div dangerouslySetInnerHTML={{ __html: info.Bottom }} />
            </div>
        );
    }
}

export default WSSText