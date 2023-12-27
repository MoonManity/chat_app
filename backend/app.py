from flask import Flask, session, request, Response, jsonify
from flask_session import Session
from flask_cors import CORS 
from time import ctime
import servers

TIME = ctime()
DAY: str = TIME.split(" ")[2]

tracker = servers.ServerTracker()

app = Flask("__name__")
Session(app)
CORS(app)

@app.route("/")
def home():
    return "Hello Chat" 

@app.route("/newServer/<host>/<id>/<password>", methods=['POST'])
def new_server(host, id, password):
    session["Server"] = id
    result = tracker.create_server(host, id, password)
    print(tracker.servers)
    return Response(result ,201)

@app.route("/sendMessage", methods=['POST', 'GET'])
def send_message():
    if request.method == "POST":
        id = str(request.args.get("id"))
        username = str(request.args.get("username"))
        message = str(request.args.get("message"))
        tracker.add_message(id, username, message)
        print(jsonify(tracker.servers[id].messages))
        return Response("Success", 201)
    else:
        id = str(request.args.get("id"))
        print(tracker.servers[id].users) 
        return jsonify(tracker.servers[id].messages)

@app.route("/addUser/<username>/<id>/<password>", methods=['POST'])
def add_user(username, id, password):
    result = tracker.add_user_to_server(username, id, password)
    if result:
        session["Server"] = id
        return Response(str(
            jsonify({
                "Result": result, 
                 "Server-id": id,
                 "Users": tracker.servers[id].users
                 })))
    return Response(str(jsonify({"Result": result})))
    

if __name__ == "__main__":
    app.run(port=5885)
