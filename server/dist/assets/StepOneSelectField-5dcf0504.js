import{R as s,r as h,u as J,e as K,a as fr,I as ur,b as n,c as vr,d as j,g as c,f as mr,m as k,Q as A,n as l,T as I,a2 as _r,N as yr,o as gr,B as Pr}from"./index-6ca8cd02.js";import{I as Or}from"./InlineInput-ce458e79.js";var br=Object.defineProperty,O=Object.getOwnPropertySymbols,L=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable,M=(r,e,a)=>e in r?br(r,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[e]=a,Q=(r,e)=>{for(var a in e||(e={}))L.call(e,a)&&M(r,a,e[a]);if(O)for(var a of O(e))Z.call(e,a)&&M(r,a,e[a]);return r},wr=(r,e)=>{var a={};for(var o in r)L.call(r,o)&&e.indexOf(o)<0&&(a[o]=r[o]);if(r!=null&&O)for(var o of O(r))e.indexOf(o)<0&&Z.call(r,o)&&(a[o]=r[o]);return a};function hr(r){const e=r,{width:a,height:o,style:i}=e,t=wr(e,["width","height","style"]);return s.createElement("svg",Q({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 5 5",style:Q({width:a,height:o},i)},t),s.createElement("path",{fill:"currentColor",d:"M0 2.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"}))}const rr=h.createContext(null),Sr=rr.Provider,$r=()=>h.useContext(rr);var xr=Object.defineProperty,b=Object.getOwnPropertySymbols,er=Object.prototype.hasOwnProperty,ar=Object.prototype.propertyIsEnumerable,W=(r,e,a)=>e in r?xr(r,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[e]=a,X=(r,e)=>{for(var a in e||(e={}))er.call(e,a)&&W(r,a,e[a]);if(b)for(var a of b(e))ar.call(e,a)&&W(r,a,e[a]);return r},Rr=(r,e)=>{var a={};for(var o in r)er.call(r,o)&&e.indexOf(o)<0&&(a[o]=r[o]);if(r!=null&&b)for(var o of b(r))e.indexOf(o)<0&&ar.call(r,o)&&(a[o]=r[o]);return a};const Cr={size:"sm"},or=h.forwardRef((r,e)=>{const a=J("RadioGroup",Cr,r),{children:o,value:i,defaultValue:t,onChange:d,size:p,wrapperProps:S,unstyled:v,name:z}=a,m=Rr(a,["children","value","defaultValue","onChange","size","wrapperProps","unstyled","name"]),$=K(z),[_,y]=fr({value:i,defaultValue:t,finalValue:"",onChange:d}),x=R=>y(R.currentTarget.value);return s.createElement(Sr,{value:{value:_,onChange:x,size:p,name:$}},s.createElement(ur.Wrapper,X(X({labelElement:"div",size:p,__staticSelector:"RadioGroup",ref:e,unstyled:v},S),m),o))});or.displayName="@mantine/core/RadioGroup";var Er=Object.defineProperty,jr=Object.defineProperties,kr=Object.getOwnPropertyDescriptors,Y=Object.getOwnPropertySymbols,Ir=Object.prototype.hasOwnProperty,Nr=Object.prototype.propertyIsEnumerable,q=(r,e,a)=>e in r?Er(r,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[e]=a,zr=(r,e)=>{for(var a in e||(e={}))Ir.call(e,a)&&q(r,a,e[a]);if(Y)for(var a of Y(e))Nr.call(e,a)&&q(r,a,e[a]);return r},Gr=(r,e)=>jr(r,kr(e));const N={xs:n(16),sm:n(20),md:n(24),lg:n(30),xl:n(36)},g={xs:n(6),sm:n(8),md:n(10),lg:n(14),xl:n(16)};var Dr=vr((r,{color:e,transitionDuration:a,labelPosition:o,error:i},{size:t})=>{const d=r.fn.variant({variant:"filled",color:e}),p=r.fn.variant({variant:"filled",color:"red"}).background;return{inner:{order:o==="left"?2:1,position:"relative",alignSelf:"flex-start"},icon:{ref:j("icon"),color:r.white,opacity:0,transform:`scale(0.75) translateY(${n(2)})`,transition:`opacity ${a}ms ${r.transitionTimingFunction}`,pointerEvents:"none",width:c({sizes:g,size:t}),height:c({sizes:g,size:t}),position:"absolute",top:`calc(50% - ${c({sizes:g,size:t})} / 2)`,left:`calc(50% - ${c({sizes:g,size:t})} / 2)`},radio:Gr(zr({},r.fn.focusStyles()),{backgroundColor:r.colorScheme==="dark"?r.colors.dark[6]:r.white,border:`${n(1)} solid ${i?p:r.colorScheme==="dark"?r.colors.dark[4]:r.colors.gray[4]}`,position:"relative",appearance:"none",width:c({sizes:N,size:t}),height:c({sizes:N,size:t}),borderRadius:c({sizes:N,size:t}),margin:0,display:"flex",alignItems:"center",justifyContent:"center",transitionProperty:"background-color, border-color",transitionTimingFunction:r.transitionTimingFunction,transitionDuration:`${a}ms`,cursor:r.cursorType,"&:checked":{background:d.background,borderColor:d.background,[`& + .${j("icon")}`]:{opacity:1,transform:"scale(1)"}},"&:disabled":{borderColor:r.colorScheme==="dark"?r.colors.dark[5]:r.colors.gray[4],backgroundColor:r.colorScheme==="dark"?r.colors.dark[5]:r.colors.gray[1],[`& + .${j("icon")}`]:{color:r.colorScheme==="dark"?r.colors.dark[6]:r.colors.gray[4]}}})}});const Tr=Dr;var Vr=Object.defineProperty,w=Object.getOwnPropertySymbols,tr=Object.prototype.hasOwnProperty,nr=Object.prototype.propertyIsEnumerable,H=(r,e,a)=>e in r?Vr(r,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[e]=a,P=(r,e)=>{for(var a in e||(e={}))tr.call(e,a)&&H(r,a,e[a]);if(w)for(var a of w(e))nr.call(e,a)&&H(r,a,e[a]);return r},Fr=(r,e)=>{var a={};for(var o in r)tr.call(r,o)&&e.indexOf(o)<0&&(a[o]=r[o]);if(r!=null&&w)for(var o of w(r))e.indexOf(o)<0&&nr.call(r,o)&&(a[o]=r[o]);return a};const Br={icon:hr,transitionDuration:100,size:"sm",labelPosition:"right"},u=h.forwardRef((r,e)=>{var a,o;const i=J("Radio",Br,r),{className:t,style:d,id:p,label:S,size:v,title:z,disabled:m,color:$,classNames:_,styles:y,sx:x,icon:R,transitionDuration:lr,wrapperProps:ir,unstyled:G,labelPosition:D,description:sr,error:T,variant:V}=i,cr=Fr(i,["className","style","id","label","size","title","disabled","color","classNames","styles","sx","icon","transitionDuration","wrapperProps","unstyled","labelPosition","description","error","variant"]),f=$r(),dr=(a=f==null?void 0:f.size)!=null?a:v,F=r.size?v:dr,{classes:C}=Tr({color:$,transitionDuration:lr,labelPosition:D,error:!!T},{name:"Radio",classNames:_,styles:y,unstyled:G,variant:V,size:F}),{systemStyles:pr,rest:E}=mr(cr),B=K(p),U=f?{checked:f.value===E.value,name:(o=E.name)!=null?o:f.name,onChange:f.onChange}:{};return s.createElement(Or,P(P({className:t,sx:x,style:d,id:B,size:F,labelPosition:D,label:S,description:sr,error:T,disabled:m,__staticSelector:"Radio",classNames:_,styles:y,unstyled:G,"data-checked":U.checked||void 0,variant:V},pr),ir),s.createElement("div",{className:C.inner},s.createElement("input",P(P({ref:e,className:C.radio,type:"radio",id:B,disabled:m},E),U)),s.createElement(R,{className:C.icon,"aria-hidden":!0})))});u.displayName="@mantine/core/Radio";u.Group=or;const Mr=({setTraineeInfo:r,traineeInfo:e,setStep:a})=>k(A,{component:"div",children:[l(I,{c:"dimmed",children:"1/2"}),l(_r,{children:"Select field internship"}),l(I,{c:"dimmed",children:"Our internship program offers best opportunity to immerse yourself in real-world challenges and make a meaningful impact."}),k(A,{pt:16,children:[l(I,{c:"dark",pb:10,children:"Our company offer"}),l(u.Group,{value:e.course,onChange:o=>r({...e,course:o}),children:k(yr,{spacing:10,children:[l(u,{value:"developer",color:"cyan",label:"Software Development"}),l(u,{value:"analyst",color:"cyan",label:"System Analyst"}),l(u,{value:"designer",color:"cyan",label:"UI/UX Designer"})]})})]}),l(gr,{justify:"end",pt:70,children:l(Pr,{className:"",onClick:()=>a(2),variant:"white",color:"cyan",children:"Next"})})]});export{Mr as default};
