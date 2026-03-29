import React from 'react';

const DistributionForm = ({ distribution, onSubmit, type = "Distributions" }) => {
  // Definimos qué campos necesita cada distribución para no repetir código
  const fields = {
    Binomial: ['n', 'p'],
    'Negative Binomial': ['r', 'p'],
    Poisson: ['lambda'],
    Normal: ['mu', 'sd'],
    Exponential: ['lam'],
    Gamma: ['alpha', 'beta']
  };

  return (
    <form onSubmit={onSubmit} className="dist-form">
      <h3>Parameters for {distribution} {type}</h3>
      
      {/* Campos comunes para Distribuciones (no para Sampling) */}
      {type === "Distributions" && (
        <div className="common-fields">
          <label>Type: 
            <select name="Type" defaultValue="discrete">
              <option value="discrete">Discrete</option>
              <option value="continuous">Continuous</option>
            </select>
          </label>
          <label> Cumulative: <input type="checkbox" name="acc" /> </label>
        </div>
      )}

      {/* Renderizado dinámico de parámetros específicos */}
      {fields[distribution]?.map(field => (
        <div key={field}>
          <label>{field}: <input name={field} type="number" step="any" required /></label>
        </div>
      ))}

      {/* Campo X para Distribución o N para Sampling */}
      <div>
        <label>
          {type === "Distributions" ? 'x value:' : 'Sample size (N):'}
          <input name={type === "Distributions" ? "x" : "N"} type="number" required />
        </label>
      </div>

      <button type="submit">Calculate</button>
    </form>
  );
};

export default DistributionForm;