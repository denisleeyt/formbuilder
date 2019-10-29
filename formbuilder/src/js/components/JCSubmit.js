import React from 'react';
import styles from "../../css/styles.css";

class JCSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  render() {
    const info = this.props.info;
    const labelName = info.LabelName;
    const id = `item${info.id}`;
    const styleName = `btn-left-align submitBtn ${styles.submitBtn}`;
    const loadingStyle = `fa fa-circle-o-notch fa-spin submitloading ${this.props.formStatus == "submitting" ? styles.on : styles.off}`;
    return (
      <div className={styleName}>
        <div dangerouslySetInnerHTML={{__html: info.Top}} />
        <button type="submit"  className="btn btn-primary submit-btn-text btn_submit" id={id}><span className={loadingStyle}></span>{labelName}</button>
        <div dangerouslySetInnerHTML={{__html: info.Bottom}} />
      </div>
    );
  }
}

export default JCSubmit