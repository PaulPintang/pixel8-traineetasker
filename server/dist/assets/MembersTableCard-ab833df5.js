import{h as D,L as F,i as M,r as h,l as H,o as s,p as e,G as g,y as W,T as a,a0 as T,B as _,P as m,A as B,Q as R,F as x,C as V,E as $,q as U,s as X,t as J,ay as K}from"./index-38fe47c3.js";import{l as O,H as Y,I as Z,P as ee}from"./lodash-6da66a99.js";import{I as le,G as se}from"./GettingData-05ce6739.js";import{I as ae}from"./IconDots-fd7271c4.js";import{I as te}from"./IconUser-c97a0608.js";import{C as z}from"./Dashboard-12619fe4.js";import"./InlineInput-d1a9d0af.js";const me=()=>{var N;const{user:n}=D(l=>l.auth),{data:p,isLoading:v}=F(n==null?void 0:n.course),{data:r,refetch:S,isFetching:A}=M(),[o,P]=h.useState(!1),[i,Q]=h.useState(!1),[E,G]=h.useState(""),[L,{toggle:u}]=H(),[b,j]=h.useState(1),[d,y]=h.useState("");h.useEffect(()=>{(o||i)&&S()},[o,i]);const f=p==null?void 0:p.filter(l=>{var t;return(t=l.name)==null?void 0:t.toLowerCase().includes(d.toLowerCase())}),c=f==null?void 0:f.filter(l=>o?!(r!=null&&r.some(t=>t.assign===l.name&&t.status==="inprogress")):i?r==null?void 0:r.some(t=>t.assign===l.name&&t.status==="forqa"):o&&i?r==null?void 0:r.some(t=>t.assign===l.name&&t.status==="forqa"||t.status==="inprogress"):l),w=O.chunk(c,4),q=(N=w[b-1])==null?void 0:N.map(l=>{var t,k,C;return s("tr",{children:[e("td",{className:" md:table-cell lg:table-cell pl-3 pt-3",children:s(g,{spacing:10,children:[e(W,{src:l.picture,width:35,radius:"xl",imageProps:{referrerPolicy:"no-referrer"},className:"hidden md:flex lg:flex"}),s("div",{className:"-space-y-[2px]",children:[e(a,{className:"font-semibold",children:e(Y,{highlightColor:"cyan",highlight:d,children:l.name})}),e(a,{c:"dimmed",children:l.email})]})]})}),e("td",{className:"hidden md:table-cell lg:table-cell pl-3 ",children:s(a,{className:"font-semibold",children:[(t=l.hours)==null?void 0:t.ojtHours," ",e("span",{className:"font-normal",children:"hours"})]})}),e("td",{className:"hidden md:table-cell lg:table-cell pl-3 ",children:s(a,{className:"font-semibold",children:[(k=l.hours)==null?void 0:k.pending," ",e("span",{className:"font-normal",children:"hours"})]})}),e("td",{className:"hidden md:table-cell lg:table-cell pl-3 ",children:s(a,{className:"font-semibold",children:[(C=l.hours)==null?void 0:C.rendered," ",e("span",{className:"font-normal",children:"hours"})]})}),e("td",{className:"hidden md:table-cell lg:table-cell pl-3 ",children:s(a,{className:"font-semibold",children:[r==null?void 0:r.filter(I=>I.assign===l.name&&I.status==="completed").length," ",e("span",{className:"font-normal",children:"tasks"})]})}),e("td",{className:" md:table-cell lg:table-cell pt-2",children:(n==null?void 0:n.role)!=="Task manager"?e(T,{to:`../profile/${l._id}`,children:e(_,{variant:"white",color:"cyan",size:"xs",children:"View"})}):s(m,{shadow:"md",transitionProps:{transition:"rotate-right",duration:150},withArrow:!0,children:[e(m.Target,{children:e(B,{variant:"white",color:"cyan",children:e(ae,{size:19})})}),s(m.Dropdown,{children:[e(m.Label,{children:"Manage intern"}),s(R,{spacing:9,py:5,children:[e(T,{to:`../profile/${l._id}`,children:e(m.Item,{className:"bg-white hover:bg-white",py:0,icon:e(le,{size:16}),children:e(a,{fz:"xs",fw:"bold",c:"dark",children:"View"})})}),e(m.Item,{className:"bg-white hover:bg-white",py:0,onClick:()=>{G(l.name),u()},icon:e(te,{size:16}),color:"cyan",children:e(a,{fz:"xs",fw:"bold",children:"Assign"})})]})]})]})})]},l._id)});return s(x,{children:[s(V,{className:"bg-opacity-60 rounded-md shadow-md h-[calc(100vh-100px)] w-full",children:[e("div",{className:"h-[96%]",children:s("table",{className:"border-collapse border-none w-full",children:[e("thead",{children:s("tr",{children:[e("th",{scope:"col",className:"md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tl-md",children:e(a,{children:"Intern"})}),e("th",{scope:"col",className:"hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(a,{children:"Required hours"})}),e("th",{scope:"col",className:" hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(a,{children:"Pending hours"})}),e("th",{scope:"col",className:"hidden  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(a,{children:"Rendered hours"})}),e("th",{scope:"col",className:" hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm",children:e(a,{children:"Completed task"})}),e("th",{scope:"col",className:"md:px-3 lg:px-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tr-md",children:e(a,{children:"Action"})})]})}),v||A?e(x,{children:e(se,{})}):(c==null?void 0:c.length)===0?e(x,{children:e($,{text:o?"No members with no task!":i?"No members with forQA task":d===""?"No members yet":d&&"Member not found"})}):e("tbody",{className:"text-xs text-gray-600",children:q})]})}),s(U,{justify:"space-between",className:"relative",children:[s(g,{align:"center",children:[e(X,{size:"xs",placeholder:"Search",value:d,onChange:l=>y(l.currentTarget.value),rightSection:d?e(J,{onClick:()=>y(""),size:14,className:"hover:cursor-pointer text-gray-500 hover:text-gray-800 transition-all"}):e(Z,{size:14,className:"text-gray-500"})}),e(z,{checked:o,onChange:l=>P(l.currentTarget.checked),size:"xs",color:"cyan",label:"No inprogress task"}),e(z,{checked:i,onChange:l=>Q(l.currentTarget.checked),size:"xs",color:"cyan",label:"With for-QA task"})]}),s(g,{children:[s(g,{spacing:3,children:[e(a,{fz:"xs",className:"uppercase font-semibold text-gray-700",children:"Total:"}),s(a,{fz:"xs",children:[c==null?void 0:c.length," trainee",(c==null?void 0:c.length)>=2&&"s"]})]}),e(ee,{total:w.length,value:b,onChange:j,size:"xs",color:"cyan",withEdges:!0})]})]})]}),e(K,{assignTo:E,assign:L,toggle:u})]})};export{me as default};