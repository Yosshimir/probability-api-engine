import React, { useState } from 'react';
import OperationSelector from './components/forms/OperationSelector';
import DistributionForm from './components/forms/DistributionForm';
import Plot from 'react-plotly.js';
import PlotContainer from './components/visualization/PlotContainer';
import { fetchDistribution, fetchSampling } from "./api/client";

function App() {
  const [selectedOp, setSelectedOp] = useState('Distributions');
  const [selectedDist, setSelectedDist] = useState('Binomial');
  const [plotData, setPlotData] = useState([]);
  const [loading, setLoading] = useState(false); // 🔥 NUEVO

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.distribution = selectedDist;

    console.log("Enviando datos:", data);

    setLoading(true); // 🔥 EMPIEZA loading

    try {
      const result =
        selectedOp === "Distributions"
          ? await fetchDistribution(data)
          : await fetchSampling(data);

      console.log("Respuesta:", result);

      if (selectedOp === "Distributions") {
        const xValues = [];
        const yValues = [];

        const max = parseInt(data.x);

        for (let i = 0; i <= max; i++) {
          const payload = { ...data, x: i };
          const res = await fetchDistribution(payload);

          xValues.push(i);
          yValues.push(res.Probabilidad);
        }

        setPlotData([
          {
            x: xValues,
            y: yValues,
            type: "scatter",
            mode: "lines",
          },
        ]);
      }

      if (selectedOp === "Sampling") {
        setPlotData([
          {
            x: result.Sampling,
            type: "histogram",
          },
        ]);
      }

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Socrates Statistical Tool</h1>
      
      <OperationSelector 
        selectedOperation={selectedOp} 
        onOperationChange={setSelectedOp}
        selectedDist={selectedDist}
        onDistChange={setSelectedDist}
      />

      <hr />

      <DistributionForm 
        distribution={selectedDist} 
        type={selectedOp} 
        onSubmit={handleSubmit} 
      />

      {loading && <p>Loading...</p>}

      {!loading && plotData.length > 0 && (
        <PlotContainer 
          data={plotData} 
          title={`${selectedDist} ${selectedOp}`} 
        />
      )}

      
    </div>
  );
}

export default App;

