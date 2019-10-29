
class FormStand {
  constructor() {
    this.checkEmpty = "if ((isOptional(SelfID)) || VAL) return true; else return false;";
    this.checkIsAlpha = "if ((isOptional(SelfID)) || VAL.match(/^[a-zA-Z]+$/)) return true; else return false;";
    this.checkIsNum = "if ((isOptional(SelfID)) || VAL.match(/^[0-9]+$/) && VAL.length > 0) return true; else return false;";
    this.checkIsChecked = "if ((isOptional(SelfID)) || isChecked(SelfID)) return true; else return false;";
    this.checkSelected = "if ((isOptional(SelfID)) || VAL) return true; else return false;";
    this.checkEnName =  "if ((isOptional(SelfID)) || VAL.match(/^[a-zA-Z\- ',]{1,100}$/)) return true; else return false;";
    this.checkChName =  "if ((isOptional(SelfID)) || VAL.match(/^[\u4e00-\u9fa5]{1,15}$/i)) return true; else return false;";
    this.checkName =  "if ((isOptional(SelfID)) || VAL.match(/^[\u4e00-\u9fa5\a-zA-Z\- ',]{1,100}$/i)) return true; else return false;";
    this.checkEmail =  "if ((isOptional(SelfID)) || ((VAL.indexOf('.@') == -1) && (VAL.indexOf('..') == -1) && VAL.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) && VAL.match(/^[^\\W][a-zA-Z0-9\\_\\-\\.]+([a-zA-Z0-9\\_\\-\\.]+)*\\@[a-zA-Z0-9\\_\\-\\.]+([a-zA-Z0-9]+)[^\\W]*\\.[a-zA-Z]{2,4}$/))) return true; else return false;";
    this.checkHKmobile =  "if ((isOptional(SelfID)) || (VAL.substr(0,1) >= 4 && VAL.substr(0,1) <= 9 && VAL.length == 8) return true; else return false;";
    this.checkHKcontact =  "if((isOptional(SelfID)) || VAL.match(/^(?!-)(?!.*--)[0-9-]+(?<!-)$/) && VAL.length >= 8) return true; else return false;";
    this.checkHKdaytimeContact =  "if((isOptional(SelfID)) || VAL.match(/^(?!-)(?!.*--)[0-9-]+(?<!-)$/) && VAL.length >= 8) return true; else return false;";
    this.checkMobileNo =  "if((isOptional(SelfID)) || VAL.match(/^[0-9\-]+$/) && (VAL.substr(0,1).match(/[0-9]/)) && VAL.length >= 8 && VAL.indexOf('--') == -1) return true; else return false;";
    this.checkContactNo =  "if((isOptional(SelfID)) || VAL.match(/^[0-9\-]+$/) && (VAL.substr(0,1).match(/[0-9]/)) && VAL.length >= 8 && VAL.indexOf('--') == -1) return true; else return false;";
    this.checkDaytimeContactNo =  "if((isOptional(SelfID)) || VAL.match(/^[0-9\-]+$/) && (VAL.substr(0,1).match(/[0-9]/)) && VAL.length >= 8 && VAL.indexOf('--') == -1) return true; else return false;";
    this.checkHKaddress =  "if ((isOptional(SelfID)) || VAL.match(/^[uD805\uDC4D|\uD836\uDE87|[\u002C\u02BB\u060C\u2E32\u2E34\u2E41\u2E49\u3001\uFE10\uFE11\uFE50\uFE51\uFF0C\uFF64\u00B7\u055D\u07F8\u1363\u1802\u1808\uA4FE\uA60D\uA6F5\u02BD\u0312\u0313\u0314\u0315\u0326\u201A\u4e00-\u9fa5\a-zA-Z0-9\- '/,]{1,300}$/i)) return true; else return false;";
    this.checkAddress =  "if ((isOptional(SelfID)) || VAL.match(/^[uD805\uDC4D|\uD836\uDE87|[\u002C\u02BB\u060C\u2E32\u2E34\u2E41\u2E49\u3001\uFE10\uFE11\uFE50\uFE51\uFF0C\uFF64\u00B7\u055D\u07F8\u1363\u1802\u1808\uA4FE\uA60D\uA6F5\u02BD\u0312\u0313\u0314\u0315\u0326\u201A\u4e00-\u9fa5\a-zA-Z0-9\- '/,]{1,300}$/i)) return true; else return false;";
    this.checkDateSelect =  "if ((isOptional(SelfID)) || isValidDate(VAL,SelfID)) return true; else return false;";
  }
  onValid(id, express, msg) {
      $('#' + id).validate({
        expression: express,
        message: msg
      });
  }
}

export default (new FormStand);