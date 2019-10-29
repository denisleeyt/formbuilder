{
    "rows": [
        {
            "items": [
                {
                    "id": 1,
                    "type": "JCText",
                    "width": 6,
                    "showLabelName": true,
                    "enLabelName": "English Name",
                    "chLabelName": "English Name",
                    "maxlength": 100,
                    "validation": [
                        {
                            "type": "checkEmpty",
                            "enValidMsg": "Please enter First Name",
                            "chValidMsg": "請輸入名字"
                        }
                    ],
                    "serverValidation": [
                        {
                            "type": "checkEnName"
                        }
                    ],
                    "enOptions": [],
                    "chOptions": [],
                    "enTop": "",
                    "chTop": "",
                    "enBottom": "",
                    "chBottom": "",
                    "others": []
                },
                {
                    "id": 2,
                    "type": "JCRadio",
                    "width": 6,
                    "showLabelName": true,
                    "enLabelName": "Job Type",
                    "chLabelName": "Job Type",
                    "maxlength": "",
                    "validation": [
                        {
                            "type": "checkSelect",
                            "enValidMsg": "Please select your job type",
                            "chValidMsg": "請輸入job type"
                        }
                    ],
                    "serverValidation": [],
                    "enOptions": [
                        {
                            "name": "Full-Time",
                            "value": ""
                        },
                        {
                            "name": "Part-Time",
                            "value": ""
                        },
                        {
                            "name": "Contract",
                            "value": ""
                        }
                    ],
                    "chOptions": [
                        {
                            "name": "Full-Time",
                            "value": ""
                        },
                        {
                            "name": "Part-Time",
                            "value": ""
                        },
                        {
                            "name": "Contract",
                            "value": ""
                        }
                    ],
                    "enTop": "",
                    "chTop": "",
                    "enBottom": "",
                    "chBottom": "",
                    "others": []
                }
            ]
        },
        {
            "items": [
                {
                    "id": 3,
                    "type": "JCCheckbox",
                    "width": 12,
                    "showLabelName": true,
                    "enLabelName": "hobbit",
                    "chLabelName": "hobbit",
                    "maxlength": 100,
                    "validation": [
                        {
                            "type": "checkSelect",
                            "enValidMsg": "Please select your hobbit",
                            "chValidMsg": "請輸入hobbit"
                        }
                    ],
                    "serverValidation": [],
                    "enOptions": [
                        {
                            "name": "Basketball",
                            "value": "A"
                        },
                        {
                            "name": "Football",
                            "value": "B"
                        },
                        {
                            "name": "Tennis",
                            "value": "C"
                        }
                    ],
                    "chOptions": [
                        {
                            "name": "Basketball",
                            "value": "A"
                        },
                        {
                            "name": "Football",
                            "value": "B"
                        },
                        {
                            "name": "Tennis",
                            "value": "C"
                        }
                    ],
                    "enTop": "",
                    "chTop": "",
                    "enBottom": "",
                    "chBottom": "",
                    "others": []
                }
            ]
        },
        {
            "items": [
                {
                    "id": 4,
                    "type": "JCTextarea",
                    "width": 12,
                    "showLabelName": false,
                    "enLabelName": "Description",
                    "chLabelName": "Description",
                    "maxlength": 500,
                    "validation": [
                        {
                            "type": "checkEmpty",
                            "enValidMsg": "Please fill in your description",
                            "chValidMsg": "請輸入description"
                        }
                    ],
                    "serverValidation": [],
                    "enOptions": [],
                    "chOptions": [],
                    "enTop": "",
                    "chTop": "",
                    "enBottom": "",
                    "chBottom": "",
                    "others": {
                        "textareaRows": "4",
                        "textareaClos": "50"
                    }
                }
            ]
        },
        {
            "items": [
                {
                    "id": 5,
                    "type": "JCCaptcha",
                    "width": 12,
                    "showLabelName": true,
                    "enLabelName": "Captcha",
                    "chLabelName": "Captcha",
                    "maxlength": 500,
                    "validation": [
                        {
                            "type": "checkEmpty",
                            "enValidMsg": "Please fill in Captcha",
                            "chValidMsg": "請輸入Captcha"
                        }
                    ],
                    "serverValidation": [],
                    "enOptions": [],
                    "chOptions": [],
                    "enTop": "",
                    "chTop": "",
                    "enBottom": "",
                    "chBottom": "",
                    "others": {}
                }
            ]
        },
        {
            "items": [
                {
                    "id": 6,
                    "type": "JCSubmit",
                    "width": 12,
                    "showLabelName": true,
                    "enLabelName": "Submit",
                    "chLabelName": "遞交",
                    "maxlength": "",
                    "validation": [],
                    "serverValidation": [],
                    "enValidMsg": [],
                    "chValidMsg": [],
                    "enOptions": [],
                    "chOptions": [],
                    "enTop": "",
                    "chTop": "",
                    "enBottom": "",
                    "chBottom": "",
                    "others": []
                }
            ]
        }
    ]
}