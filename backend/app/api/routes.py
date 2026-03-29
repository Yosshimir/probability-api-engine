# import flask
# from flask import request, jsonify
# import pickle
# from Arithmetic import SequenceFactory
# from Statistic import DistributionFactory

# #Run server
# app = flask.Flask(__name__)
# app.config["DEBUG"] = True

# sequence_factory=SequenceFactory()

# #Create API

# @app.route('/', methods=['GET'])
# def home():
#     return "<h1>API Web</h1><p> This is a test.</p>"
    
# @app.route('/api/Socrates/CalculateSequence', methods=['POST'])
# def CalculateSequence():
#   calc_sequence = request.get_json(force=True)
#   tipo = calc_sequence.get("Type")
#   n = calc_sequence.get("n")
#   parameters = {"n":n}
#   t = sequence_factory.get_Instane(tipo,parameters)
#   if(tipo==None):
#      return jsonify({
#     'Error': "No hay datos de entrada"
#     })
#   return jsonify({
#     'Sequence': t.calculate(),
#     'Tipo': type(t).__name__
#   })
  
# @app.route('/api/Socrates/ProbabilityDistribution', methods=['POST'])
# def Probability():
#   prob_data = request.get_json(force=True)
  
#   for key, value in prob_data.items():
#     if key not in ("distribution", "Type"):
#       try:
#         prob_data[key] = int(value)  # Attempt int conversion first
#       except ValueError:
#         prob_data[key] = float(value)  # Fallback to float if int fails

#   distribution = prob_data.get("distribution") 
#   print(distribution)
#   tipo = prob_data.get("Type")
#   x=prob_data.get("x")
#   acc=prob_data.get("acc")
#   factory = DistributionFactory()
#   t = factory.get_instance(distribution,prob_data)
#   prob = t.get_probability(x,acc)
  
#   return jsonify({
#     'Probabilidad': prob,
#     'Tipo': type(t).__name__
#   })
  
# @app.route('/api/Socrates/Sampling', methods=['POST'])
# def Sampling():
#   prob_data = request.get_json(force=True)
  
#   for key, value in prob_data.items():
#     if key not in ("distribution", "Type"):
#       try:
#         prob_data[key] = int(value)  # Attempt int conversion first
#       except ValueError:
#         prob_data[key] = float(value)  # Fallback to float if int fails

#   distribution = prob_data.get("distribution") 
#   print(distribution)
#   n=prob_data.get("N")
#   factory = DistributionFactory()
#   t = factory.get_instance(distribution,prob_data)
#   samp = []
#   samp = t.get_sample(n)
#   print (samp)
#   return jsonify({
#     'Sampling': samp,
#   })
  
# app.run()

from flask import Blueprint, request, jsonify
from app.services.statistic import DistributionFactory
from app.services.arithmetic import SequenceFactory

routes = Blueprint("routes", __name__)

sequence_factory = SequenceFactory()


# Health check (opcional)
@routes.route("/", methods=["GET"])
def home():
    return jsonify({"message": "API running"})


# 🔢 Sequences
@routes.route("/api/v1/sequences", methods=["POST"])
def calculate_sequence():
    data = request.get_json()

    tipo = data.get("Type")
    n = data.get("n")

    if not tipo or n is None:
        return jsonify({"error": "Missing parameters"}), 400

    parameters = {"n": n}
    seq = sequence_factory.get_Instane(tipo, parameters)

    return jsonify({
        "Sequence": seq.calculate(),
        "Tipo": type(seq).__name__
    })


# 📊 Distributions
@routes.route("/api/v1/distributions", methods=["POST"])
def probability():
    data = request.get_json()

    # Conversión de tipos (mejor encapsulada)
    data = parse_numeric_values(data)

    factory = DistributionFactory()
    dist = factory.get_instance(data["distribution"], data)

    prob = dist.get_probability(data["x"], data.get("acc", 0))

    return jsonify({
        "Probabilidad": prob,
        "Tipo": type(dist).__name__
    })


# 🎲 Sampling
@routes.route("/api/v1/sampling", methods=["POST"])
def sampling():
    data = request.get_json()

    data = parse_numeric_values(data)

    factory = DistributionFactory()
    dist = factory.get_instance(data["distribution"], data)

    sample = dist.get_sample(data["N"])

    return jsonify({
        "Sampling": sample
    })


# 🔧 Helper (MUY importante)
def parse_numeric_values(data):
    for key, value in data.items():
        if key not in ("distribution", "Type"):
            try:
                data[key] = int(value)
            except:
                try:
                    data[key] = float(value)
                except:
                    pass
    return data