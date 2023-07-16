import{r as w,u as re,a as Ce,R as x,I as Ne,b as P,c as Pe,g as Se,d as R,e as ke,f as Oe,h as ze,j as t,F as _,i as n,S as $e,k as M,B as S,T as c,l as oe,m as le,n as ne,o as Ie,p as Ee,C as se,q as k,G as z,V as De,s as je,t as ie,M as Ae,v as Te,A as ce,w as Ge,_ as Ve,x as Re,y as O,z as Me,D as Fe,E as Be}from"./index-24d6de80.js";import{e as Le,l as Ye,E as qe,P as Qe}from"./EmptyState-e33e9fa9.js";import{I as We,S as Xe}from"./IconInfoCircle-404475d4.js";import{I as Ue}from"./InlineInput-54c55443.js";const de=w.createContext(null),He=de.Provider,Je=()=>w.useContext(de);var Ke=Object.defineProperty,j=Object.getOwnPropertySymbols,pe=Object.prototype.hasOwnProperty,he=Object.prototype.propertyIsEnumerable,X=(e,a,r)=>a in e?Ke(e,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[a]=r,U=(e,a)=>{for(var r in a||(a={}))pe.call(a,r)&&X(e,r,a[r]);if(j)for(var r of j(a))he.call(a,r)&&X(e,r,a[r]);return e},Ze=(e,a)=>{var r={};for(var o in e)pe.call(e,o)&&a.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&j)for(var o of j(e))a.indexOf(o)<0&&he.call(e,o)&&(r[o]=e[o]);return r};const et={size:"sm"},me=w.forwardRef((e,a)=>{const r=re("CheckboxGroup",et,e),{children:o,value:l,defaultValue:h,onChange:f,size:m,wrapperProps:b}=r,g=Ze(r,["children","value","defaultValue","onChange","size","wrapperProps"]),[d,u]=Ce({value:l,defaultValue:h,finalValue:[],onChange:f}),i=y=>{const p=y.currentTarget.value;u(d.includes(p)?d.filter(v=>v!==p):[...d,p])};return x.createElement(He,{value:{value:d,onChange:i,size:m}},x.createElement(Ne.Wrapper,U(U({labelElement:"div",size:m,__staticSelector:"CheckboxGroup",ref:a},b),g),o))});me.displayName="@mantine/core/CheckboxGroup";var tt=Object.defineProperty,A=Object.getOwnPropertySymbols,ue=Object.prototype.hasOwnProperty,fe=Object.prototype.propertyIsEnumerable,H=(e,a,r)=>a in e?tt(e,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[a]=r,T=(e,a)=>{for(var r in a||(a={}))ue.call(a,r)&&H(e,r,a[r]);if(A)for(var r of A(a))fe.call(a,r)&&H(e,r,a[r]);return e},ge=(e,a)=>{var r={};for(var o in e)ue.call(e,o)&&a.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&A)for(var o of A(e))a.indexOf(o)<0&&fe.call(e,o)&&(r[o]=e[o]);return r};function at(e){const a=e,{width:r,height:o,style:l}=a,h=ge(a,["width","height","style"]);return x.createElement("svg",T({viewBox:"0 0 10 7",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:T({width:r,height:o},l)},h),x.createElement("path",{d:"M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"}))}function rt(e){var a=e,{indeterminate:r}=a,o=ge(a,["indeterminate"]);return r?x.createElement("svg",T({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 32 6"},o),x.createElement("rect",{width:"32",height:"6",fill:"currentColor",rx:"3"})):x.createElement(at,T({},o))}var ot=Object.defineProperty,lt=Object.defineProperties,nt=Object.getOwnPropertyDescriptors,J=Object.getOwnPropertySymbols,st=Object.prototype.hasOwnProperty,it=Object.prototype.propertyIsEnumerable,K=(e,a,r)=>a in e?ot(e,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[a]=r,Z=(e,a)=>{for(var r in a||(a={}))st.call(a,r)&&K(e,r,a[r]);if(J)for(var r of J(a))it.call(a,r)&&K(e,r,a[r]);return e},ee=(e,a)=>lt(e,nt(a));const ct={xs:P(16),sm:P(20),md:P(24),lg:P(30),xl:P(36)};var dt=Pe((e,{radius:a,color:r,transitionDuration:o,labelPosition:l,error:h,indeterminate:f},{size:m})=>{const b=Se({size:m,sizes:ct}),g=e.fn.variant({variant:"filled",color:r});return{icon:ee(Z({},e.fn.cover()),{ref:R("icon"),color:f?"inherit":e.white,transform:f?"none":`translateY(${P(5)}) scale(0.5)`,opacity:f?1:0,transitionProperty:"opacity, transform",transitionTimingFunction:"ease",transitionDuration:`${o}ms`,pointerEvents:"none",width:"60%",position:"absolute",zIndex:1,margin:"auto","@media (prefers-reduced-motion)":{transitionDuration:e.respectReducedMotion?"0ms":void 0}}),inner:{position:"relative",width:b,height:b,order:l==="left"?2:1},input:ee(Z({},e.fn.focusStyles()),{appearance:"none",backgroundColor:e.colorScheme==="dark"?e.colors.dark[6]:e.white,border:`${P(1)} solid ${h?e.fn.variant({variant:"filled",color:"red"}).background:e.colorScheme==="dark"?e.colors.dark[4]:e.colors.gray[4]}`,width:b,height:b,borderRadius:e.fn.radius(a),padding:0,display:"block",margin:0,transition:`border-color ${o}ms ease, background-color ${o}ms ease`,cursor:e.cursorType,"&:checked":{backgroundColor:g.background,borderColor:g.background,[`& + .${R("icon")}`]:{opacity:1,color:e.white,transform:"translateY(0) scale(1)"}},"&:disabled":{backgroundColor:e.colorScheme==="dark"?e.colors.dark[4]:e.colors.gray[2],borderColor:e.colorScheme==="dark"?e.colors.dark[6]:e.colors.gray[3],cursor:"not-allowed",pointerEvents:"none",[`& + .${R("icon")}`]:{color:e.colorScheme==="dark"?e.colors.dark[6]:e.colors.gray[5]}}})}});const pt=dt;var ht=Object.defineProperty,G=Object.getOwnPropertySymbols,be=Object.prototype.hasOwnProperty,ve=Object.prototype.propertyIsEnumerable,te=(e,a,r)=>a in e?ht(e,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[a]=r,D=(e,a)=>{for(var r in a||(a={}))be.call(a,r)&&te(e,r,a[r]);if(G)for(var r of G(a))ve.call(a,r)&&te(e,r,a[r]);return e},mt=(e,a)=>{var r={};for(var o in e)be.call(e,o)&&a.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&G)for(var o of G(e))a.indexOf(o)<0&&ve.call(e,o)&&(r[o]=e[o]);return r};const ut={size:"sm",transitionDuration:100,icon:rt,labelPosition:"right"},F=w.forwardRef((e,a)=>{const r=re("Checkbox",ut,e),{className:o,style:l,sx:h,checked:f,disabled:m,color:b,label:g,indeterminate:d,id:u,size:i,radius:y,wrapperProps:p,children:v,classNames:C,styles:$,transitionDuration:I,icon:E,unstyled:s,labelPosition:B,description:xe,error:L,variant:Y}=r,we=mt(r,["className","style","sx","checked","disabled","color","label","indeterminate","id","size","radius","wrapperProps","children","classNames","styles","transitionDuration","icon","unstyled","labelPosition","description","error","variant"]),N=Je(),q=ke(u),{systemStyles:_e,rest:Q}=Oe(we),{classes:V}=pt({radius:y,color:b,transitionDuration:I,labelPosition:B,error:!!L,indeterminate:d},{name:"Checkbox",classNames:C,styles:$,unstyled:s,variant:Y,size:(N==null?void 0:N.size)||i}),W=N?{checked:N.value.includes(Q.value),onChange:N.onChange}:{};return x.createElement(Ue,D(D({className:o,sx:h,style:l,id:q,size:(N==null?void 0:N.size)||i,labelPosition:B,label:g,description:xe,error:L,disabled:m,__staticSelector:"Checkbox",classNames:C,styles:$,unstyled:s,"data-checked":W.checked||void 0,variant:Y},_e),p),x.createElement("div",{className:V.inner},x.createElement("input",D(D({id:q,ref:a,type:"checkbox",className:V.input,checked:f,disabled:m},Q),W)),x.createElement(E,{indeterminate:d,className:V.icon})))});F.displayName="@mantine/core/Checkbox";F.Group=me;var ye=ze("x","IconX",[["path",{d:"M18 6l-12 12",key:"svg-0"}],["path",{d:"M6 6l12 12",key:"svg-1"}]]);const ft=()=>t(_,{children:t("tbody",{children:t("tr",{className:"h-full w-full absolute left-0",children:t("td",{className:"flex items-center justify-center h-full bg-white",children:n($e,{align:"center",children:[t(M,{src:Le,width:60,className:"animate-searching"}),t(S,{variant:"white",color:"dark",size:"xs",mb:55,loading:!0,children:t(c,{c:"dark",fz:"xs",className:"tracking-wide",children:"Getting data . . ."})})]})})})})}),gt=()=>{var I,E;const{user:e}=oe(s=>s.auth),{data:a,isLoading:r}=le(),[o,{toggle:l}]=ne(),[h,f]=w.useState(1),[m,b]=w.useState(null),[g,d]=w.useState(""),{data:u}=Ie(),i=(I=u==null?void 0:u.timesheet)==null?void 0:I.find(s=>s.status==="recording"),y={status:i==null?void 0:i.status,morning:i==null?void 0:i.morning,afternoon:i==null?void 0:i.afternoon},p=Ee(y),v=a==null?void 0:a.filter(s=>g?s.status===g:(e==null?void 0:e.role)==="trainee"?(e==null?void 0:e.name)===s.assign:s),C=Ye.chunk(v,5),$=(E=C[h-1])==null?void 0:E.map(s=>n("tr",{children:[t("td",{className:" md:table-cell lg:table-cell pl-3",children:t(c,{children:s.taskname})}),t("td",{className:"hidden md:table-cell lg:table-cell",children:t(c,{children:s.ticketno})}),t("td",{className:"px-5 py-2  md:table-cell lg:table-cell ",children:t(c,{children:s.spent!==""?s.spent:n("span",{children:[p.totalSpent.hours===1?p.totalSpent.hours+"hr":p.totalSpent.hours>1?p.totalSpent.hours+"hrs":p.totalSpent.hours===0&&"",p.totalSpent.minutes===1?p.totalSpent.minutes+"min":p.totalSpent.minutes>1?p.totalSpent.minutes+"mins":p.totalSpent.minutes===0&&""]})})}),t("td",{className:" py-2 hidden md:table-cell lg:table-cell",children:n("div",{className:"flex bg-gray-100  rounded items-center max-w-max px-2 py-1 gap-2",children:[t("div",{className:`w-2 h-2 ${s.status==="new"?"bg-indigo-300":s.status==="inprogress"?"bg-violet-400":s.status==="completed"?"bg-green-300":s.status==="forqa"?"bg-yellow-300":"bg-red-300"}`}),t(c,{fw:"bold",className:`text-[10px] ${s.status==="new"?"text-indigo-300":s.status==="inprogress"?"text-violet-400":s.status==="completed"?"text-green-300":s.status==="forqa"?"text-yellow-300":"text-red-300"}`,children:s.status})]})}),t("td",{className:"dark:text-gray-400   md:table-cell lg:table-cell",children:t(S,{onClick:()=>{l(),b(s._id)},leftIcon:t(We,{size:16}),variant:"white",color:"cyan",size:"xs",children:"View"})})]},s._id));return n(_,{children:[n(se,{className:"bg-opacity-60 rounded-md shadow-md h-[calc(100vh-375px)]",children:[t("div",{className:"h-[92%]",children:n("table",{className:"border-collapse border-none w-full",children:[t("thead",{children:n("tr",{children:[t("th",{scope:"col",className:"md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tl-md",children:t(c,{children:"Task Name"})}),t("th",{scope:"col",className:"hidden  md:table-cell lg:table-cell rounded-tr-md md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm",children:t(c,{children:"Ticket No."})}),t("th",{scope:"col",className:" md:table-cell lg:table-cell px-5 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:t(c,{children:"Total spent"})}),t("th",{scope:"col",className:"hidden  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:t(c,{children:"Status"})}),t("th",{scope:"col",className:"  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:t(c,{children:"Action"})})]})}),r?t(_,{children:t(ft,{})}):(v==null?void 0:v.length)===0?n(_,{children:[t(qe,{text:`There are no ${g} tasks`}),";"]}):t("tbody",{className:"text-xs text-gray-600",children:$})]})}),n(k,{justify:"space-between",children:[n(z,{align:"center",children:[t(Xe,{size:"xs",value:g,onChange:d,w:150,placeholder:"Filter",data:[{value:"",label:"All tasks"},{value:"new",label:"New"},{value:"inprogress",label:"In-Progress"},{value:"forqa",label:"For-QA"},{value:"failed",label:"Failed"},{value:"completed",label:"Completed"}]}),t(k,{children:n(z,{spacing:3,children:[t(c,{fz:"xs",className:"uppercase font-semibold text-gray-700",children:"Total:"}),n(c,{fz:"xs",children:[v==null?void 0:v.length," task",(v==null?void 0:v.length)>=2&&"s"]})]})})]}),t(Qe,{total:C.length,value:h,onChange:f,size:"xs",color:"cyan",withEdges:!0})]})]}),t(De,{tasks:a,viewId:m,view:o,toggleView:l})]})},ae="/assets/emptytodo-69eb0fba.png",bt=({add:e,toggle:a,currentTask:r})=>{const o=je("(max-width: 50em)"),[l,h]=w.useState({isDone:!1,todo:""}),[f,m]=w.useState([]),[b,{isLoading:g}]=ie(),d=()=>{m([...f,l]),h({...l,todo:""})},u=async()=>{const i=[...r.todos,...f];await b({_id:r._id,todos:i}),a(),h({...l,todo:""}),m([])};return n(Ae,{size:"sm",opened:e,fullScreen:o,onClose:()=>{a(),h({...l,todo:""}),m([])},title:t(c,{c:"dark",fz:"sm",children:"Add todo's to your current task!"}),children:[n("div",{className:"space-y-1",children:[n(z,{spacing:10,pb:3,children:[t(c,{fz:12,className:"text-gray-500 font-semibold",children:"Current Task:"}),t(c,{fz:12,c:"dimmed",children:r==null?void 0:r.taskname})]}),n(k,{gap:8,children:[t(Te,{autoComplete:"off",placeholder:"add todo",name:"taskname",value:l.todo,onChange:i=>h({...l,todo:i.target.value}),className:"w-full"}),t(S,{onClick:d,size:"sm",disabled:l.todo==="",children:"Add"})]})]}),t("div",{className:"space-y-2 py-3",children:f.map((i,y)=>t("div",{children:n("div",{className:"bg-slate-50 opacity-70 px-3 py-2 rounded-md relative",children:[t(c,{c:"dark",fz:"sm",className:"w-[80%]",py:4,children:i.todo}),t("div",{className:"absolute top-2 right-3",children:t(ce,{color:"red",variant:"light",radius:"xl",onClick:()=>m(p=>p.filter((v,C)=>C!==y)),children:t(ye,{size:16})})})]})}))}),f.length!==0&&n(k,{children:[t(S,{variant:"white",color:"gray",mt:"md",onClick:()=>{a(),h({...l,todo:""}),m([])},fullWidth:!0,children:"Cancel"}),t(S,{mt:"md",onClick:u,fullWidth:!0,color:"cyan",loading:g,children:"Save"})]})]})},vt=()=>{var m,b,g;const{data:e}=le(),[a]=ie(),[r,{toggle:o}]=ne(),l=e==null?void 0:e.find(d=>d.status==="inprogress"),h=async d=>{var u;await a({_id:l==null?void 0:l._id,todos:(u=l==null?void 0:l.todos)==null?void 0:u.filter((i,y)=>y!==d)})},f=async d=>{var i;const u=(i=l==null?void 0:l.todos)==null?void 0:i.map((y,p)=>p===d?{...y,isDone:!y.isDone}:y);await a({_id:l==null?void 0:l._id,todos:u})};return n(_,{children:[t(se,{className:"h-full rounded-md shadow-md ",children:l?t(_,{children:((m=l==null?void 0:l.todos)==null?void 0:m.length)??!1?n(_,{children:[n(z,{spacing:10,pb:5,children:[t(c,{fz:"sm",className:"text-gray-500 font-semibold",children:"Current Task:"}),t(c,{fz:"sm",c:"dimmed",children:l==null?void 0:l.taskname})]}),n(k,{align:"center",justify:"space-between",pb:3,children:[n(c,{fz:"xs",className:"text-gray-500 font-semibold",children:["You've got ",(b=l==null?void 0:l.todos)==null?void 0:b.length," todos for this task"]}),t(S,{size:"xs",variant:"white",onClick:o,children:t(c,{children:"+ Add more"})})]}),t(Ge.Autosize,{mah:220,scrollbarSize:8,children:t("div",{className:"space-y-3 ",children:(g=l==null?void 0:l.todos)==null?void 0:g.map((d,u)=>n("div",{className:"bg-slate-50 opacity-70 px-3 py-2 rounded-md relative",children:[t(c,{c:"dark",fz:"xs",className:"w-[80%]",py:4,children:t("span",{className:d.isDone?"line-through italic":"",children:d.todo})}),t("div",{className:"absolute top-2 right-3",children:n(z,{spacing:6,children:[t(F,{checked:d.isDone,size:"xs",color:"cyan",onChange:()=>f(u)}),t(ce,{color:"red",variant:"light",radius:"xl",onClick:()=>h(u),children:t(ye,{size:15})})]})})]}))})})]}):n(k,{direction:"column",align:"center",gap:10,children:[t(M,{src:ae,width:130}),t(c,{fw:"bold",c:"dark",children:"Don't have any new todo?"}),t(S,{size:"sm",color:"cyan",onClick:o,children:"Add todos"})]})}):n(k,{direction:"column",align:"center",gap:10,children:[t(M,{src:ae,width:130}),n("div",{className:"text-center",children:[t(c,{fw:"bold",c:"dark",children:"You don't have inprogress task"}),t(c,{fz:"xs",c:"dimmed",children:"You can only add todos if you have inprogress task"})]})]})}),t(bt,{add:r,toggle:o,currentTask:l})]})},yt=w.lazy(()=>Ve(()=>import("./MembersTableCard-c8983b86.js"),["assets/MembersTableCard-c8983b86.js","assets/index-24d6de80.js","assets/index-d3c7e908.css","assets/EmptyState-e33e9fa9.js","assets/IconDots-63fcfa75.js","assets/IconInfoCircle-404475d4.js","assets/IconUser-a3b04622.js","assets/InlineInput-54c55443.js"])),xt=()=>{const{user:e}=oe(a=>a.auth);return Re("Dashboard"),t(_,{children:n(O,{pb:5,children:[n(O.Col,{className:"space-y-1",md:8,lg:8,sm:"auto",children:[t(Me,{}),t(Fe,{})]}),t(O.Col,{lg:4,md:4,sm:"auto",children:t(Be,{})}),(e==null?void 0:e.role)==="trainee"?n(_,{children:[t(O.Col,{md:8,lg:8,sm:"auto",children:t(gt,{})}),t(O.Col,{className:"bg-bl ue-300",md:4,lg:4,sm:"auto",children:t(vt,{})})]}):t(O.Col,{span:"auto",children:t(yt,{})})]})})},Pt=Object.freeze(Object.defineProperty({__proto__:null,default:xt},Symbol.toStringTag,{value:"Module"}));export{F as C,Pt as D,ft as G};