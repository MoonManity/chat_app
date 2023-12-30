from flask import Flask, session, request, Response, jsonify
import flask
from flask_session import Session
from flask_cors import CORS 
from time import ctime
from uuid import uuid4
import servers

secret = uuid4().hex

TIME = ctime()
DAY: str = TIME.split(" ")[2]

tracker = servers.ServerTracker()

app = Flask(__name__)
# app.config["SECRET_KEY"] = secret
# Session(app)
CORS(app)

@app.route("/")
def home():
    return "Hello Chat" 

@app.route("/newServer/<host>/<id>/<password>", methods=["POST", "GET"])
def new_server(host, id, password):
    result = tracker.create_server(host, id, password)
    print(tracker.servers)
    print(result)
    if request.method == "GET":
        match result:
            case "Id Error":
                return jsonify({ "Result": "idfail" })
            case "Success":
                return jsonify({ "Result": "success" })
    return Response(result, 200)

@app.route("/addUser/<username>/<id>/<password>", methods=["POST", "GET"])
def add_user(username, id, password):
    result = tracker.add_user_to_server(username, id, password)
    print(result)
    if request.method == "GET":
        match result:
            case "Name Error":
                return jsonify({"Result": "namefail"}) 
            case "Code Error":
                return jsonify({"Result": "codefail" })
            case "Id Error":
                return jsonify({ "Result": "idfail"})
            case "Success":
                return jsonify({ "Result": result,
                                "Server-id": id,
                                "Users": tracker.servers[id].users})
    return Response(result, 200)

@app.route("/removeUser/<id>/<username>", methods=['POST', 'GET'])
def removeUser(username, id):
    result = tracker.remove_user(id, username)
    if request.method == "GET":
        return jsonify({ "Result": result })
    return Response(str(result), 200)

@app.route("/sendMessage", methods=["POST", "GET"])
def send_message():
    if request.method == "POST":
        id = str(request.args.get("id"))
        username = str(request.args.get("username"))
        message = str(request.args.get("message"))
        tracker.add_message(id, username, message)
        print(tracker.servers[id].messages)
        return Response("success", 201)
    else:
        id = str(request.args.get("id"))
        print(tracker.servers[id].users) 
        return jsonify({"data": tracker.servers[id].messages})

if __name__ == "__main__":
    app.run(port=5885)
