import{a6 as b,h as T,i as j,j as G,k,o as i,C as B,q as I,p as s,G as n,T as a,X as N,Y as y,a7 as M}from"./index-34c9220a.js";import{I as Q}from"./IconMessage-6a258b3a.js";const _=({toggle:z,setViewId:A})=>{const v=b(),{taskOnNotif:o}=T(e=>e.notif),{data:d}=j(),{data:t}=G(),[C]=k(),c=d==null?void 0:d.filter(e=>e.status==="completed"),w=e=>{z(),A(e._id),v(M()),(t==null?void 0:t.some(r=>r.task===o||r.task===e.taskname))&&C({task:e.taskname})};return i("div",{className:"space-y-3",children:[c==null?void 0:c.map(e=>{var r,m,h,p,g,x,f;const l=t==null?void 0:t.filter(u=>u.task===e.taskname&&u.type==="comment");return i(B,{className:`cursor-pointer hover:shadow-xl rounded-md shadow-md transition-all ${e.taskname===o?"animate-recording shadow-xl ":""}`,onClick:()=>w(e),children:[i(I,{justify:"space-between",align:"center",children:[s("div",{className:"bg-indigo-300 w-8 h-1"}),((r=e.comments)==null?void 0:r.length)??!1?i(n,{spacing:6,children:[s(Q,{size:17,className:"text-gray-500"}),s(a,{fz:"xs",c:"dimmed",children:(m=e.comments)==null?void 0:m.length})]}):null]}),i(N,{pt:15,className:"space-y-1",children:[s(a,{fw:"bold",c:"dark",fz:"sm",children:e.taskname}),s(y,{variant:"filled",color:"green",size:"sm",children:"Completed"}),((h=e.timeline)==null?void 0:h.revisions.length)!==0&&i(n,{className:"text-gray-500",spacing:10,children:[s(a,{size:"xs",children:"Revisions"}),i(y,{size:"sm",color:"red",variant:"light",className:"lowercase",children:["x",(p=e.timeline)==null?void 0:p.revisions.length]})]}),i(N,{children:[i(n,{className:"text-gray-500",fz:"xs",spacing:8,children:[s(a,{children:"Ticket:"}),s(a,{children:e.ticketno})]}),i(n,{className:"text-gray-500",fz:"xs",spacing:8,children:[s(a,{children:"Added:"}),s(a,{children:(g=e.timeline)==null?void 0:g.createdAt})]}),i(n,{className:"text-gray-500",fz:"xs",spacing:8,children:[s(a,{children:"Started:"}),s(a,{children:(x=e.timeline)==null?void 0:x.startedAt})]}),i(n,{className:"text-gray-500",fz:"xs",spacing:8,children:[s(a,{children:"Completed:"}),s(a,{children:(f=e.timeline)==null?void 0:f.completedAt})]}),i(n,{className:"text-gray-500",fz:"xs",spacing:8,children:[s(a,{children:"Total spent:"}),s(a,{fw:"bold",children:e.spent})]}),(l==null?void 0:l.length)!==0&&i(a,{className:"text-blue-500 animate-pulse",fz:"xs",children:["+ ",l==null?void 0:l.length," new comment"]})]})]})]},e._id)}),(c==null?void 0:c.length)===0&&s(a,{c:"dimmed",fs:"italic",fz:"xs",className:"tracking-normal",children:"there are no completed tasks!"})]})};export{_ as default};
