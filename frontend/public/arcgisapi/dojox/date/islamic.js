//>>built
define(["dojox/main","dojo/_base/lang","dojo/date","./islamic/Date"],function(l,m,n,k){var h=m.getObject("date.islamic",!0,l);h.getDaysInMonth=function(b){return b.getDaysInIslamicMonth(b.getMonth(),b.getFullYear())};h.compare=function(b,e,a){b instanceof k&&(b=b.toGregorian());e instanceof k&&(e=e.toGregorian());return n.compare.apply(null,arguments)};h.add=function(b,e,a){var d=new k(b);switch(e){case "day":d.setDate(b.getDate()+a);break;case "weekday":var c=b.getDay();if(5>c+a&&0<c+a)d.setDate(b.getDate()+
a);else{var f=e=0;5==c?(c=4,f=0<a?-1:1):6==c&&(c=4,f=0<a?-2:2);c=0<a?5-c-1:-c;var g=a-c,p=parseInt(g/5);0!=g%5&&(e=0<a?2:-2);e=e+7*p+g%5+c;d.setDate(b.getDate()+e+f)}break;case "year":d.setFullYear(b.getFullYear()+a);break;case "week":a*=7;d.setDate(b.getDate()+a);break;case "month":b=b.getMonth();d.setMonth(b+a);break;case "hour":d.setHours(b.getHours()+a);break;case "minute":d._addMinutes(a);break;case "second":d._addSeconds(a);break;case "millisecond":d._addMilliseconds(a)}return d};h.difference=
function(b,e,a){e=e||new k;a=a||"day";var d=e.getFullYear()-b.getFullYear(),c=1;switch(a){case "weekday":d=Math.round(h.difference(b,e,"day"));c=parseInt(h.difference(b,e,"week"));if(0==d%7)d=5*c;else{a=0;var f=b.getDay(),g=e.getDay();c=parseInt(d/7);e=d%7;b=new k(b);b.setDate(b.getDate()+7*c);b=b.getDay();if(0<d)switch(!0){case 5==f:a=-1;break;case 6==f:a=0;break;case 5==g:a=-1;break;case 6==g:a=-2;break;case 5<b+e:a=-2}else if(0>d)switch(!0){case 5==f:a=0;break;case 6==f:a=1;break;case 5==g:a=2;
break;case 6==g:a=1;break;case 0>b+e:a=2}d=d+a-2*c}c=d;break;case "year":c=d;break;case "month":a=e.toGregorian()>b.toGregorian()?e:b;f=e.toGregorian()>b.toGregorian()?b:e;c=a.getMonth();g=f.getMonth();if(0==d)c=a.getMonth()-f.getMonth();else for(c=12-g+c,d=f.getFullYear()+1,a=a.getFullYear(),d;d<a;d++)c+=12;e.toGregorian()<b.toGregorian()&&(c=-c);break;case "week":c=parseInt(h.difference(b,e,"day")/7);break;case "day":c/=24;case "hour":c/=60;case "minute":c/=60;case "second":c/=1E3;case "millisecond":c*=
e.toGregorian().getTime()-b.toGregorian().getTime()}return Math.round(c)};return h});