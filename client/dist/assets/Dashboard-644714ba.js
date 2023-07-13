import{r as x,u as ae,a as Ce,R as y,I as Pe,b as _,c as Ne,g as Se,d as V,e as Oe,f as ze,h as ke,i as re,j as le,k as ne,l as $e,m as n,n as a,T as p,B as S,F as O,C as se,o as C,G as $,V as Ie,p as Ee,q as ie,M as je,s as De,A as de,S as Ae,t as W,_ as Te,v as Re,w as k,x as Ve,y as Ge,z as Me}from"./index-a4716bfd.js";import{l as Fe,P as Be}from"./lodash-44113222.js";import{c as Le}from"./calculateSpentTime-49d88f56.js";import{I as Ye,S as qe}from"./IconInfoCircle-4fb0ab84.js";import{I as Qe}from"./InlineInput-37f0997b.js";const ce=x.createContext(null),We=ce.Provider,Xe=()=>x.useContext(ce);var Ue=Object.defineProperty,j=Object.getOwnPropertySymbols,pe=Object.prototype.hasOwnProperty,he=Object.prototype.propertyIsEnumerable,X=(e,t,o)=>t in e?Ue(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,U=(e,t)=>{for(var o in t||(t={}))pe.call(t,o)&&X(e,o,t[o]);if(j)for(var o of j(t))he.call(t,o)&&X(e,o,t[o]);return e},He=(e,t)=>{var o={};for(var r in e)pe.call(e,r)&&t.indexOf(r)<0&&(o[r]=e[r]);if(e!=null&&j)for(var r of j(e))t.indexOf(r)<0&&he.call(e,r)&&(o[r]=e[r]);return o};const Je={size:"sm"},me=x.forwardRef((e,t)=>{const o=ae("CheckboxGroup",Je,e),{children:r,value:l,defaultValue:m,onChange:g,size:h,wrapperProps:u}=o,b=He(o,["children","value","defaultValue","onChange","size","wrapperProps"]),[i,d]=Ce({value:l,defaultValue:m,finalValue:[],onChange:g}),v=c=>{const f=c.currentTarget.value;d(i.includes(f)?i.filter(P=>P!==f):[...i,f])};return y.createElement(We,{value:{value:i,onChange:v,size:h}},y.createElement(Pe.Wrapper,U(U({labelElement:"div",size:h,__staticSelector:"CheckboxGroup",ref:t},u),b),r))});me.displayName="@mantine/core/CheckboxGroup";var Ke=Object.defineProperty,D=Object.getOwnPropertySymbols,ue=Object.prototype.hasOwnProperty,fe=Object.prototype.propertyIsEnumerable,H=(e,t,o)=>t in e?Ke(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,A=(e,t)=>{for(var o in t||(t={}))ue.call(t,o)&&H(e,o,t[o]);if(D)for(var o of D(t))fe.call(t,o)&&H(e,o,t[o]);return e},ge=(e,t)=>{var o={};for(var r in e)ue.call(e,r)&&t.indexOf(r)<0&&(o[r]=e[r]);if(e!=null&&D)for(var r of D(e))t.indexOf(r)<0&&fe.call(e,r)&&(o[r]=e[r]);return o};function Ze(e){const t=e,{width:o,height:r,style:l}=t,m=ge(t,["width","height","style"]);return y.createElement("svg",A({viewBox:"0 0 10 7",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:A({width:o,height:r},l)},m),y.createElement("path",{d:"M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"}))}function et(e){var t=e,{indeterminate:o}=t,r=ge(t,["indeterminate"]);return o?y.createElement("svg",A({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 32 6"},r),y.createElement("rect",{width:"32",height:"6",fill:"currentColor",rx:"3"})):y.createElement(Ze,A({},r))}var tt=Object.defineProperty,ot=Object.defineProperties,at=Object.getOwnPropertyDescriptors,J=Object.getOwnPropertySymbols,rt=Object.prototype.hasOwnProperty,lt=Object.prototype.propertyIsEnumerable,K=(e,t,o)=>t in e?tt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,Z=(e,t)=>{for(var o in t||(t={}))rt.call(t,o)&&K(e,o,t[o]);if(J)for(var o of J(t))lt.call(t,o)&&K(e,o,t[o]);return e},ee=(e,t)=>ot(e,at(t));const nt={xs:_(16),sm:_(20),md:_(24),lg:_(30),xl:_(36)};var st=Ne((e,{radius:t,color:o,transitionDuration:r,labelPosition:l,error:m,indeterminate:g},{size:h})=>{const u=Se({size:h,sizes:nt}),b=e.fn.variant({variant:"filled",color:o});return{icon:ee(Z({},e.fn.cover()),{ref:V("icon"),color:g?"inherit":e.white,transform:g?"none":`translateY(${_(5)}) scale(0.5)`,opacity:g?1:0,transitionProperty:"opacity, transform",transitionTimingFunction:"ease",transitionDuration:`${r}ms`,pointerEvents:"none",width:"60%",position:"absolute",zIndex:1,margin:"auto","@media (prefers-reduced-motion)":{transitionDuration:e.respectReducedMotion?"0ms":void 0}}),inner:{position:"relative",width:u,height:u,order:l==="left"?2:1},input:ee(Z({},e.fn.focusStyles()),{appearance:"none",backgroundColor:e.colorScheme==="dark"?e.colors.dark[6]:e.white,border:`${_(1)} solid ${m?e.fn.variant({variant:"filled",color:"red"}).background:e.colorScheme==="dark"?e.colors.dark[4]:e.colors.gray[4]}`,width:u,height:u,borderRadius:e.fn.radius(t),padding:0,display:"block",margin:0,transition:`border-color ${r}ms ease, background-color ${r}ms ease`,cursor:e.cursorType,"&:checked":{backgroundColor:b.background,borderColor:b.background,[`& + .${V("icon")}`]:{opacity:1,color:e.white,transform:"translateY(0) scale(1)"}},"&:disabled":{backgroundColor:e.colorScheme==="dark"?e.colors.dark[4]:e.colors.gray[2],borderColor:e.colorScheme==="dark"?e.colors.dark[6]:e.colors.gray[3],cursor:"not-allowed",pointerEvents:"none",[`& + .${V("icon")}`]:{color:e.colorScheme==="dark"?e.colors.dark[6]:e.colors.gray[5]}}})}});const it=st;var dt=Object.defineProperty,T=Object.getOwnPropertySymbols,ve=Object.prototype.hasOwnProperty,be=Object.prototype.propertyIsEnumerable,te=(e,t,o)=>t in e?dt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,E=(e,t)=>{for(var o in t||(t={}))ve.call(t,o)&&te(e,o,t[o]);if(T)for(var o of T(t))be.call(t,o)&&te(e,o,t[o]);return e},ct=(e,t)=>{var o={};for(var r in e)ve.call(e,r)&&t.indexOf(r)<0&&(o[r]=e[r]);if(e!=null&&T)for(var r of T(e))t.indexOf(r)<0&&be.call(e,r)&&(o[r]=e[r]);return o};const pt={size:"sm",transitionDuration:100,icon:et,labelPosition:"right"},G=x.forwardRef((e,t)=>{const o=ae("Checkbox",pt,e),{className:r,style:l,sx:m,checked:g,disabled:h,color:u,label:b,indeterminate:i,id:d,size:v,radius:c,wrapperProps:f,children:P,classNames:N,styles:z,transitionDuration:I,icon:s,unstyled:M,labelPosition:F,description:xe,error:B,variant:L}=o,we=ct(o,["className","style","sx","checked","disabled","color","label","indeterminate","id","size","radius","wrapperProps","children","classNames","styles","transitionDuration","icon","unstyled","labelPosition","description","error","variant"]),w=Xe(),Y=Oe(d),{systemStyles:_e,rest:q}=ze(we),{classes:R}=it({radius:c,color:u,transitionDuration:I,labelPosition:F,error:!!B,indeterminate:i},{name:"Checkbox",classNames:N,styles:z,unstyled:M,variant:L,size:(w==null?void 0:w.size)||v}),Q=w?{checked:w.value.includes(q.value),onChange:w.onChange}:{};return y.createElement(Qe,E(E({className:r,sx:m,style:l,id:Y,size:(w==null?void 0:w.size)||v,labelPosition:F,label:b,description:xe,error:B,disabled:h,__staticSelector:"Checkbox",classNames:N,styles:z,unstyled:M,"data-checked":Q.checked||void 0,variant:L},_e),f),y.createElement("div",{className:R.inner},y.createElement("input",E(E({id:Y,ref:t,type:"checkbox",className:R.input,checked:g,disabled:h},q),Q)),y.createElement(s,{indeterminate:i,className:R.icon})))});G.displayName="@mantine/core/Checkbox";G.Group=me;var ye=ke("x","IconX",[["path",{d:"M18 6l-12 12",key:"svg-0"}],["path",{d:"M6 6l12 12",key:"svg-1"}]]);const ht=()=>{var z,I;const{user:e}=re(s=>s.auth),{data:t}=le(),[o,{toggle:r}]=ne(),[l,m]=x.useState(1),[g,h]=x.useState(null),[u,b]=x.useState(""),{data:i}=$e(),d=(z=i==null?void 0:i.timesheet)==null?void 0:z.find(s=>s.status==="recording"),v={status:d==null?void 0:d.status,morning:d==null?void 0:d.morning,afternoon:d==null?void 0:d.afternoon},c=Le(v),f=t==null?void 0:t.filter(s=>u?s.status===u:(e==null?void 0:e.role)==="trainee"?(e==null?void 0:e.name)===s.assign:s),P=Fe.chunk(f,5),N=(I=P[l-1])==null?void 0:I.map(s=>n("tr",{children:[a("td",{className:" md:table-cell lg:table-cell pl-3",children:a(p,{children:s.taskname})}),a("td",{className:"hidden md:table-cell lg:table-cell",children:a(p,{children:s.ticketno})}),a("td",{className:"px-5 py-2  md:table-cell lg:table-cell ",children:a(p,{children:s.spent!==""?s.spent:n("span",{children:[c.totalSpent.hours===1?c.totalSpent.hours+"hr":c.totalSpent.hours>1?c.totalSpent.hours+"hrs":c.totalSpent.hours===0&&"",c.totalSpent.minutes===1?c.totalSpent.minutes+"min":c.totalSpent.minutes>1?c.totalSpent.minutes+"mins":c.totalSpent.minutes===0&&""]})})}),a("td",{className:" py-2 hidden md:table-cell lg:table-cell",children:n("div",{className:"flex bg-gray-100  rounded items-center max-w-max px-2 py-1 gap-2",children:[a("div",{className:`w-2 h-2 ${s.status==="new"?"bg-indigo-300":s.status==="inprogress"?"bg-violet-400":s.status==="completed"?"bg-green-300":s.status==="forqa"?"bg-yellow-300":"bg-red-300"}`}),a(p,{fw:"bold",className:`text-[10px] ${s.status==="new"?"text-indigo-300":s.status==="inprogress"?"text-violet-400":s.status==="completed"?"text-green-300":s.status==="forqa"?"text-yellow-300":"text-red-300"}`,children:s.status})]})}),a("td",{className:"dark:text-gray-400   md:table-cell lg:table-cell",children:a(S,{onClick:()=>{r(),h(s._id)},leftIcon:a(Ye,{size:16}),variant:"white",color:"cyan",size:"xs",children:"View"})})]},s._id));return n(O,{children:[n(se,{className:"bg-opacity-60 rounded-md shadow-md h-[calc(100vh-375px)]",children:[a("div",{className:"h-[92%]",children:n("table",{className:"border-collapse border-none w-full",children:[a("thead",{children:n("tr",{children:[a("th",{scope:"col",className:"md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tl-md",children:a(p,{children:"Task Name"})}),a("th",{scope:"col",className:"hidden  md:table-cell lg:table-cell rounded-tr-md md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm",children:a(p,{children:"Ticket No."})}),a("th",{scope:"col",className:" md:table-cell lg:table-cell px-5 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:a(p,{children:"Total spent"})}),a("th",{scope:"col",className:"hidden  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:a(p,{children:"Status"})}),a("th",{scope:"col",className:"  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:a(p,{children:"Action"})})]})}),a("tbody",{className:"text-xs text-gray-600",children:N})]})}),n(C,{justify:"space-between",children:[n($,{align:"center",children:[a(qe,{size:"xs",value:u,onChange:b,w:150,placeholder:"Filter",data:[{value:"",label:"All tasks"},{value:"new",label:"New"},{value:"inprogress",label:"In-Progress"},{value:"forqa",label:"For-QA"},{value:"failed",label:"Failed"},{value:"completed",label:"Completed"}]}),a(C,{children:n($,{spacing:3,children:[a(p,{fz:"xs",className:"uppercase font-semibold text-gray-700",children:"Total:"}),n(p,{fz:"xs",children:[f==null?void 0:f.length," task",(f==null?void 0:f.length)>=2&&"s"]})]})})]}),a(Be,{total:P.length,value:l,onChange:m,size:"xs",color:"cyan",withEdges:!0})]})]}),a(Ie,{tasks:t,viewId:g,view:o,toggle:r})]})},oe="/assets/emptytodo-69eb0fba.png",mt=({add:e,toggle:t,currentTask:o})=>{const r=Ee("(max-width: 50em)"),[l,m]=x.useState({isDone:!1,todo:""}),[g,h]=x.useState([]),[u,{isLoading:b}]=ie(),i=()=>{h([...g,l]),m({...l,todo:""})},d=async()=>{const v=[...o.todos,...g];await u({_id:o._id,todos:v}),t(),m({...l,todo:""}),h([])};return n(je,{size:"sm",opened:e,fullScreen:r,onClose:()=>{t(),m({...l,todo:""}),h([])},title:a(p,{c:"dark",fz:"sm",children:"Add todo's to your current task!"}),children:[n("div",{className:"space-y-1",children:[n($,{spacing:10,pb:3,children:[a(p,{fz:12,className:"text-gray-500 font-semibold",children:"Current Task:"}),a(p,{fz:12,c:"dimmed",children:o==null?void 0:o.taskname})]}),n(C,{gap:8,children:[a(De,{autoComplete:"off",placeholder:"add todo",name:"taskname",value:l.todo,onChange:v=>m({...l,todo:v.target.value}),className:"w-full"}),a(S,{onClick:i,size:"sm",disabled:l.todo==="",children:"Add"})]})]}),a("div",{className:"space-y-2 py-3",children:g.map((v,c)=>a("div",{children:n("div",{className:"bg-slate-50 opacity-70 px-3 py-2 rounded-md relative",children:[a(p,{c:"dark",fz:"sm",className:"w-[80%]",py:4,children:v.todo}),a("div",{className:"absolute top-2 right-3",children:a(de,{color:"red",variant:"light",radius:"xl",onClick:()=>h(f=>f.filter((P,N)=>N!==c)),children:a(ye,{size:16})})})]})}))}),g.length!==0&&n(C,{children:[a(S,{variant:"white",color:"gray",mt:"md",onClick:()=>{t(),m({...l,todo:""}),h([])},fullWidth:!0,children:"Cancel"}),a(S,{mt:"md",onClick:d,fullWidth:!0,color:"cyan",loading:b,children:"Save"})]})]})},ut=()=>{var h,u,b;const{data:e}=le(),[t]=ie(),[o,{toggle:r}]=ne(),l=e==null?void 0:e.find(i=>i.status==="inprogress"),m=async i=>{var d;await t({_id:l==null?void 0:l._id,todos:(d=l==null?void 0:l.todos)==null?void 0:d.filter((v,c)=>c!==i)})},g=async i=>{var v;const d=(v=l==null?void 0:l.todos)==null?void 0:v.map((c,f)=>f===i?{...c,isDone:!c.isDone}:c);await t({_id:l==null?void 0:l._id,todos:d})};return n(O,{children:[a(se,{className:"h-full rounded-md shadow-md ",children:l?a(O,{children:((h=l==null?void 0:l.todos)==null?void 0:h.length)??!1?n(O,{children:[n($,{spacing:10,pb:5,children:[a(p,{fz:"sm",className:"text-gray-500 font-semibold",children:"Current Task:"}),a(p,{fz:"sm",c:"dimmed",children:l==null?void 0:l.taskname})]}),n(C,{align:"center",justify:"space-between",pb:3,children:[n(p,{fz:"xs",className:"text-gray-500 font-semibold",children:["You've got ",(u=l==null?void 0:l.todos)==null?void 0:u.length," todos for this task"]}),a(S,{size:"xs",variant:"white",onClick:r,children:"+ Add more"})]}),a(Ae.Autosize,{mah:220,scrollbarSize:8,children:a("div",{className:"space-y-3 ",children:(b=l==null?void 0:l.todos)==null?void 0:b.map((i,d)=>n("div",{className:"bg-slate-50 opacity-70 px-3 py-2 rounded-md relative",children:[a(p,{c:"dark",fz:"xs",className:"w-[80%]",py:4,children:a("span",{className:i.isDone?"line-through italic":"",children:i.todo})}),a("div",{className:"absolute top-2 right-3",children:n($,{spacing:6,children:[a(G,{checked:i.isDone,size:"xs",color:"cyan",onChange:()=>g(d)}),a(de,{color:"red",variant:"light",radius:"xl",onClick:()=>m(d),children:a(ye,{size:15})})]})})]}))})})]}):n(C,{direction:"column",align:"center",gap:10,children:[a(W,{src:oe,width:130}),a(p,{fw:"bold",c:"dark",children:"Don't have any new todo?"}),a(S,{size:"sm",color:"cyan",onClick:r,children:"Add todos"})]})}):n(C,{direction:"column",align:"center",gap:10,children:[a(W,{src:oe,width:130}),n("div",{className:"text-center",children:[a(p,{fw:"bold",c:"dark",children:"You don't have inprogress task"}),a(p,{fz:"xs",c:"dimmed",children:"You can only add todos if you have inprogress task"})]})]})}),a(mt,{add:o,toggle:r,currentTask:l})]})},ft=x.lazy(()=>Te(()=>import("./MembersTableCard-488d7928.js"),["assets/MembersTableCard-488d7928.js","assets/index-a4716bfd.js","assets/index-bea6358e.css","assets/lodash-44113222.js","assets/IconDots-1067b901.js","assets/IconInfoCircle-4fb0ab84.js","assets/calculateSpentTime-49d88f56.js","assets/InlineInput-37f0997b.js"])),gt=()=>{const{user:e}=re(t=>t.auth);return Re("Dashboard"),a(O,{children:n(k,{pb:5,children:[n(k.Col,{className:"space-y-1",md:8,lg:8,sm:"auto",children:[a(Ve,{}),a(Ge,{})]}),a(k.Col,{lg:4,md:4,sm:"auto",children:a(Me,{})}),(e==null?void 0:e.role)==="trainee"?n(O,{children:[a(k.Col,{md:8,lg:8,sm:"auto",children:a(ht,{})}),a(k.Col,{className:"bg-bl ue-300",md:4,lg:4,sm:"auto",children:a(ut,{})})]}):a(ft,{})]})})},_t=Object.freeze(Object.defineProperty({__proto__:null,default:gt},Symbol.toStringTag,{value:"Module"}));export{G as C,_t as D};
