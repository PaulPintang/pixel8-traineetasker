import{j as g,n as e,m as a,C as p,L as t,T as s,a3 as o,G as n}from"./index-cf69f4a9.js";const f=({toggle:h,setViewId:m})=>{const{data:l}=g(),d=l==null?void 0:l.filter(i=>i.status==="completed");return e("div",{className:"space-y-3",children:d==null?void 0:d.map(i=>{var r,c;return a(p,{className:"cursor-pointer hover:shadow-xl rounded-md shadow-md transition-all",onClick:()=>{h(),m(i._id)},children:[e("div",{className:"bg-indigo-300 w-8 h-1"}),a(t,{pt:15,className:"space-y-1",children:[e(s,{fw:"bold",c:"dark",fz:"sm",children:i.taskname}),e(o,{variant:"filled",color:"green",size:"sm",children:"Completed"}),((r=i.timeline)==null?void 0:r.revisions.length)!==0&&a(n,{className:"text-gray-500",spacing:10,children:[e(s,{size:"xs",children:"Revisions"}),a(o,{size:"sm",color:"red",variant:"light",className:"lowercase",children:["x",(c=i.timeline)==null?void 0:c.revisions.length]})]}),a(t,{children:[a(n,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(s,{children:"Ticket:"}),e(s,{children:i.ticketno})]}),a(n,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(s,{children:"Added:"}),e(s,{children:"Wednesday, June 07 2023"})]}),a(n,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(s,{children:"Started:"}),e(s,{children:"Wednesday, June 07 2023"})]}),a(n,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(s,{children:"Completed:"}),e(s,{children:"Wednesday, June 07 2023"})]}),a(n,{className:"text-gray-500",fz:"xs",spacing:8,children:[e(s,{children:"Total spent:"}),e(s,{fw:"bold",children:i.spent})]})]})]})]},i._id)})})};export{f as default};
