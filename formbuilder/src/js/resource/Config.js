class Config {
    constructor() {
      this.lang = PageLang;
      this.guid = serverGuid;
      this.addMode = "insert";
      this.enableEmail = enableEmail;
      this.emailTemplate = "";
      //this.waSumitCode = waSumitCode;
    }
  }
  
  export default (new Config);