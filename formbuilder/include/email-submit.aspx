<%@Page Language="C#"  validateRequest="false"%>
<%@ Import Namespace="System.Web.Mail" %>
<% Response.Charset="utf-8"; %>
<!--#include virtual="/common/lib/nfn_module.aspx" -->
<!--#include virtual="./db-config.aspx" -->
<script runat="server" language="C#">
        public string outputString = "";

    void Page_Load(Object Sender, EventArgs e){
        string mode = "email";
        string formData = protectHtmlXmlCodes(Server.UrlDecode(Request.Form["emailContent"]));
        string sureName = "";
        string nickName = "";
        string spResult1 = "";
        string spResult2 = "";
        string spResult3 = "";

        switch (mode) {
            case "email":

                string[,] emailPostData = new string[emailFiled.Length, 2];
                string emailLang = protectHtmlXmlCodes(Server.UrlDecode(Request.Form["mailLang"]));
                string refID = protectHtmlXmlCodes(Server.UrlDecode(Request.Form["refID"]));
                int missLength = 9 - refID.Length;
                string missString = "";
                for (int tempMiss = 0; tempMiss < missLength; tempMiss++) {
                    missString += "0";
                }
                refID = missString + refID;
                string emailSubject = "";
                if (emailLang == "ch") {
                    emailSubject = emailChSubject;
                } else {
                    emailSubject = emailEnSubject;
                }
                for (int i = 0; i < emailFiled.Length ; i++) {
                    emailPostData[i, 0] = emailFiled[i];
                }
                emailPostData[0, 1] = emailReceive;
                emailPostData[1, 1] = emailCCList;
                emailPostData[2, 1] = emailBCCList;
                emailPostData[3, 1] = emailSender;
                emailPostData[4, 1] = emailSubject;
                emailPostData[5, 1] = protectEmailTableCodes(formData);
                XmlDocument emailGenXML = xmlForEmail(emailPostData);
                this.outputString = sd_email(encodeXMLObj(emailGenXML));

                break;
            default:
                break;
        }
    }
    public string protectEmailTableCodes(string StrValue)
    {
        if (StrValue != null) {
            StrValue = StrValue.Replace("&lt;", "<");
            StrValue = StrValue.Replace("&gt;", ">");
            StrValue = StrValue.Replace("\\/", "/");


        }
        return StrValue;
    }
    public string base64Encode(string data)
    {
        try {
            byte[] encData_byte = new byte[data.Length];
            encData_byte = System.Text.Encoding.UTF8.GetBytes(data);
            string encodedData = Convert.ToBase64String(encData_byte);
            return encodedData;
        }
        catch (Exception e)
        {
            throw new Exception("Error in base64Encode" + e.Message);
        }
    }

    public string base64Decode(string data)
    {
        try {
            System.Text.UTF8Encoding encoder = new System.Text.UTF8Encoding();
            System.Text.Decoder utf8Decode = encoder.GetDecoder();
            byte[] todecode_byte = Convert.FromBase64String(data);
            int charCount = utf8Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
            char[] decoded_char = new char[charCount];
            utf8Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
            string result = new String(decoded_char);
            return result;
        }
        catch (Exception e)
        {
            throw new Exception("Error in base64Decode: " + e.Message);
        }
    }
</script>
<%=this.outputString%>