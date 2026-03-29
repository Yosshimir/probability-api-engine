import React from 'react';
import Plot from 'react-plotly.js';

const PlotContainer = ({ data, title, type = "scatter" }) => {
  // Si no hay datos, no renderizamos nada o mostramos un mensaje
  if (!data || data.length === 0) {
    return <div className="no-data">Select parameters and click calculate to see the plot.</div>;
  }

  // Configuraciones estándar para que el gráfico sea responsivo y limpio
  const defaultLayout = {
    title: {
      text: title,
      font: { family: 'Arial, sans-serif', size: 18 }
    },
    autosize: true,
    margin: { l: 50, r: 30, b: 50, t: 80 },
    xaxis: { title: 'Value (x)', gridcolor: '#eee' },
    yaxis: { title: 'Probability / Frequency', gridcolor: '#eee' },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
  };

  const defaultConfig = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
  };

  return (
    <div className="plot-wrapper" style={{ width: '100%', minHeight: '450px' }}>
      <Plot
        data={data}
        layout={defaultLayout}
        config={defaultConfig}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default PlotContainer;