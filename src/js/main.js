



function skills() {
    const skill=document.querySelector(".slider_skills");
    const list=document.querySelectorAll(".slider_skills img");
    const images = Array.from(list)
    .map(element => element.getAttribute("src"));
    console.log(images);
    let count = 0;
let html = `<img src="${images[count]}" alt="hard skill">`;
skill.innerHTML = html;
const prev = document.querySelector(".btn_prev");
const next = document.querySelector(".btn_next");
prev.addEventListener("click",()=>{
    clearInterval(interval);
    if(0<count){
        count--;
    }else{
        count=images.length-1
    } 
    html = `<img src="${images[count]}" alt="hard skill">`;
    skill.innerHTML = html;
});
next.addEventListener("click",()=>{
    clearInterval(interval);
    if(count < images.length-1){
        count++;
    }else{
        count = 0;
    } 
    html = `<img src="${images[count]}" alt="hard skill">`;
    skill.innerHTML = html;
});
 const interval = setInterval(() => {
    if(count < images.length-1){
        count++;
    }else{
        count = 0;
    } 
    html = `<img src="${images[count]}" alt="hard skill">`;
    skill.innerHTML = html;
}, 3000);
}
function mode() {
    const body = document.querySelector("body")
    const btn = document.querySelector(".icon_mode");
    const icon = document.querySelector(".icon_mode ion-icon");
    const iframe = document.querySelector(".header iframe");
    const link = iframe.contentDocument.querySelector("link");
    btn.addEventListener("click", ()=>{
        body.classList.toggle("dark");
        if (icon.name==="sunny") {
            icon.name = "moon";
        }else{
            icon.name = "sunny";
        }
        if (link.getAttribute("href")==="./src/particles/dark.css" ) {
            link.href = "./src/particles/bright.css"
        }else{
            link.href = "./src/particles/dark.css"
        }
    });
}
function sound() {
    const btn = document.querySelector(".icon_volume");
    const icon = document.querySelector(".icon_volume ion-icon");
    const audio = document.querySelector(".icon_volume audio");
    btn.addEventListener("click",() => {
        if (icon.name==="volume-mute") {
            icon.name = "volume-high";
        }else{
            icon.name = "volume-mute";
        }
        if (audio.paused) {
            audio.play();
        }else{
            audio.pause();
        }
    })
}
async function getApi() {
    const url = "https://fundametos-api-porfolios-dev-exsn.2.ie-1.fl0.io/api/v1/projects";
    try {
        const data = await fetch(url)
        const res = await data.json();
        return res;
    } catch (error) {
        console.log(error);
    }
}
function printProjects(projects) {
    const list = document.querySelectorAll(".splide__slide");
    projects.forEach((project , i) =>{
        console.log(project);
        const { descripcion, image, tecnologias, titulo, description,technologies, title} = project;
        const html= 
        `<div>
        <h3>${titulo}</h3>
            <p>${descripcion}</p>
            <p>${tecnologias}</p>
        </div>
         <figure>
            <img src="${image}" alt="slider item">
        </figure>`;
        list[i].innerHTML = html;
    })
};
function slider() {
    const splide = new Splide( '.splide' , {
        type   : 'loop',
        autoplay:true,
        breakpoints: {
            849: {
                direction: "ttb",
                height:"65vh"
            },
      }
    });
    splide.mount();
    }

async function main() {
    const projects = await getApi();
    printProjects(projects);
    skills();
    mode();
    sound();
    slider();
   
}
main();