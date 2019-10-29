
<script runat="server" language="C#">
public string projectName = "2019-form-template2";
public string[] pColumn = new string[23]{"ProjectName","NameCH","NameEN","AddressCH","AddressEN","Mobile","Email","MemberID","BettingAccount","Promo","RefCode","LGeneric","Generic1","Generic2","Generic3","Generic4","Generic5","Generic6","Generic7","Generic8","Generic9","LGeneric","PIIID"};
//REMARKS//
//1:ProjectName|2:NameCH|3:NameEN|4:AddressCH|5:AddressEN|6:Mobile|7:Email|8:MemberID|9:BettingAccount|10:Promo|11:RefCode|12:LGeneric
//13:Generic1|14:Generic2|15:Generic3|16:Generic4|17:Generic5|18:Generic6|19:Generic7|20:Generic8|21:Generic9|22:LGeneric|23:PIIID"
//REMARKS//
//Database
public string[] mainActiveArray = new string[2]{"3","12"};
public string[] genActiveArray = new string[11]{"23","13","14","15","16","17","18","19","20","21","22"}; //obsolete
public string[] specificArray = new string[1]{"English Name"};

//Email
public string[] emailFiled = new string[6]{"to","cc","bcc","from","subject","message"};
public string emailSender = "no-reply@hkjc.org.hk";
public string emailReceive = "denis.yt.li@hkjc.org.hk";
public string emailCCList = "";
public string emailBCCList = "";
public string emailEnSubject = "BREC - Riding Lesson Enrollment";
public string emailChSubject = "BREC - Riding Lesson Enrollment";
public string emailMessage = "";

public String[] item = new String[100];

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