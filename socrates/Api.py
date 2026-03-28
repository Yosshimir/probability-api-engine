import flask
from flask import request, jsonify
import pickle
#from Zoo import Gato
#from Zoo import GatoSalvaje
from Arithmetic import SequenceFactory
from Statistic import DistributionFactory

#Run server
app = flask.Flask(__name__)
app.config["DEBUG"] = True

sequence_factory=SequenceFactory()

#Create API

@app.route('/', methods=['GET'])
def home():
    return "<h1>API Web</h1><p> This is a test.</p>"

@app.route('/api/animals/gatosalvaje', methods=['GET'])
def gato_salvaje():
    gato_file = open("michi.txt", "rb")
    salida = pickle.load(gato_file)
    return jsonify({
    'nombre': salida.nombre,
    'color': salida.color,
    'edad': salida.edad
  })
    
@app.route('/api/Socrates/CalculateSequence', methods=['POST'])
def CalculateSequence():
  calc_sequence = request.get_json(force=True)
  tipo = calc_sequence.get("Type")
  n = calc_sequence.get("n")
  parameters = {"n":n}
  t = sequence_factory.get_Instane(tipo,parameters)
  if(tipo==None):
     return jsonify({
    'Error': "No hay datos de entrada"
    })
  return jsonify({
    'Sequence': t.calculate(),
    'Tipo': type(t).__name__
  })
  
@app.route('/api/Socrates/ProbabilityDistribution', methods=['POST'])
def Probability():
  prob_data = request.get_json(force=True)
  
  for key, value in prob_data.items():
    if key not in ("distribution", "Type"):
      try:
        prob_data[key] = int(value)  # Attempt int conversion first
      except ValueError:
        prob_data[key] = float(value)  # Fallback to float if int fails

  distribution = prob_data.get("distribution") 
  print(distribution)
  tipo = prob_data.get("Type")
  x=prob_data.get("x")
  acc=prob_data.get("acc")
  factory = DistributionFactory()
  t = factory.get_instance(distribution,prob_data)
  prob = t.get_probability(x,acc)
  
  return jsonify({
    'Probabilidad': prob,
    'Tipo': type(t).__name__
  })
  
@app.route('/api/Socrates/Sampling', methods=['POST'])
def Sampling():
  prob_data = request.get_json(force=True)
  
  for key, value in prob_data.items():
    if key not in ("distribution", "Type"):
      try:
        prob_data[key] = int(value)  # Attempt int conversion first
      except ValueError:
        prob_data[key] = float(value)  # Fallback to float if int fails

  distribution = prob_data.get("distribution") 
  print(distribution)
  n=prob_data.get("N")
  factory = DistributionFactory()
  t = factory.get_instance(distribution,prob_data)
  samp = []
  samp = t.get_sample(n)
  print (samp)
  return jsonify({
    'Sampling': samp,
  })
  
#@app.route('/api/animals/gato/new', methods=['POST'])
#def create():
#    gato = request.get_json(force=True)
#    nombre = gato.get("nombre")
#    print(nombre)
#    color = gato.get("color")
#    edad = gato.get("edad")
#    habitat = gato.get("habitat")
#    if(habitat=="selva"):
#      gato_salv = GatoSalvaje(nombre,color,edad,habitat)
#      gato_out = open('salvaje_save.txt', 'wb')
#      pickle.dump(gato_salv, gato_out)
#      gato_out.close()
#      return jsonify({ 'Correct': 'Guardado Correctamente' }), 200
#    else:
#      gato=Gato(nombre,color,edad)
#      gato_out = open('gato_save.txt', 'wb')
#      pickle.dump(gato, gato_out)
#      gato_out.close()
#      return jsonify({ 'Correct': 'Guardado Correctamente' }), 200

app.run()