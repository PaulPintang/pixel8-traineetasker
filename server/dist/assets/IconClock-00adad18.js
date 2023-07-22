import{c as R,b as p,Z as B,$ as D,r as F,u as M,R as d,Q as V,a0 as W}from"./index-6ca8cd02.js";var Z=Object.defineProperty,A=Object.defineProperties,Q=Object.getOwnPropertyDescriptors,g=Object.getOwnPropertySymbols,X=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable,b=(r,a,e)=>a in r?Z(r,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[a]=e,w=(r,a)=>{for(var e in a||(a={}))X.call(a,e)&&b(r,e,a[e]);if(g)for(var e of g(a))Y.call(a,e)&&b(r,e,a[e]);return r},O=(r,a)=>A(r,Q(a));const q=r=>B({from:{boxShadow:`0 0 ${p(.5)} 0 ${r}`,opacity:.6},to:{boxShadow:`0 0 ${p(.5)} ${p(4.4)} ${r}`,opacity:0}});function P(r,a=0){const e={},[t,o]=r.split("-");let n="",s="";return t==="top"&&(e.top=a,s="-50%"),t==="middle"&&(e.top="50%",s="-50%"),t==="bottom"&&(e.bottom=a,s="50%"),o==="start"&&(e.left=a,n="-50%"),o==="center"&&(e.left="50%",n="-50%"),o==="end"&&(e.right=a,n="50%"),e.transform=`translate(${n}, ${s})`,e}var G=R((r,{radius:a,color:e,position:t,offset:o,inline:n,withBorder:s,withLabel:i,zIndex:m},{size:u})=>{const{background:v}=r.fn.variant({variant:"filled",primaryFallback:!1,color:e||r.primaryColor}),l=p(u);return{root:{position:"relative",display:n?"inline-block":"block"},indicator:O(w({},P(t,o)),{zIndex:m,position:"absolute",[i?"minWidth":"width"]:l,height:l,display:"flex",justifyContent:"center",alignItems:"center",fontSize:r.fontSizes.xs,paddingLeft:i?`calc(${r.spacing.xs} / 2)`:0,paddingRight:i?`calc(${r.spacing.xs} / 2)`:0,borderRadius:r.fn.radius(a),backgroundColor:r.fn.variant({variant:"filled",primaryFallback:!1,color:e||r.primaryColor}).background,border:s?`${p(2)} solid ${r.colorScheme==="dark"?r.colors.dark[7]:r.white}`:void 0,color:r.white,whiteSpace:"nowrap"}),processing:{animation:`${q(v)} 1000ms linear infinite`},common:O(w({},P(t,o)),{position:"absolute",[i?"minWidth":"width"]:l,height:l,borderRadius:r.fn.radius(a)})}});const H=G;var J=Object.defineProperty,f=Object.getOwnPropertySymbols,I=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable,$=(r,a,e)=>a in r?J(r,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[a]=e,K=(r,a)=>{for(var e in a||(a={}))I.call(a,e)&&$(r,e,a[e]);if(f)for(var e of f(a))x.call(a,e)&&$(r,e,a[e]);return r},T=(r,a)=>{var e={};for(var t in r)I.call(r,t)&&a.indexOf(t)<0&&(e[t]=r[t]);if(r!=null&&f)for(var t of f(r))a.indexOf(t)<0&&x.call(r,t)&&(e[t]=r[t]);return e};const U={position:"top-end",offset:0,inline:!1,withBorder:!1,disabled:!1,processing:!1,size:10,radius:1e3,zIndex:D("app")},L=F.forwardRef((r,a)=>{const e=M("Indicator",U,r),{children:t,position:o,offset:n,size:s,radius:i,inline:m,withBorder:u,className:v,color:l,styles:h,label:_,classNames:S,disabled:k,zIndex:N,unstyled:z,processing:E,variant:j}=e,C=T(e,["children","position","offset","size","radius","inline","withBorder","className","color","styles","label","classNames","disabled","zIndex","unstyled","processing","variant"]),{classes:c,cx:y}=H({position:o,offset:n,radius:i,inline:m,color:l,withBorder:u,zIndex:N,withLabel:!!_},{name:"Indicator",classNames:S,styles:h,unstyled:z,variant:j,size:s});return d.createElement(V,K({ref:a,className:y(c.root,v)},C),!k&&d.createElement(d.Fragment,null,d.createElement("div",{className:y(c.indicator,c.common)},_),E&&d.createElement("div",{className:y(c.processing,c.common)})),t)});L.displayName="@mantine/core/Indicator";var er=W("clock","IconClock",[["path",{d:"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0",key:"svg-0"}],["path",{d:"M12 7v5l3 3",key:"svg-1"}]]);export{L as I,er as a};
