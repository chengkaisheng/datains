// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define(["exports","./_commonjsHelpers","./moment"],function(f,c,g){var b=c.createCommonjsModule(function(h,k){(function(d,a){"function"===typeof c.commonjsRequire?a(g.moment$1):a(d.moment)})(c.commonjsGlobal,function(d){return d.defineLocale("sv",{months:"januari februari mars april maj juni juli augusti september oktober november december".split(" "),monthsShort:"jan feb mar apr maj jun jul aug sep okt nov dec".split(" "),weekdays:"s\u00f6ndag m\u00e5ndag tisdag onsdag torsdag fredag l\u00f6rdag".split(" "),
weekdaysShort:"s\u00f6n m\u00e5n tis ons tor fre l\u00f6r".split(" "),weekdaysMin:"s\u00f6 m\u00e5 ti on to fr l\u00f6".split(" "),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [kl.] HH:mm",LLLL:"dddd D MMMM YYYY [kl.] HH:mm",lll:"D MMM YYYY HH:mm",llll:"ddd D MMM YYYY HH:mm"},calendar:{sameDay:"[Idag] LT",nextDay:"[Imorgon] LT",lastDay:"[Ig\u00e5r] LT",nextWeek:"[P\u00e5] dddd LT",lastWeek:"[I] dddd[s] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"f\u00f6r %s sedan",
s:"n\u00e5gra sekunder",ss:"%d sekunder",m:"en minut",mm:"%d minuter",h:"en timme",hh:"%d timmar",d:"en dag",dd:"%d dagar",M:"en m\u00e5nad",MM:"%d m\u00e5nader",y:"ett \u00e5r",yy:"%d \u00e5r"},dayOfMonthOrdinalParse:/\d{1,2}(:e|:a)/,ordinal:function(a){var e=a%10;return a+(1===~~(a%100/10)?":e":1===e?":a":2===e?":a":":e")},week:{dow:1,doy:4}})})});b=Object.freeze(Object.assign(Object.create(null),b,{"default":b}));f.sv=b});