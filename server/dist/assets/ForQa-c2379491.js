import{i as p,m as a,C as f,n as e,Q as h,T as i,U as m,G as r}from"./index-a5ac19d2.js";const y=({toggle:x,setViewId:g})=>{const{data:n}=p(),l=n==null?void 0:n.filter(s=>s.status==="forqa");return a("div",{className:"space-y-3",children:[l==null?void 0:l.map(s=>{var c,d,t,o;return a(f,{className:"cursor-pointer hover:shadow-xl rounded-md shadow-md transition-all",onClick:()=>{x(),g(s._id)},children:[e("div",{className:"bg-yellow-300 w-8 h-1"}),a(h,{pt:15,className:"space-y-1",children:[e(i,{fw:"bold",c:"dark",fz:"sm",children:s.taskname}),e(m,{variant:"filled",color:"yellow",size:"sm",children:"for qa"}),((c=s.timeline)==null?void 0:c.revisions.length)!==0&&a(r,{className:"text-gray-500",spacing:10,children:[e(i,{size:"xs",children:"Revisions"}),a(m,{size:"sm",color:"red",variant:"light",className:"lowercase",children:["x",(d=s.timeline)==null?void 0:d.revisions.length]})]}),a(h,{children:[a(r,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(i,{children:"Ticket:"}),e(i,{children:s.ticketno})]}),a(r,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(i,{children:"Added:"}),e(i,{children:(t=s.timeline)==null?void 0:t.createdAt})]}),a(r,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(i,{children:"Started:"}),e(i,{children:(o=s.timeline)==null?void 0:o.startedAt})]}),a(r,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(i,{children:"Total spent:"}),e(i,{fw:"bold",children:s.spent})]})]})]})]},s._id)}),(l==null?void 0:l.length)===0&&e(i,{c:"dimmed",fs:"italic",fz:"xs",className:"tracking-normal",children:"there are no for-QA tasks!"})]})};export{y as default};