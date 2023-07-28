import{r as y,u as de,a as Se,R as C,I as ke,b as P,c as Oe,g as ze,d as J,e as $e,f as Ie,h as K,i as he,j as Ee,k as De,l as pe,m as Te,n as Ae,o as n,p as a,T as i,B as I,F as S,C as me,E as je,q as E,G as D,s as ue,t as U,V as Ge,v as Ve,w as ge,M as Re,A as fe,x as Me,S as Fe,y as ee,_ as Le,z as Be,D as $,H as Qe,J as qe,K as Ye}from"./index-34c9220a.js";import{l as He,H as We,I as Je,P as Ke}from"./lodash-fce6eaa4.js";import{I as Ue,G as Xe,S as Ze}from"./GettingData-6ddecfe5.js";import{I as et}from"./InlineInput-981296be.js";const ve=y.createContext(null),tt=ve.Provider,at=()=>y.useContext(ve);var ot=Object.defineProperty,F=Object.getOwnPropertySymbols,ye=Object.prototype.hasOwnProperty,be=Object.prototype.propertyIsEnumerable,te=(e,t,o)=>t in e?ot(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,ae=(e,t)=>{for(var o in t||(t={}))ye.call(t,o)&&te(e,o,t[o]);if(F)for(var o of F(t))be.call(t,o)&&te(e,o,t[o]);return e},rt=(e,t)=>{var o={};for(var r in e)ye.call(e,r)&&t.indexOf(r)<0&&(o[r]=e[r]);if(e!=null&&F)for(var r of F(e))t.indexOf(r)<0&&be.call(e,r)&&(o[r]=e[r]);return o};const lt={size:"sm"},xe=y.forwardRef((e,t)=>{const o=de("CheckboxGroup",lt,e),{children:r,value:l,defaultValue:m,onChange:h,size:p,wrapperProps:g}=o,v=rt(o,["children","value","defaultValue","onChange","size","wrapperProps"]),[c,u]=Se({value:l,defaultValue:m,finalValue:[],onChange:h}),d=f=>{const _=f.currentTarget.value;u(c.includes(_)?c.filter(T=>T!==_):[...c,_])};return C.createElement(tt,{value:{value:c,onChange:d,size:p}},C.createElement(ke.Wrapper,ae(ae({labelElement:"div",size:p,__staticSelector:"CheckboxGroup",ref:t},g),v),r))});xe.displayName="@mantine/core/CheckboxGroup";var st=Object.defineProperty,L=Object.getOwnPropertySymbols,we=Object.prototype.hasOwnProperty,_e=Object.prototype.propertyIsEnumerable,oe=(e,t,o)=>t in e?st(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,B=(e,t)=>{for(var o in t||(t={}))we.call(t,o)&&oe(e,o,t[o]);if(L)for(var o of L(t))_e.call(t,o)&&oe(e,o,t[o]);return e},Ce=(e,t)=>{var o={};for(var r in e)we.call(e,r)&&t.indexOf(r)<0&&(o[r]=e[r]);if(e!=null&&L)for(var r of L(e))t.indexOf(r)<0&&_e.call(e,r)&&(o[r]=e[r]);return o};function nt(e){const t=e,{width:o,height:r,style:l}=t,m=Ce(t,["width","height","style"]);return C.createElement("svg",B({viewBox:"0 0 10 7",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:B({width:o,height:r},l)},m),C.createElement("path",{d:"M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"}))}function it(e){var t=e,{indeterminate:o}=t,r=Ce(t,["indeterminate"]);return o?C.createElement("svg",B({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 32 6"},r),C.createElement("rect",{width:"32",height:"6",fill:"currentColor",rx:"3"})):C.createElement(nt,B({},r))}var ct=Object.defineProperty,dt=Object.defineProperties,ht=Object.getOwnPropertyDescriptors,re=Object.getOwnPropertySymbols,pt=Object.prototype.hasOwnProperty,mt=Object.prototype.propertyIsEnumerable,le=(e,t,o)=>t in e?ct(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,se=(e,t)=>{for(var o in t||(t={}))pt.call(t,o)&&le(e,o,t[o]);if(re)for(var o of re(t))mt.call(t,o)&&le(e,o,t[o]);return e},ne=(e,t)=>dt(e,ht(t));const ut={xs:P(16),sm:P(20),md:P(24),lg:P(30),xl:P(36)};var gt=Oe((e,{radius:t,color:o,transitionDuration:r,labelPosition:l,error:m,indeterminate:h},{size:p})=>{const g=ze({size:p,sizes:ut}),v=e.fn.variant({variant:"filled",color:o});return{icon:ne(se({},e.fn.cover()),{ref:J("icon"),color:h?"inherit":e.white,transform:h?"none":`translateY(${P(5)}) scale(0.5)`,opacity:h?1:0,transitionProperty:"opacity, transform",transitionTimingFunction:"ease",transitionDuration:`${r}ms`,pointerEvents:"none",width:"60%",position:"absolute",zIndex:1,margin:"auto","@media (prefers-reduced-motion)":{transitionDuration:e.respectReducedMotion?"0ms":void 0}}),inner:{position:"relative",width:g,height:g,order:l==="left"?2:1},input:ne(se({},e.fn.focusStyles()),{appearance:"none",backgroundColor:e.colorScheme==="dark"?e.colors.dark[6]:e.white,border:`${P(1)} solid ${m?e.fn.variant({variant:"filled",color:"red"}).background:e.colorScheme==="dark"?e.colors.dark[4]:e.colors.gray[4]}`,width:g,height:g,borderRadius:e.fn.radius(t),padding:0,display:"block",margin:0,transition:`border-color ${r}ms ease, background-color ${r}ms ease`,cursor:e.cursorType,"&:checked":{backgroundColor:v.background,borderColor:v.background,[`& + .${J("icon")}`]:{opacity:1,color:e.white,transform:"translateY(0) scale(1)"}},"&:disabled":{backgroundColor:e.colorScheme==="dark"?e.colors.dark[4]:e.colors.gray[2],borderColor:e.colorScheme==="dark"?e.colors.dark[6]:e.colors.gray[3],cursor:"not-allowed",pointerEvents:"none",[`& + .${J("icon")}`]:{color:e.colorScheme==="dark"?e.colors.dark[6]:e.colors.gray[5]}}})}});const ft=gt;var vt=Object.defineProperty,Q=Object.getOwnPropertySymbols,Ne=Object.prototype.hasOwnProperty,Pe=Object.prototype.propertyIsEnumerable,ie=(e,t,o)=>t in e?vt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,M=(e,t)=>{for(var o in t||(t={}))Ne.call(t,o)&&ie(e,o,t[o]);if(Q)for(var o of Q(t))Pe.call(t,o)&&ie(e,o,t[o]);return e},yt=(e,t)=>{var o={};for(var r in e)Ne.call(e,r)&&t.indexOf(r)<0&&(o[r]=e[r]);if(e!=null&&Q)for(var r of Q(e))t.indexOf(r)<0&&Pe.call(e,r)&&(o[r]=e[r]);return o};const bt={size:"sm",transitionDuration:100,icon:it,labelPosition:"right"},X=y.forwardRef((e,t)=>{const o=de("Checkbox",bt,e),{className:r,style:l,sx:m,checked:h,disabled:p,color:g,label:v,indeterminate:c,id:u,size:d,radius:f,wrapperProps:_,children:T,classNames:b,styles:j,transitionDuration:q,icon:G,unstyled:k,labelPosition:x,description:Y,error:V,variant:O}=o,w=yt(o,["className","style","sx","checked","disabled","color","label","indeterminate","id","size","radius","wrapperProps","children","classNames","styles","transitionDuration","icon","unstyled","labelPosition","description","error","variant"]),N=at(),R=$e(u),{systemStyles:H,rest:A}=Ie(w),{classes:z}=ft({radius:f,color:g,transitionDuration:q,labelPosition:x,error:!!V,indeterminate:c},{name:"Checkbox",classNames:b,styles:j,unstyled:k,variant:O,size:(N==null?void 0:N.size)||d}),s=N?{checked:N.value.includes(A.value),onChange:N.onChange}:{};return C.createElement(et,M(M({className:r,sx:m,style:l,id:R,size:(N==null?void 0:N.size)||d,labelPosition:x,label:v,description:Y,error:V,disabled:p,__staticSelector:"Checkbox",classNames:b,styles:j,unstyled:k,"data-checked":s.checked||void 0,variant:O},H),_),C.createElement("div",{className:z.inner},C.createElement("input",M(M({id:R,ref:t,type:"checkbox",className:z.input,checked:h,disabled:p},A),s)),C.createElement(G,{indeterminate:c,className:z.icon})))});X.displayName="@mantine/core/Checkbox";X.Group=xe;const xt=()=>{var A,z;const{user:e}=K(s=>s.auth),{data:t,refetch:o,isLoading:r,isFetching:l}=he(),{taskOnNotif:m}=K(s=>s.notif),{data:h}=Ee(),[p]=De(),[g,{toggle:v}]=pe(),[c,u]=y.useState(1),[d,f]=y.useState(""),[_,T]=y.useState(null),[b,j]=y.useState(""),[q,G]=y.useState(!1),{data:k}=Te(),x=(A=k==null?void 0:k.timesheet)==null?void 0:A.find(s=>s.status==="recording"),Y={status:x==null?void 0:x.status,morning:x==null?void 0:x.morning,afternoon:x==null?void 0:x.afternoon},{totalSpentString:V}=Ae(Y),O=t==null?void 0:t.filter(s=>{var W;return(W=s.taskname)==null?void 0:W.toLowerCase().includes(d.toLowerCase())}),w=O==null?void 0:O.filter(s=>b?s.status===b:(e==null?void 0:e.role)==="trainee"?(e==null?void 0:e.name)===s.assign:s),N=He.chunk(w,5);y.useEffect(()=>{b&&o().then(()=>G(!1))},[b]);const R=s=>{v(),T(s._id),(h==null?void 0:h.find(Z=>Z.task===m||Z.task===s.taskname))&&p({task:s.taskname})},H=(z=N[c-1])==null?void 0:z.map(s=>n("tr",{children:[a("td",{className:" md:table-cell lg:table-cell pl-3",children:a(i,{children:a(We,{highlightColor:"cyan",highlight:d,children:s.taskname})})}),a("td",{className:"hidden md:table-cell lg:table-cell",children:a(i,{children:s.ticketno})}),a("td",{className:"px-5 py-2  md:table-cell lg:table-cell ",children:a(i,{children:s.spent!==""?s.spent:a("span",{children:V})})}),a("td",{className:" py-2 hidden md:table-cell lg:table-cell",children:n("div",{className:"flex bg-gray-100  rounded items-center max-w-max px-2 py-1 gap-2",children:[a("div",{className:`w-2 h-2 ${s.status==="new"?"bg-indigo-300":s.status==="inprogress"?"bg-violet-400":s.status==="completed"?"bg-green-300":s.status==="forqa"?"bg-yellow-300":"bg-red-300"}`}),a(i,{fw:"bold",className:`text-[10px] ${s.status==="new"?"text-indigo-300":s.status==="inprogress"?"text-violet-400":s.status==="completed"?"text-green-300":s.status==="forqa"?"text-yellow-300":"text-red-300"}`,children:s.status})]})}),a("td",{className:"dark:text-gray-400   md:table-cell lg:table-cell",children:a(I,{onClick:()=>R(s),leftIcon:a(Ue,{size:16}),variant:"white",color:"cyan",size:"xs",children:"View"})})]},s._id));return n(S,{children:[n(me,{className:"bg-opacity-60 rounded-md shadow-md h-[calc(100vh-100px)] lg:h-[calc(100vh-365px)] md:h-[calc(100vh-365px)]",children:[a("div",{className:"h-[95%] lg:h-[90%] md:h-[90%]",children:n("table",{className:"border-collapse border-none w-full",children:[a("thead",{children:n("tr",{children:[a("th",{scope:"col",className:"md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tl-md",children:a(i,{children:"Task Name"})}),a("th",{scope:"col",className:"hidden  md:table-cell lg:table-cell rounded-tr-md md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm",children:a(i,{children:"Ticket No."})}),a("th",{scope:"col",className:" md:table-cell lg:table-cell px-5 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:a(i,{children:"Total spent"})}),a("th",{scope:"col",className:"hidden  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:a(i,{children:"Status"})}),a("th",{scope:"col",className:"  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:a(i,{children:"Action"})})]})}),q&&b?a(Xe,{}):(w==null?void 0:w.length)===0?a(S,{children:a(je,{text:d?"Task not found":`There are no ${b} tasks`})}):a("tbody",{className:"text-xs text-gray-600",children:H})]})}),n(E,{justify:"space-between",className:"overflow-hidden",children:[n(D,{align:"center",spacing:10,children:[a(ue,{className:"hidden lg:flex md:flex",rightSection:d?a(U,{onClick:()=>f(""),size:14,className:"hover:cursor-pointer text-gray-500 hover:text-gray-800 transition-all"}):a(Je,{size:14,className:"text-gray-500"}),size:"xs",placeholder:"Search",value:d,onChange:s=>f(s.currentTarget.value)}),a(Ze,{size:"xs",value:b,onChange:s=>{G(!0),j(s)},w:150,placeholder:"Filter",data:[{value:"",label:"All tasks"},{value:"new",label:"New"},{value:"inprogress",label:"In-Progress"},{value:"forqa",label:"For-QA"},{value:"failed",label:"Failed"},{value:"completed",label:"Completed"}]})]}),n(D,{children:[n(D,{spacing:3,className:"hidden",children:[a(i,{fz:"xs",className:"uppercase font-semibold text-gray-700",children:"Total:"}),n(i,{fz:"xs",children:[w==null?void 0:w.length," task",(w==null?void 0:w.length)>=2&&"s"]})]}),a(Ke,{total:N.length,value:c,onChange:u,size:"xs",color:"cyan"})]})]})]}),a(Ge,{tasks:t,viewId:_,view:g,toggleView:v})]})},ce="/assets/emptytodo-69eb0fba.png",wt=({add:e,toggle:t,currentTask:o})=>{const r=Ve("(max-width: 50em)"),[l,m]=y.useState({isDone:!1,todo:""}),[h,p]=y.useState([]),[g,{isLoading:v}]=ge(),c=()=>{p([...h,l]),m({...l,todo:""})},u=async()=>{const d=[...o.todos,...h];await g({_id:o._id,todos:d}),t(),m({...l,todo:""}),p([]),Me("New todo added to your in-progress task","success")};return n(Re,{size:"sm",opened:e,fullScreen:r,onClose:()=>{t(),m({...l,todo:""}),p([])},title:a(i,{c:"dark",fz:"sm",children:"Add todo's to your current task!"}),children:[n("div",{className:"space-y-1",children:[n(D,{spacing:10,pb:3,children:[a(i,{fz:12,className:"text-gray-500 font-semibold",children:"Current Task:"}),a(i,{fz:12,c:"dimmed",children:o==null?void 0:o.taskname})]}),n(E,{gap:8,children:[a(ue,{autoComplete:"off",placeholder:"add todo",name:"taskname",value:l.todo,onChange:d=>m({...l,todo:d.target.value}),className:"w-full"}),a(I,{onClick:c,size:"sm",disabled:l.todo==="",children:"Add"})]})]}),a("div",{className:"space-y-2 py-3",children:h.map((d,f)=>a("div",{children:n("div",{className:"bg-slate-50 opacity-70 px-3 py-2 rounded-md relative",children:[a(i,{c:"dark",fz:"sm",className:"w-[80%]",py:4,children:d.todo}),a("div",{className:"absolute top-2 right-3",children:a(fe,{color:"red",variant:"light",radius:"xl",onClick:()=>p(_=>_.filter((T,b)=>b!==f)),children:a(U,{size:16})})})]})},f))}),h.length!==0&&n(E,{children:[a(I,{variant:"white",color:"gray",mt:"md",onClick:()=>{t(),m({...l,todo:""}),p([])},fullWidth:!0,children:"Cancel"}),a(I,{mt:"md",onClick:u,fullWidth:!0,color:"cyan",loading:v,children:"Save"})]})]})},_t=()=>{var p,g,v;const{data:e}=he(),[t]=ge(),[o,{toggle:r}]=pe(),l=e==null?void 0:e.find(c=>c.status==="inprogress"),m=async c=>{var u;await t({_id:l==null?void 0:l._id,todos:(u=l==null?void 0:l.todos)==null?void 0:u.filter((d,f)=>f!==c)})},h=async c=>{var d;const u=(d=l==null?void 0:l.todos)==null?void 0:d.map((f,_)=>_===c?{...f,isDone:!f.isDone}:f);await t({_id:l==null?void 0:l._id,todos:u})};return n(S,{children:[a(me,{className:"rounded-md shadow-md h-[calc(100vh-365px)]",children:l?a(S,{children:((p=l==null?void 0:l.todos)==null?void 0:p.length)??!1?n(S,{children:[n(D,{spacing:10,pb:5,children:[a(i,{fz:"sm",className:"text-gray-500 font-semibold",children:"Current Task:"}),a(i,{fz:"sm",c:"dimmed",children:l==null?void 0:l.taskname})]}),n(E,{align:"center",justify:"space-between",pb:3,children:[n(i,{fz:"xs",className:"text-gray-500 font-semibold",children:["You've got ",(g=l==null?void 0:l.todos)==null?void 0:g.length," todos for this task"]}),a(I,{size:"xs",variant:"white",onClick:r,children:a(i,{children:"+ Add more"})})]}),a(Fe.Autosize,{mah:175,scrollbarSize:8,children:a("div",{className:"space-y-3",children:(v=l==null?void 0:l.todos)==null?void 0:v.slice().reverse().map((c,u)=>n("div",{className:"bg-slate-50 opacity-70 px-3 py-2 rounded-md relative",children:[a(i,{c:"dark",fz:"xs",className:"w-[80%]",py:4,children:a("span",{className:c.isDone?"line-through italic":"",children:c.todo})}),a("div",{className:"absolute top-2 right-3",children:n(D,{spacing:6,children:[a(X,{checked:c.isDone,size:"xs",color:"cyan",onChange:()=>h(u)}),a(fe,{color:"red",variant:"light",radius:"xl",onClick:()=>m(u),children:a(U,{size:15})})]})})]},u))})})]}):n(E,{direction:"column",align:"center",gap:10,children:[a(ee,{src:ce,width:130}),a(i,{fw:"bold",c:"dark",children:"Don't have any new todo?"}),a(I,{size:"sm",color:"cyan",onClick:r,children:"Add todos"})]})}):n(E,{direction:"column",align:"center",gap:10,children:[a(ee,{src:ce,width:130}),n("div",{className:"text-center",children:[a(i,{fw:"bold",c:"dark",children:"You don't have inprogress task"}),a(i,{fz:"xs",c:"dimmed",children:"You can only add todos if you have inprogress task"})]})]})}),a(wt,{add:o,toggle:r,currentTask:l})]})},Ct=y.lazy(()=>Le(()=>import("./MembersTableCard-96f983f7.js"),["assets/MembersTableCard-96f983f7.js","assets/index-34c9220a.js","assets/index-f178dbff.css","assets/lodash-fce6eaa4.js","assets/GettingData-6ddecfe5.js","assets/IconDots-0fd6a487.js","assets/IconUser-82445f8d.js","assets/InlineInput-981296be.js"])),Nt=()=>{const{user:e}=K(t=>t.auth);return Be("Dashboard"),a(S,{children:n($,{pb:5,children:[n($.Col,{className:"space-y-1",md:8,lg:8,sm:"auto",children:[a(Qe,{}),a(qe,{})]}),a($.Col,{lg:4,md:4,sm:"auto",children:a(Ye,{})}),(e==null?void 0:e.role)==="trainee"?n(S,{children:[a($.Col,{md:8,lg:8,sm:"auto",children:a(xt,{})}),a($.Col,{className:"bg-bl ue-300",md:4,lg:4,sm:"auto",children:a(_t,{})})]}):a($.Col,{span:"auto",children:a(Ct,{})})]})})},zt=Object.freeze(Object.defineProperty({__proto__:null,default:Nt},Symbol.toStringTag,{value:"Module"}));export{X as C,zt as D};
