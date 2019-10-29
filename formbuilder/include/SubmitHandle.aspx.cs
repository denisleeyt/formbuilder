using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Reflection;
using HkjcWss.FormBuilder;

public partial class SubmitHandle : System.Web.UI.Page {

    public string outputString = "";
    public string status = "200";
    public string table = "";
    public string mappingPath = "mapping.json";
    public string dataPath = "data.json";

    public SubmitHandle () {
        this.Load += new EventHandler (this.Page_Load);
    }

    protected void Page_Load (object sender, EventArgs e) {

        this.outputString = "success";
        WebFormData wf = new WebFormData ();
        wf.SessionID = protectHtmlXmlCodes (Request.Form["sessionID"]);
        wf.Captcha = protectHtmlXmlCodes (Request.Form["captcha"]);
        wf.Data = Server.UrlDecode (protectHtmlXmlCodes (Request.Form["formContent"]));
        wf.Mode = protectHtmlXmlCodes (Request.Form["mode"]);
        var serializer = new JavaScriptSerializer ();
        //serializer.RegisterConverters (new [] { new DynamicJsonConverter () });
        //Serialize Form Data
        dynamic obj = serializer.Deserialize (wf.Data, typeof (object));
        dynamic mapping = new Object ();
        dynamic data = new Object ();

        //Read Mapping Data
        try {
            mapping = serializer.Deserialize (FileContent (mappingPath), typeof (object));
            data = serializer.Deserialize (FileContent (dataPath), typeof (object));
        } catch (FileNotFoundException exception) {
            this.outputString = "File do not exist!";
            return;
        }
        this.outputString = mapping["cloumns"][0]["name"];
        ServerValidation valid = new ServerValidation (obj, data);
        if(valid.ValidateForm())
        {
            this.outputString = "success";
        }
        //this.outputString = obj["3"];
    }

    public string FileContent (string path) {
        string content = "";
        string mappingPath = Server.MapPath (path);
        if (!File.Exists (mappingPath)) {
            content = "This file was not found.";
            throw new FileNotFoundException ("This file was not found.");
        } else {
            content = File.ReadAllText (mappingPath);
        }

        return content;
    }

    public string protectHtmlXmlCodes (string StrValue) {
        if (StrValue != null) {
            StrValue = Server.HtmlEncode (StrValue);
            StrValue = StrValue.Replace ("  ", string.Empty);
            StrValue = StrValue.Replace (Environment.NewLine, string.Empty);
            StrValue = StrValue.Replace ("\\t", string.Empty);
            StrValue = StrValue.Replace (" {", "{");
            StrValue = StrValue.Replace (" :", ":");
            StrValue = StrValue.Replace (": ", ":");
            StrValue = StrValue.Replace (", ", ",");
            StrValue = StrValue.Replace ("; ", ";");
            StrValue = StrValue.Replace (";}", "}");
            StrValue = StrValue.Replace ("<", "{");
            StrValue = StrValue.Replace (">", "}");
            StrValue = StrValue.Replace ("'", "&apos;");
            StrValue = StrValue.Replace ("\"", "&quot;");
            StrValue = StrValue.Replace ("(", "[");
            StrValue = StrValue.Replace (")", "]");
            StrValue = StrValue.Replace ("\\", "\\\\");
            StrValue = StrValue.Replace ("/", "\\/");
        }

        return StrValue;
    }

}

public class WebFormData {
    public string SessionID { get; set; }
    public string Captcha { get; set; }
    public string Mode { get; set; }
    public string Data { get; set; }
}


public class Database
{
    public Boolean captcha()
    {

    }
    public string dynamicSave()
    {
        string result = "";

        return result;
    }

    public string limitationSave()
    {
        string result = "";

        return result;
    }
}

public class Notification
{
    public string email()
{
    string result = "";

    return result;
}
}
