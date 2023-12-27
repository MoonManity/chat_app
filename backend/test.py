import requests
import json
create_server = requests.post("http://localhost:5885/newServer/tunitii/5885/1234")
host_message = requests.post("http://localhost:5885/sendMessage?id=5885&username=tunitii&message=Yo whats up")
add_user = requests.post("http://localhost:5885/addUser/User123/5885/1234")
user_message = requests.post("http://localhost:5885/sendMessage?id=5885&username=User123&message=my guyyyyyy")
server_messages = requests.get("http://localhost:5885/sendMessage?id=5885")

print(create_server)
print(host_message)
print(user_message)
print(user_message)
print(server_messages.text)
