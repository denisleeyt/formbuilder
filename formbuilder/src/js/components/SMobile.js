import React from 'react';
import styles from "../../css/styles.css";
import Config from "../resource/Config";

class SMobile extends React.Component {
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
    const maxlength = 8;
    const labelClass = `col-form-label ${info.showLabelName == true ? "" : styles.hidden}`;
    const wrapperClass = `inputWrapper rapper${info.id}`;
    const validation = this.defineValidation();
    return (
      <div htmlFor={id} className={colClass} id={parentId}>
        <div dangerouslySetInnerHTML={{__html: info.top}} />
        <span className={labelClass}>{labelName}</span>
        <span className={wrapperClass}><input id={id} name={info.id} type="text" className="mainField validField form-control" data-valid={JSON.stringify(validation)} data-servervalid="" autoComplete="off" maxLength={maxlength}/></span>
        <div dangerouslySetInnerHTML={{__html: info.bottom}} />
      </div>
    );
  }

  defineValidation() {
    var validation = [{
      "type":"checkEmpty",
      "enValidMsg":"Please enter Hong Kong mobile number",
      "chValidMsg":"請輸入香港手提電話號碼"
    },
    {
      "type":"checkHKmobile",
      "enValidMsg":"Please enter a valid Hong Kong mobile number",
      "chValidMsg":"請輸入有效的香港手提電話號碼"
    }]

    var validName = "";

    if(Config.lang == "en"){
      validName = "enValidMsg";
    }else{
      validName = "chValidMsg";
    }
    validation.map((value, i) => {
      value.validMsg = value[validName];
    }
    )

    return validation;
  }
}

export default SMobile