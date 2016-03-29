(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
return y.__proto__&&y.__proto__.p===z.prototype.p}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isa=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isf)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="a"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="m"){processStatics(init.statics[b1]=b2.m,b3)
delete b2.m}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b6,b7,b8,b9,c0){var g=0,f=b7[g],e
if(typeof f=="string")e=b7[++g]
else{e=f
f=b8}var d=[b6[b8]=b6[f]=e]
e.$stubName=b8
c0.push(b8)
for(g++;g<b7.length;g++){e=b7[g]
if(typeof e!="function")break
if(!b9)e.$stubName=b7[++g]
d.push(e)
if(e.$stubName){b6[e.$stubName]=e
c0.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b7[g]
var a0=b7[g]
b7=b7.slice(++g)
var a1=b7[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b7[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b7[2]
if(typeof b0=="number")b7[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b7,b9,b8,a9)
b6[b8].$getter=e
e.$getterStub=true
if(b9){init.globalFunctions[b8]=e
c0.push(a0)}b6[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}var b2=b7.length>b1
if(b2){d[0].$reflectable=1
d[0].$reflectionInfo=b7
for(var c=1;c<d.length;c++){d[c].$reflectable=2
d[c].$reflectionInfo=b7}var b3=b9?init.mangledGlobalNames:init.mangledNames
var b4=b7[b1]
var b5=b4
if(a0)b3[a0]=b5
if(a4)b5+="="
else if(!a5)b5+=":"+(a2+a7)
b3[b8]=b5
d[0].$reflectionName=b5
d[0].$metadataIndex=b1+1
if(a7)b6[b4+"*"]=d[0]}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cP"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cP"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cP(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.a6=function(){}
var dart=[["","",,H,{"^":"",lA:{"^":"a;a"}}],["","",,J,{"^":"",
i:function(a){return void 0},
bL:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bI:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cU==null){H.kv()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(new P.ed("Return interceptor for "+H.b(y(a,z))))}w=H.kF(a)
if(w==null){if(typeof a=="function")return C.af
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.ao
else return C.aw}return w},
f:{"^":"a;",
q:function(a,b){return a===b},
gv:function(a){return H.a3(a)},
i:["d9",function(a){return H.bm(a)}],
by:["d8",function(a,b){throw H.d(P.dF(a,b.gcw(),b.gcB(),b.gcz(),null))},null,"gf0",2,0,null,10],
"%":"CanvasGradient|CanvasPattern|CanvasRenderingContext2D|MediaError|MediaKeyError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|SVGAnimatedTransformList|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture"},
hl:{"^":"f;",
i:function(a){return String(a)},
gv:function(a){return a?519018:218159},
$iski:1},
ho:{"^":"f;",
q:function(a,b){return null==b},
i:function(a){return"null"},
gv:function(a){return 0},
by:[function(a,b){return this.d8(a,b)},null,"gf0",2,0,null,10]},
c6:{"^":"f;",
gv:function(a){return 0},
i:["da",function(a){return String(a)}],
$ishp:1},
hN:{"^":"c6;"},
b0:{"^":"c6;"},
aS:{"^":"c6;",
i:function(a){var z=a[$.$get$bc()]
return z==null?this.da(a):J.a0(z)},
$isbg:1},
aO:{"^":"f;",
ce:function(a,b){if(!!a.immutable$list)throw H.d(new P.W(b))},
ao:function(a,b){if(!!a.fixed$length)throw H.d(new P.W(b))},
W:function(a,b){this.ao(a,"add")
a.push(b)},
cD:function(a,b){this.ao(a,"removeAt")
if(b<0||b>=a.length)throw H.d(P.az(b,null,null))
return a.splice(b,1)[0]},
S:function(a,b){var z
this.ao(a,"remove")
for(z=0;z<a.length;++z)if(J.aK(a[z],b)){a.splice(z,1)
return!0}return!1},
bk:function(a,b){var z
this.ao(a,"addAll")
for(z=J.ar(b);z.n();)a.push(z.gt())},
u:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.d(new P.N(a))}},
aw:function(a,b){return H.c(new H.aY(a,b),[null,null])},
K:function(a,b){return a[b]},
geJ:function(a){if(a.length>0)return a[0]
throw H.d(H.dp())},
bJ:function(a,b,c,d,e){var z,y
this.ce(a,"set range")
P.ci(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.p(P.Y(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.d(H.hj())
if(e<b)for(y=z-1;y>=0;--y)a[b+y]=d[e+y]
else for(y=0;y<z;++y)a[b+y]=d[e+y]},
eS:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.aK(a[z],b))return z
return-1},
eR:function(a,b){return this.eS(a,b,0)},
i:function(a){return P.bi(a,"[","]")},
gC:function(a){return new J.bS(a,a.length,0,null)},
gv:function(a){return H.a3(a)},
gj:function(a){return a.length},
sj:function(a,b){this.ao(a,"set length")
if(b<0)throw H.d(P.Y(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.J(a,b))
if(b>=a.length||b<0)throw H.d(H.J(a,b))
return a[b]},
E:function(a,b,c){this.ce(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.J(a,b))
if(b>=a.length||b<0)throw H.d(H.J(a,b))
a[b]=c},
$isaP:1,
$ish:1,
$ash:null,
$ism:1,
m:{
hk:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a)throw H.d(P.cZ(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.d(P.Y(a,0,4294967295,"length",null))
z=H.c(new Array(a),[b])
z.fixed$length=Array
return z}}},
lz:{"^":"aO;"},
bS:{"^":"a;a,b,c,d",
gt:function(){return this.d},
n:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(H.f4(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aQ:{"^":"f;",
bz:function(a,b){return a%b},
bB:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(new P.W(""+a))},
I:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(new P.W(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gv:function(a){return a&0x1FFFFFFF},
cP:function(a,b){if(typeof b!=="number")throw H.d(H.a5(b))
return a/b},
ag:function(a,b){if(typeof b!=="number")throw H.d(H.a5(b))
return a*b},
bG:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
an:function(a,b){return(a|0)===a?a/b|0:this.bB(a/b)},
d2:function(a,b){if(b<0)throw H.d(H.a5(b))
return b>31?0:a<<b>>>0},
bf:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
b_:function(a,b){if(typeof b!=="number")throw H.d(H.a5(b))
return a<b},
$isA:1},
dr:{"^":"aQ;",$isA:1,$isk:1},
hm:{"^":"aQ;",$isA:1},
aR:{"^":"f;",
bo:function(a,b){if(b>=a.length)throw H.d(H.J(a,b))
return a.charCodeAt(b)},
eZ:function(a,b,c){var z,y
if(c>b.length)throw H.d(P.Y(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.bo(b,c+y)!==this.bo(a,y))return
return new H.iA(c,b,a)},
fc:function(a,b,c,d){var z,y
H.bD(d)
H.cO(b)
c=P.ci(b,c,a.length,null,null,null)
H.cO(c)
z=a.substring(0,b)
y=a.substring(c)
return z+d+y},
d5:function(a,b,c){var z
H.cO(c)
if(c>a.length)throw H.d(P.Y(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.fi(b,a,c)!=null},
d4:function(a,b){return this.d5(a,b,0)},
b0:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.p(H.a5(c))
if(b<0)throw H.d(P.az(b,null,null))
if(b>c)throw H.d(P.az(b,null,null))
if(c>a.length)throw H.d(P.az(c,null,null))
return a.substring(b,c)},
d7:function(a,b){return this.b0(a,b,null)},
ag:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.d(C.I)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
eo:function(a,b,c){if(c>a.length)throw H.d(P.Y(c,0,a.length,null,null))
return H.kO(a,b,c)},
i:function(a){return a},
gv:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(b>=a.length||!1)throw H.d(H.J(a,b))
return a[b]},
$isaP:1,
$isw:1}}],["","",,H,{"^":"",
b2:function(a,b){var z=a.ar(b)
if(!init.globalState.d.cy)init.globalState.f.aB()
return z},
f2:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.i(y).$ish)throw H.d(P.R("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.jw(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$dm()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.j6(P.cb(null,H.b1),0)
y.z=H.c(new H.z(0,null,null,null,null,null,0),[P.k,H.cz])
y.ch=H.c(new H.z(0,null,null,null,null,null,0),[P.k,null])
if(y.x){x=new H.jv()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.hc,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.jx)}if(init.globalState.x)return
y=init.globalState.a++
x=H.c(new H.z(0,null,null,null,null,null,0),[P.k,H.bn])
w=P.ax(null,null,null,P.k)
v=new H.bn(0,null,!1)
u=new H.cz(y,x,w,init.createNewIsolate(),v,new H.ai(H.bM()),new H.ai(H.bM()),!1,!1,[],P.ax(null,null,null,null),null,null,!1,!0,P.ax(null,null,null,null))
w.W(0,0)
u.bO(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.bG()
x=H.aI(y,[y]).a5(a)
if(x)u.ar(new H.kM(z,a))
else{y=H.aI(y,[y,y]).a5(a)
if(y)u.ar(new H.kN(z,a))
else u.ar(a)}init.globalState.f.aB()},
hg:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x)return H.hh()
return},
hh:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.d(new P.W("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.d(new P.W('Cannot extract URI from "'+H.b(z)+'"'))},
hc:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bz(!0,[]).a0(b.data)
y=J.L(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bz(!0,[]).a0(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bz(!0,[]).a0(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.c(new H.z(0,null,null,null,null,null,0),[P.k,H.bn])
p=P.ax(null,null,null,P.k)
o=new H.bn(0,null,!1)
n=new H.cz(y,q,p,init.createNewIsolate(),o,new H.ai(H.bM()),new H.ai(H.bM()),!1,!1,[],P.ax(null,null,null,null),null,null,!1,!0,P.ax(null,null,null,null))
p.W(0,0)
n.bO(0,o)
init.globalState.f.a.U(new H.b1(n,new H.hd(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aB()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.fk(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.aB()
break
case"close":init.globalState.ch.S(0,$.$get$dn().h(0,a))
a.terminate()
init.globalState.f.aB()
break
case"log":H.hb(y.h(z,"msg"))
break
case"print":if(init.globalState.x){y=init.globalState.Q
q=P.ak(["command","print","msg",z])
q=new H.an(!0,P.aD(null,P.k)).N(q)
y.toString
self.postMessage(q)}else P.b5(y.h(z,"msg"))
break
case"error":throw H.d(y.h(z,"msg"))}},null,null,4,0,null,13,6],
hb:function(a){var z,y,x,w
if(init.globalState.x){y=init.globalState.Q
x=P.ak(["command","log","msg",a])
x=new H.an(!0,P.aD(null,P.k)).N(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.B(w)
z=H.M(w)
throw H.d(P.bf(z))}},
he:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dK=$.dK+("_"+y)
$.dL=$.dL+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.T(0,["spawned",new H.bB(y,x),w,z.r])
x=new H.hf(a,b,c,d,z)
if(e){z.cb(w,w)
init.globalState.f.a.U(new H.b1(z,x,"start isolate"))}else x.$0()},
jW:function(a){return new H.bz(!0,[]).a0(new H.an(!1,P.aD(null,P.k)).N(a))},
kM:{"^":"e:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
kN:{"^":"e:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
jw:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",m:{
jx:[function(a){var z=P.ak(["command","print","msg",a])
return new H.an(!0,P.aD(null,P.k)).N(z)},null,null,2,0,null,15]}},
cz:{"^":"a;a,b,c,eW:d<,ep:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
cb:function(a,b){if(!this.f.q(0,a))return
if(this.Q.W(0,b)&&!this.y)this.y=!0
this.bh()},
f9:function(a){var z,y,x,w,v
if(!this.y)return
z=this.Q
z.S(0,a)
if(z.a===0){for(z=this.z;z.length!==0;){y=z.pop()
x=init.globalState.f.a
w=x.b
v=x.a
w=(w-1&v.length-1)>>>0
x.b=w
v[w]=y
if(w===x.c)x.c1();++x.d}this.y=!1}this.bh()},
ef:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.i(a),y=0;x=this.ch,y<x.length;y+=2)if(z.q(a,x[y])){this.ch[y+1]=b
return}x.push(a)
this.ch.push(b)},
f8:function(a){var z,y,x
if(this.ch==null)return
for(z=J.i(a),y=0;x=this.ch,y<x.length;y+=2)if(z.q(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.p(new P.W("removeRange"))
P.ci(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
d1:function(a,b){if(!this.r.q(0,a))return
this.db=b},
eN:function(a,b,c){var z
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){a.T(0,c)
return}z=this.cx
if(z==null){z=P.cb(null,null)
this.cx=z}z.U(new H.jn(a,c))},
eM:function(a,b){var z
if(!this.r.q(0,a))return
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){this.bx()
return}z=this.cx
if(z==null){z=P.cb(null,null)
this.cx=z}z.U(this.geX())},
eO:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.b5(a)
if(b!=null)P.b5(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.a0(a)
y[1]=b==null?null:b.i(0)
for(x=new P.cA(z,z.r,null,null),x.c=z.e;x.n();)x.d.T(0,y)},
ar:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.B(u)
w=t
v=H.M(u)
this.eO(w,v)
if(this.db){this.bx()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.geW()
if(this.cx!=null)for(;t=this.cx,!t.ga1(t);)this.cx.cE().$0()}return y},
eL:function(a){var z=J.L(a)
switch(z.h(a,0)){case"pause":this.cb(z.h(a,1),z.h(a,2))
break
case"resume":this.f9(z.h(a,1))
break
case"add-ondone":this.ef(z.h(a,1),z.h(a,2))
break
case"remove-ondone":this.f8(z.h(a,1))
break
case"set-errors-fatal":this.d1(z.h(a,1),z.h(a,2))
break
case"ping":this.eN(z.h(a,1),z.h(a,2),z.h(a,3))
break
case"kill":this.eM(z.h(a,1),z.h(a,2))
break
case"getErrors":this.dx.W(0,z.h(a,1))
break
case"stopErrors":this.dx.S(0,z.h(a,1))
break}},
cv:function(a){return this.b.h(0,a)},
bO:function(a,b){var z=this.b
if(z.G(a))throw H.d(P.bf("Registry: ports must be registered only once."))
z.E(0,a,b)},
bh:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.E(0,this.a,this)
else this.bx()},
bx:[function(){var z,y,x
z=this.cx
if(z!=null)z.X(0)
for(z=this.b,y=z.gaF(z),y=y.gC(y);y.n();)y.gt().dA()
z.X(0)
this.c.X(0)
init.globalState.z.S(0,this.a)
this.dx.X(0)
if(this.ch!=null){for(x=0;z=this.ch,x<z.length;x+=2)z[x].T(0,z[x+1])
this.ch=null}},"$0","geX",0,0,2]},
jn:{"^":"e:2;a,b",
$0:[function(){this.a.T(0,this.b)},null,null,0,0,null,"call"]},
j6:{"^":"a;a,b",
ey:function(){var z=this.a
if(z.b===z.c)return
return z.cE()},
cI:function(){var z,y,x
z=this.ey()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.G(init.globalState.e.a))if(init.globalState.r){y=init.globalState.e.b
y=y.ga1(y)}else y=!1
else y=!1
else y=!1
if(y)H.p(P.bf("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x){x=y.z
x=x.ga1(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ak(["command","close"])
x=new H.an(!0,H.c(new P.eo(0,null,null,null,null,null,0),[null,P.k])).N(x)
y.toString
self.postMessage(x)}return!1}z.f5()
return!0},
c7:function(){if(self.window!=null)new H.j7(this).$0()
else for(;this.cI(););},
aB:function(){var z,y,x,w,v
if(!init.globalState.x)this.c7()
else try{this.c7()}catch(x){w=H.B(x)
z=w
y=H.M(x)
w=init.globalState.Q
v=P.ak(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.an(!0,P.aD(null,P.k)).N(v)
w.toString
self.postMessage(v)}}},
j7:{"^":"e:2;a",
$0:function(){if(!this.a.cI())return
P.iK(C.p,this)}},
b1:{"^":"a;a,b,c",
f5:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ar(this.b)}},
jv:{"^":"a;"},
hd:{"^":"e:1;a,b,c,d,e,f",
$0:function(){H.he(this.a,this.b,this.c,this.d,this.e,this.f)}},
hf:{"^":"e:2;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(!this.d)this.a.$1(this.c)
else{y=this.a
x=H.bG()
w=H.aI(x,[x,x]).a5(y)
if(w)y.$2(this.b,this.c)
else{x=H.aI(x,[x]).a5(y)
if(x)y.$1(this.b)
else y.$0()}}z.bh()}},
eg:{"^":"a;"},
bB:{"^":"eg;b,a",
T:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.c)return
x=H.jW(b)
if(z.gep()===y){z.eL(x)
return}y=init.globalState.f
w="receive "+H.b(b)
y.a.U(new H.b1(z,new H.jz(this,x),w))},
q:function(a,b){if(b==null)return!1
return b instanceof H.bB&&this.b===b.b},
gv:function(a){return this.b.a}},
jz:{"^":"e:1;a,b",
$0:function(){var z=this.a.b
if(!z.c)z.dq(this.b)}},
cC:{"^":"eg;b,c,a",
T:function(a,b){var z,y,x
z=P.ak(["command","message","port",this,"msg",b])
y=new H.an(!0,P.aD(null,P.k)).N(z)
if(init.globalState.x){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
q:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.cC){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return(this.b<<16^this.a<<8^this.c)>>>0}},
bn:{"^":"a;a,b,c",
dA:function(){this.c=!0
this.b=null},
dq:function(a){if(this.c)return
this.dM(a)},
dM:function(a){return this.b.$1(a)},
$ishT:1},
iG:{"^":"a;a,b,c",
dm:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.U(new H.b1(y,new H.iI(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aq(new H.iJ(this,b),0),a)}else throw H.d(new P.W("Timer greater than 0."))},
m:{
iH:function(a,b){var z=new H.iG(!0,!1,null)
z.dm(a,b)
return z}}},
iI:{"^":"e:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
iJ:{"^":"e:2;a,b",
$0:[function(){this.a.c=null;--init.globalState.f.b
this.b.$0()},null,null,0,0,null,"call"]},
ai:{"^":"a;a",
gv:function(a){var z=this.a
z=C.c.bf(z,0)^C.c.an(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
q:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ai){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
an:{"^":"a;a,b",
N:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.E(0,a,z.gj(z))
z=J.i(a)
if(!!z.$isdA)return["buffer",a]
if(!!z.$isbl)return["typed",a]
if(!!z.$isaP)return this.cY(a)
if(!!z.$isha){x=this.gcV()
w=a.gH()
w=H.aX(w,x,H.P(w,"v",0),null)
w=P.a2(w,!0,H.P(w,"v",0))
z=z.gaF(a)
z=H.aX(z,x,H.P(z,"v",0),null)
return["map",w,P.a2(z,!0,H.P(z,"v",0))]}if(!!z.$ishp)return this.cZ(a)
if(!!z.$isf)this.cM(a)
if(!!z.$ishT)this.aE(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbB)return this.d_(a)
if(!!z.$iscC)return this.d0(a)
if(!!z.$ise){v=a.$static_name
if(v==null)this.aE(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isai)return["capability",a.a]
if(!(a instanceof P.a))this.cM(a)
return["dart",init.classIdExtractor(a),this.cX(init.classFieldsExtractor(a))]},"$1","gcV",2,0,0,9],
aE:function(a,b){throw H.d(new P.W(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
cM:function(a){return this.aE(a,null)},
cY:function(a){var z=this.cW(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aE(a,"Can't serialize indexable: ")},
cW:function(a){var z,y
z=[]
C.b.sj(z,a.length)
for(y=0;y<a.length;++y)z[y]=this.N(a[y])
return z},
cX:function(a){var z
for(z=0;z<a.length;++z)C.b.E(a,z,this.N(a[z]))
return a},
cZ:function(a){var z,y,x
if(!!a.constructor&&a.constructor!==Object)this.aE(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.sj(y,z.length)
for(x=0;x<z.length;++x)y[x]=this.N(a[z[x]])
return["js-object",z,y]},
d0:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
d_:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.a]
return["raw sendport",a]}},
bz:{"^":"a;a,b",
a0:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.d(P.R("Bad serialized message: "+H.b(a)))
switch(C.b.geJ(a)){case"ref":return this.b[a[1]]
case"buffer":z=a[1]
this.b.push(z)
return z
case"typed":z=a[1]
this.b.push(z)
return z
case"fixed":z=a[1]
this.b.push(z)
y=H.c(this.aq(z),[null])
y.fixed$length=Array
return y
case"extendable":z=a[1]
this.b.push(z)
return H.c(this.aq(z),[null])
case"mutable":z=a[1]
this.b.push(z)
return this.aq(z)
case"const":z=a[1]
this.b.push(z)
y=H.c(this.aq(z),[null])
y.fixed$length=Array
return y
case"map":return this.eB(a)
case"sendport":return this.eC(a)
case"raw sendport":z=a[1]
this.b.push(z)
return z
case"js-object":return this.eA(a)
case"function":z=init.globalFunctions[a[1]]()
this.b.push(z)
return z
case"capability":return new H.ai(a[1])
case"dart":x=a[1]
w=a[2]
v=init.instanceFromClassId(x)
this.b.push(v)
this.aq(w)
return init.initializeEmptyInstance(x,v,w)
default:throw H.d("couldn't deserialize: "+H.b(a))}},"$1","gez",2,0,0,9],
aq:function(a){var z
for(z=0;z<a.length;++z)C.b.E(a,z,this.a0(a[z]))
return a},
eB:function(a){var z,y,x,w,v
z=a[1]
y=a[2]
x=P.hA()
this.b.push(x)
z=J.bP(z,this.gez()).ff(0)
for(w=J.L(y),v=0;v<z.length;++v)x.E(0,z[v],this.a0(w.h(y,v)))
return x},
eC:function(a){var z,y,x,w,v,u,t
z=a[1]
y=a[2]
x=a[3]
w=init.globalState.b
if(z==null?w==null:z===w){v=init.globalState.z.h(0,y)
if(v==null)return
u=v.cv(x)
if(u==null)return
t=new H.bB(u,y)}else t=new H.cC(z,x,y)
this.b.push(t)
return t},
eA:function(a){var z,y,x,w,v,u
z=a[1]
y=a[2]
x={}
this.b.push(x)
for(w=J.L(z),v=J.L(y),u=0;u<w.gj(z);++u)x[w.h(z,u)]=this.a0(v.h(y,u))
return x}}}],["","",,H,{"^":"",
kp:function(a){return init.types[a]},
kD:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.i(a).$isaT},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.a0(a)
if(typeof z!=="string")throw H.d(H.a5(a))
return z},
a3:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
dH:function(a,b){throw H.d(new P.c3(a,null,null))},
hR:function(a,b,c){var z,y
H.bD(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.dH(a,c)
y=z[3]
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.dH(a,c)},
b_:function(a){var z,y,x,w,v,u,t,s
z=J.i(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.a7||!!J.i(a).$isb0){v=C.r(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.k.bo(w,0)===36)w=C.k.d7(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.eW(H.cS(a),0,null),init.mangledGlobalNames)},
bm:function(a){return"Instance of '"+H.b_(a)+"'"},
G:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
dJ:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.a5(a))
return a[b]},
dI:function(a,b,c){var z,y,x
z={}
z.a=0
y=[]
x=[]
z.a=b.length
C.b.bk(y,b)
z.b=""
if(c!=null&&!c.ga1(c))c.u(0,new H.hQ(z,y,x))
return J.fj(a,new H.hn(C.au,""+"$"+z.a+z.b,0,y,x,null))},
hP:function(a,b){var z,y
z=b instanceof Array?b:P.a2(b,!0,null)
y=z.length
if(y===0){if(!!a.$0)return a.$0()}else if(y===1){if(!!a.$1)return a.$1(z[0])}else if(y===2){if(!!a.$2)return a.$2(z[0],z[1])}else if(y===3)if(!!a.$3)return a.$3(z[0],z[1],z[2])
return H.hO(a,z)},
hO:function(a,b){var z,y,x,w,v,u
z=b.length
y=a[""+"$"+z]
if(y==null){y=J.i(a)["call*"]
if(y==null)return H.dI(a,b,null)
x=H.dN(y)
w=x.d
v=w+x.e
if(x.f||w>z||v<z)return H.dI(a,b,null)
b=P.a2(b,!0,null)
for(u=z;u<v;++u)C.b.W(b,init.metadata[x.ev(0,u)])}return y.apply(a,b)},
J:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ah(!0,b,"index",null)
z=J.aL(a)
if(b<0||b>=z)return P.bh(b,a,"index",null,z)
return P.az(b,"index",null)},
a5:function(a){return new P.ah(!0,a,null,null)},
aJ:function(a){return a},
cO:function(a){return a},
bD:function(a){if(typeof a!=="string")throw H.d(H.a5(a))
return a},
d:function(a){var z
if(a==null)a=new P.ch()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.f5})
z.name=""}else z.toString=H.f5
return z},
f5:[function(){return J.a0(this.dartException)},null,null,0,0,null],
p:function(a){throw H.d(a)},
f4:function(a){throw H.d(new P.N(a))},
B:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.kR(a)
if(a==null)return
if(a instanceof H.c2)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.bf(x,16)&8191)===10)switch(w){case 438:return z.$1(H.c7(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.dG(v,null))}}if(a instanceof TypeError){u=$.$get$e2()
t=$.$get$e3()
s=$.$get$e4()
r=$.$get$e5()
q=$.$get$e9()
p=$.$get$ea()
o=$.$get$e7()
$.$get$e6()
n=$.$get$ec()
m=$.$get$eb()
l=u.P(y)
if(l!=null)return z.$1(H.c7(y,l))
else{l=t.P(y)
if(l!=null){l.method="call"
return z.$1(H.c7(y,l))}else{l=s.P(y)
if(l==null){l=r.P(y)
if(l==null){l=q.P(y)
if(l==null){l=p.P(y)
if(l==null){l=o.P(y)
if(l==null){l=r.P(y)
if(l==null){l=n.P(y)
if(l==null){l=m.P(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dG(y,l==null?null:l.method))}}return z.$1(new H.iM(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dX()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ah(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dX()
return a},
M:function(a){var z
if(a instanceof H.c2)return a.b
if(a==null)return new H.ep(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ep(a,null)},
kI:function(a){if(a==null||typeof a!='object')return J.C(a)
else return H.a3(a)},
eP:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.E(0,a[y],a[x])}return b},
kx:[function(a,b,c,d,e,f,g){switch(c){case 0:return H.b2(b,new H.ky(a))
case 1:return H.b2(b,new H.kz(a,d))
case 2:return H.b2(b,new H.kA(a,d,e))
case 3:return H.b2(b,new H.kB(a,d,e,f))
case 4:return H.b2(b,new H.kC(a,d,e,f,g))}throw H.d(P.bf("Unsupported number of arguments for wrapped closure"))},null,null,14,0,null,14,12,16,17,21,30,31],
aq:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.kx)
a.$identity=z
return z},
fz:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.i(c).$ish){z.$reflectionInfo=c
x=H.dN(z).r}else x=c
w=d?Object.create(new H.is().constructor.prototype):Object.create(new H.bT(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.X
$.X=u+1
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.d3(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.kp,x)
else if(u&&typeof x=="function"){q=t?H.d1:H.bU
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.d3(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
fw:function(a,b,c,d){var z=H.bU
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
d3:function(a,b,c){var z,y,x,w,v,u
if(c)return H.fy(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.fw(y,!w,z,b)
if(y===0){w=$.at
if(w==null){w=H.bb("self")
$.at=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.X
$.X=v+1
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.at
if(v==null){v=H.bb("self")
$.at=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.X
$.X=w+1
return new Function(v+H.b(w)+"}")()},
fx:function(a,b,c,d){var z,y
z=H.bU
y=H.d1
switch(b?-1:a){case 0:throw H.d(new H.ih("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fy:function(a,b){var z,y,x,w,v,u,t,s
z=H.fs()
y=$.d0
if(y==null){y=H.bb("receiver")
$.d0=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fx(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.X
$.X=u+1
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.X
$.X=u+1
return new Function(y+H.b(u)+"}")()},
cP:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.i(c).$ish){c.fixed$length=Array
z=c}else z=c
return H.fz(a,b,z,!!d,e,f)},
kP:function(a){if(typeof a==="string"||a==null)return a
throw H.d(H.bW(H.b_(a),"String"))},
kK:function(a,b){var z=J.L(b)
throw H.d(H.bW(H.b_(a),z.b0(b,3,z.gj(b))))},
eT:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.i(a)[b]
else z=!0
if(z)return a
H.kK(a,b)},
cW:function(a){if(!!J.i(a).$ish||a==null)return a
throw H.d(H.bW(H.b_(a),"List"))},
kQ:function(a){throw H.d(new P.fG("Cyclic initialization for static "+H.b(a)))},
aI:function(a,b,c){return new H.ii(a,b,c,null)},
bG:function(){return C.H},
bM:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
eR:function(a){return init.getIsolateTag(a)},
c:function(a,b){a.$builtinTypeInfo=b
return a},
cS:function(a){if(a==null)return
return a.$builtinTypeInfo},
eS:function(a,b){return H.f3(a["$as"+H.b(b)],H.cS(a))},
P:function(a,b,c){var z=H.eS(a,b)
return z==null?null:z[c]},
l:function(a,b){var z=H.cS(a)
return z==null?null:z[b]},
b6:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.eW(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)if(b==null)return C.c.i(a)
else return b.$1(a)
else return},
eW:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bt("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.b6(u,c))}return w?"":"<"+H.b(z)+">"},
f3:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
kd:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.Q(a[y],b[y]))return!1
return!0},
eM:function(a,b,c){return a.apply(b,H.eS(b,c))},
Q:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.eU(a,b)
if('func' in a)return b.builtin$cls==="bg"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.b6(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.b6(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.kd(H.f3(v,z),x)},
eI:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.Q(z,v)||H.Q(v,z)))return!1}return!0},
kc:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.Q(v,u)||H.Q(u,v)))return!1}return!0},
eU:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.Q(z,y)||H.Q(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.eI(x,w,!1))return!1
if(!H.eI(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.Q(o,n)||H.Q(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.Q(o,n)||H.Q(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.Q(o,n)||H.Q(n,o)))return!1}}return H.kc(a.named,b.named)},
mD:function(a){var z=$.cT
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
mB:function(a){return H.a3(a)},
mA:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
kF:function(a){var z,y,x,w,v,u
z=$.cT.$1(a)
y=$.bF[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bJ[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.eH.$2(a,z)
if(z!=null){y=$.bF[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bJ[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cX(x)
$.bF[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bJ[z]=x
return x}if(v==="-"){u=H.cX(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.eZ(a,x)
if(v==="*")throw H.d(new P.ed(z))
if(init.leafTags[z]===true){u=H.cX(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.eZ(a,x)},
eZ:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bL(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cX:function(a){return J.bL(a,!1,null,!!a.$isaT)},
kH:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bL(z,!1,null,!!z.$isaT)
else return J.bL(z,c,null,null)},
kv:function(){if(!0===$.cU)return
$.cU=!0
H.kw()},
kw:function(){var z,y,x,w,v,u,t,s
$.bF=Object.create(null)
$.bJ=Object.create(null)
H.kr()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.f_.$1(v)
if(u!=null){t=H.kH(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
kr:function(){var z,y,x,w,v,u,t
z=C.ab()
z=H.ap(C.a8,H.ap(C.ad,H.ap(C.t,H.ap(C.t,H.ap(C.ac,H.ap(C.a9,H.ap(C.aa(C.r),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cT=new H.ks(v)
$.eH=new H.kt(u)
$.f_=new H.ku(t)},
ap:function(a,b){return a(b)||b},
kO:function(a,b,c){return a.indexOf(b,c)>=0},
fB:{"^":"ee;a",$asee:I.a6,$asU:I.a6,$isU:1},
d4:{"^":"a;",
i:function(a){return P.cc(this)},
$isU:1},
fC:{"^":"d4;a,b,c",
gj:function(a){return this.a},
G:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
h:function(a,b){if(!this.G(b))return
return this.c_(b)},
c_:function(a){return this.b[a]},
u:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.c_(w))}},
gH:function(){return H.c(new H.iY(this),[H.l(this,0)])}},
iY:{"^":"v;a",
gC:function(a){var z=this.a.c
return new J.bS(z,z.length,0,null)},
gj:function(a){return this.a.c.length}},
au:{"^":"d4;a",
ak:function(){var z=this.$map
if(z==null){z=new H.z(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.eP(this.a,z)
this.$map=z}return z},
G:function(a){return this.ak().G(a)},
h:function(a,b){return this.ak().h(0,b)},
u:function(a,b){this.ak().u(0,b)},
gH:function(){return this.ak().gH()},
gj:function(a){var z=this.ak()
return z.gj(z)}},
hn:{"^":"a;a,b,c,d,e,f",
gcw:function(){return this.a},
gcB:function(){var z,y,x,w
if(this.c===1)return C.l
z=this.d
y=z.length-this.e.length
if(y===0)return C.l
x=[]
for(w=0;w<y;++w)x.push(z[w])
x.fixed$length=Array
x.immutable$list=Array
return x},
gcz:function(){var z,y,x,w,v,u
if(this.c!==0)return C.v
z=this.e
y=z.length
x=this.d
w=x.length-y
if(y===0)return C.v
v=H.c(new H.z(0,null,null,null,null,null,0),[P.aB,null])
for(u=0;u<y;++u)v.E(0,new H.co(z[u]),x[w+u])
return H.c(new H.fB(v),[P.aB,null])}},
hU:{"^":"a;a,b,c,d,e,f,r,x",
ev:function(a,b){var z=this.d
if(b<z)return
return this.b[3+b-z]},
m:{
dN:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.hU(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
hQ:{"^":"e:4;a,b,c",
$2:function(a,b){var z=this.a
z.b=z.b+"$"+H.b(a)
this.c.push(a)
this.b.push(b);++z.a}},
iL:{"^":"a;a,b,c,d,e,f",
P:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
m:{
a_:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.iL(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},
bv:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
e8:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dG:{"^":"y;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
ht:{"^":"y;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
m:{
c7:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.ht(a,y,z?null:b.receiver)}}},
iM:{"^":"y;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
c2:{"^":"a;a,a3:b<"},
kR:{"^":"e:0;a",
$1:function(a){if(!!J.i(a).$isy)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
ep:{"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
ky:{"^":"e:1;a",
$0:function(){return this.a.$0()}},
kz:{"^":"e:1;a,b",
$0:function(){return this.a.$1(this.b)}},
kA:{"^":"e:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
kB:{"^":"e:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
kC:{"^":"e:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
e:{"^":"a;",
i:function(a){return"Closure '"+H.b_(this)+"'"},
gcO:function(){return this},
$isbg:1,
gcO:function(){return this}},
dZ:{"^":"e;"},
is:{"^":"dZ;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bT:{"^":"dZ;a,b,c,d",
q:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bT))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gv:function(a){var z,y
z=this.c
if(z==null)y=H.a3(this.a)
else y=typeof z!=="object"?J.C(z):H.a3(z)
return(y^H.a3(this.b))>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.bm(z)},
m:{
bU:function(a){return a.a},
d1:function(a){return a.c},
fs:function(){var z=$.at
if(z==null){z=H.bb("self")
$.at=z}return z},
bb:function(a){var z,y,x,w,v
z=new H.bT("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fu:{"^":"y;a",
i:function(a){return this.a},
m:{
bW:function(a,b){return new H.fu("CastError: Casting value of type "+H.b(a)+" to incompatible type "+H.b(b))}}},
ih:{"^":"y;a",
i:function(a){return"RuntimeError: "+H.b(this.a)}},
dW:{"^":"a;"},
ii:{"^":"dW;a,b,c,d",
a5:function(a){var z=this.dI(a)
return z==null?!1:H.eU(z,this.ae())},
dI:function(a){var z=J.i(a)
return"$signature" in z?z.$signature():null},
ae:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.i(y)
if(!!x.$ismi)z.v=true
else if(!x.$isdc)z.ret=y.ae()
y=this.b
if(y!=null&&y.length!==0)z.args=H.dV(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.dV(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.eO(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].ae()}z.named=w}return z},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=J.a0(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=J.a0(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.eO(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].ae())+" "+s}x+="}"}}return x+(") -> "+J.a0(this.a))},
m:{
dV:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].ae())
return z}}},
dc:{"^":"dW;",
i:function(a){return"dynamic"},
ae:function(){return}},
cr:{"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gv:function(a){return J.C(this.a)},
q:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.cr){z=this.a
y=b.a
y=z==null?y==null:z===y
z=y}else z=!1
return z}},
z:{"^":"a;a,b,c,d,e,f,r",
gj:function(a){return this.a},
ga1:function(a){return this.a===0},
gH:function(){return H.c(new H.hy(this),[H.l(this,0)])},
gaF:function(a){return H.aX(this.gH(),new H.hs(this),H.l(this,0),H.l(this,1))},
G:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bU(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.bU(y,a)}else return this.eT(a)},
eT:function(a){var z=this.d
if(z==null)return!1
return this.at(this.R(z,this.as(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.R(z,b)
return y==null?null:y.b}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.R(x,b)
return y==null?null:y.b}else return this.eU(b)},
eU:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.R(z,this.as(a))
x=this.at(y,a)
if(x<0)return
return y[x].b},
E:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.b6()
this.b=z}this.bN(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.b6()
this.c=y}this.bN(y,b,c)}else{x=this.d
if(x==null){x=this.b6()
this.d=x}w=this.as(b)
v=this.R(x,w)
if(v==null)this.be(x,w,[this.b7(b,c)])
else{u=this.at(v,b)
if(u>=0)v[u].b=c
else v.push(this.b7(b,c))}}},
f6:function(a,b){var z
if(this.G(a))return this.h(0,a)
z=b.$0()
this.E(0,a,z)
return z},
S:function(a,b){if(typeof b==="string")return this.c6(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.c6(this.c,b)
else return this.eV(b)},
eV:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.R(z,this.as(a))
x=this.at(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.c8(w)
return w.b},
X:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
u:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.d(new P.N(this))
z=z.c}},
bN:function(a,b,c){var z=this.R(a,b)
if(z==null)this.be(a,b,this.b7(b,c))
else z.b=c},
c6:function(a,b){var z
if(a==null)return
z=this.R(a,b)
if(z==null)return
this.c8(z)
this.bX(a,b)
return z.b},
b7:function(a,b){var z,y
z=new H.hx(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
c8:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
as:function(a){return J.C(a)&0x3ffffff},
at:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.aK(a[y].a,b))return y
return-1},
i:function(a){return P.cc(this)},
R:function(a,b){return a[b]},
be:function(a,b,c){a[b]=c},
bX:function(a,b){delete a[b]},
bU:function(a,b){return this.R(a,b)!=null},
b6:function(){var z=Object.create(null)
this.be(z,"<non-identifier-key>",z)
this.bX(z,"<non-identifier-key>")
return z},
$isha:1,
$isU:1,
m:{
hr:function(a,b){return H.c(new H.z(0,null,null,null,null,null,0),[a,b])}}},
hs:{"^":"e:0;a",
$1:[function(a){return this.a.h(0,a)},null,null,2,0,null,33,"call"]},
hx:{"^":"a;a,b,c,d"},
hy:{"^":"v;a",
gj:function(a){return this.a.a},
gC:function(a){var z,y
z=this.a
y=new H.hz(z,z.r,null,null)
y.c=z.e
return y},
u:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.d(new P.N(z))
y=y.c}},
$ism:1},
hz:{"^":"a;a,b,c,d",
gt:function(){return this.d},
n:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.N(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ks:{"^":"e:0;a",
$1:function(a){return this.a(a)}},
kt:{"^":"e:12;a",
$2:function(a,b){return this.a(a,b)}},
ku:{"^":"e:13;a",
$1:function(a){return this.a(a)}},
bj:{"^":"a;a,b,c,d",
i:function(a){return"RegExp/"+this.a+"/"},
aT:function(a){var z=this.b.exec(H.bD(a))
if(z==null)return
return new H.jy(this,z)},
m:{
bk:function(a,b,c,d){var z,y,x,w
H.bD(a)
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.d(new P.c3("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
jy:{"^":"a;a,b",
h:function(a,b){return this.b[b]}},
iA:{"^":"a;a,b,c",
h:function(a,b){if(b!==0)H.p(P.az(b,null,null))
return this.c}}}],["","",,N,{"^":"",
mC:[function(){var z,y,x,w,v,u,t,s,r,q,p
z=$.$get$cm()
z.a=C.n
z.d=C.i
z.e=C.h
$.b7=A.il(document.querySelector("#stage"),768,null,1024)
z=new K.dv(null,null,0,P.Z(null,null,!1,P.A))
y=new K.cu(null,null)
z.a=y
z.b=y
y=H.c([],[A.ck])
z=new A.hX(z,y,!1,0,new R.fO(0,"enterFrame",!1,C.a,null,null,!1,!1),new R.fQ("exitFrame",!1,C.a,null,null,!1,!1),new R.hW("render",!1,C.a,null,null,!1,!1),!1)
z.d3(0)
$.kL=z
x=$.b7
w=x.y2
if(w!=null){C.b.S(w.c,x)
x.y2=null}y.push(x)
x.y2=z
z=H.c(new H.z(0,null,null,null,null,null,0),[P.w,O.dU])
z=new O.i6(z,P.Z(null,null,!1,P.A))
y=new O.jK("",!1,!1,1)
v=$.$get$d_()
u=new H.bj("@(\\d)x",H.bk("@(\\d)x",!1,!0,!1),null,null).aT("images/mfs2.json")
if(u!=null){t=v.d
x=u.b
s=H.hR(x[1],null,null)
r=J.bQ(V.eY($.$get$cQ(),t))
q=r/s
p=C.k.fc("images/mfs2.json",x.index,x.index+J.aL(x[0]),"@"+r+"x")}else{p="images/mfs2.json"
q=1}y.a=p
v.c
y.b=!1
y.c=!1
y.d=q
z.du("TextureAtlas","ta1","images/mfs2.json",C.J.av(0,y))
z.aU(0).aC(new N.kG())
$.f0=z},"$0","eL",0,0,2],
kG:{"^":"e:0;",
$1:[function(a){var z,y,x,w,v,u,t,s,r
z=$.f0.dK("TextureAtlas","ta1")
if(!(z instanceof O.e0))H.p("dart2js_hint")
y=z.cQ("mfs")
x=$.b7.cl
w=H.c(new U.V(x.a,x.b,x.c,x.d),[H.l(x,0)])
x=$.bd
$.bd=x+1
x=new O.fT(null,null,null,null,null,null,null,null,!1,!0,"auto",!0,0,x,0,0,0,0,1,1,0,0,0,1,!0,!1,null,null,[],null,"",null,T.a9(),!0,null,null)
x.rx=y
x.ry=P.hC(y.length,0.1,!1,null)
x.x1=0
x.x2=null
x.y1=!1
x.y2=!0
x.aa=new R.a1("progress",!1,C.a,null,null,!1,!1)
x.aP=new R.a1("complete",!1,C.a,null,null,!1,!1)
v=w.a
x.c=v
x.id=!0
v=w.b
x.d=v
x.id=!0
x.scT(1)
x.scU(1)
x.y1=!0
x.x2=null
v=$.b7
v.toString
u=x.fy
if(u==null?v==null:u===v)v.ds(x)
else{if(u!=null){t=u.rx
s=C.b.eR(t,x)
x.A(0,new R.a1("removed",!0,C.a,null,null,!1,!1))
if(u.gbL()!=null)u.bY(x,"removedFromStage")
x.fy=null
C.b.cD(t,s)}v.e9(x)
v.rx.push(x)
x.fy=v
x.A(0,new R.a1("added",!0,C.a,null,null,!1,!1))
if(v.gbL()!=null)v.bY(x,"addedToStage")}$.eQ=x
P.b5(x.i(0))
x=$.b7.ct
v=$.eQ
if(!J.i(v).$isbR)H.p(P.R("The supplied animatable does not extend type Animatable."))
if(!x.bp(0,v)){r=new K.cu(null,null)
u=x.b
u.a=v
u.b=r
x.b=r}return},null,null,2,0,null,7,"call"]}},1],["","",,H,{"^":"",
dp:function(){return new P.F("No element")},
hj:function(){return new P.F("Too few elements")},
aV:{"^":"v;",
gC:function(a){return new H.ca(this,this.gj(this),0,null)},
u:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.K(0,y))
if(z!==this.gj(this))throw H.d(new P.N(this))}},
aw:function(a,b){return H.c(new H.aY(this,b),[null,null])},
fg:function(a,b){var z,y
z=H.c([],[H.P(this,"aV",0)])
C.b.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y)z[y]=this.K(0,y)
return z},
ff:function(a){return this.fg(a,!0)},
$ism:1},
ca:{"^":"a;a,b,c,d",
gt:function(){return this.d},
n:function(){var z,y,x,w
z=this.a
y=J.L(z)
x=y.gj(z)
if(this.b!==x)throw H.d(new P.N(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.K(z,w);++this.c
return!0}},
dw:{"^":"v;a,b",
gC:function(a){var z=new H.hE(null,J.ar(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.aL(this.a)},
$asv:function(a,b){return[b]},
m:{
aX:function(a,b,c,d){if(!!J.i(a).$ism)return H.c(new H.dd(a,b),[c,d])
return H.c(new H.dw(a,b),[c,d])}}},
dd:{"^":"dw;a,b",$ism:1},
hE:{"^":"dq;a,b,c",
n:function(){var z=this.b
if(z.n()){this.a=this.aj(z.gt())
return!0}this.a=null
return!1},
gt:function(){return this.a},
aj:function(a){return this.c.$1(a)}},
aY:{"^":"aV;a,b",
gj:function(a){return J.aL(this.a)},
K:function(a,b){return this.aj(J.f9(this.a,b))},
aj:function(a){return this.b.$1(a)},
$asaV:function(a,b){return[b]},
$asv:function(a,b){return[b]},
$ism:1},
bx:{"^":"v;a,b",
gC:function(a){var z=new H.iN(J.ar(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
iN:{"^":"dq;a,b",
n:function(){for(var z=this.a;z.n();)if(this.aj(z.gt()))return!0
return!1},
gt:function(){return this.a.gt()},
aj:function(a){return this.b.$1(a)}},
dh:{"^":"a;"},
co:{"^":"a;a",
q:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.co){z=this.a
y=b.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){return 536870911&664597*J.C(this.a)},
i:function(a){return'Symbol("'+H.b(this.a)+'")'}}}],["","",,H,{"^":"",
eO:function(a){var z=H.c(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{"^":"",
iP:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.ke()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aq(new P.iR(z),1)).observe(y,{childList:true})
return new P.iQ(z,y,x)}else if(self.setImmediate!=null)return P.kf()
return P.kg()},
mj:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aq(new P.iS(a),0))},"$1","ke",2,0,3],
mk:[function(a){++init.globalState.f.b
self.setImmediate(H.aq(new P.iT(a),0))},"$1","kf",2,0,3],
ml:[function(a){P.cp(C.p,a)},"$1","kg",2,0,3],
O:function(a,b,c){if(b===0){c.a_(0,a)
return}else if(b===1){c.cg(H.B(a),H.M(a))
return}P.jN(a,b)
return c.a},
jN:function(a,b){var z,y,x,w
z=new P.jO(b)
y=new P.jP(b)
x=J.i(a)
if(!!x.$isH)a.bg(z,y)
else if(!!x.$isa8)a.aW(z,y)
else{w=H.c(new P.H(0,$.j,null),[null])
w.a=4
w.c=a
w.bg(z,null)}},
cM:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.j.toString
return new P.k8(z)},
cL:function(a,b){var z=H.bG()
z=H.aI(z,[z,z]).a5(a)
if(z){b.toString
return a}else{b.toString
return a}},
fU:function(a,b,c){var z,y,x,w,v
z={}
y=H.c(new P.H(0,$.j,null),[P.h])
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.fW(z,!1,b,y)
for(w=new H.ca(a,a.gj(a),0,null);w.n();)w.d.aW(new P.fV(z,!1,b,y,z.b++),x)
x=z.b
if(x===0){z=H.c(new P.H(0,$.j,null),[null])
z.b1(C.l)
return z}v=new Array(x)
v.fixed$length=Array
z.a=v
return y},
bX:function(a){return H.c(new P.jI(H.c(new P.H(0,$.j,null),[a])),[a])},
k1:function(){var z,y
for(;z=$.ao,z!=null;){$.aF=null
y=z.b
$.ao=y
if(y==null)$.aE=null
z.a.$0()}},
mz:[function(){$.cJ=!0
try{P.k1()}finally{$.aF=null
$.cJ=!1
if($.ao!=null)$.$get$cw().$1(P.eK())}},"$0","eK",0,0,2],
eG:function(a){var z=new P.ef(a,null)
if($.ao==null){$.aE=z
$.ao=z
if(!$.cJ)$.$get$cw().$1(P.eK())}else{$.aE.b=z
$.aE=z}},
k7:function(a){var z,y,x
z=$.ao
if(z==null){P.eG(a)
$.aF=$.aE
return}y=new P.ef(a,null)
x=$.aF
if(x==null){y.b=z
$.aF=y
$.ao=y}else{y.b=x.b
x.b=y
$.aF=y
if(y.b==null)$.aE=y}},
f1:function(a){var z=$.j
if(C.d===z){P.af(null,null,C.d,a)
return}z.toString
P.af(null,null,z,z.bm(a,!0))},
m9:function(a,b){var z,y,x
z=H.c(new P.eq(null,null,null,0),[b])
y=z.gdQ()
x=z.gdS()
z.a=a.au(y,!0,z.gdR(),x)
return z},
Z:function(a,b,c,d){var z=H.c(new P.iO(b,a,0,null,null,null,null),[d])
z.e=z
z.d=z
return z},
eF:function(a){var z,y,x,w,v
if(a==null)return
try{z=a.$0()
if(!!J.i(z).$isa8)return z
return}catch(w){v=H.B(w)
y=v
x=H.M(w)
v=$.j
v.toString
P.aG(null,null,v,y,x)}},
k2:[function(a,b){var z=$.j
z.toString
P.aG(null,null,z,a,b)},function(a){return P.k2(a,null)},"$2","$1","kh",2,2,8,0,1,2],
my:[function(){},"$0","eJ",0,0,2],
k6:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.B(u)
z=t
y=H.M(u)
$.j.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.ag(x)
w=t
v=x.ga3()
c.$2(w,v)}}},
jR:function(a,b,c,d){var z=a.Z()
if(!!J.i(z).$isa8)z.cN(new P.jU(b,c,d))
else b.F(c,d)},
jS:function(a,b){return new P.jT(a,b)},
iK:function(a,b){var z=$.j
if(z===C.d){z.toString
return P.cp(a,b)}return P.cp(a,z.bm(b,!0))},
cp:function(a,b){var z=C.c.an(a.a,1000)
return H.iH(z<0?0:z,b)},
aG:function(a,b,c,d,e){var z={}
z.a=d
P.k7(new P.k4(z,e))},
eD:function(a,b,c,d){var z,y
y=$.j
if(y===c)return d.$0()
$.j=c
z=y
try{y=d.$0()
return y}finally{$.j=z}},
eE:function(a,b,c,d,e){var z,y
y=$.j
if(y===c)return d.$1(e)
$.j=c
z=y
try{y=d.$1(e)
return y}finally{$.j=z}},
k5:function(a,b,c,d,e,f){var z,y
y=$.j
if(y===c)return d.$2(e,f)
$.j=c
z=y
try{y=d.$2(e,f)
return y}finally{$.j=z}},
af:function(a,b,c,d){var z=C.d!==c
if(z)d=c.bm(d,!(!z||!1))
P.eG(d)},
iR:{"^":"e:0;a",
$1:[function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()},null,null,2,0,null,4,"call"]},
iQ:{"^":"e:14;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
iS:{"^":"e:1;a",
$0:[function(){--init.globalState.f.b
this.a.$0()},null,null,0,0,null,"call"]},
iT:{"^":"e:1;a",
$0:[function(){--init.globalState.f.b
this.a.$0()},null,null,0,0,null,"call"]},
jO:{"^":"e:0;a",
$1:[function(a){return this.a.$2(0,a)},null,null,2,0,null,7,"call"]},
jP:{"^":"e:5;a",
$2:[function(a,b){this.a.$2(1,new H.c2(a,b))},null,null,4,0,null,1,2,"call"]},
k8:{"^":"e:15;a",
$2:[function(a,b){this.a(a,b)},null,null,4,0,null,18,7,"call"]},
iU:{"^":"ej;a"},
iW:{"^":"iZ;y,b8:z?,c5:Q?,x,a,b,c,d,e,f,r",
gaL:function(){return this.x},
bb:[function(){},"$0","gba",0,0,2],
bc:function(){}},
iV:{"^":"a;V:c@,b8:d?,c5:e?",
gd6:function(a){var z=new P.iU(this)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gaN:function(){return this.c<4},
e3:function(a){var z,y
z=a.Q
y=a.z
z.sb8(y)
y.sc5(z)
a.Q=a
a.z=a},
e8:function(a,b,c,d){var z,y
if((this.c&4)!==0){if(c==null)c=P.eJ()
z=new P.j4($.j,0,c)
z.e6()
return z}z=$.j
y=new P.iW(0,null,null,this,null,null,null,z,d?1:0,null,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
y.dn(a,b,c,d)
y.Q=y
y.z=y
z=this.e
y.Q=z
y.z=this
z.sb8(y)
this.e=y
y.y=this.c&1
if(this.d===y)P.eF(this.a)
return y},
dZ:function(a){var z
if(a.z===a)return
z=a.y
if((z&2)!==0)a.y=(z|4)>>>0
else{this.e3(a)
if((this.c&2)===0&&this.d===this)this.dw()}return},
e_:function(a){},
e0:function(a){},
aI:function(){if((this.c&4)!==0)return new P.F("Cannot add new events after calling close")
return new P.F("Cannot add new events while doing an addStream")},
dw:function(){if((this.c&4)!==0&&this.r.a===0)this.r.b1(null)
P.eF(this.b)}},
iO:{"^":"iV;a,b,c,d,e,f,r",
a7:function(a){var z
for(z=this.d;z!==this;z=z.z)z.dt(new P.j2(a,null))}},
a8:{"^":"a;"},
fW:{"^":"e:16;a,b,c,d",
$2:[function(a,b){var z,y
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.b)this.d.F(a,b)
else{z.c=a
z.d=b}}else if(y===0&&!this.b)this.d.F(z.c,z.d)},null,null,4,0,null,19,20,"call"]},
fV:{"^":"e:17;a,b,c,d,e",
$1:[function(a){var z,y,x
z=this.a
y=--z.b
x=z.a
if(x!=null){x[this.e]=a
if(y===0)this.d.b3(x)}else if(z.b===0&&!this.b)this.d.F(z.c,z.d)},null,null,2,0,null,5,"call"]},
eh:{"^":"a;",
cg:[function(a,b){a=a!=null?a:new P.ch()
if(this.a.a!==0)throw H.d(new P.F("Future already completed"))
$.j.toString
this.F(a,b)},function(a){return this.cg(a,null)},"cf","$2","$1","gen",2,2,6,0,1,2]},
cv:{"^":"eh;a",
a_:[function(a,b){var z=this.a
if(z.a!==0)throw H.d(new P.F("Future already completed"))
z.b1(b)},function(a){return this.a_(a,null)},"em","$1","$0","gaO",0,2,7,0,5],
F:function(a,b){this.a.dv(a,b)}},
jI:{"^":"eh;a",
a_:[function(a,b){var z=this.a
if(z.a!==0)throw H.d(new P.F("Future already completed"))
z.ai(b)},function(a){return this.a_(a,null)},"em","$1","$0","gaO",0,2,7,0,5],
F:function(a,b){this.a.F(a,b)}},
cy:{"^":"a;a,b,c,d,e"},
H:{"^":"a;V:a@,b,e5:c<",
aW:function(a,b){var z=$.j
if(z!==C.d){z.toString
if(b!=null)b=P.cL(b,z)}return this.bg(a,b)},
aC:function(a){return this.aW(a,null)},
bg:function(a,b){var z=H.c(new P.H(0,$.j,null),[null])
this.aJ(new P.cy(null,z,b==null?1:3,a,b))
return z},
cN:function(a){var z,y
z=$.j
y=new P.H(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.d)z.toString
this.aJ(new P.cy(null,y,8,a,null))
return y},
aJ:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){z=this.c
y=z.a
if(y<4){z.aJ(a)
return}this.a=y
this.c=z.c}z=this.b
z.toString
P.af(null,null,z,new P.j9(this,a))}},
c4:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){y=this.c
u=y.a
if(u<4){y.c4(a)
return}this.a=u
this.c=y.c}z.a=this.am(a)
y=this.b
y.toString
P.af(null,null,y,new P.jh(z,this))}},
bd:function(){var z=this.c
this.c=null
return this.am(z)},
am:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
ai:function(a){var z
if(!!J.i(a).$isa8)P.bA(a,this)
else{z=this.bd()
this.a=4
this.c=a
P.am(this,z)}},
b3:function(a){var z=this.bd()
this.a=4
this.c=a
P.am(this,z)},
F:[function(a,b){var z=this.bd()
this.a=8
this.c=new P.as(a,b)
P.am(this,z)},function(a){return this.F(a,null)},"fl","$2","$1","gbT",2,2,8,0,1,2],
b1:function(a){var z
if(a==null);else if(!!J.i(a).$isa8){if(a.a===8){this.a=1
z=this.b
z.toString
P.af(null,null,z,new P.jb(this,a))}else P.bA(a,this)
return}this.a=1
z=this.b
z.toString
P.af(null,null,z,new P.jc(this,a))},
dv:function(a,b){var z
this.a=1
z=this.b
z.toString
P.af(null,null,z,new P.ja(this,a,b))},
$isa8:1,
m:{
jd:function(a,b){var z,y,x,w
b.sV(1)
try{a.aW(new P.je(b),new P.jf(b))}catch(x){w=H.B(x)
z=w
y=H.M(x)
P.f1(new P.jg(b,z,y))}},
bA:function(a,b){var z,y,x
for(;z=a.a,z===2;)a=a.c
y=b.c
if(z>=4){b.c=null
x=b.am(y)
b.a=a.a
b.c=a.c
P.am(b,x)}else{b.a=2
b.c=a
a.c4(y)}},
am:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){z=y.c
y=y.b
x=z.a
z=z.b
y.toString
P.aG(null,null,y,x,z)}return}for(;v=b.a,v!=null;b=v){b.a=null
P.am(z.a,b)}y=z.a
u=y.c
x.a=w
x.b=u
t=!w
if(t){s=b.c
s=(s&1)!==0||s===8}else s=!0
if(s){s=b.b
r=s.b
if(w){q=y.b
q.toString
q=q==null?r==null:q===r
if(!q)r.toString
else q=!0
q=!q}else q=!1
if(q){z=y.b
y=u.a
x=u.b
z.toString
P.aG(null,null,z,y,x)
return}p=$.j
if(p==null?r!=null:p!==r)$.j=r
else p=null
y=b.c
if(y===8)new P.jk(z,x,w,b,r).$0()
else if(t){if((y&1)!==0)new P.jj(x,w,b,u,r).$0()}else if((y&2)!==0)new P.ji(z,x,b,r).$0()
if(p!=null)$.j=p
y=x.b
t=J.i(y)
if(!!t.$isa8){if(!!t.$isH)if(y.a>=4){o=s.c
s.c=null
b=s.am(o)
s.a=y.a
s.c=y.c
z.a=y
continue}else P.bA(y,s)
else P.jd(y,s)
return}}n=b.b
o=n.c
n.c=null
b=n.am(o)
y=x.a
x=x.b
if(!y){n.a=4
n.c=x}else{n.a=8
n.c=x}z.a=n
y=n}}}},
j9:{"^":"e:1;a,b",
$0:function(){P.am(this.a,this.b)}},
jh:{"^":"e:1;a,b",
$0:function(){P.am(this.b,this.a.a)}},
je:{"^":"e:0;a",
$1:[function(a){this.a.b3(a)},null,null,2,0,null,5,"call"]},
jf:{"^":"e:18;a",
$2:[function(a,b){this.a.F(a,b)},function(a){return this.$2(a,null)},"$1",null,null,null,2,2,null,0,1,2,"call"]},
jg:{"^":"e:1;a,b,c",
$0:[function(){this.a.F(this.b,this.c)},null,null,0,0,null,"call"]},
jb:{"^":"e:1;a,b",
$0:function(){P.bA(this.b,this.a)}},
jc:{"^":"e:1;a,b",
$0:function(){this.a.b3(this.b)}},
ja:{"^":"e:1;a,b,c",
$0:function(){this.a.F(this.b,this.c)}},
jj:{"^":"e:2;a,b,c,d,e",
$0:function(){var z,y,x,w
try{x=this.a
x.b=this.e.bA(this.c.d,this.d)
x.a=!1}catch(w){x=H.B(w)
z=x
y=H.M(w)
x=this.a
x.b=new P.as(z,y)
x.a=!0}}},
ji:{"^":"e:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.c
y=!0
r=this.c
if(r.c===6){x=r.d
try{y=this.d.bA(x,J.ag(z))}catch(q){r=H.B(q)
w=r
v=H.M(q)
r=J.ag(z)
p=w
o=(r==null?p==null:r===p)?z:new P.as(w,v)
r=this.b
r.b=o
r.a=!0
return}}u=r.e
if(y&&u!=null)try{r=u
p=H.bG()
p=H.aI(p,[p,p]).a5(r)
n=this.d
m=this.b
if(p)m.b=n.fe(u,J.ag(z),z.ga3())
else m.b=n.bA(u,J.ag(z))
m.a=!1}catch(q){r=H.B(q)
t=r
s=H.M(q)
r=J.ag(z)
p=t
o=(r==null?p==null:r===p)?z:new P.as(t,s)
r=this.b
r.b=o
r.a=!0}}},
jk:{"^":"e:2;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u
z=null
try{z=this.e.cG(this.d.d)}catch(w){v=H.B(w)
y=v
x=H.M(w)
if(this.c){v=this.a.a.c.a
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.as(y,x)
u.a=!0
return}if(!!J.i(z).$isa8){if(z instanceof P.H&&z.gV()>=4){if(z.gV()===8){v=this.b
v.b=z.ge5()
v.a=!0}return}v=this.b
v.b=z.aC(new P.jl(this.a.a))
v.a=!1}}},
jl:{"^":"e:0;a",
$1:[function(a){return this.a},null,null,2,0,null,4,"call"]},
ef:{"^":"a;a,b"},
cn:{"^":"a;",
u:function(a,b){var z,y
z={}
y=H.c(new P.H(0,$.j,null),[null])
z.a=null
z.a=this.au(new P.iw(z,this,b,y),!0,new P.ix(y),y.gbT())
return y},
gj:function(a){var z,y
z={}
y=H.c(new P.H(0,$.j,null),[P.k])
z.a=0
this.au(new P.iy(z),!0,new P.iz(z,y),y.gbT())
return y}},
iw:{"^":"e;a,b,c,d",
$1:[function(a){P.k6(new P.iu(this.c,a),new P.iv(),P.jS(this.a.a,this.d))},null,null,2,0,null,22,"call"],
$signature:function(){return H.eM(function(a){return{func:1,args:[a]}},this.b,"cn")}},
iu:{"^":"e:1;a,b",
$0:function(){return this.a.$1(this.b)}},
iv:{"^":"e:0;",
$1:function(a){}},
ix:{"^":"e:1;a",
$0:[function(){this.a.ai(null)},null,null,0,0,null,"call"]},
iy:{"^":"e:0;a",
$1:[function(a){++this.a.a},null,null,2,0,null,4,"call"]},
iz:{"^":"e:1;a,b",
$0:[function(){this.b.ai(this.a.a)},null,null,0,0,null,"call"]},
it:{"^":"a;"},
ej:{"^":"jG;a",
gv:function(a){return(H.a3(this.a)^892482866)>>>0},
q:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.ej))return!1
return b.a===this.a}},
iZ:{"^":"iX;aL:x<",
c2:function(){return this.gaL().dZ(this)},
bb:[function(){this.gaL().e_(this)},"$0","gba",0,0,2],
bc:function(){this.gaL().e0(this)}},
mq:{"^":"a;"},
iX:{"^":"a;V:e@",
ay:function(a,b){var z,y,x
z=this.e
if((z&8)!==0)return
y=(z+128|4)>>>0
this.e=y
if(z<128&&this.r!=null){x=this.r
if(x.a===1)x.a=3}if((z&4)===0&&(y&32)===0)this.dL(this.gba())},
ax:function(a){return this.ay(a,null)},
Z:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.dz()
return this.f},
dz:function(){var z,y
z=(this.e|8)>>>0
this.e=z
if((z&64)!==0){y=this.r
if(y.a===1)y.a=3}if((z&32)===0)this.r=null
this.f=this.c2()},
bb:[function(){},"$0","gba",0,0,2],
bc:function(){},
c2:function(){return},
dt:function(a){var z,y
z=this.r
if(z==null){z=new P.jH(null,null,0)
this.r=z}z.W(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bI(this)}},
a7:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.cJ(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bP((z&4)!==0)},
dL:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bP((z&4)!==0)},
bP:function(a){var z,y,x
z=this.e
if((z&64)!==0&&this.r.c==null){z=(z&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){y=this.r
y=y==null||y.c==null}else y=!1
else y=!1
if(y){z=(z&4294967291)>>>0
this.e=z}}for(;!0;a=x){if((z&8)!==0){this.r=null
return}x=(z&4)!==0
if(a===x)break
this.e=(z^32)>>>0
if(x)this.bb()
else this.bc()
z=(this.e&4294967263)>>>0
this.e=z}if((z&64)!==0&&z<128)this.r.bI(this)},
dn:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.cL(b==null?P.kh():b,z)
this.c=c==null?P.eJ():c}},
jG:{"^":"cn;",
au:function(a,b,c,d){return this.a.e8(a,d,c,!0===b)},
eY:function(a){return this.au(a,null,null,null)}},
j3:{"^":"a;cA:a@"},
j2:{"^":"j3;D:b>,a",
f3:function(a){a.a7(this.b)}},
jA:{"^":"a;V:a@",
bI:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.f1(new P.jB(this,a))
this.a=1}},
jB:{"^":"e:1;a,b",
$0:[function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gcA()
z.b=w
if(w==null)z.c=null
x.f3(this.b)},null,null,0,0,null,"call"]},
jH:{"^":"jA;b,c,a",
W:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.scA(b)
this.c=b}}},
j4:{"^":"a;a,V:b@,c",
e6:function(){var z,y
if((this.b&2)!==0)return
z=this.a
y=this.ge7()
z.toString
P.af(null,null,z,y)
this.b=(this.b|2)>>>0},
ay:function(a,b){this.b+=4},
ax:function(a){return this.ay(a,null)},
Z:function(){return},
fD:[function(){var z=(this.b&4294967293)>>>0
this.b=z
if(z>=4)return
this.b=(z|1)>>>0
this.a.cH(this.c)},"$0","ge7",0,0,2]},
eq:{"^":"a;a,b,c,V:d@",
bQ:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
fq:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.ai(!0)
return}this.a.ax(0)
this.c=a
this.d=3},"$1","gdQ",2,0,function(){return H.eM(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"eq")},23],
dT:[function(a,b){var z
if(this.d===2){z=this.c
this.bQ(0)
z.F(a,b)
return}this.a.ax(0)
this.c=new P.as(a,b)
this.d=4},function(a){return this.dT(a,null)},"ft","$2","$1","gdS",2,2,6,0,1,2],
fs:[function(){if(this.d===2){var z=this.c
this.bQ(0)
z.ai(!1)
return}this.a.ax(0)
this.c=null
this.d=5},"$0","gdR",0,0,2]},
jU:{"^":"e:1;a,b,c",
$0:[function(){return this.a.F(this.b,this.c)},null,null,0,0,null,"call"]},
jT:{"^":"e:5;a,b",
$2:function(a,b){return P.jR(this.a,this.b,a,b)}},
as:{"^":"a;Y:a>,a3:b<",
i:function(a){return H.b(this.a)},
$isy:1},
jM:{"^":"a;"},
k4:{"^":"e:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.ch()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.d(z)
x=H.d(z)
x.stack=J.a0(y)
throw x}},
jC:{"^":"jM;",
cH:function(a){var z,y,x,w
try{if(C.d===$.j){x=a.$0()
return x}x=P.eD(null,null,this,a)
return x}catch(w){x=H.B(w)
z=x
y=H.M(w)
return P.aG(null,null,this,z,y)}},
cJ:function(a,b){var z,y,x,w
try{if(C.d===$.j){x=a.$1(b)
return x}x=P.eE(null,null,this,a,b)
return x}catch(w){x=H.B(w)
z=x
y=H.M(w)
return P.aG(null,null,this,z,y)}},
bm:function(a,b){if(b)return new P.jD(this,a)
else return new P.jE(this,a)},
eh:function(a,b){return new P.jF(this,a)},
h:function(a,b){return},
cG:function(a){if($.j===C.d)return a.$0()
return P.eD(null,null,this,a)},
bA:function(a,b){if($.j===C.d)return a.$1(b)
return P.eE(null,null,this,a,b)},
fe:function(a,b,c){if($.j===C.d)return a.$2(b,c)
return P.k5(null,null,this,a,b,c)}},
jD:{"^":"e:1;a,b",
$0:function(){return this.a.cH(this.b)}},
jE:{"^":"e:1;a,b",
$0:function(){return this.a.cG(this.b)}},
jF:{"^":"e:0;a,b",
$1:[function(a){return this.a.cJ(this.b,a)},null,null,2,0,null,24,"call"]}}],["","",,P,{"^":"",
hA:function(){return H.c(new H.z(0,null,null,null,null,null,0),[null,null])},
ak:function(a){return H.eP(a,H.c(new H.z(0,null,null,null,null,null,0),[null,null]))},
hi:function(a,b,c){var z,y
if(P.cK(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aH()
y.push(a)
try{P.k0(a,z)}finally{y.pop()}y=P.dY(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bi:function(a,b,c){var z,y,x
if(P.cK(a))return b+"..."+c
z=new P.bt(b)
y=$.$get$aH()
y.push(a)
try{x=z
x.sO(P.dY(x.gO(),a,", "))}finally{y.pop()}y=z
y.sO(y.gO()+c)
y=z.gO()
return y.charCodeAt(0)==0?y:y},
cK:function(a){var z,y
for(z=0;y=$.$get$aH(),z<y.length;++z)if(a===y[z])return!0
return!1},
k0:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gC(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.n())return
w=H.b(z.gt())
b.push(w)
y+=w.length+2;++x}if(!z.n()){if(x<=5)return
v=b.pop()
u=b.pop()}else{t=z.gt();++x
if(!z.n()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
u=b.pop()
y+=v.length+2}else{s=z.gt();++x
for(;z.n();t=s,s=r){r=z.gt();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
ax:function(a,b,c,d){return H.c(new P.jr(0,null,null,null,null,null,0),[d])},
cc:function(a){var z,y,x
z={}
if(P.cK(a))return"{...}"
y=new P.bt("")
try{$.$get$aH().push(a)
x=y
x.sO(x.gO()+"{")
z.a=!0
J.fa(a,new P.hF(z,y))
z=y
z.sO(z.gO()+"}")}finally{$.$get$aH().pop()}z=y.gO()
return z.charCodeAt(0)==0?z:z},
eo:{"^":"z;a,b,c,d,e,f,r",
as:function(a){return H.kI(a)&0x3ffffff},
at:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].a
if(x==null?b==null:x===b)return y}return-1},
m:{
aD:function(a,b){return H.c(new P.eo(0,null,null,null,null,null,0),[a,b])}}},
jr:{"^":"jm;a,b,c,d,e,f,r",
gC:function(a){var z=new P.cA(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
bp:function(a,b){var z
if(typeof b==="number"&&(b&0x3ffffff)===b){z=this.c
if(z==null)return!1
return z[b]!=null}else return this.dC(b)},
dC:function(a){var z=this.d
if(z==null)return!1
return this.aM(z[this.aK(a)],a)>=0},
cv:function(a){var z=typeof a==="number"&&(a&0x3ffffff)===a
if(z)return this.bp(0,a)?a:null
else return this.dN(a)},
dN:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aK(a)]
x=this.aM(y,a)
if(x<0)return
return J.t(y,x).gdF()},
u:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.d(new P.N(this))
z=z.b}},
W:function(a,b){var z,y
if(typeof b==="number"&&(b&0x3ffffff)===b){z=this.c
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
z=y}return this.dB(z,b)}else return this.U(b)},
U:function(a){var z,y,x
z=this.d
if(z==null){z=P.jt()
this.d=z}y=this.aK(a)
x=z[y]
if(x==null)z[y]=[this.b2(a)]
else{if(this.aM(x,a)>=0)return!1
x.push(this.b2(a))}return!0},
S:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bR(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bR(this.c,b)
else return this.e1(b)},
e1:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aK(a)]
x=this.aM(y,a)
if(x<0)return!1
this.bS(y.splice(x,1)[0])
return!0},
X:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
dB:function(a,b){if(a[b]!=null)return!1
a[b]=this.b2(b)
return!0},
bR:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bS(z)
delete a[b]
return!0},
b2:function(a){var z,y
z=new P.js(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bS:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aK:function(a){return J.C(a)&0x3ffffff},
aM:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.aK(a[y].a,b))return y
return-1},
$ism:1,
m:{
jt:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
js:{"^":"a;dF:a<,b,c"},
cA:{"^":"a;a,b,c,d",
gt:function(){return this.d},
n:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.N(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
jm:{"^":"ij;"},
aW:{"^":"a;",
gC:function(a){return new H.ca(a,this.gj(a),0,null)},
K:function(a,b){return this.h(a,b)},
u:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gj(a))throw H.d(new P.N(a))}},
aw:function(a,b){return H.c(new H.aY(a,b),[null,null])},
i:function(a){return P.bi(a,"[","]")},
$ish:1,
$ash:null,
$ism:1},
jL:{"^":"a;",$isU:1},
hD:{"^":"a;",
h:function(a,b){return this.a.h(0,b)},
G:function(a){return this.a.G(a)},
u:function(a,b){this.a.u(0,b)},
gj:function(a){var z=this.a
return z.gj(z)},
gH:function(){return this.a.gH()},
i:function(a){return this.a.i(0)},
$isU:1},
ee:{"^":"hD+jL;",$isU:1},
hF:{"^":"e:19;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
hB:{"^":"v;a,b,c,d",
gC:function(a){return new P.ju(this,this.c,this.d,this.b,null)},
u:function(a,b){var z,y
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){b.$1(this.a[y])
if(z!==this.d)H.p(new P.N(this))}},
ga1:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
X:function(a){var z,y,x,w
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length-1;z!==y;z=(z+1&w)>>>0)x[z]=null
this.c=0
this.b=0;++this.d}},
i:function(a){return P.bi(this,"{","}")},
cE:function(){var z,y,x
z=this.b
if(z===this.c)throw H.d(H.dp());++this.d
y=this.a
x=y[z]
y[z]=null
this.b=(z+1&y.length-1)>>>0
return x},
U:function(a){var z,y
z=this.a
y=this.c
z[y]=a
z=(y+1&z.length-1)>>>0
this.c=z
if(this.b===z)this.c1();++this.d},
c1:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.c(z,[H.l(this,0)])
z=this.a
x=this.b
w=z.length-x
C.b.bJ(y,0,w,z,x)
C.b.bJ(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
dg:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.c(z,[b])},
$ism:1,
m:{
cb:function(a,b){var z=H.c(new P.hB(null,0,0,0),[b])
z.dg(a,b)
return z}}},
ju:{"^":"a;a,b,c,d,e",
gt:function(){return this.e},
n:function(){var z,y
z=this.a
if(this.c!==z.d)H.p(new P.N(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
this.e=z[y]
this.d=(y+1&z.length-1)>>>0
return!0}},
ik:{"^":"a;",
aw:function(a,b){return H.c(new H.dd(this,b),[H.l(this,0),null])},
i:function(a){return P.bi(this,"{","}")},
u:function(a,b){var z
for(z=new P.cA(this,this.r,null,null),z.c=this.e;z.n();)b.$1(z.d)},
$ism:1},
ij:{"^":"ik;"}}],["","",,P,{"^":"",
bC:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.jp(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.bC(a[z])
return a},
k3:function(a,b){var z,y,x,w
x=a
if(typeof x!=="string")throw H.d(H.a5(a))
z=null
try{z=JSON.parse(a)}catch(w){x=H.B(w)
y=x
throw H.d(new P.c3(String(y),null,null))}return P.bC(z)},
jp:{"^":"a;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.dY(b):y}},
gj:function(a){var z
if(this.b==null){z=this.c
z=z.gj(z)}else z=this.a4().length
return z},
ga1:function(a){var z
if(this.b==null){z=this.c
z=z.gj(z)}else z=this.a4().length
return z===0},
gH:function(){if(this.b==null)return this.c.gH()
return new P.jq(this)},
G:function(a){if(this.b==null)return this.c.G(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
u:function(a,b){var z,y,x,w
if(this.b==null)return this.c.u(0,b)
z=this.a4()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.bC(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.d(new P.N(this))}},
i:function(a){return P.cc(this)},
a4:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
dY:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.bC(this.a[a])
return this.b[a]=z},
$isU:1,
$asU:I.a6},
jq:{"^":"aV;a",
gj:function(a){var z=this.a
if(z.b==null){z=z.c
z=z.gj(z)}else z=z.a4().length
return z},
K:function(a,b){var z=this.a
return z.b==null?z.gH().K(0,b):z.a4()[b]},
gC:function(a){var z=this.a
if(z.b==null){z=z.gH()
z=z.gC(z)}else{z=z.a4()
z=new J.bS(z,z.length,0,null)}return z},
$asaV:I.a6,
$asv:I.a6},
fA:{"^":"a;"},
fD:{"^":"a;"},
hv:{"^":"fA;a,b",
es:function(a,b){return P.k3(a,this.geu().a)},
er:function(a){return this.es(a,null)},
geu:function(){return C.ah}},
hw:{"^":"fD;a"}}],["","",,P,{"^":"",
bf:function(a){return new P.j8(a)},
hC:function(a,b,c,d){var z,y,x
z=J.hk(a,d)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
a2:function(a,b,c){var z,y
z=H.c([],[c])
for(y=J.ar(a);y.n();)z.push(y.gt())
return z},
b5:function(a){var z=H.b(a)
H.kJ(z)},
hL:{"^":"e:20;a,b",
$2:function(a,b){var z,y,x
z=this.b
y=this.a
z.a+=y.a
x=z.a+=H.b(a.a)
z.a=x+": "
z.a+=H.b(P.aN(b))
y.a=", "}},
ki:{"^":"a;"},
"+bool":0,
bZ:{"^":"a;a,b",
q:function(a,b){if(b==null)return!1
if(!(b instanceof P.bZ))return!1
return this.a===b.a&&this.b===b.b},
gv:function(a){var z=this.a
return(z^C.c.bf(z,30))&1073741823},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.fH(z?H.G(this).getUTCFullYear()+0:H.G(this).getFullYear()+0)
x=P.aM(z?H.G(this).getUTCMonth()+1:H.G(this).getMonth()+1)
w=P.aM(z?H.G(this).getUTCDate()+0:H.G(this).getDate()+0)
v=P.aM(z?H.G(this).getUTCHours()+0:H.G(this).getHours()+0)
u=P.aM(z?H.G(this).getUTCMinutes()+0:H.G(this).getMinutes()+0)
t=P.aM(z?H.G(this).getUTCSeconds()+0:H.G(this).getSeconds()+0)
s=P.fI(z?H.G(this).getUTCMilliseconds()+0:H.G(this).getMilliseconds()+0)
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
gf_:function(){return this.a},
df:function(a,b){var z=this.a
if(!(Math.abs(z)>864e13)){if(Math.abs(z)===864e13);z=!1}else z=!0
if(z)throw H.d(P.R(this.gf_()))},
m:{
fH:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
fI:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
aM:function(a){if(a>=10)return""+a
return"0"+a}}},
bN:{"^":"A;"},
"+double":0,
be:{"^":"a;a",
ag:function(a,b){return new P.be(C.c.I(this.a*b))},
b_:function(a,b){return C.c.b_(this.a,b.gfn())},
q:function(a,b){if(b==null)return!1
if(!(b instanceof P.be))return!1
return this.a===b.a},
gv:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.fN()
y=this.a
if(y<0)return"-"+new P.be(-y).i(0)
x=z.$1(C.c.bz(C.c.an(y,6e7),60))
w=z.$1(C.c.bz(C.c.an(y,1e6),60))
v=new P.fM().$1(C.c.bz(y,1e6))
return""+C.c.an(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
fM:{"^":"e:9;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fN:{"^":"e:9;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
y:{"^":"a;",
ga3:function(){return H.M(this.$thrownJsError)},
m:{
aN:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.a0(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fP(a)},
fP:function(a){var z=J.i(a)
if(!!z.$ise)return z.i(a)
return H.bm(a)}}},
ch:{"^":"y;",
i:function(a){return"Throw of null."}},
ah:{"^":"y;a,b,p:c>,d",
gb5:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gb4:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gb5()+y+x
if(!this.a)return w
v=this.gb4()
u=P.aN(this.b)
return w+v+": "+H.b(u)},
m:{
R:function(a){return new P.ah(!1,null,null,a)},
cZ:function(a,b,c){return new P.ah(!0,a,b,c)}}},
dM:{"^":"ah;e,f,a,b,c,d",
gb5:function(){return"RangeError"},
gb4:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
m:{
az:function(a,b,c){return new P.dM(null,null,!0,a,b,"Value not in range")},
Y:function(a,b,c,d,e){return new P.dM(b,c,!0,a,d,"Invalid value")},
ci:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.Y(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.d(P.Y(b,a,c,"end",f))
return b}return c}}},
h4:{"^":"ah;e,j:f>,a,b,c,d",
gb5:function(){return"RangeError"},
gb4:function(){if(J.f6(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
m:{
bh:function(a,b,c,d,e){var z=e!=null?e:J.aL(b)
return new P.h4(b,z,!0,a,c,"Index out of range")}}},
hK:{"^":"y;a,b,c,d,e",
i:function(a){var z,y,x,w,v,u,t,s
z={}
y=new P.bt("")
z.a=""
for(x=this.c,w=x.length,v=0;v<w;++v){u=x[v]
y.a+=z.a
y.a+=H.b(P.aN(u))
z.a=", "}this.d.u(0,new P.hL(z,y))
t=P.aN(this.a)
s=H.b(y)
return"NoSuchMethodError: method not found: '"+H.b(this.b.a)+"'\nReceiver: "+H.b(t)+"\nArguments: ["+s+"]"},
m:{
dF:function(a,b,c,d,e){return new P.hK(a,b,c,d,e)}}},
W:{"^":"y;a",
i:function(a){return"Unsupported operation: "+this.a}},
ed:{"^":"y;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
F:{"^":"y;a",
i:function(a){return"Bad state: "+H.b(this.a)}},
N:{"^":"y;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.aN(z))+"."}},
hM:{"^":"a;",
i:function(a){return"Out of Memory"},
ga3:function(){return},
$isy:1},
dX:{"^":"a;",
i:function(a){return"Stack Overflow"},
ga3:function(){return},
$isy:1},
fG:{"^":"y;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
j8:{"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
c3:{"^":"a;a,b,c",
i:function(a){var z,y,x
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.b(z):"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=J.fo(x,0,75)+"..."
return y+"\n"+H.b(x)}},
fR:{"^":"a;p:a>,b",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.p(P.cZ(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dJ(b,"expando$values")
return y==null?null:H.dJ(y,z)}},
bg:{"^":"a;"},
k:{"^":"A;"},
"+int":0,
v:{"^":"a;",
aw:function(a,b){return H.aX(this,b,H.P(this,"v",0),null)},
u:function(a,b){var z
for(z=this.gC(this);z.n();)b.$1(z.gt())},
gj:function(a){var z,y
z=this.gC(this)
for(y=0;z.n();)++y
return y},
K:function(a,b){var z,y,x
if(b<0)H.p(P.Y(b,0,null,"index",null))
for(z=this.gC(this),y=0;z.n();){x=z.gt()
if(b===y)return x;++y}throw H.d(P.bh(b,this,"index",null,y))},
i:function(a){return P.hi(this,"(",")")}},
dq:{"^":"a;"},
h:{"^":"a;",$ash:null,$ism:1},
"+List":0,
lU:{"^":"a;",
i:function(a){return"null"}},
"+Null":0,
A:{"^":"a;"},
"+num":0,
a:{"^":";",
q:function(a,b){return this===b},
gv:function(a){return H.a3(this)},
i:["dd",function(a){return H.bm(this)}],
by:function(a,b){throw H.d(P.dF(this,b.gcw(),b.gcB(),b.gcz(),null))},
toString:function(){return this.i(this)}},
aA:{"^":"a;"},
w:{"^":"a;"},
"+String":0,
bt:{"^":"a;O:a@",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
m:{
dY:function(a,b,c){var z=J.ar(b)
if(!z.n())return a
if(c.length===0){do a+=H.b(z.gt())
while(z.n())}else{a+=H.b(z.gt())
for(;z.n();)a=a+c+H.b(z.gt())}return a}}},
aB:{"^":"a;"}}],["","",,W,{"^":"",
kS:function(){return window},
ft:function(a,b){var z,y
z=document
y=z.createElement("canvas")
J.fm(y,b)
J.fl(y,a)
return y},
fF:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.ae)},
l8:[function(a){return"wheel"},"$1","kq",2,0,27,6],
fZ:function(a,b,c){return W.h0(a,null,null,b,null,null,null,c).aC(new W.h_())},
h0:function(a,b,c,d,e,f,g,h){var z,y,x
z=H.c(new P.cv(H.c(new P.H(0,$.j,null),[W.av])),[W.av])
y=new XMLHttpRequest()
C.a5.f1(y,"GET",a,!0)
x=C.T.cu(y)
H.c(new W.r(0,x.a,x.b,W.q(new W.h1(z,y)),!1),[H.l(x,0)]).w()
x=C.O.cu(y)
H.c(new W.r(0,x.a,x.b,W.q(z.gen()),!1),[H.l(x,0)]).w()
y.send()
return z.a},
h2:function(a,b,c){var z,y
z=document
y=z.createElement("img")
return y},
ae:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
en:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
cD:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.j1(a)
if(!!J.i(z).$isD)return z
return}else return a},
q:function(a){var z=$.j
if(z===C.d)return a
return z.eh(a,!0)},
o:{"^":"de;",$iso:1,$isD:1,$isa:1,"%":"HTMLAppletElement|HTMLBRElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
kW:{"^":"o;M:target=",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
kY:{"^":"u;aX:url=","%":"ApplicationCacheErrorEvent"},
kZ:{"^":"o;M:target=",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
l_:{"^":"o;M:target=","%":"HTMLBaseElement"},
ba:{"^":"f;",$isba:1,"%":";Blob"},
l0:{"^":"o;",$isD:1,$isf:1,"%":"HTMLBodyElement"},
l1:{"^":"o;p:name=,D:value=","%":"HTMLButtonElement"},
d2:{"^":"o;k:height%,l:width%",
bE:function(a,b,c){return a.getContext(b,P.kk(c,null))},
cR:function(a,b,c,d,e,f,g){var z,y
z=P.ak(["alpha",!1,"depth",!1,"stencil",!0,"antialias",!1,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1])
y=this.bE(a,"webgl",z)
return y==null?this.bE(a,"experimental-webgl",z):y},
$isd2:1,
"%":"HTMLCanvasElement"},
fv:{"^":"S;j:length=",$isf:1,"%":"CDATASection|Comment|Text;CharacterData"},
l3:{"^":"h5;j:length=",
bF:function(a,b){var z=this.dJ(a,b)
return z!=null?z:""},
dJ:function(a,b){if(W.fF(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.fJ()+b)},
gk:function(a){return a.height},
gl:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
h5:{"^":"f+fE;"},
fE:{"^":"a;",
gk:function(a){return this.bF(a,"height")},
gl:function(a){return this.bF(a,"width")}},
l4:{"^":"u;D:value=","%":"DeviceLightEvent"},
l5:{"^":"S;",$isf:1,"%":"DocumentFragment|ShadowRoot"},
l6:{"^":"f;p:name=","%":"DOMError|FileError"},
l7:{"^":"f;",
gp:function(a){var z=a.name
if(P.da()&&z==="SECURITY_ERR")return"SecurityError"
if(P.da()&&z==="SYNTAX_ERR")return"SyntaxError"
return z},
i:function(a){return String(a)},
"%":"DOMException"},
fL:{"^":"f;k:height=,ad:left=,af:top=,l:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gl(a))+" x "+H.b(this.gk(a))},
q:function(a,b){var z,y,x
if(b==null)return!1
z=J.i(b)
if(!z.$isac)return!1
y=a.left
x=z.gad(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaf(b)
if(y==null?x==null:y===x){y=this.gl(a)
x=z.gl(b)
if(y==null?x==null:y===x){y=this.gk(a)
z=z.gk(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gv:function(a){var z,y,x,w
z=J.C(a.left)
y=J.C(a.top)
x=J.C(this.gl(a))
w=J.C(this.gk(a))
return W.en(W.ae(W.ae(W.ae(W.ae(0,z),y),x),w))},
$isac:1,
$asac:I.a6,
"%":";DOMRectReadOnly"},
de:{"^":"S;",
i:function(a){return a.localName},
$isf:1,
$isD:1,
"%":";Element"},
l9:{"^":"o;k:height%,p:name=,l:width%","%":"HTMLEmbedElement"},
la:{"^":"u;Y:error=","%":"ErrorEvent"},
u:{"^":"f;",
gap:function(a){return W.cD(a.currentTarget)},
gM:function(a){return W.cD(a.target)},
$isu:1,
$isa:1,
"%":"AnimationPlayerEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|TrackEvent|TransitionEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
D:{"^":"f;",
dr:function(a,b,c,d){return a.addEventListener(b,H.aq(c,1),!1)},
e2:function(a,b,c,d){return a.removeEventListener(b,H.aq(c,1),!1)},
$isD:1,
$isa:1,
"%":"MediaStream;EventTarget"},
lr:{"^":"o;p:name=","%":"HTMLFieldSetElement"},
ls:{"^":"ba;p:name=","%":"File"},
lv:{"^":"o;j:length=,p:name=,M:target=","%":"HTMLFormElement"},
av:{"^":"fY;",
fI:function(a,b,c,d,e,f){return a.open(b,c,!0,f,e)},
f1:function(a,b,c,d){return a.open(b,c,d)},
T:function(a,b){return a.send(b)},
$isav:1,
$isD:1,
$isa:1,
"%":"XMLHttpRequest"},
h_:{"^":"e:21;",
$1:[function(a){return a.responseText},null,null,2,0,null,38,"call"]},
h1:{"^":"e:0;a,b",
$1:[function(a){var z,y,x,w,v
z=this.b
y=z.status
x=y>=200&&y<300
w=y>307&&y<400
y=x||y===0||y===304||w
v=this.a
if(y)v.a_(0,z)
else v.cf(a)},null,null,2,0,null,6,"call"]},
fY:{"^":"D;","%":";XMLHttpRequestEventTarget"},
lw:{"^":"o;k:height%,p:name=,l:width%","%":"HTMLIFrameElement"},
c4:{"^":"f;k:height=,l:width=",$isc4:1,"%":"ImageData"},
di:{"^":"o;aO:complete=,k:height%,l:width%",$iso:1,$isD:1,$isa:1,"%":"HTMLImageElement"},
ly:{"^":"o;k:height%,p:name=,D:value=,l:width%",$isf:1,$isD:1,$isS:1,"%":"HTMLInputElement"},
c9:{"^":"cs;",$isc9:1,$isu:1,$isa:1,"%":"KeyboardEvent"},
lB:{"^":"o;p:name=","%":"HTMLKeygenElement"},
lC:{"^":"o;D:value=","%":"HTMLLIElement"},
lD:{"^":"o;p:name=","%":"HTMLMapElement"},
hG:{"^":"o;Y:error=","%":"HTMLAudioElement;HTMLMediaElement"},
lG:{"^":"o;p:name=","%":"HTMLMetaElement"},
lH:{"^":"o;D:value=","%":"HTMLMeterElement"},
aZ:{"^":"cs;",$isaZ:1,$isu:1,$isa:1,"%":";DragEvent|MSPointerEvent|MouseEvent|PointerEvent"},
lS:{"^":"f;",$isf:1,"%":"Navigator"},
lT:{"^":"f;p:name=","%":"NavigatorUserMediaError"},
S:{"^":"D;",
i:function(a){var z=a.nodeValue
return z==null?this.d9(a):z},
$isS:1,
$isD:1,
$isa:1,
"%":"Document|HTMLDocument|XMLDocument;Node"},
lV:{"^":"o;k:height%,p:name=,l:width%","%":"HTMLObjectElement"},
lW:{"^":"o;D:value=","%":"HTMLOptionElement"},
lX:{"^":"o;p:name=,D:value=","%":"HTMLOutputElement"},
lY:{"^":"o;p:name=,D:value=","%":"HTMLParamElement"},
m_:{"^":"fv;M:target=","%":"ProcessingInstruction"},
m0:{"^":"o;D:value=","%":"HTMLProgressElement"},
hS:{"^":"u;",$isu:1,$isa:1,"%":"XMLHttpRequestProgressEvent;ProgressEvent"},
m3:{"^":"hS;aX:url=","%":"ResourceProgressEvent"},
m5:{"^":"o;j:length=,p:name=,D:value=","%":"HTMLSelectElement"},
m6:{"^":"u;Y:error=","%":"SpeechRecognitionError"},
m7:{"^":"u;p:name=","%":"SpeechSynthesisEvent"},
m8:{"^":"u;aX:url=","%":"StorageEvent"},
mc:{"^":"o;p:name=,D:value=","%":"HTMLTextAreaElement"},
bu:{"^":"f;",
gM:function(a){return W.cD(a.target)},
gel:function(a){return H.c(new P.ab(C.e.I(a.clientX),C.e.I(a.clientY)),[null])},
$isa:1,
"%":"Touch"},
cq:{"^":"cs;",$iscq:1,$isu:1,$isa:1,"%":"TouchEvent"},
me:{"^":"h8;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.bh(b,a,null,null,null))
return a[b]},
K:function(a,b){return a[b]},
$ish:1,
$ash:function(){return[W.bu]},
$ism:1,
$isaT:1,
$isaP:1,
"%":"TouchList"},
h6:{"^":"f+aW;",$ish:1,
$ash:function(){return[W.bu]},
$ism:1},
h8:{"^":"h6+dj;",$ish:1,
$ash:function(){return[W.bu]},
$ism:1},
cs:{"^":"u;","%":"CompositionEvent|FocusEvent|SVGZoomEvent|TextEvent;UIEvent"},
mg:{"^":"hG;k:height%,l:width%","%":"HTMLVideoElement"},
bw:{"^":"aZ;",
gex:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.d(new P.W("deltaY is not supported"))},
gew:function(a){if(a.deltaX!==undefined)return a.deltaX
throw H.d(new P.W("deltaX is not supported"))},
$isbw:1,
$isaZ:1,
$isu:1,
$isa:1,
"%":"WheelEvent"},
by:{"^":"D;p:name=",
e4:function(a,b){return a.requestAnimationFrame(H.aq(b,1))},
dG:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$isby:1,
$isf:1,
$isD:1,
"%":"DOMWindow|Window"},
mm:{"^":"S;p:name=,D:value=","%":"Attr"},
mn:{"^":"f;k:height=,ad:left=,af:top=,l:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
q:function(a,b){var z,y,x
if(b==null)return!1
z=J.i(b)
if(!z.$isac)return!1
y=a.left
x=z.gad(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaf(b)
if(y==null?x==null:y===x){y=a.width
x=z.gl(b)
if(y==null?x==null:y===x){y=a.height
z=z.gk(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gv:function(a){var z,y,x,w
z=J.C(a.left)
y=J.C(a.top)
x=J.C(a.width)
w=J.C(a.height)
return W.en(W.ae(W.ae(W.ae(W.ae(0,z),y),x),w))},
$isac:1,
$asac:I.a6,
"%":"ClientRect"},
mo:{"^":"S;",$isf:1,"%":"DocumentType"},
mp:{"^":"fL;",
gk:function(a){return a.height},
gl:function(a){return a.width},
"%":"DOMRect"},
ms:{"^":"o;",$isD:1,$isf:1,"%":"HTMLFrameSetElement"},
mt:{"^":"h9;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.bh(b,a,null,null,null))
return a[b]},
K:function(a,b){return a[b]},
$ish:1,
$ash:function(){return[W.S]},
$ism:1,
$isaT:1,
$isaP:1,
"%":"MozNamedAttrMap|NamedNodeMap"},
h7:{"^":"f+aW;",$ish:1,
$ash:function(){return[W.S]},
$ism:1},
h9:{"^":"h7+dj;",$ish:1,
$ash:function(){return[W.S]},
$ism:1},
x:{"^":"a;a",
eK:function(a,b){return H.c(new W.el(a,this.a,!1),[null])},
cu:function(a){return this.eK(a,!1)},
bu:function(a,b){return H.c(new W.ek(a,this.a,!1),[null])},
B:function(a){return this.bu(a,!1)}},
el:{"^":"cn;a,b,c",
au:function(a,b,c,d){var z=new W.r(0,this.a,this.b,W.q(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.w()
return z}},
ek:{"^":"el;a,b,c"},
r:{"^":"it;a,b,c,d,e",
Z:function(){if(this.b==null)return
this.c9()
this.b=null
this.d=null
return},
ay:function(a,b){if(this.b==null)return;++this.a
this.c9()},
ax:function(a){return this.ay(a,null)},
w:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.f7(x,this.c,z,!1)}},
c9:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.f8(x,this.c,z,!1)}}},
j_:{"^":"a;a",
bu:function(a,b){return H.c(new W.ek(a,this.dH(a),!1),[null])},
B:function(a){return this.bu(a,!1)},
dH:function(a){return this.a.$1(a)}},
dj:{"^":"a;",
gC:function(a){return new W.fS(a,this.gj(a),-1,null)},
$ish:1,
$ash:null,
$ism:1},
fS:{"^":"a;a,b,c,d",
n:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.t(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gt:function(){return this.d}},
j0:{"^":"a;a",$isD:1,$isf:1,m:{
j1:function(a){if(a===window)return a
else return new W.j0(a)}}}}],["","",,P,{"^":"",c8:{"^":"f;",$isc8:1,"%":"IDBKeyRange"}}],["","",,P,{"^":"",kT:{"^":"aj;M:target=",$isf:1,"%":"SVGAElement"},kV:{"^":"iB;",$isf:1,"%":"SVGAltGlyphElement"},kX:{"^":"n;",$isf:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},lb:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFEBlendElement"},lc:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFEColorMatrixElement"},ld:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFEComponentTransferElement"},le:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFECompositeElement"},lf:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFEConvolveMatrixElement"},lg:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFEDiffuseLightingElement"},lh:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFEDisplacementMapElement"},li:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFEFloodElement"},lj:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFEGaussianBlurElement"},lk:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFEImageElement"},ll:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFEMergeElement"},lm:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFEMorphologyElement"},ln:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFEOffsetElement"},lo:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFESpecularLightingElement"},lp:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFETileElement"},lq:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFETurbulenceElement"},lt:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGFilterElement"},lu:{"^":"aj;k:height=,l:width=","%":"SVGForeignObjectElement"},fX:{"^":"aj;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},aj:{"^":"n;",$isf:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},lx:{"^":"aj;k:height=,l:width=",$isf:1,"%":"SVGImageElement"},lE:{"^":"n;",$isf:1,"%":"SVGMarkerElement"},lF:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGMaskElement"},lZ:{"^":"n;k:height=,l:width=",$isf:1,"%":"SVGPatternElement"},m1:{"^":"f;k:height=,l:width=","%":"SVGRect"},m2:{"^":"fX;k:height=,l:width=","%":"SVGRectElement"},m4:{"^":"n;",$isf:1,"%":"SVGScriptElement"},n:{"^":"de;",$isD:1,$isf:1,"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},ma:{"^":"aj;k:height=,l:width=",$isf:1,"%":"SVGSVGElement"},mb:{"^":"n;",$isf:1,"%":"SVGSymbolElement"},e_:{"^":"aj;","%":";SVGTextContentElement"},md:{"^":"e_;",$isf:1,"%":"SVGTextPathElement"},iB:{"^":"e_;","%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},mf:{"^":"aj;k:height=,l:width=",$isf:1,"%":"SVGUseElement"},mh:{"^":"n;",$isf:1,"%":"SVGViewElement"},mr:{"^":"n;",$isf:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},mu:{"^":"n;",$isf:1,"%":"SVGCursorElement"},mv:{"^":"n;",$isf:1,"%":"SVGFEDropShadowElement"},mw:{"^":"n;",$isf:1,"%":"SVGGlyphRefElement"},mx:{"^":"n;",$isf:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":"",kU:{"^":"f;p:name=","%":"WebGLActiveInfo"},bY:{"^":"u;",$isbY:1,$isu:1,$isa:1,"%":"WebGLContextEvent"},dT:{"^":"f;",$isdT:1,"%":"WebGLRenderingContext"},ct:{"^":"f;",$isa:1,"%":"WebGLUniformLocation"}}],["","",,P,{"^":""}],["","",,P,{"^":"",l2:{"^":"a;"}}],["","",,P,{"^":"",
jQ:[function(a,b,c,d){var z,y
if(b){z=[c]
C.b.bk(z,d)
d=z}y=P.a2(J.bP(d,P.kE()),!0,null)
return P.ev(H.hP(a,y))},null,null,8,0,null,26,27,28,29],
cF:function(a,b,c){var z
try{if(Object.isExtensible(a)&&!Object.prototype.hasOwnProperty.call(a,b)){Object.defineProperty(a,b,{value:c})
return!0}}catch(z){H.B(z)}return!1},
eA:function(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]
return},
ev:[function(a){var z
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=J.i(a)
if(!!z.$isaU)return a.a
if(!!z.$isba||!!z.$isu||!!z.$isc8||!!z.$isc4||!!z.$isS||!!z.$isT||!!z.$isby)return a
if(!!z.$isbZ)return H.G(a)
if(!!z.$isbg)return P.ez(a,"$dart_jsFunction",new P.jX())
return P.ez(a,"_$dart_jsObject",new P.jY($.$get$cE()))},"$1","eX",2,0,0,11],
ez:function(a,b,c){var z=P.eA(a,b)
if(z==null){z=c.$1(a)
P.cF(a,b,z)}return z},
eu:[function(a){var z,y
if(a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return a
else{if(a instanceof Object){z=J.i(a)
z=!!z.$isba||!!z.$isu||!!z.$isc8||!!z.$isc4||!!z.$isS||!!z.$isT||!!z.$isby}else z=!1
if(z)return a
else if(a instanceof Date){y=a.getTime()
z=new P.bZ(y,!1)
z.df(y,!1)
return z}else if(a.constructor===$.$get$cE())return a.o
else return P.cN(a)}},"$1","kE",2,0,28,11],
cN:function(a){if(typeof a=="function")return P.cG(a,$.$get$bc(),new P.k9())
if(a instanceof Array)return P.cG(a,$.$get$cx(),new P.ka())
return P.cG(a,$.$get$cx(),new P.kb())},
cG:function(a,b,c){var z=P.eA(a,b)
if(z==null||!(a instanceof Object)){z=c.$1(a)
P.cF(a,b,z)}return z},
aU:{"^":"a;a",
h:["dc",function(a,b){if(typeof b!=="string"&&typeof b!=="number")throw H.d(P.R("property is not a String or num"))
return P.eu(this.a[b])}],
gv:function(a){return 0},
q:function(a,b){if(b==null)return!1
return b instanceof P.aU&&this.a===b.a},
i:function(a){var z,y
try{z=String(this.a)
return z}catch(y){H.B(y)
return this.dd(this)}},
ek:function(a,b){var z,y
z=this.a
y=b==null?null:P.a2(H.c(new H.aY(b,P.eX()),[null,null]),!0,null)
return P.eu(z[a].apply(z,y))},
ej:function(a){return this.ek(a,null)},
m:{
du:function(a){if(typeof a==="number"||typeof a==="string"||typeof a==="boolean"||a==null)throw H.d(P.R("object cannot be a num, string, bool, or null"))
return P.cN(P.ev(a))}}},
hq:{"^":"aU;a"},
dt:{"^":"hu;a",
h:function(a,b){var z
if(typeof b==="number"&&b===C.c.bB(b)){z=b<0||b>=this.gj(this)
if(z)H.p(P.Y(b,0,this.gj(this),null,null))}return this.dc(this,b)},
gj:function(a){var z=this.a.length
if(typeof z==="number"&&z>>>0===z)return z
throw H.d(new P.F("Bad JsArray length"))}},
hu:{"^":"aU+aW;",$ish:1,$ash:null,$ism:1},
jX:{"^":"e:0;",
$1:function(a){var z=function(b,c,d){return function(){return b(c,d,this,Array.prototype.slice.apply(arguments))}}(P.jQ,a,!1)
P.cF(z,$.$get$bc(),a)
return z}},
jY:{"^":"e:0;a",
$1:function(a){return new this.a(a)}},
k9:{"^":"e:0;",
$1:function(a){return new P.hq(a)}},
ka:{"^":"e:0;",
$1:function(a){return H.c(new P.dt(a),[null])}},
kb:{"^":"e:0;",
$1:function(a){return new P.aU(a)}}}],["","",,P,{"^":"",
em:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
jo:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
ab:{"^":"a;aY:a>,aZ:b>",
i:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
q:function(a,b){var z,y,x
if(b==null)return!1
z=J.i(b)
if(!z.$isab)return!1
y=this.a
x=z.gaY(b)
if(y==null?x==null:y===x){y=this.b
z=z.gaZ(b)
z=y==null?z==null:y===z}else z=!1
return z},
gv:function(a){var z,y
z=J.C(this.a)
y=J.C(this.b)
return P.jo(P.em(P.em(0,z),y))},
ag:function(a,b){var z=new P.ab(this.a*b,this.b*b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}}}],["","",,H,{"^":"",
I:function(a){return a},
et:function(a,b,c){},
dA:{"^":"f;",$isdA:1,"%":"ArrayBuffer"},
bl:{"^":"f;",$isbl:1,$isT:1,"%":";ArrayBufferView;cf|dB|dD|cg|dC|dE|aa"},
lI:{"^":"bl;",$isT:1,"%":"DataView"},
cf:{"^":"bl;",
gj:function(a){return a.length},
$isaT:1,
$isaP:1},
cg:{"^":"dD;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.J(a,b))
return a[b]}},
dB:{"^":"cf+aW;",$ish:1,
$ash:function(){return[P.bN]},
$ism:1},
dD:{"^":"dB+dh;"},
aa:{"^":"dE;",$ish:1,
$ash:function(){return[P.k]},
$ism:1},
dC:{"^":"cf+aW;",$ish:1,
$ash:function(){return[P.k]},
$ism:1},
dE:{"^":"dC+dh;"},
lJ:{"^":"cg;",$isT:1,$ish:1,
$ash:function(){return[P.bN]},
$ism:1,
"%":"Float32Array"},
lK:{"^":"cg;",$isT:1,$ish:1,
$ash:function(){return[P.bN]},
$ism:1,
"%":"Float64Array"},
lL:{"^":"aa;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.J(a,b))
return a[b]},
$isT:1,
$ish:1,
$ash:function(){return[P.k]},
$ism:1,
"%":"Int16Array"},
lM:{"^":"aa;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.J(a,b))
return a[b]},
$isT:1,
$ish:1,
$ash:function(){return[P.k]},
$ism:1,
"%":"Int32Array"},
lN:{"^":"aa;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.J(a,b))
return a[b]},
$isT:1,
$ish:1,
$ash:function(){return[P.k]},
$ism:1,
"%":"Int8Array"},
lO:{"^":"aa;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.J(a,b))
return a[b]},
$isT:1,
$ish:1,
$ash:function(){return[P.k]},
$ism:1,
"%":"Uint16Array"},
lP:{"^":"aa;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.J(a,b))
return a[b]},
$isT:1,
$ish:1,
$ash:function(){return[P.k]},
$ism:1,
"%":"Uint32Array"},
lQ:{"^":"aa;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.J(a,b))
return a[b]},
$isT:1,
$ish:1,
$ash:function(){return[P.k]},
$ism:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
lR:{"^":"aa;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.J(a,b))
return a[b]},
$isT:1,
$ish:1,
$ash:function(){return[P.k]},
$ism:1,
"%":";Uint8Array"}}],["","",,H,{"^":"",
kJ:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
kk:function(a,b){var z={}
a.u(0,new P.kl(z))
return z},
c_:function(){var z=$.d8
if(z==null){z=J.b9(window.navigator.userAgent,"Opera",0)
$.d8=z}return z},
da:function(){var z=$.d9
if(z==null){z=!P.c_()&&J.b9(window.navigator.userAgent,"WebKit",0)
$.d9=z}return z},
fJ:function(){var z,y
z=$.d5
if(z!=null)return z
y=$.d6
if(y==null){y=J.b9(window.navigator.userAgent,"Firefox",0)
$.d6=y}if(y)z="-moz-"
else{y=$.d7
if(y==null){y=!P.c_()&&J.b9(window.navigator.userAgent,"Trident/",0)
$.d7=y}if(y)z="-ms-"
else z=P.c_()?"-o-":"-webkit-"}$.d5=z
return z},
fK:function(a){var z,y,x
try{y=document.createEvent(a)
y.initEvent("",!0,!0)
z=y
return!!J.i(z).$isu}catch(x){H.B(x)}return!1},
kl:{"^":"e:4;a",
$2:function(a,b){this.a[a]=b}}}],["","",,K,{"^":"",bR:{"^":"a;"},cu:{"^":"a;a,b"},dv:{"^":"a;a,b,c,d",
bp:function(a,b){var z,y
z=this.a
for(y=this.b;z==null?y!=null:z!==y;){if(z.a===b)return!0
z=z.b}return!1},
a8:function(a){var z,y,x,w,v,u
z=this.c+=a
y=this.d
if(!y.gaN())H.p(y.aI())
y.a7(z)
x=this.a
w=this.b
for(;x==null?w!=null:x!==w;){v=x.a
if(v==null){u=x.b
x.a=u.a
x.b=u.b
if(u==null?w==null:u===w)w=x
z=this.b
if(u==null?z==null:u===z)this.b=x}else{v.a8(a)
x=x.b}}return!0},
$isbR:1}}],["","",,A,{"^":"",fp:{"^":"a;l:a>,k:b>,c",
az:function(a){a.c.aV(a,this.c)}},fq:{"^":"a;a,b,c,d,e"},c0:{"^":"df;",
scT:function(a){this.r=a
this.id=!0},
scU:function(a){this.x=a
this.id=!0},
gp:function(a){return this.fx},
gfd:function(){var z,y
for(z=this;y=z.fy,y!=null;z=y);return z},
gbL:function(){var z=this.gfd()
return z instanceof A.ck?z:null},
gl:function(a){return this.gcc().c},
gk:function(a){return this.gcc().d},
gaD:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
if(this.id){this.id=!1
z=this.go
y=this.Q
x=this.r
w=this.x
v=this.y
u=this.z
if(x>-0.0001&&x<0.0001)x=0.0001
if(w>-0.0001&&w<0.0001)w=0.0001
if(v!==0||u!==0){t=u+y
s=x*Math.cos(H.aJ(t))
r=x*Math.sin(H.aJ(t))
t=v+y
q=-w*Math.sin(H.aJ(t))
p=w*Math.cos(H.aJ(t))
t=this.c
o=this.e
n=this.f
z.ah(s,r,q,p,t-o*s-n*q,this.d-o*r-n*p)}else if(y!==0){t=Math.cos(H.aJ(y))
o=Math.sin(H.aJ(y))
s=x*t
r=x*o
q=-w*o
p=w*t
t=this.c
o=this.e
n=this.f
z.ah(s,r,q,p,t-o*s-n*q,this.d-o*r-n*p)}else z.ah(x,0,0,w,this.c-this.e*x,this.d-this.f*w)}return this.go},
ga9:function(){return H.c(new U.V(0,0,0,0),[P.A])},
gcc:function(){var z=this.ga9()
return this.gaD().cL(z,z)},
ac:function(a,b){var z,y,x
z=this.ga9()
y=z.a
if(y<=a){x=z.b
z=x<=b&&y+z.c>a&&x+z.d>b}else z=!1
return z?this:null},
J:function(a,b){b.a=a.a
b.b=a.b
this.c0(b)
return b},
c0:function(a){var z,y,x,w,v,u,t,s,r
z=this.fy
if(z!=null)z.c0(a)
y=a.a
x=a.b
z=this.gaD().a
w=z[3]
v=y-z[4]
u=z[2]
t=x-z[5]
s=z[0]
z=z[1]
r=s*w-z*u
a.a=(w*v-u*t)/r
a.b=(s*t-z*v)/r},
A:function(a,b){var z,y,x,w
z=H.c([],[R.df])
for(y=this.fy;y!=null;y=y.fy)z.push(y)
x=z.length-1
while(!0){if(!(x>=0&&b.gcd()))break
z[x].bq(b,this,C.K)
if(b.f)return;--x}this.bq(b,this,C.a)
if(b.f)return
w=b.b
x=0
while(!0){if(!(x<z.length&&w))break
z[x].bq(b,this,C.L)
if(b.f)return;++x}},
az:function(a){}},db:{"^":"dl;",
ga9:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.rx
if(z.length===0)return A.c0.prototype.ga9.call(this)
for(y=1/0,x=1/0,w=-1/0,v=-1/0,u=0;u<z.length;++u){t=z[u]
s=t.ga9()
s=t.gaD().cL(s,s)
r=s.a
if(r<y)y=r
q=s.b
if(q<x)x=q
p=r+s.c
if(p>w)w=p
o=q+s.d
if(o>v)v=o}return H.c(new U.V(y,x,w-y,v-x),[P.A])},
ac:["bM",function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
for(z=this.rx,y=z.length-1,x=null;y>=0;--y){w=z[y]
v=w.gaD()
u=v.a
t=a-u[4]
s=b-u[5]
r=u[3]
q=u[2]
p=u[0]
u=u[1]
o=p*r-u*q
n=w.ac((r*t-q*s)/o,(p*s-u*t)/o)
if(n==null)continue
return n}return x}],
az:function(a){var z,y,x
for(z=this.rx,y=0;y<z.length;++y){x=z[y]
a.cF(x)}},
e9:function(a){var z
for(z=this;z!=null;z=z.fy)if(z===a)throw H.d(P.R("An object cannot be added as a child to one of it's children (or children's children, etc.)."))},
ds:function(a){var z,y,x,w
z=this.rx
for(y=z.length-1,x=a;y>=0;--y,x=w){w=z[y]
z[y]=x
if(a===w)break}},
bY:function(a,b){var z,y
z=!1
y=this
while(!0){if(!(y!=null&&!z))break
if(y.bw(b,!0))z=!0
y=y.fy}this.bZ(a,new R.a1(b,!1,C.a,null,null,!1,!1),z)},
bZ:function(a,b,c){var z,y,x
z=!c
if(!z||a.eP(b.a))a.A(0,b)
if(!!a.$isdb){c=!z||a.bw(b.a,!0)
y=a.rx
for(x=0;x<y.length;++x)this.bZ(y[x],b,c)}}},dl:{"^":"c0;"},hX:{"^":"hY;b,c,d,e,f,r,x,a",
a8:function(a){var z,y,x,w,v,u,t,s
this.e+=a
z=this.f
z.x=a
R.ew(z,$.$get$ex())
this.b.a8(a)
for(z=this.c,y=0;y<z.length;++y)z[y].ct.a8(a)
for(y=0;y<z.length;++y){x=z[y]
w=this.e
v=x.aS
if(v===C.o||v===C.E){x.ca()
x.y1.aA(0)
x.y1.bn(0,x.bt)
v=x.ab
u=x.cm
t=v.d
v.e=t
v=t.c
s=v.a
s[0]=1
s[1]=0
s[2]=0
s[3]=1
s[4]=0
s[5]=0
t.a=1
t.b=C.f
v.ci(u)
x.ab.a=V.b3(w)
x.ab.b=V.b3(a)
x.ab.cF(x)
x.ab.c.L(0)
if(x.aS===C.E)x.aS=C.aq}}R.ew(this.r,$.$get$ey())}},cl:{"^":"a;a",
i:function(a){return C.ak.h(0,this.a)}},bs:{"^":"a;a",
i:function(a){return C.aj.h(0,this.a)}},a4:{"^":"a;a",
i:function(a){return C.an.h(0,this.a)}},ck:{"^":"db;x2,y1,y2,aa,aP,cj,ck,aQ,cl,aR,cm,ab,br,aS,cn,co,cp,cq,bs,cr,cs,eE,ct,fF,bt,eF,eG,eH,eI,rx,ry,x1,k2,k3,k4,r1,r2,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,a",
ga2:function(){return this.y1.ga2()},
ac:function(a,b){var z=this.bM(a,b)
return z!=null?z:this},
dE:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
if(b.ga2()===C.m)try{z=a
b.gfj()
b.geg()
y=new T.cd(new Float32Array(H.I(16)))
y.aH()
x=H.c(new H.z(0,null,null,null,null,null,0),[P.w,P.k])
w=H.c(new H.z(0,null,null,null,null,null,0),[P.w,P.ct])
w=new L.hZ(-1,null,null,x,w,new L.bo(new Int16Array(H.I(0)),35048,0,0,-1,null,null),new L.bp(new Float32Array(H.I(0)),35048,0,0,-1,null,null))
x=H.c(new H.z(0,null,null,null,null,null,0),[P.w,P.k])
v=H.c(new H.z(0,null,null,null,null,null,0),[P.w,P.ct])
u=new Int16Array(H.I(0))
t=new Float32Array(H.I(0))
s=H.c(new H.z(0,null,null,null,null,null,0),[P.w,P.k])
r=H.c(new H.z(0,null,null,null,null,null,0),[P.w,P.ct])
q=new Int16Array(H.I(0))
p=new Float32Array(H.I(0))
o=new Int16Array(H.I(16384))
n=new Float32Array(H.I(32768))
m=H.c(new Array(8),[L.dS])
l=H.c([],[L.dR])
k=H.c(new H.z(0,null,null,null,null,null,0),[P.w,L.br])
k=new L.hV(z,null,y,null,null,null,null,!0,0,0,0,0,w,new L.i_(-1,null,null,x,v,new L.bo(u,35048,0,0,-1,null,null),new L.bp(t,35048,0,0,-1,null,null)),new L.i0(-1,null,null,s,r,new L.bo(q,35048,0,0,-1,null,null),new L.bp(p,35048,0,0,-1,null,null)),new L.bo(o,35048,0,0,-1,null,null),new L.bp(n,35048,0,0,-1,null,null),m,l,k,P.Z(null,null,!1,L.ad),P.Z(null,null,!1,L.ad))
l=C.a3.B(z)
H.c(new W.r(0,l.a,l.b,W.q(k.gdO()),!1),[H.l(l,0)]).w()
l=C.a4.B(z)
H.c(new W.r(0,l.a,l.b,W.q(k.gdP()),!1),[H.l(l,0)]).w()
j=J.fh(z,!1,!1,!1,!0,!1,!0)
if(!J.i(j).$isdT)H.p(new P.F("Failed to get WebGL context."))
k.d=j
j.enable(3042)
k.d.disable(2960)
k.d.disable(2929)
k.d.disable(2884)
k.d.pixelStorei(37441,1)
k.d.blendFunc(1,771)
k.f=w
w.bj(k)
k.z=!0
z=$.bq+1
$.bq=z
k.Q=z
k.aA(0)
return k}catch(i){H.B(i)
z=a
y=T.a9()
z.toString
y=new L.dP(z,z.getContext("2d"),y,C.f,1,P.Z(null,null,!1,L.ad),P.Z(null,null,!1,L.ad))
y.aA(0)
return y}else if(b.ga2()===C.n){z=a
y=T.a9()
z.toString
y=new L.dP(z,z.getContext("2d"),y,C.f,1,P.Z(null,null,!1,L.ad),P.Z(null,null,!1,L.ad))
y.aA(0)
return y}else throw H.d(new P.F("Unknown RenderEngine"))},
ca:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.aa
y=this.aP
if($.$get$cV()){x=window.innerWidth
w=window.innerHeight
v=0
u=0}else{t=this.x2.getBoundingClientRect()
s=J.E(t)
v=C.e.I(this.x2.clientLeft)+J.bQ(s.gad(t))
u=C.e.I(this.x2.clientTop)+J.bQ(s.gaf(t))
x=C.e.I(this.x2.clientWidth)
w=C.e.I(this.x2.clientHeight)}if(typeof x!=="number")throw H.d("dart2js_hint")
if(typeof w!=="number")throw H.d("dart2js_hint")
if(x===0||w===0)return
r=x/z
q=w/y
switch(this.cn){case C.ar:p=q
o=r
break
case C.as:p=r>q?r:q
o=p
break
case C.at:o=1
p=1
break
case C.i:p=r<q?r:q
o=p
break
default:o=1
p=1}s=this.co
switch(s){case C.z:case C.B:case C.w:n=0
break
case C.x:case C.h:case C.C:n=(x-z*o)/2
break
case C.y:case C.A:case C.D:n=x-z*o
break
default:n=0}switch(s){case C.w:case C.x:case C.y:m=0
break
case C.z:case C.h:case C.A:m=(w-y*p)/2
break
case C.B:case C.C:case C.D:m=w-y*p
break
default:m=0}s=this.cl
s.a=-n/o
s.b=-m/p
s.c=x/o
s.d=w/p
s=this.cm
s.ah(o,0,0,p,n,m)
l=this.aQ
s.bH(0,l,l)
l=this.aR
l.ah(1,0,0,1,-v-n,-u-m)
l.bH(0,1/o,1/p)
if(this.cj!==x||this.ck!==w){this.cj=x
this.ck=w
this.x2.width=C.e.I(x*this.aQ)
this.x2.height=C.e.I(w*this.aQ)
if(C.e.I(this.x2.clientWidth)!==x||C.e.I(this.x2.clientHeight)!==w){s=this.x2.style
l=H.b(x)+"px"
s.width=l
s=this.x2.style
l=H.b(w)+"px"
s.height=l}this.A(0,new R.a1("resize",!1,C.a,null,null,!1,!1))}},
bi:function(){var z,y,x,w,v,u,t,s,r,q
z=this.bs
y=$.hJ
if(z!=null&&y==="auto"){x=z.k4
if(x!=="auto")y=x}if(y==="auto")y="default"
w=this.cp
if(w==null?y!=null:w!==y){this.cp=y
w=this.x2.style
if($.$get$ce().G(y)){v=$.$get$ce().h(0,y)
u=J.fe(v)
t=v.geQ()
s=t.gaY(t)
t=v.geQ()
r=t.gaZ(t)
q="url('"+H.b(u)+"') "+H.b(s)+" "+H.b(r)+", "+H.b(y)}else q=y
t=$.hI?"none":q
w.toString
w.cursor=t==null?"":t}},
fA:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
a.preventDefault()
z=Date.now()
y=a.button
x=this.aR.bC(H.c(new P.ab(a.clientX,a.clientY),[null]))
w=H.c(new U.ay(0,0),[P.A])
if(y<0||y>2)return
if(a.type==="mousemove"&&this.cq.q(0,x))return
v=this.eE[y]
this.cq=x
C.b.u(this.cr,new A.io(x))
if(a.type!=="mouseout")u=this.ac(x.a,x.b)
else{this.A(0,new R.a1("mouseLeave",!1,C.a,null,null,!1,!1))
u=null}t=this.bs
if(t==null?u!=null:t!==u){s=[]
r=[]
for(q=t;q!=null;q=q.fy)s.push(q)
for(q=u;q!=null;q=q.fy)r.push(q)
for(p=s.length,o=r.length,n=0;!0;++n){if(n===p)break
if(n===o)break
if(s[p-n-1]!==r[o-n-1])break}if(t!=null){t.J(x,w)
p=w.a
o=w.b
m=x.a
l=x.b
k=a.altKey
j=a.ctrlKey
i=a.shiftKey
t.A(0,new R.al(0,0,v.f,0,p,o,m,l,k,j,i,!1,"mouseOut",!0,C.a,null,null,!1,!1))}for(h=0;h<s.length-n;++h){g=s[h]
g.J(x,w)
p=w.a
o=w.b
m=x.a
l=x.b
k=a.altKey
j=a.ctrlKey
i=a.shiftKey
g.A(0,new R.al(0,0,v.f,0,p,o,m,l,k,j,i,!1,"rollOut",!1,C.a,null,null,!1,!1))}for(h=r.length-n-1;h>=0;--h){g=r[h]
g.J(x,w)
p=w.a
o=w.b
m=x.a
l=x.b
k=a.altKey
j=a.ctrlKey
i=a.shiftKey
g.A(0,new R.al(0,0,v.f,0,p,o,m,l,k,j,i,!1,"rollOver",!1,C.a,null,null,!1,!1))}if(u!=null){u.J(x,w)
p=w.a
o=w.b
m=x.a
l=x.b
k=a.altKey
j=a.ctrlKey
i=a.shiftKey
u.A(0,new R.al(0,0,v.f,0,p,o,m,l,k,j,i,!1,"mouseOver",!0,C.a,null,null,!1,!1))}this.bs=u}this.bi()
if(a.type==="mousedown"){this.x2.focus()
f=v.a
p=v.e
if((u==null?p!=null:u!==p)||z>v.r+500)v.x=0
v.f=!0
v.e=u
v.r=z;++v.x}else f=null
if(a.type==="mouseup"){f=v.b
v.f=!1
p=v.e
e=p==null?u==null:p===u
d=e&&(v.x&1)===0&&z<v.r+500}else{e=!1
d=!1}z=a.type
if(z==="mousemove")f="mouseMove"
if(z==="contextmenu")f="contextMenu"
if(f!=null&&u!=null){u.J(x,w)
z=w.a
p=w.b
o=x.a
m=x.b
l=a.altKey
k=a.ctrlKey
j=a.shiftKey
u.A(0,new R.al(0,0,v.f,v.x,z,p,o,m,l,k,j,!1,f,!0,C.a,null,null,!1,!1))
if(e){if(d);f=v.c
z=w.a
p=w.b
o=x.a
m=x.b
l=a.altKey
k=a.ctrlKey
j=a.shiftKey
u.A(0,new R.al(0,0,v.f,0,z,p,o,m,l,k,j,!1,f,!0,C.a,null,null,!1,!1))}}},"$1","gal",2,0,22,3],
fB:[function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.aR.bC(H.c(new P.ab(a.clientX,a.clientY),[null]))
y=H.c(new U.ay(0,0),[P.A])
x=this.ac(z.a,z.b)
x.J(z,y)
w=y.a
v=y.b
u=z.a
t=z.b
s=a.altKey
r=a.ctrlKey
q=a.shiftKey
p=new R.al((a&&C.F).gew(a),C.F.gex(a),!1,0,w,v,u,t,s,r,q,!1,"mouseWheel",!0,C.a,null,null,!1,!1)
x.A(0,p)
if(p.r)a.stopImmediatePropagation()
if(p.f)a.stopPropagation()
if(p.db)a.preventDefault()},"$1","gdX",2,0,23,3],
fC:[function(a){var z,y,x,w,v,u,t,s,r,q,p
if($.$get$cV()){z=P.du(a)
y=[]
C.b.bk(y,J.bP(z.h(0,"changedTouches"),P.eX()))
x=H.c(new P.dt(y),[null])
w=V.kn(z.h(0,"type"))
z.ej("preventDefault")
for(y=x.gC(x);y.n();){v=P.du(y.d)
this.c3(w,V.K(v.h(0,"identifier")),H.c(new P.ab(V.b3(v.h(0,"clientX")),V.b3(v.h(0,"clientY"))),[null]),!1,!1,!1)}}else{a.preventDefault()
w=a.type
u=a.altKey
t=a.ctrlKey
s=a.shiftKey
for(y=a.changedTouches,r=y.length,q=0;q<y.length;y.length===r||(0,H.f4)(y),++q){p=y[q]
this.c3(w,p.identifier,C.av.gel(p),u,t,s)}}},"$1","ga6",2,0,24,3],
c3:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=this.aR.bC(c)
y=H.c(new U.ay(0,0),[P.A])
x=this.bM(z.a,z.b)
x=x!=null?x:this
w=this.cs
v=w.f6(b,new A.ip(this,x))
u=v.gcK()
t=v.gf4()
C.b.u(this.cr,new A.iq(z,u))
s=J.E(v)
r=s.gap(v)
if(r==null?x!=null:r!==x){q=s.gap(v)
p=[]
o=[]
for(n=q;n!=null;n=n.fy)p.push(n)
for(n=x;n!=null;n=n.fy)o.push(n)
for(r=p.length,m=o.length,l=0;!0;++l){if(l===r)break
if(l===m)break
if(p[r-l-1]!==o[m-l-1])break}if(q!=null){q.J(z,y)
q.A(0,new R.aC(u,t,y.a,y.b,z.a,z.b,d,e,f,!1,"touchOut",!0,C.a,null,null,!1,!1))}for(k=0;k<p.length-l;++k){j=p[k]
j.J(z,y)
j.A(0,new R.aC(u,t,y.a,y.b,z.a,z.b,d,e,f,!1,"touchRollOut",!1,C.a,null,null,!1,!1))}for(k=o.length-l-1;k>=0;--k){j=o[k]
j.J(z,y)
j.A(0,new R.aC(u,t,y.a,y.b,z.a,z.b,d,e,f,!1,"touchRollOver",!1,C.a,null,null,!1,!1))}if(x!=null){x.J(z,y)
x.A(0,new R.aC(u,t,y.a,y.b,z.a,z.b,d,e,f,!1,"touchOver",!0,C.a,null,null,!1,!1))}s.sap(v,x)}if(a==="touchstart"){this.x2.focus()
w.E(0,b,v)
i="touchBegin"}else i=null
if(a==="touchend"){w.S(0,b)
s=s.gM(v)
h=s==null?x==null:s===x
i="touchEnd"}else h=!1
if(a==="touchcancel"){w.S(0,b)
i="touchCancel"}if(a==="touchmove")i="touchMove"
if(i!=null&&x!=null){x.J(z,y)
x.A(0,new R.aC(u,t,y.a,y.b,z.a,z.b,d,e,f,!1,i,!0,C.a,null,null,!1,!1))
if(h)x.A(0,new R.aC(u,t,y.a,y.b,z.a,z.b,d,e,f,!1,"touchTap",!0,C.a,null,null,!1,!1))}},
fz:[function(a){return},"$1","gb9",2,0,25,3],
dl:function(a,b,c,d){var z
if(!J.i(a).$isd2)throw H.d(P.R("canvas"))
if(a.tabIndex<=0)a.tabIndex=1
z=a.style
if(z.outline==="")z.outline="none"
c=$.$get$cm()
this.bt=c.f
this.eF=!0
this.eG=!0
this.eH=!1
this.eI=!1
this.x2=a
this.co=c.e
this.cn=c.d
this.aS=c.c
this.br=c.b
this.aa=V.K(d)
this.aP=V.K(b)
this.aQ=V.eY(c.y,$.$get$cQ())
z=this.dE(a,c)
this.y1=z
this.ab=L.i2(z,null,null,null)
P.b5("StageXL render engine : "+C.u.h(0,this.y1.ga2().a))
z=C.P.B(a)
H.c(new W.r(0,z.a,z.b,W.q(this.gb9()),!1),[H.l(z,0)]).w()
z=C.R.B(a)
H.c(new W.r(0,z.a,z.b,W.q(this.gb9()),!1),[H.l(z,0)]).w()
z=C.Q.B(a)
H.c(new W.r(0,z.a,z.b,W.q(this.gb9()),!1),[H.l(z,0)]).w()
z=this.br
if(z===C.j||z===C.q){z=C.U.B(a)
H.c(new W.r(0,z.a,z.b,W.q(this.gal()),!1),[H.l(z,0)]).w()
z=C.X.B(a)
H.c(new W.r(0,z.a,z.b,W.q(this.gal()),!1),[H.l(z,0)]).w()
z=C.V.B(a)
H.c(new W.r(0,z.a,z.b,W.q(this.gal()),!1),[H.l(z,0)]).w()
z=C.W.B(a)
H.c(new W.r(0,z.a,z.b,W.q(this.gal()),!1),[H.l(z,0)]).w()
z=C.M.B(a)
H.c(new W.r(0,z.a,z.b,W.q(this.gal()),!1),[H.l(z,0)]).w()
z=C.ax.B(a)
H.c(new W.r(0,z.a,z.b,W.q(this.gdX()),!1),[H.l(z,0)]).w()}z=this.br
if((z===C.a6||z===C.q)&&$.$get$eV()){z=C.a2.B(a)
H.c(new W.r(0,z.a,z.b,W.q(this.ga6()),!1),[H.l(z,0)]).w()
z=C.Z.B(a)
H.c(new W.r(0,z.a,z.b,W.q(this.ga6()),!1),[H.l(z,0)]).w()
z=C.a1.B(a)
H.c(new W.r(0,z.a,z.b,W.q(this.ga6()),!1),[H.l(z,0)]).w()
z=C.a_.B(a)
H.c(new W.r(0,z.a,z.b,W.q(this.ga6()),!1),[H.l(z,0)]).w()
z=C.a0.B(a)
H.c(new W.r(0,z.a,z.b,W.q(this.ga6()),!1),[H.l(z,0)]).w()
z=C.Y.B(a)
H.c(new W.r(0,z.a,z.b,W.q(this.ga6()),!1),[H.l(z,0)]).w()}$.$get$dz().eY(new A.ir(this))
this.bi()
this.ca()
this.y1.bn(0,this.bt)},
m:{
il:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
z=H.c(new U.V(0,0,0,0),[P.A])
y=T.a9()
x=T.a9()
w=H.c(new U.ay(0,0),[P.A])
v=H.c([],[A.j5])
u=H.c(new H.z(0,null,null,null,null,null,0),[P.k,A.er])
t=new K.dv(null,null,0,P.Z(null,null,!1,P.A))
s=new K.cu(null,null)
t.a=s
t.b=s
s=H.c([],[A.c0])
r=$.bd
$.bd=r+1
r=new A.ck(null,null,null,0,0,0,0,1,z,y,x,null,C.j,C.o,C.i,C.h,"default",w,null,v,u,[new A.cB("mouseDown","mouseUp","click","doubleClick",null,!1,0,0),new A.cB("middleMouseDown","middleMouseUp","middleClick","middleClick",null,!1,0,0),new A.cB("rightMouseDown","rightMouseUp","rightClick","rightClick",null,!1,0,0)],t,null,4294967295,!0,!0,!1,!1,s,!0,!0,!1,!0,"auto",!0,0,r,0,0,0,0,1,1,0,0,0,1,!0,!1,null,null,[],null,"",null,T.a9(),!0,null,null)
r.dl(a,b,c,d)
return r}}},ir:{"^":"e:0;a",
$1:[function(a){return this.a.bi()},null,null,2,0,null,32,"call"]},io:{"^":"e:0;a",
$1:function(a){return a.fk(0,this.a)}},ip:{"^":"e:1;a,b",
$0:function(){var z,y,x
z=this.b
y=this.a.cs
y=y.ga1(y)
x=$.es
$.es=x+1
return new A.er(x,y,z,z)}},iq:{"^":"e:0;a,b",
$1:function(a){return a.fk(this.b,this.a)}},im:{"^":"a;a2:a<,b,c,d,e,f,fj:r<,eg:x<,y,z,Q,ch,cx"},cB:{"^":"a;a,b,c,d,M:e>,f,r,x"},er:{"^":"a;cK:a<,f4:b<,M:c>,ap:d*"},j5:{"^":"a;"}}],["","",,O,{"^":"",fT:{"^":"dl;rx,ry,x1,x2,y1,y2,aa,aP,k2,k3,k4,r1,r2,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,a",
a8:function(a){var z,y,x,w
if(!this.y1)return!0
z=this.x2
if(z==null){this.x2=0
this.A(0,this.aa)}else{this.x2=z+a
for(;this.y1;){z=this.ry
y=this.x1
x=z[y]
w=C.c.bG(y+1,this.rx.length)
z=this.x2
if(z<x)break
this.x1=w
this.x2=z-x
z=y!==w
if(z){this.A(0,this.aa)
if(this.x1!==w)return!0}if(z)if(w===this.rx.length-1);}}return!0},
ga9:function(){var z,y
z=this.rx[this.x1]
y=J.E(z)
return H.c(new U.V(0,0,y.gl(z),y.gk(z)),[P.A])},
ac:function(a,b){var z=this.rx[this.x1]
if(a<0||a>=J.fg(z))return
if(b<0||b>=J.fc(z))return
return this},
az:function(a){this.rx[this.x1].az(a)},
$isbR:1}}],["","",,L,{"^":"",
eB:function(){if($.cH===-1){var z=window
C.G.dG(z)
$.cH=C.G.e4(z,W.q(new L.k_()))}},
fr:{"^":"a;a,b,c"},
bo:{"^":"a;a,b,c,d,e,f,r"},
bp:{"^":"a;a,b,c,d,e,f,r",
bl:function(a,b,c,d){if(a==null)return
this.r.vertexAttribPointer(a,b,5126,!1,c,d)}},
dQ:{"^":"a;a",
i:function(a){return C.u.h(0,this.a)}},
ad:{"^":"a;"},
dO:{"^":"a;"},
dP:{"^":"dO;c,d,e,f,r,a,b",
ga2:function(){return C.n},
aA:function(a){var z
this.bK(0,this.e)
this.f=C.f
z=this.d
z.globalCompositeOperation="source-over"
this.r=1
z.globalAlpha=1},
bn:function(a,b){var z,y,x
this.bK(0,this.e)
this.f=C.f
z=this.d
z.globalCompositeOperation="source-over"
this.r=1
z.globalAlpha=1
y=b>>>24&255
if(y<255){x=this.c
z.clearRect(0,0,x.width,x.height)}if(y>0){z.fillStyle=V.kj(b)
x=this.c
z.fillRect(0,0,x.width,x.height)}},
L:function(a){},
aV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
if(b.z){this.fb(a,b.a,b.x,b.y)
return}z=this.d
y=b.a.c
x=b.d
w=b.b
v=b.r
u=a.e
t=u.c
s=u.a
r=u.b
if(this.r!==s){this.r=s
z.globalAlpha=s}if(this.f!==r){this.f=r
z.globalCompositeOperation=r.c}if(x===0){u=t.a
z.setTransform(u[0],u[1],u[2],u[3],u[4],u[5])
u=w.a
q=w.b
p=w.c
o=w.d
n=v[0]
m=v[1]
z.drawImage(y,u,q,p,o,n,m,v[8]-n,v[9]-m)}else if(x===1){u=t.a
z.setTransform(-u[2],-u[3],u[0],u[1],u[4],u[5])
z.drawImage(y,w.a,w.b,w.c,w.d,0-v[13],v[12],v[9]-v[1],v[8]-v[0])}else if(x===2){u=t.a
z.setTransform(-u[0],-u[1],-u[2],-u[3],u[4],u[5])
u=w.a
q=w.b
p=w.c
o=w.d
n=v[8]
m=v[9]
z.drawImage(y,u,q,p,o,0-n,0-m,n-v[0],m-v[1])}else if(x===3){u=t.a
z.setTransform(u[2],u[3],-u[0],-u[1],u[4],u[5])
z.drawImage(y,w.a,w.b,w.c,w.d,v[5],0-v[4],v[9]-v[1],v[8]-v[0])}},
fb:function(a8,a9,b0,b1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
z=this.d
y=a9.c
x=a9.a
w=a9.b
v=a8.e
u=v.c
t=v.a
s=v.b
if(this.r!==t){this.r=t
z.globalAlpha=t}if(this.f!==s){this.f=s
z.globalCompositeOperation=s.c}v=u.a
z.setTransform(v[0],v[1],v[2],v[3],v[4],v[5])
for(v=b0.length-2,r=0;r<v;r+=3){q=J.bO(b0[r],2)
p=b1[q]
o=b1[q+1]
n=J.a7(b1[q+2],x)
m=J.a7(b1[q+3],w)
l=J.bO(b0[r+1],2)
k=b1[l]
j=b1[l+1]
i=J.a7(b1[l+2],x)
h=J.a7(b1[l+3],w)
g=J.bO(b0[r+2],2)
f=b1[g]
e=b1[g+1]
d=J.a7(b1[g+2],x)
c=J.a7(b1[g+3],w)
b=d-i
a=n-d
a0=i-n
a1=m*b+h*a+c*a0
a2=h-c
a3=c-m
a4=m-h
a5=c*i-h*d
a6=m*d-c*n
a7=h*n-m*i
z.save()
z.beginPath()
z.moveTo(p,o)
z.lineTo(k,j)
z.lineTo(f,e)
z.clip()
z.transform((p*a2+k*a3+f*a4)/a1,(o*a2+j*a3+e*a4)/a1,(p*b+k*a+f*a0)/a1,(o*b+j*a+e*a0)/a1,(p*a5+k*a6+f*a7)/a1,(o*a5+j*a6+e*a7)/a1)
z.drawImage(y,0,0)
z.restore()}},
bK:function(a,b){var z=b.a
this.d.setTransform(z[0],z[1],z[2],z[3],z[4],z[5])}},
hV:{"^":"dO;c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,a,b",
ga2:function(){return C.m},
aA:function(a){var z=this.c
this.cx=z.width
this.cy=z.height
this.r=null
this.d.bindFramebuffer(36160,null)
this.d.viewport(0,0,this.cx,this.cy)
z=this.e
z.aH()
z.cS(0,2/this.cx,-2/this.cy,1)
z.fi(0,-1,1,0)
this.f.scC(z)},
bn:function(a,b){var z,y
z=(b>>>24&255)/255
this.d.colorMask(!0,!0,!0,!0)
this.d.clearColor((b>>>16&255)/255*z,(b>>>8&255)/255*z,(b&255)/255*z,z)
this.d.clear(17408)
y=this.r
if(y instanceof L.dR){y=y.b
y.toString
y.c=V.K(0)
this.d.disable(2960)}else{this.ch=0
this.d.disable(2960)}},
L:function(a){this.f.L(0)},
aV:function(a,b){var z=this.db
this.ed(z)
this.ec(a.e.b)
this.ee(b.a)
z.aV(a,b)},
ed:function(a){var z=this.f
if(a!==z){z.L(0)
this.f=a
a.bj(this)
this.f.scC(this.e)}},
ec:function(a){if(a!==this.y){this.f.L(0)
this.y=a
this.d.blendFunc(a.a,a.b)}},
ee:function(a){var z,y
z=this.fy
y=z[0]
if(a==null?y!=null:a!==y){this.f.L(0)
z[0]=a
z=a.r
y=this.Q
if(z!==y){a.f=this
a.r=y
z=this.d
a.y=z
a.z=z.createTexture()
a.y.activeTexture(33984)
a.y.bindTexture(3553,a.z)
z=a.c
if(z!=null){a.y.texImage2D(3553,0,6408,6408,5121,z)
a.x=a.y.getError()===1281}else a.y.texImage2D(3553,0,6408,a.a,a.b,0,6408,5121,null)
if(a.x){z=a.a
z=W.ft(a.b,z)
a.d=z
z.toString
z.getContext("2d").drawImage(a.c,0,0)
a.y.texImage2D(3553,0,6408,6408,5121,a.d)}a.y.texParameteri(3553,10242,33071)
a.y.texParameteri(3553,10243,33071)
z=a.y
y=a.e.a
z.texParameteri(3553,10241,y)
a.y.texParameteri(3553,10240,y)}else{a.y.activeTexture(33984)
a.y.bindTexture(3553,a.z)}}},
fo:[function(a){var z
a.preventDefault()
this.z=!1
z=this.a
if(!z.gaN())H.p(z.aI())
z.a7(new L.ad())},"$1","gdO",2,0,10,8],
fp:[function(a){var z
this.z=!0
z=$.bq+1
$.bq=z
this.Q=z
z=this.b
if(!z.gaN())H.p(z.aI())
z.a7(new L.ad())},"$1","gdP",2,0,10,8]},
dR:{"^":"a;a,b,c,d,e,f",
gl:function(a){return this.a.a},
gk:function(a){return this.a.b}},
k_:{"^":"e:0;",
$1:[function(a){var z,y,x
z=V.b3(a)/1000
y=$.eC
$.eC=z
$.cH=-1
L.eB()
x=$.$get$cI()
x.toString
x=H.c(x.slice(),[H.l(x,0)])
C.b.u(x,new L.jZ(z-y))},null,null,2,0,null,34,"call"]},
jZ:{"^":"e:0;a",
$1:function(a){return a.$1(this.a)}},
hY:{"^":"a;",
d3:function(a){this.a=!0
L.eB()
$.$get$cI().push(this.gdU())},
fu:[function(a){if(this.a&&a>=0)if(typeof a==="number")this.a8(a)},"$1","gdU",2,0,26,35]},
br:{"^":"a;",
scC:function(a){var z=this.e.h(0,"uProjectionMatrix")
this.b.uniformMatrix4fv(z,!1,a.a)},
bj:["de",function(a){var z,y,x
z=this.a
y=a.Q
if(z!==y){this.a=y
z=a.d
this.b=z
x=a.fr
this.f=x
this.r=a.fx
if(x.e!==y){x.e=y
x.r=z
z=z.createBuffer()
x.f=z
x.r.bindBuffer(34963,z)
x.r.bufferData(34963,x.a,x.b)}x.r.bindBuffer(34963,x.f)
z=this.r
y=z.e
x=a.Q
if(y!==x){z.e=x
y=a.d
z.r=y
y=y.createBuffer()
z.f=y
z.r.bindBuffer(34962,y)
z.r.bufferData(34962,z.a,z.b)}z.r.bindBuffer(34962,z.f)
z=this.dD(this.b)
this.c=z
this.ea(this.b,z)
this.eb(this.b,this.c)}this.b.useProgram(this.c)}],
L:function(a){var z,y,x,w,v
z=this.f
y=z.c
if(y>0&&this.r.c>0){x=z.a.buffer
x.toString
H.et(x,0,y)
w=new Int16Array(x,0,y)
z.r.bufferSubData(34963,0,w)
z=this.f
z.c=0
z.d=0
z=this.r
x=z.a.buffer
v=z.c
x.toString
H.et(x,0,v)
w=new Float32Array(x,0,v)
z.r.bufferSubData(34962,0,w)
z=this.r
z.c=0
z.d=0
this.b.drawElements(4,y,5123,0)}},
dD:function(a){var z,y,x
z=a.createProgram()
y=this.bW(a,this.gbD(),35633)
x=this.bW(a,this.gbv(),35632)
a.attachShader(z,y)
a.attachShader(z,x)
a.linkProgram(z)
if(a.getProgramParameter(z,35714)===!0)return z
throw H.d(new P.F(a.isContextLost()?"ContextLost":a.getProgramInfoLog(z)))},
bW:function(a,b,c){var z=a.createShader(c)
a.shaderSource(z,b)
a.compileShader(z)
if(a.getShaderParameter(z,35713)===!0)return z
throw H.d(new P.F(a.isContextLost()?"ContextLost":a.getShaderInfoLog(z)))},
ea:function(a,b){var z,y,x,w,v
z=this.d
z.X(0)
y=a.getProgramParameter(b,35721)
for(x=0;x<y;++x){w=a.getActiveAttrib(b,x)
v=a.getAttribLocation(b,w.name)
a.enableVertexAttribArray(v)
z.E(0,w.name,v)}},
eb:function(a,b){var z,y,x,w,v
z=this.e
z.X(0)
y=a.getProgramParameter(b,35718)
for(x=0;x<y;++x){w=a.getActiveUniform(b,x)
v=a.getUniformLocation(b,w.name)
z.E(0,w.name,v)}}},
hZ:{"^":"br;a,b,c,d,e,f,r",
gbD:function(){return"\r\n    uniform mat4 uProjectionMatrix;\r\n\r\n    attribute vec2 aVertexPosition;\r\n    attribute vec2 aVertexTextCoord;\r\n    attribute float aVertexAlpha;\r\n\r\n    varying vec2 vTextCoord;\r\n    varying float vAlpha;\r\n\r\n    void main() {\r\n      vTextCoord = aVertexTextCoord;\r\n      vAlpha = aVertexAlpha;\r\n      gl_Position = vec4(aVertexPosition, 0.0, 1.0) * uProjectionMatrix;\r\n    }\r\n    "},
gbv:function(){return"\r\n    precision mediump float;\r\n\r\n    uniform sampler2D uSampler;\r\n\r\n    varying vec2 vTextCoord;\r\n    varying float vAlpha;\r\n\r\n    void main() {\r\n      gl_FragColor = texture2D(uSampler, vTextCoord) * vAlpha;\r\n    }\r\n    "},
bj:function(a){var z
this.de(a)
this.b.uniform1i(this.e.h(0,"uSampler"),0)
z=this.d
this.r.bl(z.h(0,"aVertexPosition"),2,20,0)
this.r.bl(z.h(0,"aVertexTextCoord"),2,20,8)
this.r.bl(z.h(0,"aVertexAlpha"),1,20,16)},
aV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
if(b.z){this.fa(a,b.x,b.y)
return}z=a.e
y=z.a
x=z.c
w=b.r
z=this.f
v=z.a
u=v.length
if(u<z.c+6)this.L(0)
z=this.r
t=z.a
s=t.length
if(s<z.c+20)this.L(0)
z=this.f
r=z.c
q=this.r
p=q.d
if(r>u-6)return
v[r]=p
v[r+1]=p+1
u=p+2
v[r+2]=u
v[r+3]=p
v[r+4]=u
v[r+5]=p+3
z.c=r+6
z.d+=6
z=w[0]
u=x.a
o=u[0]
n=u[4]
m=z*o+n
l=w[8]
k=l*o+n
n=u[1]
o=u[5]
j=z*n+o
i=l*n+o
o=w[1]
n=u[2]
h=o*n
l=w[9]
g=l*n
u=u[3]
f=o*u
e=l*u
d=q.c
if(d>s-20)return
t[d]=m+h
t[d+1]=j+f
t[d+2]=w[2]
t[d+3]=w[3]
t[d+4]=y
t[d+5]=k+h
t[d+6]=i+f
t[d+7]=w[6]
t[d+8]=w[7]
t[d+9]=y
t[d+10]=k+g
t[d+11]=i+e
t[d+12]=w[10]
t[d+13]=w[11]
t[d+14]=y
t[d+15]=m+g
t[d+16]=j+e
t[d+17]=w[14]
t[d+18]=w[15]
t[d+19]=y
q.c=d+20
q.d=p+4},
fa:function(a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
z=a2.e
y=z.a
x=z.c
w=a3.length
z=a4.length
v=z>>>2
u=this.f
t=u.a
s=t.length
if(s<u.c+w)this.L(0)
u=this.r
r=u.a
q=r.length
p=v*5
if(q<u.c+p)this.L(0)
u=this.f
o=u.c
n=this.r.d
for(--s,m=o,l=0;l<w;++l){if(m>s)break
t[m]=n+a3[l];++m}u.c=o+w
this.f.d+=w
u=x.a
k=u[0]
j=u[1]
i=u[2]
h=u[3]
g=u[4]
f=u[5]
u=this.r
e=u.c
for(s=q-5,d=e,l=0,c=0;l<v;++l,c+=4){if(c>z-4)break
b=a4[c]
a=a4[c+1]
a0=a4[c+2]
a1=a4[c+3]
if(d>s)break
r[d]=g+k*b+i*a
r[d+1]=f+j*b+h*a
r[d+2]=a0
r[d+3]=a1
r[d+4]=y
d+=5}u.c=e+p
this.r.d+=v}},
i_:{"^":"br;a,b,c,d,e,f,r",
gbD:function(){return"\r\n    uniform mat4 uProjectionMatrix;\r\n\r\n    attribute vec2 aVertexPosition;\r\n    attribute vec2 aVertexTextCoord;\r\n    attribute vec4 aVertexColor;\r\n\r\n    varying vec2 vTextCoord;\r\n    varying vec4 vColor; \r\n\r\n    void main() {\r\n      vTextCoord = aVertexTextCoord;\r\n      vColor = aVertexColor;\r\n      gl_Position = vec4(aVertexPosition, 0.0, 1.0) * uProjectionMatrix;\r\n    }\r\n    "},
gbv:function(){return"\r\n    precision mediump float;\r\n    uniform sampler2D uSampler;\r\n    varying vec2 vTextCoord;\r\n    varying vec4 vColor; \r\n\r\n    void main() {\r\n      vec4 color = texture2D(uSampler, vTextCoord);\r\n      gl_FragColor = vec4(color.rgb * vColor.rgb * vColor.a, color.a * vColor.a);\r\n    }\r\n    "}},
i0:{"^":"br;a,b,c,d,e,f,r",
gbD:function(){return"\r\n    uniform mat4 uProjectionMatrix;\r\n    attribute vec2 aVertexPosition;\r\n    attribute vec4 aVertexColor;\r\n    varying vec4 vColor;\r\n\r\n    void main() {\r\n      vColor = aVertexColor;\r\n      gl_Position = vec4(aVertexPosition, 0.0, 1.0) * uProjectionMatrix;\r\n    }\r\n    "},
gbv:function(){return"\r\n    precision mediump float;\r\n    varying vec4 vColor;\r\n\r\n    void main() {\r\n      gl_FragColor = vec4(vColor.rgb * vColor.a, vColor.a);\r\n    }\r\n    "}},
ei:{"^":"a;a,b,c,d,e,f"},
i1:{"^":"a;a,b,c,d,e",
cF:function(a){var z,y,x,w,v,u
z=a.gaD()
y=a.ch
x=this.e
w=x.f
if(w==null){v=T.a9()
u=new T.cd(new Float32Array(H.I(16)))
u.aH()
w=new L.ei(1,C.f,v,u,x,null)
x.f=w}w.c.eq(z,x.c)
w.b=x.b
w.a=y*x.a
this.e=w
a.az(this)
this.e=x},
di:function(a,b,c,d){var z=this.d
this.e=z
if(b instanceof T.dx)z.c.ci(b)
if(typeof c==="number")z.a=c},
m:{
i2:function(a,b,c,d){var z,y
z=T.a9()
y=new T.cd(new Float32Array(H.I(16)))
y.aH()
y=new L.i1(0,0,a,new L.ei(1,C.f,z,y,null,null),null)
y.di(a,b,c,d)
return y}}},
dS:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q",
gl:function(a){return this.a},
gk:function(a){return this.b},
gf7:function(){return L.cj(this,H.c(new U.V(0,0,this.a,this.b),[P.k]),H.c(new U.V(0,0,this.a,this.b),[P.k]),0,1)}},
i3:{"^":"a;D:a>"},
i4:{"^":"a;a,b,c,d,e,f,r,x,y,z",
dj:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.b
y=this.c
x=this.a
w=this.e
v=this.d
u=v===0
if(u||v===2){t=this.r
s=0-y.a
r=s/w
t[12]=r
t[0]=r
r=0-y.b
q=r/w
t[5]=q
t[1]=q
q=z.c
s=(s+q)/w
t[4]=s
t[8]=s
s=z.d
r=(r+s)/w
t[13]=r
t[9]=r
r=s
s=q}else{if(v===1||v===3){t=this.r
s=0-y.a
r=s/w
t[12]=r
t[0]=r
r=0-y.b
q=r/w
t[5]=q
t[1]=q
q=z.d
s=(s+q)/w
t[4]=s
t[8]=s
s=z.c
r=(r+s)/w
t[13]=r
t[9]=r}else throw H.d(new P.y())
r=q}if(u){v=z.a
u=x.a
q=v/u
t[14]=q
t[2]=q
q=z.b
p=x.b
o=q/p
t[7]=o
t[3]=o
u=(v+s)/u
t[6]=u
t[10]=u
p=(q+r)/p
t[15]=p
t[11]=p}else if(v===1){v=z.a
u=x.a
s=(v+s)/u
t[6]=s
t[2]=s
s=z.b
q=x.b
p=s/q
t[15]=p
t[3]=p
u=v/u
t[14]=u
t[10]=u
q=(s+r)/q
t[7]=q
t[11]=q}else if(v===2){v=z.a
u=x.a
s=(v+s)/u
t[14]=s
t[2]=s
s=z.b
q=x.b
r=(s+r)/q
t[7]=r
t[3]=r
u=v/u
t[6]=u
t[10]=u
q=s/q
t[15]=q
t[11]=q}else if(v===3){v=z.a
u=x.a
q=v/u
t[6]=q
t[2]=q
q=z.b
p=x.b
r=(q+r)/p
t[15]=r
t[3]=r
u=(v+s)/u
t[14]=u
t[10]=u
p=q/p
t[7]=p
t[11]=p}else throw H.d(new P.y())
v=this.f
v[0]=0
v[1]=1
v[2]=2
v[3]=0
v[4]=2
v[5]=3
this.y=t
this.x=v
this.z=!1},
m:{
cj:function(a,b,c,d,e){var z=new L.i4(a,b,c,d,e,new Int16Array(H.I(6)),new Float32Array(H.I(16)),null,null,!1)
z.dj(a,b,c,d,e)
return z},
i5:function(a,b,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=a.a
y=a.e
x=a.d
w=a.b
v=w.a
u=w.b
t=v+w.c
s=u+w.d
w=a.c
r=w.a
q=w.b
p=C.c.bG(x+a1,4)
o=b.a
n=b.b
m=o+b.c
l=n+b.d
k=a0.a
j=a0.b
i=a0.c
h=a0.d
if(x===0){w=v+r
g=w+o
f=u+q
e=f+n
d=w+m
c=f+l}else if(x===1){w=t-q
g=w-l
f=u+r
e=f+o
d=w-n
c=f+m}else if(x===2){w=t-r
g=w-m
f=s-q
e=f-l
d=w-o
c=f-n}else if(x===3){w=v+q
g=w+n
f=s-r
e=f-m
d=w+l
c=f-o}else{g=0
e=0
d=0
c=0}o=V.bE(g,v,t)
n=V.bE(e,u,s)
m=V.bE(d,v,t)
l=V.bE(c,u,s)
if(p===0){k+=g-o
j+=e-n}else if(p===1){k+=e-n
j+=m-d}else if(p===2){k+=m-d
j+=c-l}else if(p===3){k+=l-c
j+=o-g}return L.cj(z,H.c(new U.V(o,n,m-o,l-n),[P.k]),H.c(new U.V(k,j,i,h),[P.k]),p,y)}}}}],["","",,R,{"^":"",
ew:function(a,b){var z,y,x,w
z=b.length
for(y=0;y<z;++y){x=b[y]
if(!x.c){a.f=!1
a.r=!1
w=x.e.a
a.d=w
a.e=w
a.c=C.a
x.fE(a)}else{C.b.cD(b,y);--z;--y}}},
bV:{"^":"a1;",
gcd:function(){return!1}},
fO:{"^":"bV;x,a,b,c,d,e,f,r"},
fQ:{"^":"bV;a,b,c,d,e,f,r"},
hW:{"^":"bV;a,b,c,d,e,f,r"},
a1:{"^":"a;a,b,c,d,e,f,r",
gcd:function(){return!0},
gM:function(a){return this.d},
gap:function(a){return this.e}},
df:{"^":"a;",
bw:function(a,b){var z,y
z=this.a
if(z==null)return!1
y=z.h(0,a)
if(y==null)return!1
return b?y.gfH():y.gfG()},
eP:function(a){return this.bw(a,!1)},
bq:function(a,b,c){var z,y
a.f=!1
a.r=!1
z=this.a
if(z==null)return
y=z.h(0,a.a)
if(y==null)return
y.fm(a,b,c)}},
c1:{"^":"a;a",
i:function(a){return C.al.h(0,this.a)}},
c5:{"^":"a;a",
i:function(a){return C.am.h(0,this.a)}},
dk:{"^":"a1;"},
al:{"^":"dk;dx,dy,fr,fx,x,y,z,Q,ch,cx,cy,db,a,b,c,d,e,f,r"},
aC:{"^":"dk;cK:dx<,dy,x,y,z,Q,ch,cx,cy,db,a,b,c,d,e,f,r"}}],["","",,T,{"^":"",dx:{"^":"a;a",
i:function(a){var z=this.a
return"Matrix [a="+H.b(z[0])+", b="+H.b(z[1])+", c="+H.b(z[2])+", d="+H.b(z[3])+", tx="+H.b(z[4])+", ty="+H.b(z[5])+"]"},
fh:function(a,b){var z,y,x,w,v,u,t,s
z=a.a
z.toString
y=a.b
y.toString
x=this.a
w=x[0]
v=x[2]
u=x[4]
t=x[1]
s=x[3]
x=x[5]
return H.c(new U.ay(z*w+y*v+u,z*t+y*s+x),[P.A])},
bC:function(a){return this.fh(a,null)},
cL:function(a,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
z=a.a
y=z+a.c
x=a.b
w=x+a.d
v=this.a
u=v[0]
t=z*u
s=v[2]
r=x*s
q=t+r
p=v[1]
o=z*p
n=v[3]
m=x*n
l=o+m
u=y*u
k=u+r
p=y*p
j=p+m
s=w*s
i=u+s
n=w*n
h=p+n
g=t+s
f=o+n
e=q>k?k:q
if(e>i)e=i
if(e>g)e=g
d=l>j?j:l
if(d>h)d=h
if(d>f)d=f
c=q<k?k:q
if(c<i)c=i
if(c<g)c=g
b=l<j?j:l
if(b<h)b=h
if(b<f)b=f
u=v[4]
v=v[5]
a0.a=u+e
a0.b=v+d
a0.c=c-e
a0.d=b-d
return a0},
bH:function(a,b,c){var z=this.a
z[0]=z[0]*b
z[1]=z[1]*c
z[2]=z[2]*b
z[3]=z[3]*c
z[4]=z[4]*b
z[5]=z[5]*c},
ah:function(a,b,c,d,e,f){var z=this.a
z[0]=a
z[1]=b
z[2]=c
z[3]=d
z[4]=e
z[5]=f},
ci:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
z[3]=y[3]
z[4]=y[4]
z[5]=y[5]},
eq:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=a.a
y=z[0]
x=z[1]
w=z[2]
v=z[3]
u=z[4]
t=z[5]
z=b.a
s=z[0]
r=z[1]
q=z[2]
p=z[3]
o=z[4]
n=z[5]
z=this.a
z[0]=y*s+x*q
z[1]=y*r+x*p
z[2]=w*s+v*q
z[3]=w*r+v*p
z[4]=u*s+t*q+o
z[5]=u*r+t*p+n},
dh:function(){var z=this.a
z[0]=1
z[1]=0
z[2]=0
z[3]=1
z[4]=0
z[5]=0},
m:{
a9:function(){var z=new T.dx(new Float32Array(H.I(6)))
z.dh()
return z}}}}],["","",,T,{"^":"",cd:{"^":"a;a",
aH:function(){var z=this.a
z[0]=1
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=1
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=1
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=1},
cS:function(a,b,c,d){var z=this.a
z[0]=z[0]*b
z[1]=z[1]*b
z[2]=z[2]*b
z[3]=z[3]*b
z[4]=z[4]*c
z[5]=z[5]*c
z[6]=z[6]*c
z[7]=z[7]*c
z[8]=z[8]*d
z[9]=z[9]*d
z[10]=z[10]*d
z[11]=z[11]*d},
fi:function(a,b,c,d){var z=this.a
z[3]=z[3]+b
z[7]=z[7]+c
z[11]=z[11]+d}}}],["","",,U,{"^":"",ay:{"^":"a;aY:a>,aZ:b>",
i:function(a){return"Point<"+new H.cr(H.b6(H.l(this,0)),null).i(0)+"> [x="+H.b(this.a)+", y="+H.b(this.b)+"]"},
q:function(a,b){var z
if(b==null)return!1
z=J.i(b)
return!!z.$isab&&this.a===z.gaY(b)&&this.b===z.gaZ(b)},
gv:function(a){var z,y
z=this.a
y=this.b
return O.ds(O.aw(O.aw(0,z&0x1FFFFFFF),y&0x1FFFFFFF))},
ag:function(a,b){var z=new U.ay(this.a*b,this.b*b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
$isab:1}}],["","",,U,{"^":"",V:{"^":"a;ad:a>,af:b>,l:c>,k:d>",
i:function(a){return"Rectangle<"+new H.cr(H.b6(H.l(this,0)),null).i(0)+"> [left="+H.b(this.a)+", top="+H.b(this.b)+", width="+H.b(this.c)+", height="+H.b(this.d)+"]"},
q:function(a,b){var z,y,x
if(b==null)return!1
z=J.i(b)
if(!!z.$isac)if(this.a===z.gad(b))if(this.b===z.gaf(b)){y=this.c
x=z.gl(b)
if(y==null?x==null:y===x){y=this.d
z=z.gk(b)
z=y==null?z==null:y===z}else z=!1}else z=!1
else z=!1
else z=!1
return z},
gv:function(a){var z,y,x,w
z=this.a
y=this.b
x=J.C(this.c)
w=J.C(this.d)
return O.ds(O.aw(O.aw(O.aw(O.aw(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x),w))},
$isac:1,
$asac:null}}],["","",,Q,{"^":"",
jV:function(){var z,y
try{z=P.fK("TouchEvent")
return z}catch(y){H.B(y)
return!1}}}],["","",,N,{"^":"",h3:{"^":"a;a,b,c,d,e",
fw:[function(a){this.d.Z()
this.e.Z()
this.b.a_(0,this.a)},"$1","gdW",2,0,11,3],
fv:[function(a){this.d.Z()
this.e.Z()
this.b.cf(new P.F("Failed to load image."))},"$1","gdV",2,0,11,3]}}],["","",,O,{"^":"",
aw:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
ds:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)}}],["","",,V,{"^":"",
kj:function(a){return"rgba("+(a>>>16&255)+","+(a>>>8&255)+","+(a&255)+","+H.b((a>>>24&255)/255)+")"},
eY:function(a,b){if(a<=b)return a
else return b},
bE:function(a,b,c){if(a<=b)return b
else if(a>=c)return c
else return a},
km:function(a){if(typeof a==="boolean")return a
else throw H.d(P.R("The supplied value ("+H.b(a)+") is not a bool."))},
K:function(a){if(typeof a==="number"&&Math.floor(a)===a)return a
else throw H.d(P.R("The supplied value ("+H.b(a)+") is not an int."))},
b3:function(a){if(typeof a==="number")return a
else throw H.d(P.R("The supplied value ("+H.b(a)+") is not a number."))},
kn:function(a){if(typeof a==="string")return a
else throw H.d(P.R("The supplied value ("+H.b(a)+") is not a string."))}}],["","",,O,{"^":"",i6:{"^":"a;a,b",
du:function(a,b,c,d){var z,y,x
z=a+"."+b
y=O.i7(a,b,c,d)
x=this.a
if(x.G(z))throw H.d(new P.F("ResourceManager already contains a resource called '"+b+"'"))
else x.E(0,z,y)
y.f.a.aC(new O.ic(this))},
dK:function(a,b){var z,y
z=this.a.h(0,a+"."+b)
if(z==null)throw H.d(new P.F("Resource '"+b+"' does not exist."))
else{y=J.E(z)
if(y.gD(z)!=null)return y.gD(z)
else if(y.gY(z)!=null)throw H.d(y.gY(z))
else throw H.d(new P.F("Resource '"+b+"' has not finished loading yet."))}},
aU:function(a){var z=0,y=new P.bX(),x,w=2,v,u=this,t
var $async$aU=P.cM(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:z=3
return P.O(P.fU(H.c(new H.aY(u.gf2(),new O.ie()),[null,null]),null,!1),$async$aU,y)
case 3:t=u.geD().length
if(t>0)throw H.d(new P.F("Failed to load "+t+" resource(s)."))
else{x=u
z=1
break}case 1:return P.O(x,0,y,null)
case 2:return P.O(v,1,y)}})
return P.O(null,$async$aU,y,null)},
gf2:function(){var z=this.a
z=z.gaF(z)
z=H.c(new H.bx(z,new O.ig()),[H.P(z,"v",0)])
return P.a2(z,!0,H.P(z,"v",0))},
geD:function(){var z=this.a
z=z.gaF(z)
z=H.c(new H.bx(z,new O.id()),[H.P(z,"v",0)])
return P.a2(z,!0,H.P(z,"v",0))}},ic:{"^":"e:0;a",
$1:[function(a){var z,y,x,w
z=this.a
y=z.a
x=y.gaF(y)
x=H.c(new H.bx(x,new O.ib()),[H.P(x,"v",0)])
w=x.gj(x)
y=y.gj(y)
z=z.b
if(!z.gaN())H.p(z.aI())
z.a7(w/y)},null,null,2,0,null,4,"call"]},ib:{"^":"e:0;",
$1:function(a){return J.ff(a)!=null}},ie:{"^":"e:0;",
$1:[function(a){return J.fb(a)},null,null,2,0,null,36,"call"]},ig:{"^":"e:0;",
$1:function(a){var z=J.E(a)
return z.gD(a)==null&&z.gY(a)==null}},id:{"^":"e:0;",
$1:function(a){return J.ag(a)!=null}},dU:{"^":"a;a,p:b>,aX:c>,d,e,f",
i:function(a){return"ResourceManagerResource [kind="+this.a+", name="+this.b+", url = "+this.c+"]"},
gD:function(a){return this.d},
gY:function(a){return this.e},
gaO:function(a){return this.f.a},
dk:function(a,b,c,d){var z,y,x,w
z=d.aC(new O.i8(this))
y=new O.i9(this)
x=H.c(new P.H(0,$.j,null),[null])
w=x.b
if(w!==C.d)y=P.cL(y,w)
z.aJ(new P.cy(null,x,2,null,y))
x.cN(new O.ia(this))},
m:{
i7:function(a,b,c,d){var z=new O.dU(a,b,c,null,null,H.c(new P.cv(H.c(new P.H(0,$.j,null),[null])),[null]))
z.dk(a,b,c,d)
return z}}},i8:{"^":"e:0;a",
$1:[function(a){this.a.d=a},null,null,2,0,null,37,"call"]},i9:{"^":"e:0;a",
$1:[function(a){this.a.e=a},null,null,2,0,null,1,"call"]},ia:{"^":"e:1;a",
$0:[function(){var z=this.a
z.f.a_(0,z)},null,null,0,0,null,"call"]},e0:{"^":"a;a",
cQ:function(a){var z=this.a
z=H.c(new H.bx(z,new O.iE(a)),[H.l(z,0)])
z=H.aX(z,new O.iF(),H.P(z,"v",0),null)
return P.a2(z,!0,H.P(z,"v",0))}},iE:{"^":"e:0;a",
$1:function(a){return J.fn(J.fd(a),this.a)}},iF:{"^":"e:0;",
$1:[function(a){return a.gei()},null,null,2,0,null,25,"call"]},iC:{"^":"a;"},jJ:{"^":"iC;",
av:function(a,b){var z=0,y=new P.bX(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k,j,i
var $async$av=P.cM(function(c,d){if(c===1){v=d
z=w}while(true)switch(z){case 0:i=C.ag
z=3
return P.O(W.fZ(b.a,null,null),$async$av,y)
case 3:t=i.er(d)
s=J.L(t)
r=s.h(t,"frames")
q=s.h(t,"meta")
p=J.t(q,"image")
o=new O.e0(H.c([],[O.e1]))
z=4
return P.O(b.aG(p),$async$av,y)
case 4:n=d
s=J.i(r)
if(!!s.$ish)for(s=s.gC(r);s.n();){m=H.eT(s.gt(),"$isU")
l=H.kP(m.h(0,"filename"))
u.bV(o,n,new H.bj("(.+?)(\\.[^.]*$|$)",H.bk("(.+?)(\\.[^.]*$|$)",!1,!0,!1),null,null).aT(l).b[1],m,q)}else ;s=J.i(r)
if(!!s.$isU)for(k=J.ar(r.gH());k.n();){l=k.gt()
j=H.eT(s.h(r,l),"$isU")
u.bV(o,n,new H.bj("(.+?)(\\.[^.]*$|$)",H.bk("(.+?)(\\.[^.]*$|$)",!1,!0,!1),null,null).aT(l).b[1],j,q)}else ;x=o
z=1
break
case 1:return P.O(x,0,y,null)
case 2:return P.O(v,1,y)}})
return P.O(null,$async$av,y,null)},
bV:function(a,b,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=V.km(a1.h(0,"rotated"))?1:0
y=V.K(J.t(a1.h(0,"spriteSourceSize"),"x"))
x=V.K(J.t(a1.h(0,"spriteSourceSize"),"y"))
w=V.K(J.t(a1.h(0,"sourceSize"),"w"))
v=V.K(J.t(a1.h(0,"sourceSize"),"h"))
u=V.K(J.t(a1.h(0,"frame"),"x"))
t=V.K(J.t(a1.h(0,"frame"),"y"))
s=a1.h(0,"frame")
r=z===0
q=V.K(J.t(s,r?"w":"h"))
s=a1.h(0,"frame")
p=V.K(J.t(s,r?"h":"w"))
if(a1.G("vertices")){o=H.cW(a1.h(0,"vertices"))
n=H.cW(a1.h(0,"verticesUV"))
m=H.cW(a1.h(0,"triangles"))
l=J.cY(J.t(a2.h(0,"size"),"w"))
k=J.cY(J.t(a2.h(0,"size"),"h"))
s=J.L(o)
r=s.gj(o)
j=new Float32Array(r*4)
r=J.L(m)
i=r.gj(m)
h=new Int16Array(i*3)
for(i=j.length-4,g=J.L(n),f=0,e=0;f<=i;f+=4,++e){j[f]=J.a7(J.t(s.h(o,e),0),1)
j[f+1]=J.a7(J.t(s.h(o,e),1),1)
j[f+2]=J.b8(J.t(g.h(n,e),0),l)
j[f+3]=J.b8(J.t(g.h(n,e),1),k)}for(s=h.length-3,f=0,e=0;f<=s;f+=3,++e){h[f]=J.t(r.h(m,e),0)
h[f+1]=J.t(r.h(m,e),1)
h[f+2]=J.t(r.h(m,e),2)}}else{j=null
h=null}d=new O.e1(a,b,a0,z,y,x,w,v,u,t,q,p,j,h,null)
c=L.i5(b,H.c(new U.V(u,t,q,p),[P.k]),H.c(new U.V(-y,-x,w,v),[P.k]),z)
if(j!=null&&h!=null){c.y=j
c.x=h
c.z=!0}else{c.y=c.r
c.x=c.f
c.z=!1}s=c.c
r=c.e
d.db=new A.fp(J.b8(s.c,r),J.b8(s.d,r),c)
a.a.push(d)}},e1:{"^":"a;a,b,p:c>,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
gei:function(){return this.db}},iD:{"^":"a;"},jK:{"^":"iD;a,b,c,d",
aG:function(a){var z=0,y=new P.bX(),x,w=2,v,u=this,t,s,r,q,p,o,n
var $async$aG=P.cM(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:t=u.a
t=new H.bj("^(.*/)?(?:$|(.+?)(?:(\\.[^.]*$)|$))",H.bk("^(.*/)?(?:$|(.+?)(?:(\\.[^.]*$)|$))",!1,!0,!1),null,null).aT(t).b[1]
s=t==null?a:t+H.b(a)
t=W.h2(null,null,null)
r=H.c(new P.cv(H.c(new P.H(0,$.j,null),[W.di])),[W.di])
q=new N.h3(t,r,s,null,null)
t.toString
p=C.S.B(t)
p=H.c(new W.r(0,p.a,p.b,W.q(q.gdW()),!1),[H.l(p,0)])
p.w()
q.d=p
p=C.N.B(t)
p=H.c(new W.r(0,p.a,p.b,W.q(q.gdV()),!1),[H.l(p,0)])
p.w()
q.e=p
t.src=s
z=3
return P.O(r.a,$async$aG,y)
case 3:o=c
n=new L.dS(0,0,null,null,C.ap,null,-1,!1,null,null,-1)
n.a=V.K(o.width)
n.b=V.K(o.height)
n.c=o
t=n.gf7()
x=L.cj(t.a,t.b,t.c,t.d,u.d)
z=1
break
case 1:return P.O(x,0,y,null)
case 2:return P.O(v,1,y)}})
return P.O(null,$async$aG,y,null)}}}],["","",,Q,{"^":"",hH:{"^":"a;"}}]]
setupProgram(dart,0)
J.i=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dr.prototype
return J.hm.prototype}if(typeof a=="string")return J.aR.prototype
if(a==null)return J.ho.prototype
if(typeof a=="boolean")return J.hl.prototype
if(a.constructor==Array)return J.aO.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aS.prototype
return a}if(a instanceof P.a)return a
return J.bI(a)}
J.L=function(a){if(typeof a=="string")return J.aR.prototype
if(a==null)return a
if(a.constructor==Array)return J.aO.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aS.prototype
return a}if(a instanceof P.a)return a
return J.bI(a)}
J.bH=function(a){if(a==null)return a
if(a.constructor==Array)return J.aO.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aS.prototype
return a}if(a instanceof P.a)return a
return J.bI(a)}
J.b4=function(a){if(typeof a=="number")return J.aQ.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.b0.prototype
return a}
J.ko=function(a){if(typeof a=="number")return J.aQ.prototype
if(typeof a=="string")return J.aR.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.b0.prototype
return a}
J.cR=function(a){if(typeof a=="string")return J.aR.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.b0.prototype
return a}
J.E=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aS.prototype
return a}if(a instanceof P.a)return a
return J.bI(a)}
J.b8=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.b4(a).cP(a,b)}
J.aK=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.i(a).q(a,b)}
J.f6=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.b4(a).b_(a,b)}
J.a7=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.ko(a).ag(a,b)}
J.bO=function(a,b){return J.b4(a).d2(a,b)}
J.t=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.kD(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.L(a).h(a,b)}
J.f7=function(a,b,c,d){return J.E(a).dr(a,b,c,d)}
J.f8=function(a,b,c,d){return J.E(a).e2(a,b,c,d)}
J.b9=function(a,b,c){return J.L(a).eo(a,b,c)}
J.f9=function(a,b){return J.bH(a).K(a,b)}
J.fa=function(a,b){return J.bH(a).u(a,b)}
J.fb=function(a){return J.E(a).gaO(a)}
J.ag=function(a){return J.E(a).gY(a)}
J.C=function(a){return J.i(a).gv(a)}
J.fc=function(a){return J.E(a).gk(a)}
J.ar=function(a){return J.bH(a).gC(a)}
J.aL=function(a){return J.L(a).gj(a)}
J.fd=function(a){return J.E(a).gp(a)}
J.fe=function(a){return J.E(a).gaX(a)}
J.ff=function(a){return J.E(a).gD(a)}
J.fg=function(a){return J.E(a).gl(a)}
J.fh=function(a,b,c,d,e,f,g){return J.E(a).cR(a,b,c,d,e,f,g)}
J.bP=function(a,b){return J.bH(a).aw(a,b)}
J.fi=function(a,b,c){return J.cR(a).eZ(a,b,c)}
J.fj=function(a,b){return J.i(a).by(a,b)}
J.bQ=function(a){return J.b4(a).I(a)}
J.fk=function(a,b){return J.E(a).T(a,b)}
J.fl=function(a,b){return J.E(a).sk(a,b)}
J.fm=function(a,b){return J.E(a).sl(a,b)}
J.fn=function(a,b){return J.cR(a).d4(a,b)}
J.fo=function(a,b,c){return J.cR(a).b0(a,b,c)}
J.cY=function(a){return J.b4(a).bB(a)}
J.a0=function(a){return J.i(a).i(a)}
I.bK=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.a5=W.av.prototype
C.a7=J.f.prototype
C.b=J.aO.prototype
C.c=J.dr.prototype
C.e=J.aQ.prototype
C.k=J.aR.prototype
C.af=J.aS.prototype
C.ao=J.hN.prototype
C.av=W.bu.prototype
C.aw=J.b0.prototype
C.F=W.bw.prototype
C.G=W.by.prototype
C.f=new L.fr(1,771,"source-over")
C.H=new H.dc()
C.I=new P.hM()
C.d=new P.jC()
C.J=new O.jJ()
C.p=new P.be(0)
C.K=new R.c1(0)
C.a=new R.c1(1)
C.L=new R.c1(2)
C.M=new W.x("contextmenu")
C.N=new W.x("error")
C.O=new W.x("error")
C.P=new W.x("keydown")
C.Q=new W.x("keypress")
C.R=new W.x("keyup")
C.S=new W.x("load")
C.T=new W.x("load")
C.U=new W.x("mousedown")
C.V=new W.x("mousemove")
C.W=new W.x("mouseout")
C.X=new W.x("mouseup")
C.Y=new W.x("touchcancel")
C.Z=new W.x("touchend")
C.a_=new W.x("touchenter")
C.a0=new W.x("touchleave")
C.a1=new W.x("touchmove")
C.a2=new W.x("touchstart")
C.a3=new W.x("webglcontextlost")
C.a4=new W.x("webglcontextrestored")
C.j=new R.c5(0)
C.a6=new R.c5(1)
C.q=new R.c5(2)
C.a8=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.a9=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.r=function getTagFallback(o) {
  var constructor = o.constructor;
  if (typeof constructor == "function") {
    var name = constructor.name;
    if (typeof name == "string" &&
        name.length > 2 &&
        name !== "Object" &&
        name !== "Function.prototype") {
      return name;
    }
  }
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.t=function(hooks) { return hooks; }

C.aa=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.ac=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.ab=function() {
  function typeNameInChrome(o) {
    var constructor = o.constructor;
    if (constructor) {
      var name = constructor.name;
      if (name) return name;
    }
    var s = Object.prototype.toString.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = Object.prototype.toString.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: typeNameInChrome,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.ad=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.ae=function(_, letter) { return letter.toUpperCase(); }
C.ag=new P.hv(null,null)
C.ah=new P.hw(null)
C.l=I.bK([])
C.u=new H.au([0,"RenderEngine.WebGL",1,"RenderEngine.Canvas2D"])
C.ai=H.c(I.bK([]),[P.aB])
C.v=H.c(new H.fC(0,{},C.ai),[P.aB,null])
C.aj=new H.au([0,"StageScaleMode.EXACT_FIT",1,"StageScaleMode.NO_BORDER",2,"StageScaleMode.NO_SCALE",3,"StageScaleMode.SHOW_ALL"])
C.ak=new H.au([0,"StageRenderMode.AUTO",1,"StageRenderMode.STOP",2,"StageRenderMode.ONCE"])
C.al=new H.au([0,"EventPhase.CAPTURING_PHASE",1,"EventPhase.AT_TARGET",2,"EventPhase.BUBBLING_PHASE"])
C.am=new H.au([0,"InputEventMode.MouseOnly",1,"InputEventMode.TouchOnly",2,"InputEventMode.MouseAndTouch"])
C.an=new H.au([0,"StageAlign.TOP_LEFT",1,"StageAlign.TOP",2,"StageAlign.TOP_RIGHT",3,"StageAlign.LEFT",4,"StageAlign.NONE",5,"StageAlign.RIGHT",6,"StageAlign.BOTTOM_LEFT",7,"StageAlign.BOTTOM",8,"StageAlign.BOTTOM_RIGHT"])
C.m=new L.dQ(0)
C.n=new L.dQ(1)
C.ap=new L.i3(9729)
C.w=new A.a4(0)
C.x=new A.a4(1)
C.y=new A.a4(2)
C.z=new A.a4(3)
C.h=new A.a4(4)
C.A=new A.a4(5)
C.B=new A.a4(6)
C.C=new A.a4(7)
C.D=new A.a4(8)
C.o=new A.cl(0)
C.aq=new A.cl(1)
C.E=new A.cl(2)
C.ar=new A.bs(0)
C.as=new A.bs(1)
C.at=new A.bs(2)
C.i=new A.bs(3)
C.au=new H.co("call")
C.ax=new W.j_(W.kq())
$.dK="$cachedFunction"
$.dL="$cachedInvocation"
$.X=0
$.at=null
$.d0=null
$.cT=null
$.eH=null
$.f_=null
$.bF=null
$.bJ=null
$.cU=null
$.b7=null
$.eQ=null
$.kL=null
$.f0=null
$.ao=null
$.aE=null
$.aF=null
$.cJ=!1
$.j=C.d
$.dg=0
$.d8=null
$.d7=null
$.d6=null
$.d9=null
$.d5=null
$.bd=0
$.es=1
$.bq=0
$.eC=17976931348623157e292
$.cH=-1
$.hI=!1
$.hJ="auto"
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["bc","$get$bc",function(){return H.eR("_$dart_dartClosure")},"dm","$get$dm",function(){return H.hg()},"dn","$get$dn",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.dg
$.dg=z+1
z="expando$key$"+z}return new P.fR(null,z)},"e2","$get$e2",function(){return H.a_(H.bv({
toString:function(){return"$receiver$"}}))},"e3","$get$e3",function(){return H.a_(H.bv({$method$:null,
toString:function(){return"$receiver$"}}))},"e4","$get$e4",function(){return H.a_(H.bv(null))},"e5","$get$e5",function(){return H.a_(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"e9","$get$e9",function(){return H.a_(H.bv(void 0))},"ea","$get$ea",function(){return H.a_(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"e7","$get$e7",function(){return H.a_(H.e8(null))},"e6","$get$e6",function(){return H.a_(function(){try{null.$method$}catch(z){return z.message}}())},"ec","$get$ec",function(){return H.a_(H.e8(void 0))},"eb","$get$eb",function(){return H.a_(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cw","$get$cw",function(){return P.iP()},"aH","$get$aH",function(){return[]},"eN","$get$eN",function(){return P.cN(self)},"cx","$get$cx",function(){return H.eR("_$dart_dartObject")},"cE","$get$cE",function(){return function DartObject(a){this.o=a}},"d_","$get$d_",function(){return new A.fq(!0,!0,!1,2,!1)},"cm","$get$cm",function(){return new A.im(C.m,C.j,C.o,C.i,C.h,4294967295,!1,!1,5,!0,!0,!1,!1)},"cI","$get$cI",function(){return[]},"ex","$get$ex",function(){return[]},"ey","$get$ey",function(){return[]},"cQ","$get$cQ",function(){var z=W.kS().devicePixelRatio
return typeof z!=="number"?1:z},"cV","$get$cV",function(){return J.aK(J.t($.$get$eN().h(0,"navigator"),"isCocoonJS"),!0)},"eV","$get$eV",function(){return Q.jV()},"ce","$get$ce",function(){return H.hr(P.w,Q.hH)},"dy","$get$dy",function(){return P.Z(null,null,!1,P.w)},"dz","$get$dz",function(){var z=$.$get$dy()
return z.gd6(z)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,"error","stackTrace","event","_","value","e","result","contextEvent","x","invocation","o","isolate","sender","closure","object","numberOfArguments","arg1","errorCode","theError","theStackTrace","arg2","element","data","arg","f","callback","captureThis","self","arguments","arg3","arg4","cursorName","each","frameTime","deltaTime","r","resource","xhr"]
init.types=[{func:1,args:[,]},{func:1},{func:1,v:true},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[P.w,,]},{func:1,args:[,P.aA]},{func:1,v:true,args:[P.a],opt:[P.aA]},{func:1,v:true,opt:[,]},{func:1,v:true,args:[,],opt:[P.aA]},{func:1,ret:P.w,args:[P.k]},{func:1,args:[P.bY]},{func:1,v:true,args:[W.u]},{func:1,args:[,P.w]},{func:1,args:[P.w]},{func:1,args:[{func:1,v:true}]},{func:1,args:[P.k,,]},{func:1,v:true,args:[,,]},{func:1,args:[P.a]},{func:1,args:[,],opt:[,]},{func:1,args:[,,]},{func:1,args:[P.aB,,]},{func:1,args:[W.av]},{func:1,v:true,args:[W.aZ]},{func:1,v:true,args:[W.bw]},{func:1,v:true,args:[W.cq]},{func:1,v:true,args:[W.c9]},{func:1,v:true,args:[P.A]},{func:1,ret:P.w,args:[W.D]},{func:1,ret:P.a,args:[,]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.kQ(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.bK=a.bK
Isolate.a6=a.a6
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.f2(N.eL(),b)},[])
else (function(b){H.f2(N.eL(),b)})([])})})()