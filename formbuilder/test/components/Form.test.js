
import React from 'react';
import Form,{ langAdaptor } from '../../src/js/components/Form';
import JCSubmit from '../../src/js/components/JCSubmit';
import JCCaptcha from '../../src/js/components/JCCaptcha';
describe('Form Component', () => {
    it('renders the Form wrapper and check essential element', () => {
        const wrapper = mount(<Form />);
        expect(wrapper.find("form")).to.have.length(1);
        expect(wrapper.find(JCSubmit)).to.have.length(1);
        expect(wrapper.find(JCCaptcha)).to.have.length(1);
    });
});

describe('Form Data Filter', () => {
    it('Detect the assignment function base on language', () => {
        let mimicData = {
            "enLabelname":"labelname",
            "enTesting":"testing",
            "enOptions":"Options",
            "validation":[]
        };
        const filterData = langAdaptor(mimicData);
        expect(filterData["Labelname"]).to.equal(mimicData["enLabelname"]);
        expect(filterData["Testing"]).to.equal(mimicData["enTesting"]);
        expect(filterData["Options"]).to.equal(mimicData["enOptions"]);
    });
});