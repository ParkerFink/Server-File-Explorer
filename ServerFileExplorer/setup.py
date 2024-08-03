import os






storageFolder = os.path.isdir('Storage/')
logFolder = os.path.isdir("Logs/")
folderSize = os.path.isfile('foldersize.txt')

os.system('npm i')


if storageFolder == True:
    print("Storage Folder Exists")
    pass
else:
    print('Creating Storage Folder')
    os.mkdir("Storage/")

#if logFolder == True:
#    print("Log Folder Exists")
#    pass
#else:
#    print("Creating Log Folder")
#    os.mkdir("Logs/")


if folderSize == True:
    print("foldersize.txt Already Exists")
    pass
else:
    print("Creating foldersize.txt")
    with open('foldersize.txt', 'w') as outFile:
        outFile.write('0')



