<!--#include virtual="/common/lib/db_module.aspx" -->
<!--#include virtual="db-config.aspx" -->
<script runat="server" language="C#">
    public string outputString = "";
    
    void Page_Load(Object Sender, EventArgs e){     
        string mode = protectHtmlXmlCodes(Request.Form["mode"]);        

        string useTable = "";
        string useTable2 = "";      
        string insertKey = "insertContent";
        string sessionID = protectHtmlXmlCodes(Request.Form["insertContent[sessionID]"]);
        string captcha = protectHtmlXmlCodes(Request.Form["insertContent[captcha]"]);
        string Name = protectHtmlXmlCodes(Request.Form["insertContent[Name]"]);
        string Mobile = protectHtmlXmlCodes(Request.Form["insertContent[Mobile]"]);
        
        string dateString =  protectHtmlXmlCodes(Request.Form["dateString"]);
        string startAt =  protectHtmlXmlCodes(Request.Form["start_at"]);
        string EndAt =  protectHtmlXmlCodes(Request.Form["end_at"]);
        string customQuery = "";
        string customSort = "{'$asc':'RecordID'}";    

        switch (mode) {            
            case "openOne":
                useTable = "tablePii";
                useTable2 = "tableGen";
                
                
                
                if(dateString == ""){
                    customQuery = "{'CreateTime': {'$bt': ['" + startAt + "000000', '" + EndAt + "235959'] }} ";
                }else{
                    customQuery = "{'CreateTime': {'$bt': ['" + dateString + "000000', '" + dateString + "235959'] }} ";
                }
                              
                
                this.outputString = "<result>"+DB_select(projectName, customQuery, customSort, useTable)+"</result>";
                break;
            case "openTwo":
                useTable = "tablePii";
                useTable2 = "tableGen";
                
				
				if(dateString == ""){
					customQuery = "{'CreateTime': {'$bt': ['" + startAt + "000000', '" + EndAt + "235959'] }} ";
				}else{
					customQuery = "{'CreateTime': {'$bt': ['" + dateString + "000000', '" + dateString + "235959'] }} ";
				}
                         
                
                this.outputString = "<result>"+DB_select(projectName, customQuery, customSort, useTable)+DB_select(projectName, customQuery, customSort, useTable2)+"</result>";
				//this.outputString = DB_select(projectName, customQuery, customSort, useTable);
				//this.outputString = DB_select(projectName, customQuery, customSort, useTable2);
                break;
            case "openPii":
                useTable = "tablePii";

                string dateStringPii = protectHtmlXmlCodes(Request.Form["dateString"]);
                string startAtPii = protectHtmlXmlCodes(Request.Form["start_at"]);
                string EndAtPii = protectHtmlXmlCodes(Request.Form["end_at"]);
                string customQueryPii = "";

                if (dateStringPii == "") {
                    customQueryPii = "{'CreateTime': {'$bt': ['" + startAtPii + "000000', '" + EndAtPii + "235959'] }} ";
                } else {
                    customQueryPii = "{'CreateTime': {'$bt': ['" + dateStringPii + "000000', '" + dateStringPii + "235959'] }} ";
                }
                string customSortPii = "{'$asc':'RecordID'}";

                this.outputString = DB_select(projectName, customQueryPii, customSortPii, useTable);

                break;
            case "openGen":
                useTable = "tableGen";

                string dateStringGen = protectHtmlXmlCodes(Request.Form["dateString"]);
                string startAtGen = protectHtmlXmlCodes(Request.Form["start_at"]);
                string EndAtGen = protectHtmlXmlCodes(Request.Form["end_at"]);
                string customQueryGen = "";

                if (dateStringGen == "") {
                    customQueryGen = "{'CreateTime': {'$bt': ['" + startAtGen + "000000', '" + EndAtGen + "235959'] }} ";
                } else {
                    customQueryGen = "{'CreateTime': {'$bt': ['" + dateStringGen + "000000', '" + dateStringGen + "235959'] }} ";
                }
                string customSortGen = "{'$asc':'RecordID'}";

                this.outputString = DB_select(projectName, customQueryGen, customSortGen, useTable);

                break;
			case "openTwoAll":
                useTable = "tablePii";
                useTable2 = "tableGen";
                
				customQuery = "";
				customSort = "{'$asc':'RecordID'}";
                
                this.outputString = "<result>"+DB_select(projectName,customQuery,customSort, useTable)+DB_select(projectName,customQuery ,customSort, useTable2)+"</result>";
                //this.outputString = DB_select(projectName,customQuery ,customSort, useTable2);
				break;
            case "addOne":   
                 this.outputString = DB_captcha(sessionID, captcha);      
                if(this.outputString == "false"){
                    this.outputString = "step1_" + this.outputString;
                }else{
                useTable = "tablePii";  
                this.outputString = "0";
                   
                if(this.outputString != "0"){
                    this.outputString = "step2_" + this.outputString;
                }else{
                
                string[] oneFieldMappings = new string[mainActiveArray.Length];   
                for (int firstRun = 0; firstRun < mainActiveArray.Length; firstRun++)
                {
                    oneFieldMappings[firstRun] = pColumn[Int32.Parse(mainActiveArray[firstRun]) - 1];
                }                                           
                string[,] onePostData = new string[oneFieldMappings.Length,2];
                insertKey = "insertContent";
                for (int i = 0; i < oneFieldMappings.Length ; i++) {
                    string insertValueTemp = insertKey + "[" + i + "][1]";
                    onePostData[i,0] = oneFieldMappings[i];
                    onePostData[i,1] = protectHtmlXmlCodes(Request.Form[insertValueTemp]);
                }                               
                XmlDocument oneGenXML = xmlForInsert(projectName, onePostData, useTable);
                this.outputString = DB_insert(encodeXMLObj(oneGenXML), useTable);
                }
                }
                break;
            case "addTwo":  
                this.outputString = DB_captcha(sessionID, captcha);      
                if(this.outputString == "false"){
                    this.outputString = "step1_" + this.outputString;
                }else{
                useTable = "tablePii";  
                this.outputString = "0";                
                
                if(this.outputString != "0"){
                    this.outputString = "step2_" + this.outputString;
                }else{
                   
                string[] fieldMappings = new string[mainActiveArray.Length];   
                for (int firstRun = 0; firstRun < mainActiveArray.Length; firstRun++)
                {
                    fieldMappings[firstRun] = pColumn[Int32.Parse(mainActiveArray[firstRun]) - 1];
                }                                           
                string[,] postData = new string[fieldMappings.Length,2];
                insertKey = "insertContent";
                for (int i = 0; i < fieldMappings.Length ; i++) {
                    string insertValueTemp = insertKey + "[" + i + "][1]";
                    postData[i,0] = fieldMappings[i];
                    postData[i,1] = protectHtmlXmlCodes(Request.Form[insertValueTemp]);
                }                               
                XmlDocument genXML = xmlForInsert(projectName, postData, useTable);
                //this.outputString = DB_insert(encodeXMLObj(genXML), useTable);
                
                
                string respondXML = DB_insert(encodeXMLObj(genXML), useTable);
                XmlDocument xdoc = new XmlDocument();
                xdoc.LoadXml(respondXML);
                XmlNodeList elemList = xdoc.GetElementsByTagName("RecordID");  
                string insertedId = elemList[0].InnerText;
                
                
                useTable = "tableGen";
                string[] fieldMappings2 = new string[genActiveArray.Length]; 
                for (int secondRun = 0; secondRun < genActiveArray.Length; secondRun++)
                {
                    fieldMappings2[secondRun] = pColumn[Int32.Parse(genActiveArray[secondRun]) - 1];
                }  
                string[,] postData2 = new string[fieldMappings2.Length,2];
                insertKey = "insertContent";            
                for (int i = 0; i < fieldMappings2.Length ; i++) {
                    string insertValueTemp2 = insertKey + "[" + (i+fieldMappings2.Length-1) + "][1]";
                    postData2[i,0] = fieldMappings2[i];
                    postData2[i,1] = protectHtmlXmlCodes(Request.Form[insertValueTemp2]);
                    if (i == 0) {
                        postData2[i,0] = fieldMappings2[i];
                        postData2[i,1] = insertedId;                    
                    }
                }
                
                XmlDocument genXML2 = xmlForInsert(projectName, postData2, useTable);               
                this.outputString = DB_insert(encodeXMLObj(genXML2), useTable);

                }

                }
                break; 
             case "addTimeOne":   
                 this.outputString = DB_captcha(sessionID, captcha);      
                if(this.outputString == "false"){
                    this.outputString = "step1_" + this.outputString;
                }else{
                useTable = "tablePii";  
                Int32 unixTimestamp = (Int32)(DateTime.Now.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
                System.DateTime dateTimeNow = new System.DateTime(1970, 1, 1, 0, 0, 0, 0);
                dateTimeNow = dateTimeNow.AddSeconds(unixTimestamp);
                string dateTimeNowString = dateTimeNow.ToString("yyyyMMddHHmmss");
                unixTimestamp -= 86400;  // 24 hours before now
                System.DateTime dateTimePast = new System.DateTime(1970, 1, 1, 0, 0, 0, 0);
                dateTimePast = dateTimePast.AddSeconds(unixTimestamp);
                string dateTimePastString = dateTimePast.ToString("yyyyMMddHHmmss");
                
                this.outputString = DB_count("{'$and' : [ {'NameEN' : '" + Name + "'}, {'Mobile' : '" + Mobile + "'}, {'ProjectName':'" + projectName + "'}, {'$and':  [ { 'CreateTime': {'$lt' : " + dateTimeNowString + "} }, { 'CreateTime': {'$gt': " + dateTimePastString + " } } ] } ]}",useTable);                
                
                if(this.outputString != "0"){
                    this.outputString = "step2_" + this.outputString;
                }else{
                
                string[] oneFieldMappings = new string[mainActiveArray.Length];   
                for (int firstRun = 0; firstRun < mainActiveArray.Length; firstRun++)
                {
                    oneFieldMappings[firstRun] = pColumn[Int32.Parse(mainActiveArray[firstRun]) - 1];
                }                                           
                string[,] onePostData = new string[oneFieldMappings.Length,2];
                insertKey = "insertContent";
                for (int i = 0; i < oneFieldMappings.Length ; i++) {
                    string insertValueTemp = insertKey + "[" + i + "][1]";
                    onePostData[i,0] = oneFieldMappings[i];
                    onePostData[i,1] = protectHtmlXmlCodes(Request.Form[insertValueTemp]);
                }                               
                XmlDocument oneGenXML = xmlForInsert(projectName, onePostData, useTable);
                this.outputString = DB_insert(encodeXMLObj(oneGenXML), useTable);
                }
                }
                break;
            case "addTimeTwo":  
                this.outputString = DB_captcha(sessionID, captcha);      
                if(this.outputString == "false"){
                    this.outputString = "step1_" + this.outputString;
                }else{
                useTable = "tablePii";  
                Int32 unixTimestamp = (Int32)(DateTime.Now.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
                System.DateTime dateTimeNow = new System.DateTime(1970, 1, 1, 0, 0, 0, 0);
                dateTimeNow = dateTimeNow.AddSeconds(unixTimestamp);
                string dateTimeNowString = dateTimeNow.ToString("yyyyMMddHHmmss");
                unixTimestamp -= 86400;  // 24 hours before now
                System.DateTime dateTimePast = new System.DateTime(1970, 1, 1, 0, 0, 0, 0);
                dateTimePast = dateTimePast.AddSeconds(unixTimestamp);
                string dateTimePastString = dateTimePast.ToString("yyyyMMddHHmmss");
                
                this.outputString = DB_count("{'$and' : [ {'NameEN' : '" + Name + "'}, {'Mobile' : '" + Mobile + "'}, {'ProjectName':'" + projectName + "'}, {'$and':  [ { 'CreateTime': {'$lt' : " + dateTimeNowString + "} }, { 'CreateTime': {'$gt': " + dateTimePastString + " } } ] } ]}",useTable);                
                
                if(this.outputString != "0"){
                    this.outputString = "step2_" + this.outputString;
                }else{
                   
                string[] fieldMappings = new string[mainActiveArray.Length];   
                for (int firstRun = 0; firstRun < mainActiveArray.Length; firstRun++)
                {
                    fieldMappings[firstRun] = pColumn[Int32.Parse(mainActiveArray[firstRun]) - 1];
                }                                           
                string[,] postData = new string[fieldMappings.Length,2];
                insertKey = "insertContent";
                for (int i = 0; i < fieldMappings.Length ; i++) {
                    string insertValueTemp = insertKey + "[" + i + "][1]";
                    postData[i,0] = fieldMappings[i];
                    postData[i,1] = protectHtmlXmlCodes(Request.Form[insertValueTemp]);
                }                               
                XmlDocument genXML = xmlForInsert(projectName, postData, useTable);
                //this.outputString = DB_insert(encodeXMLObj(genXML), useTable);
                
                
                string respondXML = DB_insert(encodeXMLObj(genXML), useTable);
                XmlDocument xdoc = new XmlDocument();
                xdoc.LoadXml(respondXML);
                XmlNodeList elemList = xdoc.GetElementsByTagName("RecordID");  
                string insertedId = elemList[0].InnerText;
                
                
                useTable = "tableGen";
                string[] fieldMappings2 = new string[genActiveArray.Length]; 
                for (int secondRun = 0; secondRun < genActiveArray.Length; secondRun++)
                {
                    fieldMappings2[secondRun] = pColumn[Int32.Parse(genActiveArray[secondRun]) - 1];
                }  
                string[,] postData2 = new string[fieldMappings2.Length,2];
                insertKey = "insertContent";            
                for (int i = 0; i < fieldMappings2.Length ; i++) {
                    string insertValueTemp2 = insertKey + "[" + (i+fieldMappings2.Length-1) + "][1]";
                    postData2[i,0] = fieldMappings2[i];
                    postData2[i,1] = protectHtmlXmlCodes(Request.Form[insertValueTemp2]);
                    if (i == 0) {
                        postData2[i,0] = fieldMappings2[i];
                        postData2[i,1] = insertedId;                    
                    }
                }
                
                XmlDocument genXML2 = xmlForInsert(projectName, postData2, useTable);               
                this.outputString = DB_insert(encodeXMLObj(genXML2), useTable);

                }

                }
                break;    
            case "checkNum":
                useTable = "tablePii";  
                this.outputString = DB_count("{'ProjectName':'"+projectName+"'}",useTable);                
                break;
			case "projectName":
                this.outputString = projectName;                
                break;       
            default:
                break;
        }
    }
   public string protectHtmlXmlCodes(string StrValue)
    {       
        if (StrValue != null) {
            StrValue = Server.HtmlEncode(StrValue);
            StrValue = StrValue.Replace("  ", string.Empty);
            StrValue = StrValue.Replace(Environment.NewLine, string.Empty);
            StrValue = StrValue.Replace("\\t", string.Empty);
            StrValue = StrValue.Replace(" {", "{");
            StrValue = StrValue.Replace(" :", ":");
            StrValue = StrValue.Replace(": ", ":");
            StrValue = StrValue.Replace(", ", ",");
            StrValue = StrValue.Replace("; ", ";");
            StrValue = StrValue.Replace(";}", "}");
            StrValue = StrValue.Replace("<", "{");
            StrValue = StrValue.Replace(">", "}");
            StrValue = StrValue.Replace("'", "&apos;");
            StrValue = StrValue.Replace("\"", "&quot;");
            StrValue = StrValue.Replace("(", "[");
            StrValue = StrValue.Replace(")", "]");  
            StrValue = StrValue.Replace("\\", "\\\\");  
            StrValue = StrValue.Replace("/", "\\/");
        }
        
        return StrValue;
    }
</script>
<%=this.outputString%>