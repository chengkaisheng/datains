//>>built
define(["dojo","dijit","dojox","dojo/require!dojox/lang/functional/lambda,dojox/lang/functional/util"],function(k,v,r){k.provide("dojox.lang.functional.binrec");k.require("dojox.lang.functional.lambda");k.require("dojox.lang.functional.util");(function(){var b=r.lang.functional,h=b.inlineLambda,t=["_z.r","_r","_z.a"];b.binrec=function(a,f,d,g){var m={},c={},e=function(u){m[u]=1};if("string"==typeof a)a=h(a,"_x",e);else{var n=b.lambda(a);a="_c.apply(this, _x)";c["_c\x3d_t.c"]=1}if("string"==typeof f)f=
h(f,"_x",e);else{var l=b.lambda(f);f="_t.apply(this, _x)"}if("string"==typeof d)d=h(d,"_x",e);else{var p=b.lambda(d);d="_b.apply(this, _x)";c["_b\x3d_t.b"]=1}if("string"==typeof g)g=h(g,t,e);else{var q=b.lambda(g);g="_a.call(this, _z.r, _r, _z.a)";c["_a\x3d_t.a"]=1}e=b.keys(m);c=b.keys(c);a=new Function([],"var _x\x3darguments,_y,_z,_r".concat(e.length?","+e.join(","):"",c.length?",_t\x3d_x.callee,"+c.join(","):"",l?c.length?",_t\x3d_t.t":"_t\x3d_x.callee.t":"",";while(!",a,"){_r\x3d",d,";_y\x3d{p:_y,a:_r[1]};_z\x3d{p:_z,a:_x};_x\x3d_r[0]}for(;;){do{_r\x3d",
f,';if(!_z)return _r;while("r" in _z){_r\x3d',g,";if(!(_z\x3d_z.p))return _r}_z.r\x3d_r;_x\x3d_y.a;_y\x3d_y.p}while(",a,");do{_r\x3d",d,";_y\x3d{p:_y,a:_r[1]};_z\x3d{p:_z,a:_x};_x\x3d_r[0]}while(!",a,")}"));n&&(a.c=n);l&&(a.t=l);p&&(a.b=p);q&&(a.a=q);return a}})()});