import{m as x,i as a,C as g,j as e,N as t,T as s,a0 as o,G as n}from"./index-24d6de80.js";const f=({toggle:h,setViewId:m})=>{const{data:r}=x(),l=r==null?void 0:r.filter(i=>i.status==="forqa");return a("div",{className:"space-y-3",children:[l==null?void 0:l.map(i=>{var c,d;return a(g,{className:"cursor-pointer hover:shadow-xl rounded-md shadow-md transition-all",onClick:()=>{h(),m(i._id)},children:[e("div",{className:"bg-yellow-300 w-8 h-1"}),a(t,{pt:15,className:"space-y-1",children:[e(s,{fw:"bold",c:"dark",fz:"sm",children:i.taskname}),e(o,{variant:"filled",color:"yellow",size:"sm",children:"for qa"}),((c=i.timeline)==null?void 0:c.revisions.length)!==0&&a(n,{className:"text-gray-500",spacing:10,children:[e(s,{size:"xs",children:"Revisions"}),a(o,{size:"sm",color:"red",variant:"light",className:"lowercase",children:["x",(d=i.timeline)==null?void 0:d.revisions.length]})]}),a(t,{children:[a(n,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(s,{children:"Ticket:"}),e(s,{children:i.ticketno})]}),a(n,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(s,{children:"Added:"}),e(s,{children:"Wednesday, June 07 2023"})]}),a(n,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(s,{children:"Started:"}),e(s,{children:"Wednesday, June 07 2023"})]}),a(n,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(s,{children:"Total spent:"}),e(s,{fw:"bold",children:i.spent})]})]})]})]},i._id)}),(l==null?void 0:l.length)===0&&e(s,{c:"dimmed",fs:"italic",fz:"xs",className:"tracking-normal",children:"there are no for-QA tasks!"})]})};export{f as default};