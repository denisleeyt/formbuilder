import React from 'react';
import styles from "../../css/styles.css";
import { Textbox } from 'react-inputs-validation';

class WSSDatePicker extends React.Component {
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
        const wrapperClass = `datetimepickerWrapper inputWrapper rapper${info.id}`;
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
                        className: "mainField validField form-control datetimepicker-input",
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
                    onFocus={e => {
                        handleFormState(id, e.target.value, "value");
                    }}
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
                        $('#item' + this.state.info.id).parent().addClass("input-group date");
                    }
                    }

                />
                <div dangerouslySetInnerHTML={{ __html: info.Bottom }} />
            </div>
        );
    }

    componentDidMount() {
        /*$('.input-group-append').bind('click', function() { 
            $(this).prev("input").trigger("blur");
        });
        $('.input-group-append').prev('input').bind('input',function(){
            $(this).trigger('blur');
        })*/
        $('#item' + this.state.info.id).parent().append('<div class="input-group-append" data-target="#datetimepicker' + this.state.info.id + '" data-toggle="datetimepicker"><div class="input-group-text"><i class="fa fa-calendar"></i></div></div>');
        $('#item' + this.state.info.id).parent().addClass("input-group date");
        $('#item' + this.state.info.id).attr("data-target", "#datetimepicker" + this.state.info.id);
        $('#item' + this.state.info.id).parent().attr("id", "datetimepicker" + this.state.info.id).attr("data-target-input", "nearest");
        $('#item' + this.state.info.id).parent().datetimepicker({
            format: 'L'
        });
    }
}

export default WSSDatePicker