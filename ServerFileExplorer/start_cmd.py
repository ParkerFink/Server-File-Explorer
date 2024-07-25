import cmd
import os
import json


class CLI(cmd.Cmd): 
    intro = "HELLO! For help type `help` into the terminal for help. To return to the terminal when the server has stopped, hit `CTRL+C`."
    
    prompt = "File Explorer> "

#main functions
    def do_start(self, blank):
        os.system('node main.js')
    
    def do_list(self, dir):
        print(os.listdir("Storage/" + dir))

    def do_rmf(self, dir):
        os.remove("Storage/" + dir)
        print('Removed: ', dir)


    def do_exit(self, blank):
        exit()

    def do_clear(self, blank):
        os.system('cls || clear')
    
    def do_fe(self, tag):
        configFile = open('config.json')
        configData = json.load(configFile)

        if tag == '-V':
            print(configData["version"])

        if tag == '-IP':
            print(configData["ip"])

        if tag == '-PORT':
            print(configData["port"])

        if tag == "-TAB":
            print(configData["tabName"])

        configFile.close()

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

    def help_fe(self):
        print("fe stands for File Explorer")
        print("'fe' uses tags such as '-IP' or -V")
        print("Current tags: ")
        print("-V displays the current version of the program")
        print("-IP displays the current IP")
        print("-PORT displays the current PORT")
        print("-TAB displays the current tag name")

cli = CLI()
cli.cmdloop()