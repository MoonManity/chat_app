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
        if id in self.servers.keys():
            return True
        return False

    def server_pw_check(self, id: str, password: str) -> bool | Exception:
        if self.servers[id].password == password:
            return True
        return False


    def create_server(self, host: str, id: str, password: str) -> str:
        if self.server_check(id):
            print(f"Server with id {id} already exists")
            return "IdFail" 
        print(f"Server with id {id} has been successfully added")
        self.servers[id] = Server(host, id, password)
        self.servers[id].users.append(host)
        return "Success"

    def add_user_to_server(self, username: str, id: str, password: str) -> str:
        if self.server_check(id):
            if self.server_pw_check(id, password):
                if username not in self.servers[id].users:
                    self.servers[id].users.append(username)
                    print(f"User: {username} successfully added to Server: {id}")
                    return "Success"
                else:
                    print("Username is taken")
                    return "Name Error"
            else:
                return "Code Error"
        print(f"User: {username} could not be added to Server: {id}")
        return "Id Error"

    def add_message(self, id: str, username: str, message: str) -> None:
        server = self.servers[id] 
        if username in server.users:
            server.messages[ len(server.messages) ] = { "username": username, "message": message }
            return
        print("Username is not in server")

    def remove_user(self, id: str, username: str) -> bool:
        server = self.servers[id]
        print(server.users)
        if username in server.users:
            server.users = [i for i in server.users if i != username]
            if len(server.users) == 0:
                self.servers.pop(id)
            print(server.users)
            return True
        return False


