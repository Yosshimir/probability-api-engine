import React from 'react';

const OperationSelector = ({ selectedOperation, onOperationChange, selectedDist, onDistChange }) => {
  return (
    <div className="selector-container">
      <label>
        Operation Selection: 
        <select value={selectedOperation} onChange={(e) => onOperationChange(e.target.value)}>
          <option value="Distributions">Distributions</option>
          <option value="Sampling">Sampling</option>
        </select>
      </label>
      
      <div style={{ marginTop: '10px' }}>
        <label>
          Distribution: 
          <select value={selectedDist} onChange={(e) => onDistChange(e.target.value)}>
            <option value="Binomial">Binomial</option>
            <option value="Negative Binomial">Negative Binomial</option>
            <option value="Poisson">Poisson</option>
            <option value="Normal">Normal</option>
            <option value="Exponential">Exponential</option>
            <option value="Gamma">Gamma</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default OperationSelector;