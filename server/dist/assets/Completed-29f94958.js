import{i as f,m as a,C as N,n as e,Q as o,T as s,U as h,G as r,K as g}from"./index-ef5c4769.js";const y=({toggle:x,setViewId:p})=>{const{data:n}=f(),l=n==null?void 0:n.filter(i=>i.status==="completed");return a("div",{className:"space-y-3",children:[l==null?void 0:l.map(i=>{var c,d,t,m;return a(N,{className:"cursor-pointer hover:shadow-xl rounded-md shadow-md transition-all",onClick:()=>{x(),p(i._id)},children:[e("div",{className:"bg-indigo-300 w-8 h-1"}),a(o,{pt:15,className:"space-y-1",children:[e(s,{fw:"bold",c:"dark",fz:"sm",children:i.taskname}),e(h,{variant:"filled",color:"green",size:"sm",children:"Completed"}),((c=i.timeline)==null?void 0:c.revisions.length)!==0&&a(r,{className:"text-gray-500",spacing:10,children:[e(s,{size:"xs",children:"Revisions"}),a(h,{size:"sm",color:"red",variant:"light",className:"lowercase",children:["x",(d=i.timeline)==null?void 0:d.revisions.length]})]}),a(o,{children:[a(r,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(s,{children:"Ticket:"}),e(s,{children:i.ticketno})]}),a(r,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(s,{children:"Added:"}),e(s,{children:g(i.createdAt).date+" at "+g(i.createdAt).time})]}),a(r,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(s,{children:"Started:"}),e(s,{children:(t=i.timeline)==null?void 0:t.startedAt})]}),a(r,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(s,{children:"Completed:"}),e(s,{children:(m=i.timeline)==null?void 0:m.completedAt})]}),a(r,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(s,{children:"Total spent:"}),e(s,{fw:"bold",children:i.spent})]})]})]})]},i._id)}),(l==null?void 0:l.length)===0&&e(s,{c:"dimmed",fs:"italic",fz:"xs",className:"tracking-normal",children:"there are no completed tasks!"})]})};export{y as default};