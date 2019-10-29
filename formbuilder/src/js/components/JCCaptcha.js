import React from 'react';
import Config from "../resource/Config";
import styles from "../../css/styles.css";

class JCCaptcha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: this.props.info,
      validation: this.props.info.validation, //normal , error
      guid: Config.guid,
      captchaSrc: "",
      reload: false
    };
    this.handleCapReload = this.handleCapReload.bind(this);
  }
  render() {
    const info = this.props.info;
    const colClass = `col-sm-12 col-md-${info.width} col-lg-${info.width} ${styles.captchaInputDiv}`;
    const labelName = info.LabelName;
    const captchaClass = `form-control ${styles.captcha} validField`;
    const labelClass = `col-form-label ${info.showLabelName == true ? "" : styles.hidden}`;
    const wrapperClass = `inputWrapper rapper${info.id}`;
    const validation = this.defineValidation();
    return (
      <div id="captchaInputDiv" htmlFor="verify-code" className={colClass}>
        <div id="u_gid" className={styles.u_gid}>{this.state.guid}</div>
        <div className={styles.captchaSecondLayer}>
          <div className="captchaLabelName">{info.labelName}</div>
          <div className={styles.capImg}> <img id="capImg" src={this.state.captchaSrc} /> </div>
          <div className="reload-btn-pos">
            <div id="capReload" className="reload-btn" onClick={this.handleCapReload}><i className="fa fa-refresh" aria-hidden="true"></i></div>
          </div>
          <div className={styles.clearBoth}></div>
        </div>
        <span className={labelClass}>{labelName}</span> <br />
        <span className={wrapperClass}><input type="text" maxLength="8" autoComplete="off" name="Captcha" id="Captcha" data-valid={JSON.stringify(validation)} className={captchaClass} /></span>
      </div>
    );
  }

  componentDidMount() {
    let nowDate = new Date();
    this.setState(() => ({
      captchaSrc: `/common/lib/captcha.ashx?${nowDate.getTime()}&guid=${this.state.guid}`
    }));

  }

  handleCapReload() {
    if (this.state.reload == false) {
      this.setState(() => ({
        reload: true
      }));
      fetch("/common/lib/guidgen.aspx", {
        method: 'GET'
      })
        .then((res) => {
          return res.text();
        })
        .then(res => this.setState(() => ({
          guid: res,
          captchaSrc: `/common/lib/captcha.ashx?${new Date().getTime()}&guid=${res}`,
          reload: false
        }))
        ).catch(err => {
          console.log(err);
          console.log("sorry, there are no results for your search");
      });
    }
  }

  defineValidation() {
    var validation = [{
      "type":"checkEmpty",
      "enValidMsg":"Please enter verification code",
      "chValidMsg":"請輸入驗證碼"
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

export default JCCaptcha