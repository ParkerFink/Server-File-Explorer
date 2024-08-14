import cmd
import os
import json
import datetime

#serverStart = datetime.datetime.now()
#print(serverStart)
#with open("Logs/" + str(serverStart) + ".txt", 'w') as outFile:
    #outFile.write('Server Start \n')
    #outFile.write(str(serverStart) + "\n")

    
class CLI(cmd.Cmd): 

    with open('config.json', 'r') as inFile:
        file = json.load(inFile)


        intro = "HELLO! For help type `help` into the terminal for help. To return to the terminal when the server has stopped, hit `CTRL+C`."
        print("Type 'start' to start the server")
    
        prompt = "File Explorer " + "v" + file["version"]  +  "> " 

#main functions
    def do_start(self, blank):
        
        os.system('node main.js')
    
    def do_list(self, dir):
        print(os.listdir("Storage/" + dir))
        

    def do_rmf(self, dir):
        os.remove("Storage/" + dir)
        print('Removed: ', dir)

    def do_setup(self, blank):
        os.system('python3 setup.py || python setup.py')

    def do_exit(self, blank):
        exit()

    def do_clear(self, blank):
        os.system('cls || clear')
    
    def do_config(self, item):
        

        tag = item.split()
        print(tag)

        with open('config.json', 'r') as jsonFile:
            file = json.load(jsonFile)
            
            file[tag[0]] = tag[1]

            with open('config.json', 'w') as jsonFile:
                json.dump(file, jsonFile)

#help
    def help_start(self):
        print("Starts the `main.js` file and the server is started.")

    def help_list(self):
        print("Lists all files in the directory provided")

    def help_rmf(self):
        print("Removes provided file")
    
    def help_exit(self):
        print("Exits the terminal entirely")

    def help_clear(self):
        print("Clears all text in the terminal")

    def help_config(self):
        print("Used to change the config.json file")

    

cli = CLI()
cli.cmdloop()