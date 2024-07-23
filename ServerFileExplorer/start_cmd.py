import cmd
import os



class CLI(cmd.Cmd): 
    
    prompt = "File Explorer> "

#main functions
    def do_startup(self, blank):
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
    
    def do_about(self, blank):
        with open('config.json', 'r') as inFile:
            print(inFile.read())

#help


cli = CLI()
cli.cmdloop()