import tkinter
from tkinter import filedialog as fd
import git



window = tkinter.Tk()
window.title("Version Installer")
window.geometry('800x500')

def selectFolder():
    filename = fd.askdirectory()
    git.Git(filename).clone("https://github.com/ParkerFink/Server-File-Explorer.git")



selectFolderButton = tkinter.Button(text="Select where to install", command=selectFolder)
selectFolderButton.pack()




window.mainloop()


git.Git("empty").clone("https://github.com/ParkerFink/Server-File-Explorer.git")