import{r as w,l as F,H as L,a1 as J,j as e,M as R,i as s,G as y,T as n,S as H,F as A,q as g,k as K,B as p,a2 as O,a3 as j,a4 as U,m as V,a5 as W,n as X,J as Y,p as Z,a0 as ee,K as h,A as le,a6 as te,C as se}from"./index-24d6de80.js";import{l as ae,E as ne,P as ie}from"./EmptyState-e33e9fa9.js";import{I as D,S as ce}from"./IconInfoCircle-404475d4.js";import{I as re}from"./IconDots-63fcfa75.js";import{I as oe}from"./IconUser-a3b04622.js";const de=({task:c,assign:u,toggle:N})=>{const[x,T]=w.useState(""),{user:a}=F(i=>i.auth),{data:t}=L(a==null?void 0:a.course),[m,{isLoading:v}]=J(),S=async i=>{O(a==null?void 0:a.course,a==null?void 0:a.role),T(i);const f={_id:c._id,name:i,course:a==null?void 0:a.course};await m({task:f,rooms:[a==null?void 0:a.course]}),j("Task successfully assigned","success"),N()};return e(R,{size:"md",opened:u,onClose:N,title:s(y,{spacing:8,children:[e(n,{fz:"sm",className:"text-gray-500 font-semibold",children:"Task:"}),e(n,{fz:"sm",c:"dimmed",children:c.taskname})]}),centered:!0,children:e("div",{className:"space-y-2",children:e(H,{spacing:9,p:8,children:s(A,{children:[e(n,{fz:"sm",fw:"bold",children:"Members"}),t==null?void 0:t.map(i=>s(g,{justify:"space-between",align:"center",children:[s(y,{spacing:10,children:[e(K,{src:i.picture,width:35,radius:"xl",imageProps:{referrerPolicy:"no-referrer"}}),s("div",{className:"-space-y-[2px]",children:[e(n,{size:"sm",children:i.name}),e(n,{c:"dimmed",size:"xs",children:i.email})]})]}),e(p,{size:"xs",variant:"white",onClick:()=>S(i.name),loading:v&&x===i.name,children:"Assign"})]}))]})})})})},xe=({trainee:c,view:u,update:N,setViewId:x})=>{var M;const T=U(),{pathname:a}=T,{user:t}=F(l=>l.auth),{data:m}=V(),[v,{isLoading:S}]=W(),[i,{toggle:f}]=X(),[I,B]=w.useState(1),[E,Q]=w.useState({}),[b,_]=w.useState(""),r=m==null?void 0:m.filter(l=>b?l.status===b:c?c.name===l.assign:l),$=async l=>{await v({_id:l,rooms:[t==null?void 0:t.course]}),j("Task deleted successfully","success")},C=ae.chunk(r,10),k=(M=C[I-1])==null?void 0:M.map(l=>{var P;const z=Y(l==null?void 0:l.createdAt),d=(P=c==null?void 0:c.timesheet)==null?void 0:P.find(G=>G.status==="recording"),q={status:d==null?void 0:d.status,morning:d==null?void 0:d.morning,afternoon:d==null?void 0:d.afternoon},o=Z(q);return s("tr",{children:[e("td",{className:" md:table-cell lg:table-cell pl-3 pt-2",children:s(n,{children:[e("span",{className:"hidden md:flex lg:flex",children:`${z.date} at ${z.time}`}),e("span",{className:"flex md:hidden lg:hidden",children:z.date})]})}),e("td",{className:"hidden md:table-cell lg:table-cell  pt-2",children:e(n,{children:l.taskname})}),e("td",{className:"hidden md:table-cell lg:table-cell  pt-2",children:s(n,{children:[c&&e("span",{children:l.status==="inprogress"?s("span",{children:[o.totalSpent.hours===1?o.totalSpent.hours+"hr":o.totalSpent.hours>1?o.totalSpent.hours+"hrs":o.totalSpent.hours===0&&"",o.totalSpent.minutes===1?o.totalSpent.minutes+"min":o.totalSpent.minutes>1?o.totalSpent.minutes+"mins":o.totalSpent.minutes===0&&""]}):l.spent}),!c&&l.ticketno]})}),a.includes("profile")?"":e("td",{className:"hidden md:table-cell lg:table-cell  pt-2",children:l.assign?e(n,{children:l.assign}):e(ee,{color:"teal",size:"md",variant:"dot",className:"text-gray-500",children:"Available Task"})}),e("td",{className:" md:table-cell lg:table-cell  pt-2",children:s(g,{className:"rounded bg-gray-50 max-w-max px-2 py-1 gap-2",align:"center",children:[e("div",{children:e("div",{className:`p-1 ${l.status==="new"?"bg-indigo-300":l.status==="inprogress"?"bg-violet-400":l.status==="completed"?"bg-green-300":l.status==="forqa"?"bg-yellow-300":"bg-red-300"}`})}),e(n,{fw:"bold",className:`text-[11px] ${l.status==="new"?"text-indigo-300":l.status==="inprogress"?"text-violet-400":l.status==="completed"?"text-green-300":l.status==="forqa"?"text-yellow-300":"text-red-300"}`,children:l.status})]})}),e("td",{className:" md:table-cell lg:table-cell  pt-2",children:(t==null?void 0:t.role)==="supervisor"||(t==null?void 0:t.role)==="admin"?e(p,{onClick:()=>{u(),x(l._id)},leftIcon:e(D,{size:16,className:"hidden md:flex lg:flex"}),variant:"white",color:"cyan",size:"xs",children:"View"}):s(h,{shadow:"md",transitionProps:{transition:"rotate-right",duration:150},closeOnItemClick:!0,withArrow:!0,children:[e(h.Target,{children:e(le,{variant:"white",color:"cyan",children:e(re,{size:19})})}),s(h.Dropdown,{className:"flex row-a",children:[e(h.Label,{children:"Manage task"}),s(g,{direction:"column",align:"start",children:[e(h.Item,{p:0,className:"bg-white hover:bg-white",children:e(p,{onClick:()=>{u(),x(l._id)},leftIcon:e(D,{size:16}),variant:"white",color:"dark",size:"xs",children:"View"})}),l.status==="new"&&e(h.Item,{p:0,className:"bg-white hover:bg-white",children:(t==null?void 0:t.role)==="Task manager"||(t==null?void 0:t.role)==="QA Personnel"||a.includes("profile")?e(p,{onClick:()=>{Q(l),f()},leftIcon:e(oe,{size:16}),variant:"white",color:l.assign?"indigo":"cyan",size:"xs",children:l.assign?"Reassign":"Assign"}):""}),(t==null?void 0:t.role)!=="QA Personnel"&&(l==null?void 0:l.status)==="new"&&e(p,{leftIcon:e(te,{size:16}),variant:"white",size:"xs",color:"red",onClick:()=>$(l._id),loading:S,children:"Delete"})]})]})]})})]})});return s(A,{children:[s(se,{className:"bg-opacity-60 rounded-md shadow-md h-[calc(100vh-190px)] mt-4",children:[e("div",{className:"h-[95%] overflow-",children:s("table",{className:"border-collapse border-none w-full",children:[e("thead",{children:s("tr",{children:[e("th",{scope:"col",className:"md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tl-md",children:e(n,{children:"Date Added"})}),e("th",{scope:"col",className:"hidden md:table-cell lg:table-cell  py-3 md:pr-3 lg:pr-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm",children:e(n,{children:"Task Name"})}),e("th",{scope:"col",className:"hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(n,{children:c?"Total spent":"Ticket no."})}),!a.includes("profile")&&e("th",{scope:"col",className:"hidden  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(n,{children:"Assigned to"})}),e("th",{scope:"col",className:"  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(n,{children:"Status"})}),e("th",{scope:"col",className:"md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tr-md",children:e(n,{children:"Action"})})]})}),(r==null?void 0:r.length)===0?s(A,{children:[e(ne,{text:`There are no ${b} tasks`}),";"]}):e("tbody",{className:"text-sm text-gray-600",children:k})]})}),s(g,{justify:"space-between",children:[s(y,{align:"center",children:[e(ce,{size:"xs",value:b,onChange:_,w:150,placeholder:"Filter",data:[{value:"",label:"All tasks"},{value:"new",label:"New"},{value:"inprogress",label:"In-Progress"},{value:"forqa",label:"For-QA"},{value:"failed",label:"Failed"},{value:"completed",label:"Completed"}]}),e(g,{children:s(y,{spacing:3,children:[e(n,{fz:"xs",className:"uppercase font-semibold text-gray-700",children:"Total:"}),s(n,{fz:"xs",children:[r==null?void 0:r.length," task",(r==null?void 0:r.length)>=2&&"s"]})]})})]}),e(ie,{total:C.length,value:I,onChange:B,size:"xs",color:"cyan",withEdges:!0})]})]}),e(de,{task:E,assign:i,toggle:f})]})};export{xe as default};