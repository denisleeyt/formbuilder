import React from 'react';
import styles from "../../css/styles.css";

class WSSBoxRadio extends React.Component {
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
    const labelClass = `radioLabelName ${info.showLabelName == true ? "" : styles.hidden}`;
    const wrapperClass = `inputWrapper rapper${info.id}`;
    const allOptions = info.Options.map((row, k) =>{
      let tempValue = "";
      if(row.value == undefined || row.value == ""){
        tempValue = row.name;
      } else{
        tempValue = row.value;
      }
      return(<div className="custom-controls-stacked" key={k}>
        <div className="custom-control custom-radio">
          <input name={info.id} id={id + "Option" + k} type="radio" className="custom-control-input mainField" value={tempValue} />
          <label htmlFor={id + "Option" + k} className="custom-control-label">{row.name}</label>
        </div>
      </div>)
    }
    );
    return (
      <div className={colClass} id={parentId}>
        <div dangerouslySetInnerHTML={{__html: info.Top}} />
        <div id={id} className="validField" data-valid={JSON.stringify(info.validation)} data-servervalid={JSON.stringify(info.serverValidation)}>
          <div className={labelClass}>{labelName}</div>
          <span className={wrapperClass}>{allOptions}</span>
        </div>
        <div dangerouslySetInnerHTML={{__html: info.Bottom}} />
      </div>
    );
  }
}

export default WSSBoxRadio