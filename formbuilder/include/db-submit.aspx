<!--#include virtual="/common/lib/db_module.aspx" -->
<!--#include virtual="./db-config.aspx" -->
<script runat="server" language="C#">
        public string outputString = "";

    void Page_Load(Object Sender, EventArgs e){

        string mode = protectHtmlXmlCodes(Request.Form["mode"]);
        bool checkFail = false;
        string status = "200";
        string useTable = "";
        string useTable2 = "";
        string sessionID = protectHtmlXmlCodes(Request.Form["sessionID"]);
        string captcha = protectHtmlXmlCodes(Request.Form["captcha"]);
        string[] specific = new string[specificArray.Length];
        string formData = protectHtmlXmlCodes(Request.Form["formContent"]);
        for (int index = 0; index < specificArray.Length; index++) {
            specific[index] = protectHtmlXmlCodes(Request.Form[specificArray[index]]);
        }
        //regEx declaration
        Regex regEngName = new Regex("^[a-zA-Z\' ,-]{1,100}$");
        Regex regChiName = new Regex("^[\u4e00-\u9fa5]{1,15}$");
        Regex regBirth = new Regex("^[0-9]{2}-[0-9]{4}$");
        Regex regHeight = new Regex("^[0-9]{2,3}([.][0-9]{1,3})?$");
        Regex regWeight = new Regex("^[0-9]{2,3}([.][0-9]{1,3})?$");
        Regex regMobile = new Regex("^[0-9]{8}$");
        Regex regEmail = new Regex("^[^\\W][a-zA-Z0-9_\\-\\.]+([a-zA-Z0-9_\\-\\.]+)*\\@[a-zA-Z0-9_\\-\\.]+([a-zA-Z0-9]+)[^\\W]*\\.[a-zA-Z]{2,4}$");

        for (int index = 0; index < specific.Length; index++) {
            string[] dataArray = specific[index].Split(new string[] { "__" }, StringSplitOptions.None);
            switch (dataArray[1]) {
                case "checkEmpty":
                    if (dataArray[0] == "") {
                        checkFail = true;
                    }
                    break;
                case "checkEnName":
                    if (!regEngName.Match(dataArray[0]).Success) {
                        checkFail = true;
                    }
                    break;
                default:
                    break;
            }
        }

        if (checkFail) {
            this.outputString += jsonInsert("Error", "True");
            status = "500";
        }
        if (status == "500") {
            this.outputString = "{\"Status\": \"" + status + "\"" + this.outputString + "}";
            return;
        }

        switch (mode) {
            case "insert":
                //this.outputString = DB_captcha(sessionID, captcha);
                if (this.outputString == "false") {
                    this.outputString = "step1_" + this.outputString;
                } else {
                    useTable = "tablePii";
                    this.outputString = "0";

                    if (this.outputString != "0") {
                        this.outputString = "step2_" + this.outputString;
                    } else {

                        string[] oneFieldMappings = new string[mainActiveArray.Length];
                        for (int firstRun = 0; firstRun < mainActiveArray.Length; firstRun++)
                        {
                            oneFieldMappings[firstRun] = pColumn[Int32.Parse(mainActiveArray[firstRun]) - 1];
                        }
                        string[,] onePostData = new string[oneFieldMappings.Length, 2];
                        for (int i = 0; i < oneFieldMappings.Length ; i++) {
                            if(i < oneFieldMappings.Length - 1){
                            this.outputString += oneFieldMappings[i] + "<br />";
                            this.outputString += specific[i] + "<br />";
                            onePostData[i, 0] = oneFieldMappings[i];
                            onePostData[i, 1] = specific[i];
                            }else{
                            this.outputString += oneFieldMappings[i] + "<br />";
                            this.outputString += formData + "<br />";
                            onePostData[i, 0] = oneFieldMappings[i];
                            onePostData[i, 1] = formData;
                            }
                        }
                        //this.outputString = onePostData[0, 0] ;
                        if(!XmlCharacterDetection(this.outputString)){
                            status = "500";
                            this.outputString = "{\"Status\": \"" + status + "\"" + jsonInsert("Error", "True") + "}";
                            return;
                        }
                        
                        //return;
                        DB_captcha_insert(sessionID, captcha);
                        XmlDocument oneGenXML = xmlForInsert(projectName, onePostData, useTable);
                        string respondXML = DB_insert(encodeXMLObj(oneGenXML), useTable);
                        XmlDocument xdoc = new XmlDocument();
                        xdoc.LoadXml(respondXML);
                        XmlNodeList elemList1 = xdoc.GetElementsByTagName("RecordID");
                        XmlNodeList elemList2 = xdoc.GetElementsByTagName("CreateTime");
                        XmlNodeList elemList3 = xdoc.GetElementsByTagName("LGeneric");
                        string RecordID = elemList1[0].InnerText;
                        string RecordTIME = elemList2[0].InnerText;
                        string LGeneric = elemList3[0].InnerText;
                        if(enableEmail == "true"){
                            this.outputString = "{\"RecordID\": " + RecordID + ", \"RecordTIME\": \"" + RecordTIME +"\", \"RecordRespone\": \""+ LGeneric + "\"}";
                        }else{
                            this.outputString = "{\"RecordID\": " + RecordID + ", \"RecordTIME\": \"" + RecordTIME + "\"}";
                        }
                        //this.outputString = "{\"RecordID\": " + RecordID + ", \"RecordTIME\": \"" + RecordTIME + "\"}";
                    }
                }
                break;
            default:
                break;
        }
    }  
        public static bool XmlCharacterDetection(string in_string)
    {
        if (in_string == null) {
            return false;
        }
        bool output = true;
        char ch;

        for (int i = 0; i < in_string.Length; i++ ) {
            ch = in_string[i];
            if (!((ch >= 0x0020 && ch <= 0xD7FF) ||
                (ch >= 0xE000 && ch <= 0xFFFD) ||
                ch == 0x0009 ||
                ch == 0x000A ||
                ch == 0x000D)) {
                output = false;
            }
        }
        return output;
    }
        
        public string jsonInsert(string strItem, string strValue)
    {
        string content = "";
        if (strItem != null && strValue != null) {
            content = ", \"" + strItem + "\": \"" + strValue + "\"";
        }

        return content;
    }

</script>
<%=this.outputString%>