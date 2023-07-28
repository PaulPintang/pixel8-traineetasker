import{h as G,a6 as D,i as F,j as X,k as Y,m as $,n as E,o as a,C as H,q as J,p as n,G as r,T as i,X as j,Y as R,a7 as K}from"./index-34c9220a.js";import{I as L}from"./IconMessage-6a258b3a.js";const W=({toggle:I,setViewId:Q})=>{var p;const{user:d}=G(e=>e.auth),k=D(),{data:m}=F(),{data:l}=X(),[B]=Y(),{taskOnNotif:g}=G(e=>e.notif),c=m==null?void 0:m.filter(e=>e.status==="inprogress"),{data:h}=$(void 0,{skip:(d==null?void 0:d.role)!=="trainee"}),s=(p=h==null?void 0:h.timesheet)==null?void 0:p.find(e=>e.status==="recording"),M={status:s==null?void 0:s.status,morning:s==null?void 0:s.morning,afternoon:s==null?void 0:s.afternoon},{totalSpentString:O,afternoonSpentString:P,morningSpentString:_}=E(M),q=e=>{I(),Q(e._id),k(K()),(l==null?void 0:l.some(o=>o.task===g||o.task===e.taskname))&&B({task:e.taskname})};return a("div",{className:"space-y-3",children:[c==null?void 0:c.map(e=>{var o,f,u,x,N,v,y,z,S,A,w,b,T;const t=l==null?void 0:l.filter(C=>C.task===e.taskname&&C.type==="comment");return a(H,{className:`cursor-pointer hover:shadow-xl rounded-md shadow-md transition-all ${e.taskname===g?"animate-recording shadow-xl ":""}`,onClick:()=>q(e),children:[a(J,{justify:"space-between",align:"center",children:[n("div",{className:"bg-violet-300 w-8 h-1"}),((o=e.comments)==null?void 0:o.length)??!1?a(r,{spacing:6,children:[n(L,{size:17,className:"text-gray-500"}),n(i,{fz:"xs",c:"dimmed",children:(f=e.comments)==null?void 0:f.length})]}):null]}),a(j,{pt:15,className:"space-y-1",children:[n(i,{fw:"bold",c:"dark",fz:"sm",children:e.taskname}),n(R,{variant:"filled",color:"violet",size:"sm",children:"in-progress"}),((u=e.timeline)==null?void 0:u.revisions.length)!==0&&a(r,{className:"text-gray-500",spacing:10,children:[n(i,{size:"xs",children:"Revisions"}),a(R,{size:"sm",color:"red",variant:"light",className:"lowercase",children:["x",(x=e.timeline)==null?void 0:x.revisions.length]})]}),a(j,{children:[a(r,{className:"text-gray-500",fz:"xs",spacing:8,children:[n(i,{children:"Ticket:"}),n(i,{children:e.ticketno})]}),a(r,{className:"text-gray-500",fz:"xs",spacing:8,children:[n(i,{children:"Added:"}),n(i,{children:(N=e.timeline)==null?void 0:N.createdAt})]}),a(r,{className:"text-gray-500",fz:"xs",spacing:8,children:[n(i,{children:"Started:"}),n(i,{children:(v=e.timeline)==null?void 0:v.startedAt})]}),(s==null?void 0:s.status)==="recording"&&a(r,{className:"text-gray-500",fz:"xs",spacing:8,children:[((y=e.timeline)==null?void 0:y.revisions.length)!==0?n(i,{children:"Revision time: "}):n(i,{children:"On timesheet: "}),a(i,{fw:"bold",className:"animate-recording",children:[((z=e.timeline)==null?void 0:z.revisions.length)!==0?n("span",{children:"+ "}):"",((S=s.morning)==null?void 0:S.start)!==""&&((A=s.morning)==null?void 0:A.end)!==""&&s.status==="recording"?n("span",{children:P}):((w=s.afternoon)==null?void 0:w.start)!==""&&((b=s.afternoon)==null?void 0:b.end)!==""&&s.status==="recording"?n("span",{children:_}):O]})]}),((T=e.timeline)==null?void 0:T.revisions.length)!==0?a(r,{className:"text-gray-500",fz:"xs",spacing:8,children:[n(i,{children:"Recorded spent: "}),n(i,{fw:"bold",children:e.spent})]}):"",(t==null?void 0:t.length)!==0&&a(i,{className:"text-blue-500 animate-pulse",fz:"xs",children:["+ ",t==null?void 0:t.length," new comment"]})]})]})]},e._id)}),(c==null?void 0:c.length)===0&&n(i,{c:"dimmed",fs:"italic",fz:"xs",className:"tracking-normal",children:"there are no in progress tasks!"})]})};export{W as default};
