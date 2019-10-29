
import React from 'react';
import Factory from '../../src/js/components/Factory';
import JCSubmit from '../../src/js/components/JCSubmit';
import JCCaptcha from '../../src/js/components/JCCaptcha';
import JCText from '../../src/js/components/JCText';
import JCRadio from '../../src/js/components/JCRadio';
import JCCheckbox from '../../src/js/components/JCCheckbox';
import JCTextarea from '../../src/js/components/JCTextarea';
describe('Factory Component', () => {
    it('Test Factory handle decision tree correctly', () => {
        let mimicData = {
            "id": 1,
            "type": "JCText",
            "width": 6,
            "LabelName": "English Name",
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
            "Options": [
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
            "Top": "",
            "Bottom": "",
            "others": []
        };
        const wrapperText = mount(<Factory info = {mimicData} key="1" formStatus = "normal"/>);
        expect(wrapperText.find(JCText)).to.have.length(1);
        mimicData.type = "JCRadio";
        const wrapperRadio = mount(<Factory info = {mimicData} key="1" formStatus = "normal"/>);
        expect(wrapperRadio.find(JCRadio)).to.have.length(1);
        mimicData.type = "JCCheckbox";
        const wrapperCheckbox = mount(<Factory info = {mimicData} key="1" formStatus = "normal"/>);
        expect(wrapperCheckbox.find(JCCheckbox)).to.have.length(1);
        mimicData.type = "JCTextarea";
        const wrapperTextarea = mount(<Factory info = {mimicData} key="1" formStatus = "normal"/>);
        expect(wrapperTextarea.find(JCTextarea)).to.have.length(1);
        mimicData.type = "JCSubmit";
        const wrapperSubmit = mount(<Factory info = {mimicData} key="1" formStatus = "normal"/>);
        expect(wrapperSubmit.find(JCSubmit)).to.have.length(1);
        mimicData.type = "JCCaptcha";
        const wrapperCaptcha = mount(<Factory info = {mimicData} key="1" formStatus = "normal"/>);
        expect(wrapperCaptcha.find(JCCaptcha)).to.have.length(1);
    });
});