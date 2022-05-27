/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{a as e}from"./object.js";import"../core/lang.js";import"../config.js";import"./Logger.js";import"./string.js";import"./Message.js";import r from"../core/Error.js";let s;function t(t,o={}){let n=o.responseType;n?"json"!==n&&"text"!==n&&"blob"!==n&&"array-buffer"!==n&&(n="text"):n="json";const a=o&&o.signal;return delete o.signal,e.invokeStaticMessage("request",{url:t,options:o},{signal:a}).then((e=>{const a=e.data;let i,l,c,u;if(a&&!("json"!==n&&"text"!==n&&"blob"!==n||(i=new Blob([a]),"json"!==n&&"text"!==n||(s||(s=new FileReaderSync),l=s.readAsText(i),"json"!==n)))){try{c=JSON.parse(l||null)}catch(e){const s={...e,url:t,requestOptions:o};throw new r("request:server",e.message,s)}if(c.error){const e={...c.error,url:t,requestOptions:o};throw new r("request:server",c.error.message,e)}}switch(n){case"json":u=c;break;case"text":u=l;break;case"blob":u=i;break;default:u=a}return{data:u,requestOptions:o,ssl:e.ssl,url:t}}))}export{t as execute};