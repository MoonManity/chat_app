from time import ctime
from typing import Dict

class AuthenticationError(Exception):
    #Thrown for Error when users are not allowed to create/join a server
    pass

class ServerError(Exception):
    #Thrown when a server does not exist in the database
    pass

class UsernameError(Exception):
    #Thrown when a username is already taken on a server
    pass

class PasswordError(Exception):
    #Thrown when a user cannot be authenticated due to submitting the wrong password
    pass

class Server():
    def __init__(self, host, id, pw):
        self.host = host
        self.id = id
        self.password = pw
        self.users = [] #List of Strings for user-ids
        self.messages = {}

class ServerTracker():
    def __init__(self):
        T = ctime()
        self.DAY = T.split(' ')[2]
        self.servers: Dict[str, Server]= {} #HashMap of Keys( Ids(String), ServerObjects )
        
    def clear_servers(self) -> None:
        self.servers.clear()

    def server_check(self, id: str) -> bool:
        if id in self.servers.keys():
            return True
        return False 

    def server_pw_check(self, id: str, password: str) -> bool:
        if self.servers[id].password == password:
            return True
        return False


    def create_server(self, host: str, id: str, password: str) -> str | Exception:
        if self.server_check(id):
            print(f"Server with id {id} already exists")
            return AuthenticationError("This server already exists")

        self.servers[id] = Server(host, id, password)
        self.servers[id].users.append(host)
        print(f"Server with id {id} has been successfully added")
        return "Success"

    def add_user_to_server(self, username: str, id: str, password: str) -> str | Exception:
        if self.server_check(id):
            if self.server_pw_check(id, password):
                if username not in self.servers[id].users:
                    self.servers[id].users.append(username)
                    print(f"User: {username} successfully added to Server: {id}")
                    return "Success"
                return UsernameError(f"Username: {username} is already taken") 
            return PasswordError(f"Code: {password} is not correct") 
        return ServerError(f"Server with id: {id} does not exist") 

    def add_message(self, id: str, username: str, message: str) -> None | Exception:
        server = self.servers[id] 
        if username in server.users:
            server.messages[ len(server.messages) ] = { "username": username, "message": message }
            return
        return AuthenticationError("Username is not in server")

    def remove_user(self, id: str, username: str) -> bool | Exception:
        server = self.servers[id]
        print(server.users)
        if username in server.users:
            server.users = [i for i in server.users if i != username]
            if len(server.users) == 0:
                self.servers.pop(id)
            print(server.users)
            return True
        return UsernameError(f"User: {username} could not be removed") 
    
    def get_all_messages(self, id: str):
        return self.servers[id].messages




