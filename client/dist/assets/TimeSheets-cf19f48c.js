import{i as K,r as q,k as O,j as R,l as U,D as V,v as W,E as N,m as n,n as e,T as a,o as S,H as c,A as X,F as g,J as L,G as o,K as Y,P as k,L as Z,C as ee}from"./index-a4716bfd.js";import{l as te,P as ne}from"./lodash-44113222.js";import{c as ae}from"./calculateSpentTime-49d88f56.js";import{I as re}from"./IconDots-1067b901.js";import{I as M}from"./IconClock-22038043.js";const oe=({profile:i})=>{var T,v;const{user:d}=K(t=>t.auth),[u,F]=q.useState(1),[Q,{close:_,open:B}]=O(!1),{data:x}=R(),H=new Date,{data:b}=U(),{data:f}=V(i==null?void 0:i.course,{skip:(d==null?void 0:d.role)==="trainee"}),y=f==null?void 0:f.find(t=>t._id===(i==null?void 0:i._id)),w=te.chunk((d==null?void 0:d.role)==="trainee"?b==null?void 0:b.timesheet:y==null?void 0:y.timesheet,10);W("Timesheet");const J=(T=w[u-1])==null?void 0:T.map((t,h)=>{var z,A,D,P,$,E,I,j,C,G;const m=N(t.date),p={status:t.status,morning:t.morning,afternoon:t.afternoon},r=ae(p);return n("tr",{children:[e("td",{className:"md:table-cell lg:table-cell pl-3",children:e(a,{children:m.date===H.toDateString()?"Today":m.date})}),e("td",{className:"md:table-cell lg:table-cell",children:e(a,{children:t.task})}),e("td",{className:"hidden md:table-cell lg:table-cell",children:e(a,{children:t.ticket})}),e("td",{className:"py-2 hidden md:table-cell lg:table-cell ",children:n(a,{children:[r.totalSpent.hours===1?r.totalSpent.hours+"hr":r.totalSpent.hours>1?r.totalSpent.hours+"hrs":r.totalSpent.hours===0&&"",r.totalSpent.minutes===1?r.totalSpent.minutes+"min":r.totalSpent.minutes>1?r.totalSpent.minutes+"mins":r.totalSpent.minutes===0&&""]})}),e("td",{className:"py-2 hidden md:table-cell lg:table-cell ",children:t.status==="recorded"?n(S,{align:"center",gap:8,children:[e("div",{className:"bg-green-300 p-1"}),e(a,{fz:"sm",className:"text-gray-400  text-[10px] uppercase font-semibold ",children:"recorded"})]}):e(a,{fz:"xs",fw:"bold",children:t.status})}),e("td",{className:"dark:text-gray-400 md:table-cell lg:table-cell",children:n(c,{shadow:"md",transitionProps:{transition:"rotate-right",duration:150},withArrow:!0,children:[e(c.Target,{children:e(X,{variant:"white",color:"cyan",children:e(re,{size:19})})}),n(c.Dropdown,{children:[((z=t.morning)==null?void 0:z.start)!==""&&n(g,{children:[e(c.Label,{children:"Morning"}),e(c.Item,{p:0,className:"bg-white hover:bg-white",children:n(L,{px:10,pb:5,spacing:1,children:[n(o,{spacing:8,children:[e(M,{size:16,className:"text-yellow-300"}),n(a,{c:"dark",fz:"xs",children:[e("span",{children:(A=t.morning)==null?void 0:A.start})," -"," ",e("span",{className:((D=t.morning)==null?void 0:D.end)===""?"text-gray-500":"",children:((P=t.morning)==null?void 0:P.end)===""?"recording":($=t.morning)==null?void 0:$.end})]})]}),n(a,{c:"dark",fz:"xs",children:["Spent:"," ",r.morning.spent.hours!==0&&`${r.morning.spent.hours}hr${r.morning.spent.hours!==1?"s":""}`,r.morning.spent.minutes!==0&&`${r.morning.spent.minutes}min${r.morning.spent.minutes!==1?"s":""}`]})]})}),e(c.Divider,{})]}),((E=t.afternoon)==null?void 0:E.start)!==""&&n(g,{children:[e(c.Label,{children:"Afternoon"}),e(c.Item,{p:0,className:"bg-white hover:bg-white",children:n(L,{px:10,pb:5,spacing:1,children:[n(o,{spacing:8,children:[e(M,{size:16,className:"text-violet-400"}),n(a,{c:"dark",fz:"xs",children:[e("span",{children:(I=t.afternoon)==null?void 0:I.start})," -"," ",e("span",{className:((j=t.afternoon)==null?void 0:j.end)===""?"text-gray-500":"",children:((C=t.afternoon)==null?void 0:C.end)===""?"recording":(G=t.afternoon)==null?void 0:G.end})]})]}),n(a,{c:"dark",fz:"xs",children:["Spent:"," ",r.afternoon.spent.hours!==0&&`${r.afternoon.spent.hours}hr${r.afternoon.spent.hours!==1?"s":""}`,r.afternoon.spent.minutes!==0&&`${r.afternoon.spent.minutes}min${r.afternoon.spent.minutes!==1?"s":""}`]})]})})]})]})]})})]},h)}),s=x==null?void 0:x.filter(t=>t.status==="inprogress"),l=s==null?void 0:s.reduce((t,h)=>{var m,p;return((m=h.timeline)==null?void 0:m.startedAt)<((p=t==null?void 0:t.timeline)==null?void 0:p.startedAt)?h:t},s==null?void 0:s[0]);return n(g,{children:[n(S,{justify:"space-between",pb:6,align:"center",children:[e(Y,{}),e(o,{className:"",fz:12,children:e(o,{spacing:8,c:"dark",children:(s==null?void 0:s.length)!==0&&n(g,{children:[e(a,{fw:"bold",children:"Current task:"}),n(k,{position:"bottom",withArrow:!0,shadow:"md",opened:Q,children:[e(k.Target,{children:e(a,{c:"dimmed",className:"cursor-pointer hover:text-gray-400 transition-all",onMouseEnter:B,onMouseLeave:_,children:l==null?void 0:l.ticketno})}),e(k.Dropdown,{sx:{pointerEvents:"none"},children:n(Z,{component:"div",children:[e(a,{fw:"bold",c:"dark",fz:"sm",pb:5,children:l==null?void 0:l.taskname}),n(o,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(a,{children:"Added:"}),e(a,{children:N(l==null?void 0:l.createdAt).date})]}),n(o,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(a,{children:"Started:"}),e(a,{children:N((v=l==null?void 0:l.timeline)==null?void 0:v.startedAt).date})]})]})})]})]})})})]}),n(ee,{className:"bg-opacity-60 rounded-md shadow-md h-[calc(100vh-190px)]",children:[e("div",{className:"h-[96%]",children:n("table",{className:"border-collapse border-none w-full",children:[e("thead",{children:n("tr",{children:[e("th",{scope:"col",className:"md:px-3 lg:px-3 pl-3 py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tl-md",children:e(a,{children:"Date"})}),e("th",{scope:"col",className:" md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm",children:e(a,{children:"Task Name"})}),e("th",{scope:"col",className:"hidden md:table-cell lg:table-cell  py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(a,{children:"Ticket No."})}),e("th",{scope:"col",className:"hidden md:table-cell lg:table-cell py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(a,{children:"Total Spent"})}),e("th",{scope:"col",className:" hidden md:table-cell lg:table-cell py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(a,{children:"Status"})}),e("th",{scope:"col",className:" py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tr-md",children:e(a,{children:"Expand"})})]})}),e("tbody",{className:"text-sm text-gray-600",children:J})]})}),n(S,{justify:"space-between",children:[n(a,{c:"dimmed",fz:"xs",children:["Page ",u," of ",w.length]}),e(ne,{total:w.length,value:u,onChange:F,size:"xs",color:"teal",withEdges:!0})]})]})]})};export{oe as default};
