// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define(["exports","../../core/maybe","../../core/string","./WKIDUnitConversion"],function(b,g,h,q){function k(a){return d(a)&&null!=a.wkid&&!0===r[a.wkid]}function l(a){return 104971===a||104905===a}function m(a){return d(a)&&null!=a.wkid&&l(a.wkid)}function n(a){return d(a)&&null!=a.wkid&&104903===a.wkid}function d(a){return g.isSome(a)&&(null!=a.wkid&&2E3<=a.wkid||null!=a.wkt)}const r={102113:!0,102100:!0,3857:!0,3785:!0},t={102113:!0,102100:!0,3857:!0,3785:!0,4326:!0},e=[-2.0037508342788905E7,
2.0037508342788905E7],f=[-2.0037508342787E7,2.0037508342787E7],p={102113:{wkTemplate:'PROJCS["WGS_1984_Web_Mercator",GEOGCS["GCS_WGS_1984_Major_Auxiliary_Sphere",DATUM["D_WGS_1984_Major_Auxiliary_Sphere",SPHEROID["WGS_1984_Major_Auxiliary_Sphere",6378137.0,0.0]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",{Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],UNIT["Meter",1.0]]',
valid:e,origin:f,dx:1E-5},102100:{wkTemplate:'PROJCS["WGS_1984_Web_Mercator_Auxiliary_Sphere",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator_Auxiliary_Sphere"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",{Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],PARAMETER["Auxiliary_Sphere_Type",0.0],UNIT["Meter",1.0]]',valid:e,origin:f,
dx:1E-5},3785:{wkTemplate:'PROJCS["WGS_1984_Web_Mercator",GEOGCS["GCS_WGS_1984_Major_Auxiliary_Sphere",DATUM["D_WGS_1984_Major_Auxiliary_Sphere",SPHEROID["WGS_1984_Major_Auxiliary_Sphere",6378137.0,0.0]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",{Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],UNIT["Meter",1.0]]',valid:e,origin:f,dx:1E-5},3857:{wkTemplate:'PROJCS["WGS_1984_Web_Mercator_Auxiliary_Sphere",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator_Auxiliary_Sphere"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",{Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],PARAMETER["Auxiliary_Sphere_Type",0.0],UNIT["Meter",1.0]]',
valid:e,origin:f,dx:1E-5},4326:{wkTemplate:'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",{Central_Meridian}],UNIT["Degree",0.0174532925199433]]',altTemplate:'PROJCS["WGS_1984_Plate_Carree",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Plate_Carree"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",{Central_Meridian}],UNIT["Degrees",111319.491]]',
valid:[-180,180],origin:[-180,90],dx:1E-5},104971:{wkTemplate:'GEOGCS["Mars_2000_(Sphere)",DATUM["Mars_2000_(Sphere)",SPHEROID["Mars_2000_(Sphere)",3396190.0,0.0]],PRIMEM["Reference_Meridian",0.0],UNIT["Degree",0.0174532925199433]]',valid:[-180,180],origin:[-180,90],dx:1E-5},104905:{wkTemplate:'GEOGCS["GCS_Mars_2000",DATUM["D_Mars_2000",SPHEROID["Mars_2000_IAU_IAG",3396190.0,169.8944472236118]],PRIMEM["Reference_Meridian",0.0],UNIT["Degree",0.0174532925199433]]',valid:[-180,180],origin:[-180,90],
dx:1E-5}};h={wkid:4326,wkt:h.replace(p[4326].wkTemplate,{Central_Meridian:"0.0"})};b.WGS84=h;b.WebMercator={wkid:102100,latestWkid:3857};b.equals=function(a,c){return g.isNone(a)||g.isNone(c)?!1:a===c?!0:null!=a.wkid||null!=c.wkid?a.wkid===c.wkid||k(a)&&k(c)||null!=c.latestWkid&&a.wkid===c.latestWkid||null!=a.latestWkid&&c.wkid===a.latestWkid:a.wkt&&c.wkt?a.wkt.toUpperCase()===c.wkt.toUpperCase():!1};b.getInfo=function(a){return d(a)&&a.wkid?p[a.wkid]:null};b.isCGCS2000=function(a){return d(a)&&4490===
a.wkid};b.isEarth=function(a){return!(m(a)||n(a))};b.isGeographic=function(a){return d(a)?a.wkid?null==q[a.wkid]:a.wkt?!!/^\s*GEOGCS/i.test(a.wkt):!1:!1};b.isMars=m;b.isMoon=n;b.isValid=d;b.isWGS84=function(a){return d(a)&&4326===a.wkid};b.isWKIDFromMars=l;b.isWKIDFromMoon=function(a){return 104903===a};b.isWebMercator=k;b.isWrappable=function(a){return d(a)&&null!=a.wkid&&!0===t[a.wkid]};Object.defineProperty(b,"__esModule",{value:!0})});