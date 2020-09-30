dict={"name" : "zs", "age":18,"city":"深圳","tel":"1362626627"}
dic_list = sorted(dict.items(),key=lambda i:i[0],reverse=False)
print( "sorted根据字典键排序", list)
new_dict={}
for each_dic in dic_list :
	new_dict[each_dic[0]]=each_dic [1]
print("新字典",new_dict)
