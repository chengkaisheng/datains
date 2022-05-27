/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{c as e,b as a,a as u}from"./_commonjsHelpers.js";import{a as n}from"./moment2.js";var t=e((function(e,t){(function(e){var a="nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" "),u=["nolla","yhden","kahden","kolmen","neljän","viiden","kuuden",a[7],a[8],a[9]];function n(e,n,t,s){var i="";switch(t){case"s":return s?"muutaman sekunnin":"muutama sekunti";case"ss":i=s?"sekunnin":"sekuntia";break;case"m":return s?"minuutin":"minuutti";case"mm":i=s?"minuutin":"minuuttia";break;case"h":return s?"tunnin":"tunti";case"hh":i=s?"tunnin":"tuntia";break;case"d":return s?"päivän":"päivä";case"dd":i=s?"päivän":"päivää";break;case"M":return s?"kuukauden":"kuukausi";case"MM":i=s?"kuukauden":"kuukautta";break;case"y":return s?"vuoden":"vuosi";case"yy":i=s?"vuoden":"vuotta"}return i=function(e,n){return e<10?n?u[e]:a[e]:e}(e,s)+" "+i}e.defineLocale("fi",{months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),monthsShort:"tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"Do MMMM[ta] YYYY",LLL:"Do MMMM[ta] YYYY, [klo] HH.mm",LLLL:"dddd, Do MMMM[ta] YYYY, [klo] HH.mm",l:"D.M.YYYY",ll:"Do MMM YYYY",lll:"Do MMM YYYY, [klo] HH.mm",llll:"ddd, Do MMM YYYY, [klo] HH.mm"},calendar:{sameDay:"[tänään] [klo] LT",nextDay:"[huomenna] [klo] LT",nextWeek:"dddd [klo] LT",lastDay:"[eilen] [klo] LT",lastWeek:"[viime] dddd[na] [klo] LT",sameElse:"L"},relativeTime:{future:"%s päästä",past:"%s sitten",s:n,ss:n,m:n,mm:n,h:n,hh:n,d:n,dd:n,M:n,MM:n,y:n,yy:n},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}})})("function"==typeof a?n:u.moment)})),s=Object.freeze(Object.assign(Object.create(null),t,{default:t}));export{s as f};
