from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import servers

tracker = servers.ServerTracker()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
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

@app.route("/removeUser/<id>/<username>", methods=["POST", "GET"])
def removeUser(username, id):
    result = tracker.remove_user(id, username)
    if request.method == "GET":
        return jsonify({ "Result": result })
    return Response(str(result), 200)

@app.route("/getMessages/<room>", methods=["GET"])
def send_message(room):
        id = room 
        print(f"Sending messages for id: {id}")
        print(f"Messages:\n{tracker.servers[id].messages}")
        return jsonify({"Data": tracker.servers[id].messages})

@socketio.on('message')
def handle_message(data):
    print(data)

    id = data["id"]
    username = data["username"]
    message = data["message"]

    tracker.add_message(id, username, message)
    server_messages = tracker.servers[id].messages
    socketio.emit('message', { "id": id, "messages": server_messages })

if __name__ == "__main__":
    socketio.run(app, use_reloader=True, log_output=True, port=5885)
