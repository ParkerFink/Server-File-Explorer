import os
import platform





storageFolder = os.path.isdir('Storage/')
#logFolder = os.path.isdir("Logs/")
OS = platform.system()

print(OS)

os.system('npm i')


if storageFolder == True:
    print("Storage Folder Exists")
    pass
else:
    print('Creating Storage Folder')
    os.mkdir("Storage/")

print("Completed!")
input("Press ENTER To Exit: ")


