import React,{useState, useEffect} from 'react'
import Plot from 'react-plotly.js';
import Plotly from "plotly.js-dist-min";



function App(){
  const [formData, setformData] = useState(null);
  const [data, setData] = useState(null);
  const [sampdata, setsampData] = useState(null);
  const [sampformData, setsampformData] = useState(null);
  const [error, setError] = useState(null);
  const [plotData, setplotData] = useState([]);
  const [plotHistData, setplotHistData] = useState([]);
  const [selectedDist, setSelectedDist] = useState('Binomial');
  const [SelectedOperation, setSelectedOperation] = useState('Binomial');
  const xValues = [];
  const probabilities = [];
  let  rep = "lines+markers";

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    formData.append("distribution", selectedDist);
    setformData(formData)
  }


  async function getDatacicle(fData,num) {
    const ogr = parseInt(formData.get("x"));
    console.log(ogr);
    const n = num;
    let val = 0;
    if(selectedDist==="Normal"){
      val = Math.abs(n) * -1;
    }
    
    /*if(formData.get("acc")){
      updatedFormData.append("acc", 1);
    }*/

    for (let i = val; i <= n; i++) {
      fData.set("x", i);

      
      
    
    try {
      const formJson = Object.fromEntries(fData.entries());
      const jsonString = JSON.stringify(formJson);
      const response = await fetch(
        '/api/Socrates/ProbabilityDistribution',{
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: jsonString
        }
      );
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      let actualData = await response.json();
      const probability = actualData.Probabilidad; 
      console.log(i);
      xValues.push(i);
      probabilities.push(probability);
      setData(actualData);
      setError(null);
      
      
    } catch(err) {
      setError(err.message);
      setData(null);
    }
  }
  //console.log(xValues)
  //console.log(probabilities);

  if(fData.get("Type")==="discrete"){
    rep = "markers";
    if(formData.get("acc")){
      const specialValue = [xValues, probabilities].map((arr) => arr.slice(0, ogr+1));
      const [xValuesForPlot, probabilitiesForPlot] = specialValue;
      const xValuefinal = xValues.slice(ogr,ogr+1)
      const yValuefinal = probabilities.slice(ogr,ogr+1)
      const finalpercent = [];
      
      
      fData.set("x", ogr);
      fData.set("acc",1);
      const formJson = Object.fromEntries(fData.entries());
      const jsonString = JSON.stringify(formJson);
      const response = await fetch(
        '/api/Socrates/ProbabilityDistribution',{
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: jsonString
        }
      );
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      let actualData = await response.json();
      const probability = actualData.Probabilidad; 
      finalpercent.push(probability);
      setData(actualData);



      setplotData([
        {
          x: xValues,
          y: probabilities,
          type: 'scatter',
          mode: rep,
          marker: {
            opacity: 0.5, 
          },
          showlegend: false,
        },
        {
          x: xValuesForPlot,
          y: probabilitiesForPlot,
          type: 'scatter',
          mode: rep,
          marker: {
            opacity: 1, 
          },
          showlegend: false,
        },
        {
          // Add separate annotation trace for each point
          x: xValuefinal,
          y: yValuefinal,
          text: finalpercent.map((p) => `${p.toFixed(4)}`),
          mode: 'text',
          textposition: 'top center', // Adjust position as needed
          showlegend: false,
        },
        ...xValuesForPlot.map((xVal, i) => ({
          x: [xVal, xVal],
          y: [0, probabilitiesForPlot[i]],
          mode: 'lines',
          line: {
            color: 'red',
            width: 1,
          },
          showlegend: false,
        })),
    
      ]);
      
    }
    else{
      const specialValue = [xValues, probabilities].map((arr) => arr.slice(ogr, ogr+1));
      const [xValuesForPlot, probabilitiesForPlot] = specialValue;
      setplotData([
        {
          x: xValues,
          y: probabilities,
          type: 'scatter',
          mode: rep,
          marker: {
            opacity: 0.5, 
          },
          showlegend: false,
        },
        {
          x: xValuesForPlot,
          y: probabilitiesForPlot,
          type: 'scatter',
          mode: rep,
          marker: {
            opacity: 1, 
          },
          showlegend: false,
        },
        {
          // Add separate annotation trace for each point
          x: xValuesForPlot,
          y: probabilitiesForPlot,
          text: probabilitiesForPlot.map((p) => `${p.toFixed(4)}`),
          mode: 'text',
          textposition: 'top center', // Adjust position as needed
          showlegend: false,
        },
        ...xValuesForPlot.map((xVal, i) => ({
          x: [xVal, xVal],
          y: [0, probabilitiesForPlot[i]],
          mode: 'lines',
          line: {
            color: 'red',
            width: 1,
          },
          showlegend: false,
        })),
    
      ]);
    }
    
    
    }
  
  else{
    rep = "lines";

    
    const finalpercent = [];
    const xValuesfinal = xValues.slice(ogr-1,ogr);
    const yValuesfinal = probabilities.slice(ogr-1,ogr);

      fData.set("x", ogr);
      fData.set("acc",1);
      const formJson = Object.fromEntries(fData.entries());
      const jsonString = JSON.stringify(formJson);
      const response = await fetch(
        '/api/Socrates/ProbabilityDistribution',{
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: jsonString
        }
      );
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      let actualData = await response.json();
      const probability = actualData.Probabilidad; 
      finalpercent.push(probability);
      setData(actualData);


    setplotData([
      {
        x: xValues,
        y: probabilities,
        type: 'scatter',
        mode: rep,
        fill: 'tonexty', // Fill the area between the line and the y-axis
        fillcolor: 'rgba(255, 153, 51, 0.3)', // Adjust color and opacity as needed
        marker: {
          opacity: 1, 
        },
        showlegend: false,
      },
      {
        // Add separate annotation trace for each point
        x: xValuesfinal,
        y: yValuesfinal,
        text: finalpercent.map((p) => `X<=${ogr} ${p.toFixed(4)}`),
        mode: 'text',
        textposition: 'top center', // Adjust position as needed
        showlegend: false,
      },
  
    ]);
  }
}

  


  useEffect(() => {
    if(formData){
    
    const updatedFormData = new FormData(); // Create a copy of formData
    updatedFormData.append("distribution", formData.get("distribution"));
    updatedFormData.append("Type", formData.get("Type"));
    updatedFormData.append("x", formData.get("x"));
    updatedFormData.append("acc", 0);


    
    if(selectedDist==="Binomial"){
      console.log("Binomial");
      updatedFormData.append("n", formData.get("n"));
      updatedFormData.append("p", formData.get("p"));
      const n = formData.get("n");
      getDatacicle(updatedFormData,n);
    }

    if(selectedDist==="Negative Binomial"){
      console.log("Negative Binomial");
      updatedFormData.append("r", formData.get("r"));
      updatedFormData.append("p", formData.get("p"));
      const n = formData.get("x");
      getDatacicle(updatedFormData,n);
    }
    
    if(selectedDist==="Poisson"){
      console.log("Poisson");
      updatedFormData.append("lambda", formData.get("lambda"));
      const n = formData.get("x");
      getDatacicle(updatedFormData,n);
    }

    if(selectedDist==="Normal"){
      console.log("Normal");
      updatedFormData.append("mu", formData.get("mu"));
      updatedFormData.append("sd", formData.get("sd"));
      const n = formData.get("x");
      getDatacicle(updatedFormData,n);
    }

    if(selectedDist==="Normal"){
      console.log("Normal");
      updatedFormData.append("mu", formData.get("mu"));
      updatedFormData.append("sd", formData.get("sd"));
      const n = formData.get("x");
      getDatacicle(updatedFormData,n);
    }

    if(selectedDist==="Exponential"){
      console.log("Exponential");
      updatedFormData.append("lam", formData.get("lam"));
      const n = formData.get("x");
      getDatacicle(updatedFormData,n);
    }

    if(selectedDist==="Gamma"){
      console.log("Gamma");
      updatedFormData.append("alpha", formData.get("alpha"));
      updatedFormData.append("beta", formData.get("beta"));
      const n = formData.get("x");
      getDatacicle(updatedFormData,n);
    }
    
    

    
  }
}, [formData]);


function handleSampSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const sampformData = new FormData(form);
  sampformData.append("distribution", selectedDist);
  setsampformData(sampformData)
}

useEffect(() => {
  if(sampformData){
    const getSampleData = async () => {
      try {
        const formJson = Object.fromEntries(sampformData.entries());
        const jsonString = JSON.stringify(formJson);
        console.log(jsonString)
        const response = await fetch(
          `/api/Socrates/Sampling`,{
            method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: jsonString
        }
        );
        let actualData = await response.json();
        setsampData(actualData);
        setError(null);
      } catch(err) {
        setError(err.message);
        setsampData(null);
      } 
    }
    getSampleData()
  }

}, [sampformData]);

useEffect(() => {
  
  if(sampdata){
    console.log(sampdata);
    const sampleArray = sampdata.Sampling; // Assuming the sample is in 'Sampling' property
    const histogramData = {
      x: sampleArray,
      type: 'histogram',
    };

    // Set the plot data
    setplotHistData([histogramData]);
    console.log(sampleArray)
  }
  
}, [sampdata]);



  return(
  <div>
    
    <label>
        Seleccion de Operacion: 
        <select name="selectOperation" defaultValue="Distributions" onChange={e => setSelectedOperation(e.target.value)}>
          <option value ="Distributions">Distributions</option>
          <option value ="Sampling">Sampling</option>
        </select>
      </label>
     <p></p>
      
      {SelectedOperation==="Distributions" &&
    <div>
      <label>
        Distribuccion: 
        <select name="selectedDistribution" defaultValue="binomial" onChange={e => setSelectedDist(e.target.value)}>
          <option value ="Binomial">Binomial</option>
          <option value ="Negative Binomial">Negative Binomial</option>
          <option value ="Poisson">Poisson</option>
          <option value ="Normal">Normal</option>
          <option value ="Exponential">Exponential</option>
          <option value ="Gamma">Gamma</option>
        </select>
      </label>
      <p>Parameters for {selectedDist} Distribution</p>
      {selectedDist === "Binomial" &&
      <form method="post" onSubmit={handleSubmit}>
      <div>
      <label>
        type
        <select name="Type" defaultValue="discrete">
        <option value ="discrete">Discrete</option>
        <option value ="continuous">Continuous</option>
        </select>
      </label>
      <label>
        Accumulado: <input type="checkbox" name="acc" />
      </label>
      </div>

      <div>
      <label>
        n: <input name="n" defaultValue={0} type='number' />
      </label>
      </div>
      <div>
      <label>
        p: <input name="p" defaultValue={0} type='float' />
      </label>
      </div>
      <div>
      <label>
        x: <input name="x" defaultValue={0} type='number' />
      </label>
      </div>

      <div>
      <button type="submit">Submit form</button>
      </div>
    </form>
  
    }
  {selectedDist === "Negative Binomial" &&
    <form method="post" onSubmit={handleSubmit}>
      <div>
      <label>
        type
        <select name="Type" defaultValue="discrete">
        <option value ="discrete">Discrete</option>
        <option value ="continuous">Continuous</option>
        </select>
      </label>
      <label>
        Accumulado: <input type="checkbox" name="acc" />
      </label>
      </div>

      <div>
      <label>
        r: <input name="r" defaultValue={0} type='number'/>
      </label>
      </div>
      <div>
      <label>
        p: <input name="p" defaultValue={0} />
      </label>
      </div>
      <div>
      <label>
        x: <input name="x" defaultValue={0} type='number'/>
      </label>
      </div>

      <div>
      <button type="submit">Submit form</button>
      </div>
    </form>
  }
  {selectedDist === "Poisson" &&
  <form method="post" onSubmit={handleSubmit}>
      <div>
      <label>
        type
        <select name="Type" defaultValue="discrete">
        <option value ="discrete">Discrete</option>
        <option value ="continuous">Continuous</option>
        </select>
      </label>
      <label>
        Accumulado: <input type="checkbox" name="acc" />
      </label>
      </div>

      <div>
      <label>
        lambda: <input name="lambda" defaultValue={0} type='number'/>
      </label>
      </div>
      <div>
      <label>
        x: <input name="x" defaultValue={0} type='number'/>
      </label>
      </div>

      <div>
      <button type="submit">Submit form</button>
      </div>
    </form>
  }
  {selectedDist === "Normal" &&
    <form method="post" onSubmit={handleSubmit}>
      <div>
      <label>
        type
        <select name="Type" defaultValue="continuous">
        <option value ="discrete">Discrete</option>
        <option value ="continuous">Continuous</option>
        </select>
      </label>
      <label>
        Accumulado: <input type="checkbox" name="acc" />
      </label>
      </div>

      <div>
      <label>
        mean: <input name="mu" defaultValue={0} />
      </label>
      </div>
      <div>
      <label>
        sd: <input name="sd" defaultValue={0}/>
      </label>
      </div>
      <div>
      <label>
        x: <input name="x" defaultValue={0} type='number'/>
      </label>
      </div>

      <div>
      <button type="submit">Submit form</button>
      </div>
    </form>
  }
  {selectedDist === "Exponential" &&
    <form method="post" onSubmit={handleSubmit}>
      <div>
      <label>
        type
        <select name="Type" defaultValue="continuous">
        <option value ="discrete">Discrete</option>
        <option value ="continuous">Continuous</option>
        </select>
      </label>
      <label>
        Accumulado: <input type="checkbox" name="acc" />
      </label>
      </div>

      <div>
      <label>
        lambda: <input name="lam" defaultValue={0} />
      </label>
      </div>
      <div>
      <label>
        x: <input name="x" defaultValue={0} type='number'/>
      </label>
      </div>

      <div>
      <button type="submit">Submit form</button>
      </div>
    </form>
  }
  {selectedDist === "Gamma" &&
  <form method="post" onSubmit={handleSubmit}>
      <div>
      <label>
        type
        <select name="Type" defaultValue="continuous">
        <option value ="discrete">Discrete</option>
        <option value ="continuous">Continuous</option>
        </select>
      </label>
      <label>
        Accumulado: <input type="checkbox" name="acc" />
      </label>
      </div>

      <div>
      <label>
        alpha: <input name="alpha" defaultValue={0} />
      </label>
      </div>

      <div>
      <label>
        beta: <input name="beta" defaultValue={0} />
      </label>
      </div>

      <div>
      <label>
        x: <input name="x" type='number' defaultValue={0}/>
      </label>
      </div>

      <div>
      <button type="submit">Submit form</button>
      </div>
    </form>
    }

{plotData.length > 0 &&(
  <Plot
    data={plotData}
    layout={{
      width: 600,
      height: 400,
      title: `Probability Distribution for ${selectedDist}`,
    }}
  />
)}
</div>
  }

  {SelectedOperation === "Sampling" && 
  <div>
  <p>Sampling Generator</p>
  <label>
        Distribution for Sampling: 
        <select name="selectedDistribution" defaultValue="binomial" onChange={e => setSelectedDist(e.target.value)}>
          <option value ="Binomial">Binomial</option>
          <option value ="Negative Binomial">Negative Binomial</option>
          <option value ="Poisson">Poisson</option>
          <option value ="Normal">Normal</option>
          <option value ="Exponential">Exponential</option>
          <option value ="Gamma">Gamma</option>
        </select>
      </label>

      <p>Parameters for {selectedDist} Sampling</p>
      {selectedDist === "Binomial" &&
      <form method="post" onSubmit={handleSampSubmit}>
      <div>
      <label>
        n: <input name="n" defaultValue={0} type='number' />
      </label>
      </div>
      <div>
      <label>
        p: <input name="p" defaultValue={0} type='float' />
      </label>
      </div>
      <div>
      <label>
        N: <input name="N" defaultValue={0} type='number' />
      </label>
      </div>

      <div>
      <button type="submit">Submit form</button>
      </div>
    </form>
  
    }
  {selectedDist === "Negative Binomial" &&
    <form method="post" onSubmit={handleSampSubmit}>
      <div>
      <label>
        r: <input name="r" defaultValue={0} type='number'/>
      </label>
      </div>
      <div>
      <label>
        p: <input name="p" defaultValue={0} />
      </label>
      </div>
      <div>
      <label>
        N: <input name="N" defaultValue={0} type='number'/>
      </label>
      </div>

      <div>
      <button type="submit">Submit form</button>
      </div>
    </form>
  }
  {selectedDist === "Poisson" &&
  <form method="post" onSubmit={handleSampSubmit}>
      <div>
      <label>
        lambda: <input name="lambda" defaultValue={0} type='number'/>
      </label>
      </div>
      <div>
      <label>
        N: <input name="N" defaultValue={0} type='number'/>
      </label>
      </div>

      <div>
      <button type="submit">Submit form</button>
      </div>
    </form>
  }
  {selectedDist === "Normal" &&
    <form method="post" onSubmit={handleSampSubmit}>
      <div>
      <label>
        mean: <input name="mu" defaultValue={0} />
      </label>
      </div>
      <div>
      <label>
        sd: <input name="sd" defaultValue={0}/>
      </label>
      </div>
      <div>
      <label>
        N: <input name="N" defaultValue={0} type='number'/>
      </label>
      </div>

      <div>
      <button type="submit">Submit form</button>
      </div>
    </form>
  }
  {selectedDist === "Exponential" &&
    <form method="post" onSubmit={handleSampSubmit}>
      <div>
      <label>
        lambda: <input name="lam" defaultValue={0} />
      </label>
      </div>
      <div>
      <label>
        N: <input name="N" defaultValue={0} type='number'/>
      </label>
      </div>

      <div>
      <button type="submit">Submit form</button>
      </div>
    </form>
  }
  {selectedDist === "Gamma" &&
  <form method="post" onSubmit={handleSampSubmit}>

      <div>
      <label>
        alpha: <input name="alpha" defaultValue={0} />
      </label>
      </div>

      <div>
      <label>
        beta: <input name="beta" defaultValue={0} />
      </label>
      </div>

      <div>
      <label>
        N: <input name="N" type='number' defaultValue={0}/>
      </label>
      </div>

      <div>
      <button type="submit">Submit form</button>
      </div>
    </form>

    
    }
    <div>
      <Plot
      data={plotHistData}
      layout={{
        title: "Histogram of Sample Data",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "Count" },
      }}
      />
    </div>
  </div>
  
  }
</div>

  )
  
  
}

export default App
