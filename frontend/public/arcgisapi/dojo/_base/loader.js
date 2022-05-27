//>>built
define("./kernel ../has require module ../json ./lang ./array".split(" "),function(h,C,w,O,D,t,E){var u=function(b){return b.replace(/\./g,"/")},P=/\/\/>>built/,z=[],Q=[],x=function(b,a,c){z.push(c);E.forEach(b.split(","),function(e){e=q(e,a.module);Q.push(e);F(e)});G()},G=function(){var b;for(b in H){var a=H[b];void 0===a.noReqPluginCheck&&(a.noReqPluginCheck=/loadInit!/.test(b)||/require!/.test(b)?1:0);if(!a.executed&&!a.noReqPluginCheck&&a.injected==R)return}S(function(){var c=z;z=[];E.forEach(c,
function(e){e(1)})})},T=/\/\/.*|\/\*[\s\S]*?\*\/|("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|`(?:\\.|[^`])*`)/mg,A=/(^|\s)dojo\.(loadInit|require|provide|requireLocalization|requireIf|requireAfterIf|platformRequire)\s*\(/mg,U=/(^|\s)(require|define)\s*\(/m,I=function(b,a){var c=[],e=[];var d=[];for(a=a||b.replace(T,"$1");d=A.exec(a);){var l=A.lastIndex;var n=l-d[0].length;var r=void 0,p=a,m=/\(|\)/g,k=1;for(m.lastIndex=l;(r=m.exec(p))&&(k=")"==r[0]?k-1:k+1,0!=k););if(0!=k)throw"unmatched paren around character "+
m.lastIndex+" in: "+p;l=[h.trim(p.substring(n,m.lastIndex))+";\n",m.lastIndex];"loadInit"==d[2]?c.push(l[0]):e.push(l[0]);A.lastIndex=l[1]}d=c.concat(e);return d.length||!U.test(a)?[b.replace(/(^|\s)dojo\.loadInit\s*\(/g,"\n0 \x26\x26 dojo.loadInit("),d.join(""),d]:0},g=w.initSyncLoader(x,G,function(b,a){var c,e=[],d=[];if(P.test(a)||!(c=I(a)))return 0;a=b.mid+"-*loadInit";for(var l in q("dojo",b).result.scopeMap)e.push(l),d.push('"'+l+'"');return"// xdomain rewrite of "+b.mid+"\ndefine('"+a+"',{\n\tnames:"+
D.stringify(e)+",\n\tdef:function("+e.join(",")+"){"+c[1]+"}});\n\ndefine("+D.stringify(e.concat(["dojo/loadInit!"+a]))+", function("+e.join(",")+"){\n"+c[0]+"});"}),V=g.sync,R=g.requested,W=g.arrived,J=g.nonmodule,X=g.executing,K=g.executed,v=g.syncExecStack,H=g.modules,L=g.execQ,q=g.getModule,F=g.injectModule,M=g.setArrived,Y=g.signal,Z=g.finishExec,aa=g.execModule,N=g.getLegacyMode,S=g.guardCheckComplete;x=g.dojoRequirePlugin;h.provide=function(b){var a=v[0],c=t.mixin(q(u(b),w.module),{executed:X,
result:t.getObject(b,!0)});M(c);a&&(a.provides||(a.provides=[])).push(function(){c.result=t.getObject(b);delete c.provides;c.executed!==K&&Z(c)});return c.result};C.add("config-publishRequireResult",1,0,0);h.require=function(b,a){a=function(c,e){var d=q(u(c),w.module);if(v.length&&v[0].finish)v[0].finish.push(c);else{if(d.executed)return d.result;e&&(d.result=J);e=N();F(d);e=N();d.executed!==K&&d.injected===W&&g.guardCheckComplete(function(){aa(d)});if(d.executed)return d.result;e==V?d.cjs?L.unshift(d):
v.length&&(v[0].finish=[c]):L.push(d)}}(b,a);C("config-publishRequireResult")&&!t.exists(b)&&void 0!==a&&t.setObject(b,a);return a};h.loadInit=function(b){b()};h.registerModulePath=function(b,a){var c={};c[b.replace(/\./g,"/")]=a;w({paths:c})};h.platformRequire=function(b){b=(b.common||[]).concat(b[h._name]||b["default"]||[]);for(var a;b.length;)t.isArray(a=b.shift())?h.require.apply(h,a):h.require(a)};h.requireIf=h.requireAfterIf=function(b,a,c){b&&h.require(a,c)};h.requireLocalization=function(b,
a,c){w(["../i18n"],function(e){e.getLocalization(b,a,c)})};return{extractLegacyApiApplications:I,require:x,loadInit:function(b,a,c){a([b],function(e){a(e.names,function(){for(var d="",l=[],n=0;n<arguments.length;n++)d+="var "+e.names[n]+"\x3d arguments["+n+"]; ",l.push(arguments[n]);eval(d);var r=a.module,p=[],m;d={provide:function(f){f=u(f);f=q(f,r);f!==r&&M(f)},require:function(f,B){f=u(f);B&&(q(f,r).result=J);p.push(f)},requireLocalization:function(f,B,y){m||(m=["dojo/i18n"]);y=(y||h.locale).toLowerCase();
f=u(f)+"/nls/"+(/root/i.test(y)?"":y+"/")+u(B);q(f,r).isXd&&m.push("dojo/i18n!"+f)},loadInit:function(f){f()}};n={};var k;try{for(k in d)n[k]=h[k],h[k]=d[k];e.def.apply(null,l)}catch(f){Y("error",[{src:O.id,id:"failedDojoLoadInit"},f])}finally{for(k in d)h[k]=n[k]}m&&(p=p.concat(m));p.length?x(p.join(","),a,c):c()})})}}});