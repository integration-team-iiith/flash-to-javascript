import json,collections
l=json.load(open("mfs1.json"))

def myfoo(a):
	a=int(a[0].split("_")[1].split(".")[0])
	return a

od = collections.OrderedDict(sorted(l["frames"].items(),key=myfoo))

l["frames"]=od

open("mfs2.json","w").write(json.dumps(l))
