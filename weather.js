let apiKey='25f1f9e29ab359612eafc2640440c25c';


async function search(){
    const inp=document.querySelector(selectors='input[type="text"]').value;
    const res=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inp}&limit=5&appid=${apiKey}`)
    const data= await res.json();
    const ul=document.querySelector(selectors="form ul");
    ul.innerHTML="";
    for(let i=0;i<data.length;i++){
        const {name,lat,lon,state}=data[i]
        ul.innerHTML+=`<li 
        data-lat="${lat}"
        data-lon="${lon}"
        data-name="${name}"
        >${name} <span>${state}</span></li>`
    }
    // console.log(data)
}
const dbSearch=_.debounce(()=>{
    search()
},1000)


async function showWeather(name,lat,lon){
 const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

 const data=await res.json();
 const temp=Math.round(data.main.temp);
 const feels=Math.round(data.main.feels_like);
 const humidity=data.main.humidity;
 const wind=data.wind.speed;
 const icon=data.weather[0].icon;
console.log(data)
 document.getElementById("city").innerHTML=name;
 document.getElementById("wind").innerHTML=wind+`<span>km/h</sapn>`;
 document.getElementById("humidity").innerHTML=humidity+`<span>%</span>`;
 document.getElementById("feel").innerHTML=feels+`<span>&#8451;</span>`;
 document.getElementById("degree").innerHTML=temp+`<span>&#8451;</span>`;
 document.getElementById("icon").src=`https://openweathermap.org/img/wn/${icon}@4x.png`;

 document.querySelector("form").style.display="none";
 document.getElementById('weather').style.display="block";
 

//  console.log(temp,feels,humidity,icon,wind)
}
document.querySelector(selectors='input[type="text"]')
.addEventListener(type='keyup',dbSearch)

document.body.addEventListener("click",(e)=>{
const li=e.target;
const {name,lat,lon}=li.dataset;
localStorage.setItem("lat",lat);
localStorage.setItem("lon",lon);
localStorage.setItem("name",name)
if(!lat){
    return;
}
showWeather(name,lat,lon)
})

const btn=document.getElementById("change");
btn.addEventListener("click",()=>{
    document.querySelector("form").style.display="block";
    document.getElementById('weather').style.display="none";
})
document.body.onload=()=>{
    if(localStorage.getItem(key="lat")){
        const lat=localStorage.getItem("lat")
        const lon=localStorage.getItem("lon");
        const name=localStorage.getItem("name");
        showWeather(name,lat,lon);
        }
}