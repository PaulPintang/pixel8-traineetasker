import{r as h,h as M,L as ne,a8 as ie,a9 as ce,p as e,M as oe,o as a,G as d,T as s,Q as R,F as D,q as P,y as re,B as k,x as U,aa as de,i as he,j as ge,k as me,ab as pe,l as fe,a6 as ue,n as xe,Y as be,P as p,A as ye,ac as we,C as Ne,E as Te,s as ve,t as ze,a7 as Ae}from"./index-38fe47c3.js";import{l as Ie,H as Ce,I as Se,P as Me}from"./lodash-6da66a99.js";import{I as H,G as De,S as Pe}from"./GettingData-05ce6739.js";import{I as O}from"./IconMessage-9820196f.js";import{I as ke}from"./IconDots-fd7271c4.js";import{I as Ge}from"./IconUser-c97a0608.js";const Qe=({task:n,assign:T,toggle:y})=>{const[v,f]=h.useState(""),{user:t}=M(i=>i.auth),{data:o}=ne(t==null?void 0:t.course),[z,{isLoading:A}]=ie(),[w]=ce(),u=async i=>{f(i);const x={_id:n._id,name:i,course:t==null?void 0:t.course};await z({task:x,rooms:[t==null?void 0:t.course]});const I={task:n==null?void 0:n.taskname,type:"task",to:[i],from:{name:t==null?void 0:t.name,picture:t==null?void 0:t.picture},content:`${t==null?void 0:t.name} assigned new task for you`,course:t==null?void 0:t.course};await w({notification:I,rooms:[t==null?void 0:t.course]}),U("Task successfully assigned","success"),y()};return e(oe,{size:"md",opened:T,onClose:y,title:a(d,{spacing:8,children:[e(s,{fz:"sm",className:"text-gray-500 font-semibold",children:"Task:"}),e(s,{fz:"sm",c:"dimmed",children:n.taskname})]}),centered:!0,children:e("div",{className:"space-y-2",children:e(R,{spacing:9,p:8,children:a(D,{children:[e(s,{fz:"sm",fw:"bold",children:"Members"}),o==null?void 0:o.map(i=>a(P,{justify:"space-between",align:"center",children:[a(d,{spacing:10,children:[e(re,{src:i.picture,width:35,radius:"xl",imageProps:{referrerPolicy:"no-referrer"}}),a("div",{className:"-space-y-[2px]",children:[e(s,{size:"sm",children:i.name}),e(s,{c:"dimmed",size:"xs",children:i.email})]})]}),e(k,{size:"xs",variant:"white",onClick:()=>u(i.name),loading:A&&v===i.name,disabled:n.assign===i.name,children:"Assign"})]},i._id))]})})})})},Be=({trainee:n,view:T,setViewId:y})=>{var _;const v=de(),{pathname:f}=v,{user:t}=M(l=>l.auth),[o,z]=h.useState(""),[A,w]=h.useState(!1),{data:u,refetch:i}=he(),{data:x}=ge(),[I]=me(),[X,{isLoading:Y}]=pe(),[J,{toggle:G}]=fe(),[Q,K]=h.useState(1),[W,Z]=h.useState({}),[b,F]=h.useState(""),ee=ue(),{taskOnNotif:le}=M(l=>l.notif);h.useEffect(()=>{o&&i().then(()=>w(!1))},[o]);const C=u==null?void 0:u.filter(l=>{var c;return(c=l.taskname)==null?void 0:c.toLowerCase().includes(b.toLowerCase())}),r=C==null?void 0:C.filter(l=>o?l.status===o:n?n.name===l.assign:l),te=async l=>{await X({_id:l,rooms:[t==null?void 0:t.course]}),U("Task deleted successfully","success")},g=x==null?void 0:x.filter(l=>l.to.includes(t==null?void 0:t.role)),L=l=>{T(),y(l._id),ee(Ae()),(g==null?void 0:g.some(S=>S.task===l.taskname))&&I({task:l.taskname})},E=Ie.chunk(r,10),ae=(_=E[Q-1])==null?void 0:_.slice().sort((l,c)=>c.timeline.createdAt.localeCompare(l.timeline.createdAt)).map(l=>{var j,q,B,$,V;const c=(j=n==null?void 0:n.timesheet)==null?void 0:j.find(N=>N.status==="recording"),S={status:c==null?void 0:c.status,morning:c==null?void 0:c.morning,afternoon:c==null?void 0:c.afternoon},{totalSpentString:se}=xe(S),m=g==null?void 0:g.filter(N=>N.task===l.taskname&&N.type==="comment");return a("tr",{children:[e("td",{className:" md:table-cell lg:table-cell pl-3 pt-2",children:a(s,{children:[e("span",{className:"hidden md:flex lg:flex",children:(q=l.timeline)==null?void 0:q.createdAt}),e("span",{className:"flex md:hidden lg:hidden",children:(B=l.timeline)==null?void 0:B.createdAt})]})}),e("td",{className:"hidden md:table-cell lg:table-cell  pt-2",children:e(s,{children:e(Ce,{highlightColor:"cyan",highlight:b,children:l.taskname})})}),e("td",{className:"hidden md:table-cell lg:table-cell  pt-2",children:a(s,{children:[n&&e("span",{children:l.status==="inprogress"&&l.spent===""?e("span",{children:se}):l.spent}),!n&&l.ticketno]})}),f.includes("profile")?"":e("td",{className:"hidden md:table-cell lg:table-cell  pt-2",children:l.assign?e(s,{children:l.assign}):e(be,{color:"teal",size:"md",variant:"dot",className:"text-gray-500",children:"Available Task"})}),e("td",{className:" md:table-cell lg:table-cell  pt-2",children:a(d,{children:[a(P,{className:`rounded bg-gray-50 max-w-max px-2 py-1 gap-2 ${l.taskname===le?"animate-searching":""}`,align:"center",children:[e("div",{children:e("div",{className:`p-1 ${l.status==="new"?"bg-indigo-300":l.status==="inprogress"?"bg-violet-400":l.status==="completed"?"bg-green-300":l.status==="forqa"?"bg-yellow-300":"bg-red-300"}`})}),e(s,{fw:"bold",className:`text-[11px] ${l.status==="new"?"text-indigo-300":l.status==="inprogress"?"text-violet-400":l.status==="completed"?"text-green-300":l.status==="forqa"?"text-yellow-300":"text-red-300"}`,children:l.status})]}),(m==null?void 0:m.length)??!1?a(d,{spacing:6,className:"hidden lg:flex md:flex",children:[e(O,{size:17,className:"text-blue-500"}),a(s,{fz:"xs",c:"blue",className:"animate-pulse",children:["+ ",m==null?void 0:m.length," new"]})]}):null]})}),e("td",{className:" md:table-cell lg:table-cell  pt-2",children:(t==null?void 0:t.role)==="supervisor"||(t==null?void 0:t.role)==="admin"?e(k,{onClick:()=>L(l),leftIcon:e(H,{size:16,className:"hidden md:flex lg:flex"}),variant:"white",color:"cyan",size:"xs",children:"View"}):a(p,{shadow:"md",transitionProps:{transition:"rotate-right",duration:150},closeOnItemClick:!0,withArrow:!0,position:"bottom-start",children:[e(p.Target,{children:a(d,{children:[e(ye,{variant:"white",color:"cyan",children:e(ke,{size:19})}),(($=l.comments)==null?void 0:$.length)??!1?a(d,{spacing:6,className:"hidden lg:flex md:flex",children:[e(O,{size:17,className:"text-gray-500"}),e(s,{fz:"xs",c:"dimmed",children:(V=l.comments)==null?void 0:V.length})]}):null]})}),a(p.Dropdown,{children:[e(p.Label,{children:"Manage task"}),a(R,{spacing:9,py:5,align:"center",className:"w-full",children:[e(p.Item,{className:"bg-white hover:bg-white",py:0,onClick:()=>L(l),icon:e(H,{size:16}),children:e(s,{fz:"xs",fw:"bold",c:"dark",children:"View"})}),l.status==="new"&&((t==null?void 0:t.role)==="Task manager"||(t==null?void 0:t.role)==="QA Personnel"||f.includes("profile")?e(p.Item,{className:"bg-white hover:bg-white",py:0,onClick:()=>{Z(l),G()},icon:e(Ge,{size:16}),color:l.assign?"indigo":"cyan",children:e(s,{fz:"xs",fw:"bold",children:l.assign?"Reassign":"Assign"})}):null),(t==null?void 0:t.role)!=="QA Personnel"&&(l==null?void 0:l.status)==="new"&&e(k,{leftIcon:e(we,{size:16}),variant:"white",size:"xs",color:"red",onClick:()=>{te(l._id)},loading:Y,compact:!0,mr:5,children:"Delete"})]})]})]})})]},l._id)});return a(D,{children:[a(Ne,{className:"bg-opacity-60 rounded-md shadow-md h-[calc(100vh-170px)] mt-4",children:[e("div",{className:"h-[94%] overflow-",children:a("table",{className:"border-collapse border-none w-full",children:[e("thead",{children:a("tr",{children:[e("th",{scope:"col",className:"md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tl-md",children:e(s,{children:"Date Added"})}),e("th",{scope:"col",className:"hidden md:table-cell lg:table-cell  py-3 md:pr-3 lg:pr-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm",children:e(s,{children:"Task Name"})}),e("th",{scope:"col",className:"hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(s,{children:n?"Total spent":"Ticket no."})}),!f.includes("profile")&&e("th",{scope:"col",className:"hidden  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(s,{children:"Assigned to"})}),e("th",{scope:"col",className:"  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(s,{children:"Status"})}),e("th",{scope:"col",className:"md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tr-md",children:e(s,{children:"Action"})})]})}),A&&o?e(De,{}):e(D,{children:(r==null?void 0:r.length)===0?e(Te,{text:b===""?`There are no ${o} tasks`:"Task not found"}):e("tbody",{className:"text-sm text-gray-600",children:ae})})]})}),a(P,{justify:"space-between",children:[a(d,{align:"center",spacing:10,children:[e(ve,{rightSection:b?e(ze,{onClick:()=>F(""),size:14,className:"hover:cursor-pointer text-gray-500 hover:text-gray-800 transition-all"}):e(Se,{size:14,className:"text-gray-500"}),size:"xs",placeholder:"Search",value:b,onChange:l=>F(l.currentTarget.value)}),e(Pe,{size:"xs",value:o,onChange:l=>{w(!0),z(l)},w:150,placeholder:"Filter",data:[{value:"",label:"All tasks"},{value:"new",label:"New"},{value:"inprogress",label:"In-Progress"},{value:"forqa",label:"For-QA"},{value:"failed",label:"Failed"},{value:"completed",label:"Completed"}]})]}),a(d,{children:[a(d,{spacing:3,children:[e(s,{fz:"xs",className:"uppercase font-semibold text-gray-700",children:"Total:"}),a(s,{fz:"xs",children:[r==null?void 0:r.length," task",(r==null?void 0:r.length)>=2&&"s"]})]}),e(Me,{total:E.length,value:Q,onChange:K,size:"xs",color:"cyan",withEdges:!0})]})]})]}),e(Qe,{task:W,assign:J,toggle:G})]})};export{Be as default};