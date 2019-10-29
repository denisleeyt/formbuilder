import React from 'react';
import ReactDom from 'react-dom';
import "@babel/polyfill";
import Form from './components/Form.js';
import '../css/main.css';
import "isomorphic-fetch";

ReactDom.render(<Form />, document.getElementById("root"));
