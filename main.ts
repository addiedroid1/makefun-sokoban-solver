import{mkdirSync as a,readFileSync as c,writeFileSync as d}from'node:fs';
for(let f of['i001','i002','i003','i004','i005']){a('/output/'+f,{recursive:!0});d('/output/'+f+'/solution.txt',S(c('/input/'+f+'/level.txt','utf8')))}
function S(T){let s=T.indexOf('\n')+1,w=s-1,N=T.length,h=(N+1)/s|0,W=new Uint8Array(N),G=[],B=[],P=-1,A=[-s,1,s,-1],L='urdl',U='URDL';
for(let j=0;j<N;j++){let z=T[j];if(z=='#'||z=='\n')W[j]=1;else{if('.*+'.includes(z))G.push(j);if('$*'.includes(z))B.push(j);if('@+'.includes(z))P=j}}
let SR=(l,g,X,p0)=>{let v=new Uint8Array(N),q=[...g];for(let x of g)v[x]=1;while(q.length){let x=q.pop();for(let d of A){let f=x-d;if(!l[f]&&!l[f-d]&&!v[f]){v[f]=1;q.push(f)}}}if(X.some(x=>!v[x]))return;let Q=[[X,p0,'']],sn=new Set([X+'|'+p0]);
for(let[bs,pl,mv]of Q){if(bs.every(x=>g.includes(x)))return mv;if(Q.length>9e5)return;let X2=new Set(bs),M=new Map([[pl,pl]]),q2=[pl];for(let p of q2)for(let d of A){let t=p+d;if(!l[t]&&!X2.has(t)&&!M.has(t)){M.set(t,p);q2.push(t)}}
for(let i=0;i<bs.length;i++)for(let k=0;k<4;k++){let x=bs[i],t=x+A[k];if(!M.has(x-A[k])||l[t]||X2.has(t)||!v[t])continue;let nb=bs.slice();nb[i]=t;nb.sort((x,y)=>x-y);let ky=nb+'|'+x;if(sn.has(ky))continue;sn.add(ky);let wk='';for(let p=x-A[k];p!=pl;)wk=L[A.indexOf(p-(p=M.get(p)))]+wk;Q.push([nb,x,mv+wk+U[k]])}}};
let l=W.slice();B.forEach(x=>l[x]=1);let mv='',pl=P;
for(let sl=0;sl<w/7-1;sl++)for(let sd=0;sd<2;sd++){if(sd&&h<17)break;let x0=sl*7+1,y0=sd?h-7:1,dy=sd?h-8:7,D1=-1;for(let cx=x0;cx<x0+6;cx++)if(!W[dy*s+cx])D1=dy*s+cx;let D2=D1+(sd?-s:s),F=j=>j==D1||j==D2||(((j%s-x0)>>>0)<6&&(((j/s|0)-y0)>>>0)<6),bx=B.filter(F),gl=G.filter(F);if(!bx.length)continue;bx.forEach(x=>l[x]=0);let r=SR(l,gl,bx,pl);if(r==null)return'';gl.forEach(x=>l[x]=1);mv+=r;for(let z of r.toLowerCase())pl+=A[L.indexOf(z)]}
return mv}
