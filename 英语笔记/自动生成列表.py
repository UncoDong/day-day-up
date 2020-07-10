import os
for each in os.listdir('.'):
    print('- [%s](%s)'%(each,'./README.md'+each))
os.system("pause");
