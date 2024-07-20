import os



storageFolder = 'Storage/'
folderSize = "./foldersize.txt"
os.system('npm i')


if os.path.exists(storageFolder and folderSize) == True:
    print("Storage Directory Already Exists")
    pass

else:
    os.mkdir(storageFolder)
    with open(folderSize, 'w') as outFile:
        outFile.write(' ')


