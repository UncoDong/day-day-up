import os
for each in os.listdir('.'):
    print('- [%s](%s)'%(each,'./'+each))
os.system("pause");
