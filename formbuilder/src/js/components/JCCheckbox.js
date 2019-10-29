import React from 'react';
import styles from "../../css/styles.css";

class JCRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: this.props.info,
      validation: this.props.info.validation //normal , error
    };
  }
  render() {
    const info = this.props.info;
    const colClass = `col-sm-12 col-md-${info.width} col-lg-${info.width}`;
    const labelName = info.LabelName;
    const parentId = `parent${info.id}`;
    const id = `item${info.id}`;
    const labelClass = `checkBoxLabelName ${info.showLabelName == true ? "" : styles.hidden}`;
    const wrapperClass = `inputWrapper rapper${info.id}`;
    const allCheckboxes = info.Options.map((row, k) => {
      let tempValue = "";
      if (row.value == undefined || row.value == "") {
        tempValue = row.name;
      } else {
        tempValue = row.value;
      }
      return (
        <div className="custom-control custom-checkbox" key={k}>
          <input name={info.id} id={id + "Checkbox" + k} type="checkbox" className="custom-control-input mainField" value={tempValue} />
          <label htmlFor={id + "Checkbox" + k} className="custom-control-label">{row.name}</label>
        </div>)
    }

    );
    return (
      <div className={colClass} id={parentId}>
        <div dangerouslySetInnerHTML={{ __html: info.Top }} />
        <div className="important-box">
          <div id= {id} className="custom-controls-stacked validField" data-valid={JSON.stringify(info.validation)} data-servervalid={JSON.stringify(info.serverValidation)}>
            <div className={labelClass}>{labelName}</div>
            <span className={wrapperClass}>{allCheckboxes}</span>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: info.Bottom }} />
      </div>
    );
  }
}

export default JCRadio