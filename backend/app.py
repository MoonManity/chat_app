from flask import Flask, abort, Response, jsonify
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

@app.route("/newServer/<host>/<id>/<password>", methods=["POST","GET"])
def new_server(host, id, password):
    try:
        result = tracker.create_server(host, id, password)
        print(tracker.servers)
        print(result)
        return jsonify({"Result": result})
    except Exception as e:
        print(e)
        return abort(404, "Server could not be created")

@app.route("/addUser/<username>/<id>/<password>", methods=["POST", "GET"])
def add_user(username, id, password):
    try:
        result = tracker.add_user_to_server(username, id, password)
        print(result)
        return jsonify({ "Result": result,
                        "Server-id": id,
                        "Users": tracker.servers[id].users})
    except Exception as e:
        print(e)
        return abort(404, e)

@app.route("/removeUser/<id>/<username>", methods=["POST", "GET"])
def removeUser(username, id):
    try:
        result = tracker.remove_user(id, username)
        return jsonify({ "Result": result })
    except servers.UsernameError as e:
        print(e)
        return abort(404, e)


@app.route("/getInitMessages/<roomId>", methods=["GET"])
def getInitMessages(roomId):
        print(f"Sending messages for id: {roomId}")
        print(f"Messages:\n{tracker.servers[roomId].messages}")
        return jsonify({"messages": tracker.servers[roomId].messages})

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
