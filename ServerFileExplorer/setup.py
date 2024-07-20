import os



storageFolder = 'Storage/'
os.system('npm i')


if os.path.exists(storageFolder) == True:
    print("Storage Directory Already Exists")
    pass

else:
    os.mkdir(storageFolder)

