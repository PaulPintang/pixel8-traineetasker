import{h as me,r as Z,j as ge,i as he,k as pe,J as xe,x as ue,l as ye,m as t,n as e,T as a,K as be,F as m,o as x,L as o,A as fe,N as ee,G as d,O as Ne,P as k,Q as we,U as ke,C as ve,E as Se,p as ze,q as Te}from"./index-a5ac19d2.js";import{l as Ae,H as Ie,I as Ce,P as $e}from"./lodash-96b36927.js";import{I as De,a as ne}from"./IconClock-1ceabe6e.js";import{I as Pe}from"./IconDots-b03f8873.js";const Me=({profile:s})=>{var S,z,T,A,I;const{user:c}=me(n=>n.auth),[u,te]=Z.useState(1),[g,v]=Z.useState(""),[ae,{close:re,open:le}]=ge(!1),{data:y}=he(),{data:i}=pe(void 0,{skip:(c==null?void 0:c.role)!=="trainee"}),{data:b}=xe(s?s==null?void 0:s.course:i==null?void 0:i.course),f=b==null?void 0:b.find(n=>n._id===(s==null?void 0:s._id)),N=(c==null?void 0:c.role)==="trainee"?i==null?void 0:i.timesheet:f==null?void 0:f.timesheet,h=N==null?void 0:N.filter(n=>{var p;return(p=n.date)==null?void 0:p.toLowerCase().includes(g.toLowerCase())}),w=Ae.chunk(h,10);ue("Timesheet");const se=(S=w[u-1])==null?void 0:S.slice().reverse().map((n,p)=>{var C,$,D,P,E,L,j,G,M,Q,F,q,B,H,R,_,J,K,O,U,X,V,W,Y;const ce={status:n.status,morning:n.morning,afternoon:n.afternoon},{spent:l,afternoonSpentString:ie,morningSpentString:de,totalSpentString:oe}=ye(ce);return t("tr",{children:[e("td",{className:"md:table-cell lg:table-cell pl-3",children:e(a,{children:e(Ie,{highlightColor:"cyan",highlight:g,children:n.date===be().date?"Today":n.date})})}),e("td",{className:"md:table-cell lg:table-cell",children:e(a,{children:n.task})}),e("td",{className:"hidden md:table-cell lg:table-cell",children:e(a,{children:n.ticket})}),e("td",{className:"py-2 hidden md:table-cell lg:table-cell ",children:t(a,{className:n.status==="recording"&&((C=n.afternoon)==null?void 0:C.start)!==""||(($=n.morning)==null?void 0:$.end)===""?"animate-recording":"",children:[e(m,{children:n.status==="recording"&&e(m,{children:((D=n.morning)==null?void 0:D.start)!==""&&((P=n.morning)==null?void 0:P.end)===""&&n.status==="recording"?e("span",{className:"text-yellow-400 font-medium",children:"+ "}):e(m,{children:((E=n.afternoon)==null?void 0:E.start)===""||((L=n.afternoon)==null?void 0:L.end)===""&&t("span",{className:"text-indigo-400 font-medium",children:["+"," "]})})})}),((j=n.morning)==null?void 0:j.start)!==""&&((G=n.morning)==null?void 0:G.end)===""&&n.status==="recording"?e("span",{children:de}):((M=n.afternoon)==null?void 0:M.start)!==""&&((Q=n.afternoon)==null?void 0:Q.end)===""&&n.status==="recording"?e("span",{children:ie}):e("span",{children:oe})]})}),e("td",{className:"py-2 hidden md:table-cell lg:table-cell ",children:n.status==="recorded"?t(x,{align:"center",gap:6,className:"bg-gray-50 px-2 py-1 rounded w-max",children:[e("div",{className:"w-2 h-2 bg-green-300"}),e(a,{fw:"bold",className:"text-[10px] text-green-300 uppercase",children:n.status})]}):t(x,{align:"center",gap:6,className:"bg-gray-50 px-2 py-1 rounded w-max",children:[e(De,{processing:!0,size:7,radius:0,color:((F=n.morning)==null?void 0:F.start)!==""&&((q=n.morning)==null?void 0:q.end)===""?"yellow":"indigo",className:"opacity-70",ml:2,mr:5,mb:1,children:e("span",{})}),e(a,{fw:"bold",className:`text-[10px] uppercase ${((B=n.morning)==null?void 0:B.start)!==""&&((H=n.morning)==null?void 0:H.end)===""?"text-yellow-300":"text-indigo-300"}`,children:n.status})]})}),e("td",{className:"dark:text-gray-400 md:table-cell lg:table-cell",children:t(o,{shadow:"md",transitionProps:{transition:"rotate-right",duration:150},withArrow:!0,children:[e(o.Target,{children:e(fe,{variant:"white",color:"cyan",children:e(Pe,{size:19})})}),t(o.Dropdown,{children:[((R=n.morning)==null?void 0:R.start)!==""&&t(m,{children:[e(o.Label,{children:"Morning"}),e(o.Item,{p:0,className:"bg-white hover:bg-white",children:t(ee,{px:10,pb:5,spacing:1,children:[t(d,{spacing:8,children:[e(ne,{size:16,className:"text-yellow-300"}),t(a,{c:"dark",fz:"xs",children:[e("span",{children:(_=n.morning)==null?void 0:_.start})," -"," ",e("span",{className:((J=n.morning)==null?void 0:J.end)===""?"text-gray-500":"",children:((K=n.morning)==null?void 0:K.end)===""?"recording":(O=n.morning)==null?void 0:O.end})]})]}),t(a,{c:"dark",fz:"xs",children:["Spent:"," ",l.morning.spent.hours!==0&&`${l.morning.spent.hours}hr${l.morning.spent.hours!==1?"s":""}`,l.morning.spent.minutes!==0&&`${l.morning.spent.minutes}min${l.morning.spent.minutes!==1?"s":""}`]})]})}),e(o.Divider,{})]}),((U=n.afternoon)==null?void 0:U.start)!==""&&t(m,{children:[e(o.Label,{children:"Afternoon"}),e(o.Item,{p:0,className:"bg-white hover:bg-white",children:t(ee,{px:10,pb:5,spacing:1,children:[t(d,{spacing:8,children:[e(ne,{size:16,className:"text-violet-400"}),t(a,{c:"dark",fz:"xs",children:[e("span",{children:(X=n.afternoon)==null?void 0:X.start})," -"," ",e("span",{className:((V=n.afternoon)==null?void 0:V.end)===""?"text-gray-500":"",children:((W=n.afternoon)==null?void 0:W.end)===""?"recording":(Y=n.afternoon)==null?void 0:Y.end})]})]}),t(a,{c:"dark",fz:"xs",children:["Spent:"," ",l.afternoon.spent.hours!==0&&`${l.afternoon.spent.hours}hr${l.afternoon.spent.hours!==1?"s":""}`,l.afternoon.spent.minutes!==0&&`${l.afternoon.spent.minutes}min${l.afternoon.spent.minutes!==1?"s":""}`]})]})})]})]})]})})]},p)}),r=y==null?void 0:y.find(n=>n.status==="inprogress"&&(c==null?void 0:c.role)==="trainee"?n.assign===(i==null?void 0:i.name):n.assign===(s==null?void 0:s.name));return t("div",{className:"pb-5 lg:pb-0 md:pb-0",children:[t(x,{justify:"space-between",pb:6,align:"center",children:[e(Ne,{}),e(d,{className:"",fz:12,children:e(d,{spacing:8,c:"dark",children:r&&t(m,{children:[e(a,{fw:"bold",children:"Current task:"}),t(k,{position:"bottom-end",withArrow:!0,shadow:"md",opened:ae,children:[e(k.Target,{children:e(a,{c:"dimmed",className:"cursor-pointer hover:text-gray-400 transition-all",onMouseEnter:le,onMouseLeave:re,children:r==null?void 0:r.ticketno})}),e(k.Dropdown,{sx:{pointerEvents:"none"},children:t(we,{component:"div",children:[e(a,{fw:"bold",c:"dark",fz:"sm",pb:5,children:r==null?void 0:r.taskname}),((z=r.timeline)==null?void 0:z.revisions.length)!==0&&t(d,{className:"text-gray-500 py-1",spacing:10,children:[e(a,{size:"xs",children:"Revisions"}),t(ke,{size:"sm",color:"red",variant:"light",className:"lowercase",children:["x",(T=r.timeline)==null?void 0:T.revisions.length]})]}),t(d,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(a,{c:"dark",children:"Added:"}),e(a,{children:(A=r.timeline)==null?void 0:A.createdAt})]}),t(d,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(a,{c:"dark",children:"Started:"}),e(a,{children:(I=r==null?void 0:r.timeline)==null?void 0:I.startedAt})]}),t(d,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(a,{c:"dark",children:"Recorded spent:"}),e(a,{children:r==null?void 0:r.spent})]})]})})]})]})})})]}),t(ve,{className:"bg-opacity-60 rounded-md shadow-md h-[calc(100vh-163px)]",children:[e("div",{className:"h-[95%]",children:t("table",{className:"border-collapse border-none w-full",children:[e("thead",{children:t("tr",{children:[e("th",{scope:"col",className:"md:px-3 lg:px-3 pl-3 py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tl-md",children:e(a,{children:"Date"})}),e("th",{scope:"col",className:" md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm",children:e(a,{children:"Task Name"})}),e("th",{scope:"col",className:"hidden md:table-cell lg:table-cell  py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(a,{children:"Ticket No."})}),e("th",{scope:"col",className:"hidden md:table-cell lg:table-cell py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(a,{children:"Total Spent"})}),e("th",{scope:"col",className:" hidden md:table-cell lg:table-cell py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(a,{children:"Status"})}),e("th",{scope:"col",className:" py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tr-md",children:e(a,{children:"Expand"})})]})}),(h==null?void 0:h.length)===0?e(m,{children:e(Se,{text:"No records found"})}):e("tbody",{className:"text-sm text-gray-600",children:se})]})}),t(x,{justify:"space-between",children:[e(ze,{rightSection:g?e(Te,{onClick:()=>v(""),size:14,className:"hover:cursor-pointer text-gray-500 hover:text-gray-800 transition-all"}):e(Ce,{size:14,className:"text-gray-500"}),size:"xs",placeholder:"Search date, ex. May 9",value:g,onChange:n=>v(n.currentTarget.value)}),t(d,{children:[t(a,{c:"dimmed",fz:"xs",className:"hidden lg:flex md:flex",children:["Page ",u," of ",w.length]}),e($e,{total:w.length,value:u,onChange:te,size:"xs",color:"teal"})]})]})]})]})};export{Me as default};