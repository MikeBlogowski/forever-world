const chapters = [
  {title:"A Place to Call Home",subtitle:"Lay the foundations",quests:[["Build a safe starter shelter","main",3],["Secure a reliable food source","main",3],["Craft a full set of iron armour and tools","main",3],["Establish a mine and gather essential ores","main",3],["Create a basic storage area","side",1],["Find a village and make first contact","side",1]]},
  {title:"The Industrial Revolution",subtitle:"Turn survival into infrastructure",quests:[["Build an automatic crop farm","main",3],["Establish a renewable iron supply","main",3],["Create a villager trading hall","main",3],["Set up an enchanting area","main",3],["Build a reliable XP farm","side",1]]},
  {title:"Beyond the Overworld",subtitle:"Make the Nether work for you",quests:[["Build and secure a Nether portal","main",3],["Locate a Nether Fortress","main",3],["Collect blaze rods and Nether wart","main",3],["Brew your first useful potions","main",3],["Establish a safe Nether route or hub","side",1]]},
  {title:"The World Gets Bigger",subtitle:"Explore, map and collect",quests:[["Visit five different biomes","main",3],["Locate a major Overworld structure","main",3],["Build a map room","main",3],["Establish a second settlement or outpost","main",3],["Start a collection display","side",1]]},
  {title:"The Engineer's Empire",subtitle:"Automation on a grand scale",quests:[["Build a centralised storage system","main",3],["Create a dependable gunpowder supply","main",3],["Automate a major resource farm","main",3],["Develop a sustainable villager economy","main",3],["Connect key locations with transport","side",1]]},
  {title:"The Ancient World",subtitle:"Face the End and its secrets",quests:[["Locate and activate the stronghold portal","main",3],["Defeat the Ender Dragon","main",10],["Acquire an Elytra","main",3],["Explore an End City and collect shulker shells","main",3],["Complete a major Trial Chamber challenge","side",1]]},
  {title:"The Ultimate Challenge",subtitle:"Prove your world is ready",quests:[["Defeat the Wither","main",10],["Build and activate a beacon","main",3],["Complete a raid","main",3],["Complete an Ominous Trial","main",3],["Build a dedicated boss arena","side",1]]},
  {title:"The Forever World",subtitle:"There is always another project",quests:[["Build a capital city or central base","main",5],["Create a major transport network","main",5],["Build a museum for rare finds","main",5],["Establish a collection or wildlife sanctuary","side",1],["Survive for 1,000 in-game days","main",25]]}
];
const milestones=["First night survived","First diamonds mined","First Nether journey","First villager trade","First automatic farm","First Netherite item","First stronghold found","Ender Dragon defeated","Elytra acquired","Wither defeated","First beacon activated","1,000 in-game days"];
const ranks=[["Settler",0],["Explorer",25],["Engineer",75],["Master Builder",150],["Conqueror",250],["Legend",400],["Minecraft Royalty",600]];
const KEY="forever-world-progress-v1";
let progress=load();
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{quests:{},milestones:{}}}catch{return{quests:{},milestones:{}}}}
function save(){localStorage.setItem(KEY,JSON.stringify(progress));render()}
function points(){let n=0;chapters.forEach((c,ci)=>c.quests.forEach((q,qi)=>{if(progress.quests[ci+"-"+qi])n+=q[2]}));return n}
function render(){
 const all=chapters.flatMap(c=>c.quests),done=Object.keys(progress.quests).filter(k=>progress.quests[k]).length,p=points();
 document.querySelector("#completed-count").textContent=done+" / "+all.length;
 document.querySelector("#points-count").textContent=p;
 let rank=ranks[0];ranks.forEach(r=>{if(p>=r[1])rank=r});
 document.querySelector("#rank-name").textContent=rank[0];
 const next=ranks.find(r=>r[1]>p);document.querySelector("#next-rank").textContent=next?(next[1]-p)+" points to "+next[0]:"Top rank achieved";
 let current=chapters.findIndex((c,ci)=>c.quests.some((q,qi)=>q[1]==="main"&&!progress.quests[ci+"-"+qi]));
 if(current<0)current=7;
 document.querySelector("#chapter-progress").textContent="Chapter "+(current+1)+" of 8";
 document.querySelector("#chapters").innerHTML=chapters.map((c,ci)=>{
 const count=c.quests.filter((q,qi)=>progress.quests[ci+"-"+qi]).length;
 const locked=ci>0&&chapters[ci-1].quests.some((q,qi)=>q[1]==="main"&&!progress.quests[(ci-1)+"-"+qi]);
 return `<details class="chapter" ${ci===current?"open":""} ${locked?"data-locked=true":""}><summary><span class="chapter-number">${String(ci+1).padStart(2,"0")}</span><span><span class="chapter-title">${c.title}</span><span class="chapter-subtitle">${locked?"Complete the previous chapter to unlock":c.subtitle}</span></span><span class="chapter-status">${locked?"LOCKED":count+"/"+c.quests.length}</span></summary><div class="quest-list">${locked?'<p class="empty-note">This chapter unlocks when the previous chapter’s main quests are complete.</p>':c.quests.map((q,qi)=>{let id=ci+"-"+qi,checked=!!progress.quests[id];return `<div class="quest ${checked?"done":""}"><input type="checkbox" id="q-${id}" data-quest="${id}" ${checked?"checked":""}><label for="q-${id}">${q[0]}<span class="quest-meta">${q[1]==="main"?"MAIN QUEST":"SIDE QUEST"} · ${q[2]} POINTS</span></label></div>`}).join("")}</div></details>`;
 }).join("");
 document.querySelector("#milestones").innerHTML=milestones.map((m,i)=>`<label class="milestone"><input type="checkbox" data-milestone="${i}" ${progress.milestones[i]?"checked":""}> <span>${m}</span></label>`).join("");
}
document.addEventListener("change",e=>{if(e.target.dataset.quest){progress.quests[e.target.dataset.quest]=e.target.checked;save()}if(e.target.dataset.milestone!==undefined){progress.milestones[e.target.dataset.milestone]=e.target.checked;localStorage.setItem(KEY,JSON.stringify(progress))}});
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x===b));document.querySelectorAll(".view").forEach(v=>v.hidden=v.id!==b.dataset.view+"-view")}));
document.querySelector("#export-button").addEventListener("click",()=>{const blob=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),progress},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="forever-world-backup.json";a.click();URL.revokeObjectURL(a.href)});
document.querySelector("#import-file").addEventListener("change",async e=>{const f=e.target.files[0];if(!f)return;try{const data=JSON.parse(await f.text());if(!data.progress||typeof data.progress!=="object")throw Error();progress=data.progress;save();alert("Progress imported successfully.")}catch{alert("That file doesn't look like a valid Forever World backup.")}e.target.value=""});
document.querySelector("#reset-button").addEventListener("click",()=>{if(confirm("Reset all quest and milestone progress on this device? Export a backup first if you want to keep it.")){progress={quests:{},milestones:{}};save()}});
let installPrompt;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;const b=document.querySelector("#install-hint");b.hidden=false;b.onclick=async()=>{installPrompt.prompt();installPrompt=null;b.hidden=true}});
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
render();
