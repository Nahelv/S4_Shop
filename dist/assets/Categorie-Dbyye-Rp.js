import{r,o as n,a as c,b as e,c as s,F as d,d as i,u,e as _,t as l}from"./index-DWQ9NSpW.js";const m={class:"container"},p=_("h3",{class:"text-xl mb-4"},"Nos catégories",-1),g={class:"px-3 py-6 bg-gray-50 shadow-md mb-2 rounded"},y={__name:"Categorie",setup(h){let t=r([]);return n(async()=>{await c.get("https://dummyjson.com/products/categories").then(a=>{t.value=a.data})}),(a,x)=>(e(),s("div",m,[p,(e(!0),s(d,null,i(u(t),o=>(e(),s("div",g,l(o),1))),256))]))}};export{y as default};