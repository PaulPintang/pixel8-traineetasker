import{h as he,r as ee,j as pe,i as xe,k as ue,J as ye,x as be,K as k,l as fe,m as t,n as e,T as a,F as g,o as x,L as m,A as Ne,N as ne,G as i,O as we,P as v,Q as ke,U as ve,C as Se,E as ze,p as Te,q as Ae}from"./index-ef5c4769.js";import{l as Ce,H as Ie,I as De,P as $e}from"./lodash-2ab651e2.js";import{I as Pe,a as te}from"./IconClock-6cf31baf.js";import{I as Ee}from"./IconDots-fd98005d.js";const Qe=({profile:s})=>{var z,T,A,C;const{user:c}=he(n=>n.auth),[u,ae]=ee.useState(1),[h,S]=ee.useState(""),[re,{close:le,open:se}]=pe(!1),{data:y}=xe(),ce=new Date,{data:d}=ue(void 0,{skip:(c==null?void 0:c.role)!=="trainee"}),{data:b}=ye(s?s==null?void 0:s.course:d==null?void 0:d.course),f=b==null?void 0:b.find(n=>n._id===(s==null?void 0:s._id)),N=(c==null?void 0:c.role)==="trainee"?d==null?void 0:d.timesheet:f==null?void 0:f.timesheet,p=N==null?void 0:N.filter(n=>{var o;return(o=n.date)==null?void 0:o.toLowerCase().includes(h.toLowerCase())}),w=Ce.chunk(p,10);be("Timesheet");const de=(z=w[u-1])==null?void 0:z.slice().sort((n,o)=>o.date.localeCompare(n.date)).sort((n,o)=>o.status.localeCompare(n.status)).map((n,o)=>{var D,$,P,E,L,j,G,M,Q,F,q,B,H,R,_,J,K,O,U,X,V,W,Y,Z;const I=k(n.date),ie={status:n.status,morning:n.morning,afternoon:n.afternoon},{spent:l,afternoonSpentString:oe,morningSpentString:me,totalSpentString:ge}=fe(ie);return t("tr",{children:[e("td",{className:"md:table-cell lg:table-cell pl-3",children:e(a,{children:e(Ie,{highlightColor:"cyan",highlight:h,children:I.date===ce.toDateString()?"Today":I.date})})}),e("td",{className:"md:table-cell lg:table-cell",children:e(a,{children:n.task})}),e("td",{className:"hidden md:table-cell lg:table-cell",children:e(a,{children:n.ticket})}),e("td",{className:"py-2 hidden md:table-cell lg:table-cell ",children:t(a,{className:n.status==="recording"&&((D=n.afternoon)==null?void 0:D.start)!==""||(($=n.morning)==null?void 0:$.end)===""?"animate-recording":"",children:[e(g,{children:n.status==="recording"&&e(g,{children:((P=n.morning)==null?void 0:P.start)!==""&&((E=n.morning)==null?void 0:E.end)===""&&n.status==="recording"?e("span",{className:"text-yellow-400 font-medium",children:"+ "}):e(g,{children:((L=n.afternoon)==null?void 0:L.start)===""||((j=n.afternoon)==null?void 0:j.end)===""&&t("span",{className:"text-indigo-400 font-medium",children:["+"," "]})})})}),((G=n.morning)==null?void 0:G.start)!==""&&((M=n.morning)==null?void 0:M.end)===""&&n.status==="recording"?e("span",{children:me}):((Q=n.afternoon)==null?void 0:Q.start)!==""&&((F=n.afternoon)==null?void 0:F.end)===""&&n.status==="recording"?e("span",{children:oe}):e("span",{children:ge})]})}),e("td",{className:"py-2 hidden md:table-cell lg:table-cell ",children:n.status==="recorded"?t(x,{align:"center",gap:6,className:"bg-gray-50 px-2 py-1 rounded w-max",children:[e("div",{className:"w-2 h-2 bg-green-300"}),e(a,{fw:"bold",className:"text-[10px] text-green-300 uppercase",children:n.status})]}):t(x,{align:"center",gap:6,className:"bg-gray-50 px-2 py-1 rounded w-max",children:[e(Pe,{processing:!0,size:7,radius:0,color:((q=n.morning)==null?void 0:q.start)!==""&&((B=n.morning)==null?void 0:B.end)===""?"yellow":"indigo",className:"opacity-70",ml:2,mr:5,mb:1,children:e("span",{})}),e(a,{fw:"bold",className:`text-[10px] uppercase ${((H=n.morning)==null?void 0:H.start)!==""&&((R=n.morning)==null?void 0:R.end)===""?"text-yellow-300":"text-indigo-300"}`,children:n.status})]})}),e("td",{className:"dark:text-gray-400 md:table-cell lg:table-cell",children:t(m,{shadow:"md",transitionProps:{transition:"rotate-right",duration:150},withArrow:!0,children:[e(m.Target,{children:e(Ne,{variant:"white",color:"cyan",children:e(Ee,{size:19})})}),t(m.Dropdown,{children:[((_=n.morning)==null?void 0:_.start)!==""&&t(g,{children:[e(m.Label,{children:"Morning"}),e(m.Item,{p:0,className:"bg-white hover:bg-white",children:t(ne,{px:10,pb:5,spacing:1,children:[t(i,{spacing:8,children:[e(te,{size:16,className:"text-yellow-300"}),t(a,{c:"dark",fz:"xs",children:[e("span",{children:(J=n.morning)==null?void 0:J.start})," -"," ",e("span",{className:((K=n.morning)==null?void 0:K.end)===""?"text-gray-500":"",children:((O=n.morning)==null?void 0:O.end)===""?"recording":(U=n.morning)==null?void 0:U.end})]})]}),t(a,{c:"dark",fz:"xs",children:["Spent:"," ",l.morning.spent.hours!==0&&`${l.morning.spent.hours}hr${l.morning.spent.hours!==1?"s":""}`,l.morning.spent.minutes!==0&&`${l.morning.spent.minutes}min${l.morning.spent.minutes!==1?"s":""}`]})]})}),e(m.Divider,{})]}),((X=n.afternoon)==null?void 0:X.start)!==""&&t(g,{children:[e(m.Label,{children:"Afternoon"}),e(m.Item,{p:0,className:"bg-white hover:bg-white",children:t(ne,{px:10,pb:5,spacing:1,children:[t(i,{spacing:8,children:[e(te,{size:16,className:"text-violet-400"}),t(a,{c:"dark",fz:"xs",children:[e("span",{children:(V=n.afternoon)==null?void 0:V.start})," -"," ",e("span",{className:((W=n.afternoon)==null?void 0:W.end)===""?"text-gray-500":"",children:((Y=n.afternoon)==null?void 0:Y.end)===""?"recording":(Z=n.afternoon)==null?void 0:Z.end})]})]}),t(a,{c:"dark",fz:"xs",children:["Spent:"," ",l.afternoon.spent.hours!==0&&`${l.afternoon.spent.hours}hr${l.afternoon.spent.hours!==1?"s":""}`,l.afternoon.spent.minutes!==0&&`${l.afternoon.spent.minutes}min${l.afternoon.spent.minutes!==1?"s":""}`]})]})})]})]})]})})]},o)}),r=y==null?void 0:y.find(n=>n.status==="inprogress"&&(c==null?void 0:c.role)==="trainee"?n.assign===(d==null?void 0:d.name):n.assign===(s==null?void 0:s.name));return t("div",{className:"pb-5 lg:pb-0 md:pb-0",children:[t(x,{justify:"space-between",pb:6,align:"center",children:[e(we,{}),e(i,{className:"",fz:12,children:e(i,{spacing:8,c:"dark",children:r&&t(g,{children:[e(a,{fw:"bold",children:"Current task:"}),t(v,{position:"bottom-end",withArrow:!0,shadow:"md",opened:re,children:[e(v.Target,{children:e(a,{c:"dimmed",className:"cursor-pointer hover:text-gray-400 transition-all",onMouseEnter:se,onMouseLeave:le,children:r==null?void 0:r.ticketno})}),e(v.Dropdown,{sx:{pointerEvents:"none"},children:t(ke,{component:"div",children:[e(a,{fw:"bold",c:"dark",fz:"sm",pb:5,children:r==null?void 0:r.taskname}),((T=r.timeline)==null?void 0:T.revisions.length)!==0&&t(i,{className:"text-gray-500 py-1",spacing:10,children:[e(a,{size:"xs",children:"Revisions"}),t(ve,{size:"sm",color:"red",variant:"light",className:"lowercase",children:["x",(A=r.timeline)==null?void 0:A.revisions.length]})]}),t(i,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(a,{c:"dark",children:"Added:"}),e(a,{children:k(r==null?void 0:r.createdAt).date+" at "+k(r==null?void 0:r.createdAt).time})]}),t(i,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(a,{c:"dark",children:"Started:"}),e(a,{children:(C=r==null?void 0:r.timeline)==null?void 0:C.startedAt})]}),t(i,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(a,{c:"dark",children:"Recorded spent:"}),e(a,{children:r==null?void 0:r.spent})]})]})})]})]})})})]}),t(Se,{className:"bg-opacity-60 rounded-md shadow-md h-[calc(100vh-163px)]",children:[e("div",{className:"h-[95%]",children:t("table",{className:"border-collapse border-none w-full",children:[e("thead",{children:t("tr",{children:[e("th",{scope:"col",className:"md:px-3 lg:px-3 pl-3 py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tl-md",children:e(a,{children:"Date"})}),e("th",{scope:"col",className:" md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm",children:e(a,{children:"Task Name"})}),e("th",{scope:"col",className:"hidden md:table-cell lg:table-cell  py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(a,{children:"Ticket No."})}),e("th",{scope:"col",className:"hidden md:table-cell lg:table-cell py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(a,{children:"Total Spent"})}),e("th",{scope:"col",className:" hidden md:table-cell lg:table-cell py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(a,{children:"Status"})}),e("th",{scope:"col",className:" py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tr-md",children:e(a,{children:"Expand"})})]})}),(p==null?void 0:p.length)===0?e(g,{children:e(ze,{text:"No records found"})}):e("tbody",{className:"text-sm text-gray-600",children:de})]})}),t(x,{justify:"space-between",children:[e(Te,{rightSection:h?e(Ae,{onClick:()=>S(""),size:14,className:"hover:cursor-pointer text-gray-500 hover:text-gray-800 transition-all"}):e(De,{size:14,className:"text-gray-500"}),size:"xs",placeholder:"Search date, ex. May 9",value:h,onChange:n=>S(n.currentTarget.value)}),t(i,{children:[t(a,{c:"dimmed",fz:"xs",className:"hidden lg:flex md:flex",children:["Page ",u," of ",w.length]}),e($e,{total:w.length,value:u,onChange:ae,size:"xs",color:"teal"})]})]})]})]})};export{Qe as default};