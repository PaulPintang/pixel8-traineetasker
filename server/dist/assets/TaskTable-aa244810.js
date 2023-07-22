import{r as h,h as L,J as O,a7 as V,n as e,M as X,m as a,G as u,T as s,N as _,F as z,o as A,w as Y,B as C,Y as W,v as E,a8 as Z,i as ee,a9 as le,j as te,K as ae,l as se,U as ne,L as g,A as ie,aa as ce,C as re,E as oe,p as de,q as he}from"./index-6ca8cd02.js";import{l as ge,H as me,I as pe,P as xe}from"./lodash-d51c97e4.js";import{I as G,G as ue,S as fe}from"./GettingData-9baf87a9.js";import{I as be}from"./IconDots-14228fb5.js";import{I as ye}from"./IconUser-4bbd1270.js";const we=({task:i,assign:f,toggle:m})=>{const[y,p]=h.useState(""),{user:t}=L(n=>n.auth),{data:c}=O(t==null?void 0:t.course),[w,{isLoading:N}]=V(),b=async n=>{W(t==null?void 0:t.course,t==null?void 0:t.role),p(n);const T={_id:i._id,name:n,course:t==null?void 0:t.course};await w({task:T,rooms:[t==null?void 0:t.course]}),E("Task successfully assigned","success"),m()};return e(X,{size:"md",opened:f,onClose:m,title:a(u,{spacing:8,children:[e(s,{fz:"sm",className:"text-gray-500 font-semibold",children:"Task:"}),e(s,{fz:"sm",c:"dimmed",children:i.taskname})]}),centered:!0,children:e("div",{className:"space-y-2",children:e(_,{spacing:9,p:8,children:a(z,{children:[e(s,{fz:"sm",fw:"bold",children:"Members"}),c==null?void 0:c.map(n=>a(A,{justify:"space-between",align:"center",children:[a(u,{spacing:10,children:[e(Y,{src:n.picture,width:35,radius:"xl",imageProps:{referrerPolicy:"no-referrer"}}),a("div",{className:"-space-y-[2px]",children:[e(s,{size:"sm",children:n.name}),e(s,{c:"dimmed",size:"xs",children:n.email})]})]}),e(C,{size:"xs",variant:"white",onClick:()=>b(n.name),loading:N&&y===n.name,disabled:i.assign===n.name,children:"Assign"})]},n._id))]})})})})},Ie=({trainee:i,view:f,setViewId:m})=>{var P;const y=Z(),{pathname:p}=y,{user:t}=L(l=>l.auth),[c,w]=h.useState(""),[N,b]=h.useState(!1),{data:n,refetch:T}=ee(),[Q,{isLoading:j}]=le(),[q,{toggle:I}]=te(),[S,B]=h.useState(1),[$,k]=h.useState({}),[x,D]=h.useState("");h.useEffect(()=>{c&&T().then(()=>b(!1))},[c]);const v=n==null?void 0:n.filter(l=>{var d;return(d=l.taskname)==null?void 0:d.toLowerCase().includes(x.toLowerCase())}),r=v==null?void 0:v.filter(l=>c?l.status===c:i?i.name===l.assign:l),H=async l=>{await Q({_id:l,rooms:[t==null?void 0:t.course]}),E("Task deleted successfully","success")},M=ge.chunk(r,10),J=(P=M[S-1])==null?void 0:P.slice().sort((l,d)=>d.createdAt.localeCompare(l.createdAt)).map(l=>{var F;const d=ae(l==null?void 0:l.createdAt),o=(F=i==null?void 0:i.timesheet)==null?void 0:F.find(K=>K.status==="recording"),R={status:o==null?void 0:o.status,morning:o==null?void 0:o.morning,afternoon:o==null?void 0:o.afternoon},{spent:Ne,totalSpentString:U}=se(R);return a("tr",{children:[e("td",{className:" md:table-cell lg:table-cell pl-3 pt-2",children:a(s,{children:[e("span",{className:"hidden md:flex lg:flex",children:`${d.date} at ${d.time}`}),e("span",{className:"flex md:hidden lg:hidden",children:d.date})]})}),e("td",{className:"hidden md:table-cell lg:table-cell  pt-2",children:e(s,{children:e(me,{highlightColor:"cyan",highlight:x,children:l.taskname})})}),e("td",{className:"hidden md:table-cell lg:table-cell  pt-2",children:a(s,{children:[i&&e("span",{children:l.status==="inprogress"&&l.spent===""?e("span",{children:U}):l.spent}),!i&&l.ticketno]})}),p.includes("profile")?"":e("td",{className:"hidden md:table-cell lg:table-cell  pt-2",children:l.assign?e(s,{children:l.assign}):e(ne,{color:"teal",size:"md",variant:"dot",className:"text-gray-500",children:"Available Task"})}),e("td",{className:" md:table-cell lg:table-cell  pt-2",children:a(A,{className:"rounded bg-gray-50 max-w-max px-2 py-1 gap-2",align:"center",children:[e("div",{children:e("div",{className:`p-1 ${l.status==="new"?"bg-indigo-300":l.status==="inprogress"?"bg-violet-400":l.status==="completed"?"bg-green-300":l.status==="forqa"?"bg-yellow-300":"bg-red-300"}`})}),e(s,{fw:"bold",className:`text-[11px] ${l.status==="new"?"text-indigo-300":l.status==="inprogress"?"text-violet-400":l.status==="completed"?"text-green-300":l.status==="forqa"?"text-yellow-300":"text-red-300"}`,children:l.status})]})}),e("td",{className:" md:table-cell lg:table-cell  pt-2",children:(t==null?void 0:t.role)==="supervisor"||(t==null?void 0:t.role)==="admin"?e(C,{onClick:()=>{f(),m(l._id)},leftIcon:e(G,{size:16,className:"hidden md:flex lg:flex"}),variant:"white",color:"cyan",size:"xs",children:"View"}):a(g,{shadow:"md",transitionProps:{transition:"rotate-right",duration:150},closeOnItemClick:!0,withArrow:!0,children:[e(g.Target,{children:e(ie,{variant:"white",color:"cyan",children:e(be,{size:19})})}),a(g.Dropdown,{children:[e(g.Label,{children:"Manage task"}),a(_,{spacing:9,py:5,align:"center",className:"w-full",children:[e(g.Item,{className:"bg-white hover:bg-white",py:0,onClick:()=>{f(),m(l._id)},icon:e(G,{size:16}),children:e(s,{fz:"xs",fw:"bold",c:"dark",children:"View"})}),l.status==="new"&&((t==null?void 0:t.role)==="Task manager"||(t==null?void 0:t.role)==="QA Personnel"||p.includes("profile")?e(g.Item,{className:"bg-white hover:bg-white",py:0,onClick:()=>{k(l),I()},icon:e(ye,{size:16}),color:l.assign?"indigo":"cyan",children:e(s,{fz:"xs",fw:"bold",children:l.assign?"Reassign":"Assign"})}):null),(t==null?void 0:t.role)!=="QA Personnel"&&(l==null?void 0:l.status)==="new"&&e(C,{leftIcon:e(ce,{size:16}),variant:"white",size:"xs",color:"red",onClick:()=>{H(l._id)},loading:j,compact:!0,mr:5,children:"Delete"})]})]})]})})]},l._id)});return a(z,{children:[a(re,{className:"bg-opacity-60 rounded-md shadow-md h-[calc(100vh-170px)] mt-4",children:[e("div",{className:"h-[94%] overflow-",children:a("table",{className:"border-collapse border-none w-full",children:[e("thead",{children:a("tr",{children:[e("th",{scope:"col",className:"md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tl-md",children:e(s,{children:"Date Added"})}),e("th",{scope:"col",className:"hidden md:table-cell lg:table-cell  py-3 md:pr-3 lg:pr-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm",children:e(s,{children:"Task Name"})}),e("th",{scope:"col",className:"hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(s,{children:i?"Total spent":"Ticket no."})}),!p.includes("profile")&&e("th",{scope:"col",className:"hidden  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(s,{children:"Assigned to"})}),e("th",{scope:"col",className:"  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(s,{children:"Status"})}),e("th",{scope:"col",className:"md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tr-md",children:e(s,{children:"Action"})})]})}),N&&c?e(ue,{}):e(z,{children:(r==null?void 0:r.length)===0?e(oe,{text:x===""?`There are no ${c} tasks`:"Task not found"}):e("tbody",{className:"text-sm text-gray-600",children:J})})]})}),a(A,{justify:"space-between",children:[a(u,{align:"center",spacing:10,children:[e(de,{rightSection:x?e(he,{onClick:()=>D(""),size:14,className:"hover:cursor-pointer text-gray-500 hover:text-gray-800 transition-all"}):e(pe,{size:14,className:"text-gray-500"}),size:"xs",placeholder:"Search",value:x,onChange:l=>D(l.currentTarget.value)}),e(fe,{size:"xs",value:c,onChange:l=>{b(!0),w(l)},w:150,placeholder:"Filter",data:[{value:"",label:"All tasks"},{value:"new",label:"New"},{value:"inprogress",label:"In-Progress"},{value:"forqa",label:"For-QA"},{value:"failed",label:"Failed"},{value:"completed",label:"Completed"}]})]}),a(u,{children:[a(u,{spacing:3,children:[e(s,{fz:"xs",className:"uppercase font-semibold text-gray-700",children:"Total:"}),a(s,{fz:"xs",children:[r==null?void 0:r.length," task",(r==null?void 0:r.length)>=2&&"s"]})]}),e(xe,{total:M.length,value:S,onChange:B,size:"xs",color:"cyan",withEdges:!0})]})]})]}),e(we,{task:$,assign:q,toggle:I})]})};export{Ie as default};
