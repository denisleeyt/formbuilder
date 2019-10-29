import React from 'react';
import styles from "../../css/styles.css";

class JCText extends React.Component {
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
    return (
      <div htmlFor={id} className={colClass} id={parentId}>
        <div dangerouslySetInnerHTML={{__html: info.Top}} />
        <span className={labelClass}>{labelName}</span>
        <span className={wrapperClass}><input id={id} name={info.id} type="text" className="mainField validField form-control" data-valid={JSON.stringify(info.validation)} data-servervalid={JSON.stringify(info.serverValidation)} autoComplete="off" maxLength={maxlength}/></span>
        <div dangerouslySetInnerHTML={{__html: info.Bottom}} />
      </div>
    );
  }
}

export default JCText