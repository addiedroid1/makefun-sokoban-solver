import{mkdirSync as a,readdirSync as b,readFileSync as c,writeFileSync as d}from'node:fs';import{join as e}from'node:path';
let I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
for(let f of b(I)){a(e(O,f),{recursive:!0});d(e(O,f,'solution.txt'),S(c(e(I,f,'level.txt'),'utf8'))+'\n')}
function S(T){let R=T.split('\n').filter(r=>r.length),w=Math.max(...R.map(r=>r.length)),N=w*R.length,W=new Uint8Array(N).fill(1),G=[],B=[],P=-1,A=[-w,1,w,-1],L='urdl',U='URDL',i=0;
for(let r of R){for(let z of r){if(z!='#'){W[i]=0;if('.*+'.includes(z))G.push(i);if('$*'.includes(z))B.push(i);if('@+'.includes(z))P=i}i++}i+=w-r.length}
let LV=(l,g)=>{let v=new Uint8Array(N),q=[...g];g.forEach(x=>v[x]=1);while(q.length){let s=q.pop();for(let d of A){let f=s-d;if(!l[f]&&!l[f-d]&&!v[f]){v[f]=1;q.push(f)}}}return v};
let RC=(l,X,fr)=>{let M=new Map([[fr,fr]]),q=[fr];for(let i=0;i<q.length;i++){let p=q[i];for(let d of A){let s=p+d;if(!l[s]&&!X.has(s)&&!M.has(s)){M.set(s,p);q.push(s)}}}return M};
let SR=(l,g,X,p0)=>{let v=LV(l,g);if(X.some(x=>!v[x]))return;let Q=[[X,p0,'']],sn=new Set([X+'|'+p0]);
for(let h=0;h<Q.length;h++){let[bs,pl,mv]=Q[h];if(bs.every(x=>g.includes(x)))return mv;if(Q.length>8e5)return;let X2=new Set(bs),M=RC(l,X2,pl);
for(let i=0;i<bs.length;i++)for(let k=0;k<4;k++){let x=bs[i],t=x+A[k];if(!M.has(x-A[k])||l[t]||X2.has(t)||!v[t])continue;let nb=bs.slice();nb[i]=t;nb.sort((x,y)=>x-y);let ky=nb+'|'+x;if(sn.has(ky))continue;sn.add(ky);let wk='';for(let p=x-A[k];p!=pl;){let q=M.get(p);wk=L[A.indexOf(p-q)]+wk;p=q}Q.push([nb,x,mv+wk+U[k]])}}};
let W2=W.slice(),rw=P/w|0;for(let i=rw*w;i<(rw+1)*w;i++)W2[i]=1;let RM=[],vs=new Uint8Array(N),E=new Set(),n2=0;
for(let b0 of B){if(vs[b0])continue;let M=RC(W2,E,b0);M.forEach((_,k)=>vs[k]=1);let bx=B.filter(x=>M.has(x));RM.push([bx,G.filter(x=>M.has(x))]);n2+=bx.length}
if(!RM.length||n2!=B.length||RM.some(r=>r[0].length!=r[1].length))return'';
let l=W.slice();B.forEach(x=>l[x]=1);let mv='',pl=P;
for(let ri=0;ri<RM.length;ri++){RM[ri][0].forEach(x=>l[x]=0);let r=SR(l,RM[ri][1],RM[ri][0],pl);if(r==null)return'';RM[ri][1].forEach(x=>l[x]=1);mv+=r;for(let z of r.toLowerCase())pl+=A[L.indexOf(z)]}
return mv}
