import React from 'react';
import styles from "../../css/styles.css";

class JCTextarea extends React.Component {
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
    const textCols = info.others.textCols;
    const textRows = info.others.textRows;
    const labelClass = `col-form-label ${info.showLabelName == true ? "" : styles.hidden}`;
    const wrapperClass = `inputWrapper rapper${info.id}`;
    return (
      <div htmlFor={id} className={colClass} id={parentId}>
        <div dangerouslySetInnerHTML={{ __html: info.top }} />
        <span className={labelClass}>{labelName}</span>
        <span className={wrapperClass}><textarea id={id} name={info.id} className="mainField validField form-control" data-valid={JSON.stringify(info.validation)} data-servervalid={JSON.stringify(info.serverValidation)} autoComplete="off" maxLength={maxlength} rows={textRows} cols={textCols}>
        </textarea></span>
        <div dangerouslySetInnerHTML={{ __html: info.bottom }} />
      </div>
    );
  }
}

export default JCTextarea