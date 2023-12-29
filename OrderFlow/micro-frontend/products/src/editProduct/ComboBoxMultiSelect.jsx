import React from 'react';

import Select from 'react-select';
// import { colourOptions } from '../data';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
function ComboBoxMultiSelect() {
    
  <Select
    defaultValue={[options[2], options[3]]}
    isMulti
    name="colors"
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
  />
}
export default ComboBoxMultiSelect;