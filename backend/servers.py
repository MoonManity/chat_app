from time import ctime

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
        self.servers = {} #HashMap of Keys( Ids(String), ServerObjects )
        
    def clear_servers(self) -> None:
        self.servers.clear()

    def server_check(self, id: str) -> bool:
        if id in self.servers:
            return True
        return False

    def server_pw_check(self, id: str, password: str) -> bool | Exception:
        if self.servers[id].password == password:
            return True
        return False


    def create_server(self, host: str, id: str, password: str) -> str:
        if self.server_check(id):
            print(f"Server with id {id} already exists")
            return "Failed" 
        print(f"Server with id {id} has been successfully added")
        self.servers[id] = Server(host, id, password)
        self.servers[id].users.append(host)
        return "Success"

    def add_user_to_server(self, username: str, id: str, password: str) -> bool:
        if self.server_check(id):
            if self.server_pw_check(id, password):
                if self.servers[id].users.append(username):
                    print(f"User: {username} successfully added to Server: {id}")
                    return True 
        print(f"User: {username} could not be added to Server: {id}")
        return False

    def add_message(self, id: str, username: str, message: str) -> None:
        server = self.servers[id] 
        if username in server.users:
            server.messages[ len(server.messages) ] = { username: message }
            return
        print("Username is not in server")



