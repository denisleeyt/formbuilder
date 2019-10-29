
<script runat="server" language="C#">
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
<%
DateTime visitDate = DateTime.Now;
  
bool expired = false;

  if (visitDate.CompareTo(gameEndDate) > 0)
  {
      expired = true;
  }

string guid = System.Guid.NewGuid().ToString();	

  if (expired)
  {
      Response.Redirect(campaignSiteURL);
  }
%>