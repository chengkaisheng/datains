//>>built
define(["dojox/socket","dojo/aspect"],function(b,k){b.Reconnect=function(a,c){c=c||{};var d=c.reconnectTime||1E4,l=c.backoffRate||2,e=d,g,h;k.after(a,"onclose",function(f){clearTimeout(g);f.wasClean||a.disconnected(function(){b.replace(a,h=a.reconnect())})},!0);a.disconnected||(a.disconnected=function(f){setTimeout(function(){f();g=setTimeout(function(){2>h.readyState&&(e=d)},d)},e);e*=l});a.reconnect||(a.reconnect=function(){return a.args?b.LongPoll(a.args):b.WebSocket({url:a.URL||a.url})});return a};
return b.Reconnect});