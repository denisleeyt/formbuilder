import React from 'react';
import data from "../resource/data.json";
import Config from "../resource/Config";
import Factory from "./Factory";
import FormStand from "../resource/FormStand";
import DataHandler from "../api/DataHandler";
import DBSubmit from "../api/DBSubmit";

export const langAdaptor = (info) => {
  let reAssign = info;
  if (Config.lang == "en") {
    Object.keys(reAssign).map((value, i) => {
      value.startsWith("en") ? (reAssign[value.substring(2)] = reAssign[value]) : "";
    })
    reAssign.validation.map((value, i) => {
      value.ValidMsg = value.enValidMsg;
      value.status = "normal";
    }
    )
  } else {
    Object.keys(reAssign).map((value, i) => {
      value.startsWith("ch") ? (reAssign[value.substring(2)] = reAssign[value]) : "";
    })
    reAssign.validation.map((value, i) => {
      value.ValidMsg = value.chValidMsg;
      value.status = "normal";
    }
    )
  }
  return reAssign;
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: data,
      allValue: {},
      activePage : 1,
      error : {},
      validate : false,
      permission : 1, //1:staff user, 2:Manager 
      formStatus: 1 //1:normal, 2:error, 3:submitting, 4.submitted
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormState = this.handleFormState.bind(this);
  }

  render() {
    const allItems = this.state.allData.rows.map((row, k) =>
      <div className="form-group row" key={k}>
        {
          row.items.map((item, i) => {
            let reAssign = langAdaptor(item);
            return <Factory info={reAssign} key={i} formStatus={this.state.formStatus}  handleFormState = {this.handleFormState } validate = {this.state.validate} allValue = {this.state.allValue}  />
          }
          )
        }
      </div>
    );
    return (
      <form id="validateForm" name="validateForm" className="validateForm" onSubmit={this.handleSubmit}>
        {allItems}
      </form>
    );
  }

  componentDidMount() {
    fetch("include/email-template.aspx")
            .then(response => response.text())
            .then(data => {
              Config.emailTemplate = data;
                console.log(data)
            })
            .catch(err => {
                console.log(err);
                console.log("sorry, there are no results for your search");
            })
    //For validation
    /*$(".validField").each(function (k, v) {
      const valid = $(v).data("valid");
      const id = $(v).attr("id");
      $(valid).each(function (i, j) {
        const express = j.type;
        const message = j.validMsg;
        FormStand.onValid(id, FormStand[express], message);
      })
    })*/

    // DataHandler.getFormData();
  }

  handlePrevPage(){

  }

  handleNextPage(){

  }
  
  handleConfirmPage(){

  }

  handleFormState(key, value, type){

    let allValue = this.state.allValue;
    let error = this.state.error;
    if(type == "value"){
      allValue[key] = value;
      this.setState({
      allValue: allValue
    })
    }else if (type == "error"){ 
      error[key] = value;
      this.setState({
        error: error
      })
    }else{
      this.setState({
        [key]: value
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.toggleValidating(true);
    setTimeout(() => {
      if ($(".ValidationErrors").length == 0 && this.state.formStatus == "normal") {
        this.setState(() => ({
          formStatus: "submitting"
        }));
        //changeSubmitButton(true);
        //captchaValidate();
        DBSubmit.onSubmit(DataHandler.filterData());
      } else {
        /*$('.important-box').animate({
          scrollTop: 0
        },
          50);
        $('html,body').animate({
          scrollTop: $(".ValidationErrors").eq(0).parent().offset().top - 30
        },
          200);*/
      }
      this.setState(() => ({
        formStatus: "normal"
      }));

    }, 1);
    return false
  }

  toggleValidating(validate) {
    this.setState({ validate : validate });
  }

}

export default Form