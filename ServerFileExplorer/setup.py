import os






storageFolder = os.path.isdir('Storage/')
folderSize = os.path.isfile('foldersize.txt')

os.system('npm i')


if storageFolder == True:
    print("Storage Folder Exists")
    pass
else:
    print('Creating Storage Folder')
    os.mkdir("Storage/")


if folderSize == True:
    print("foldersize.txt Already Exists")
    pass
else:
    print("Creating foldersize.txt")
    with open('foldersize.txt', 'w') as outFile:
        outFile.write('')



