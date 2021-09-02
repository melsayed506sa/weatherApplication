/* Global Variables */
const zipInput = document.getElementById('zip');
const feelingArea = document.getElementById('feelings');
const generateButton = document.getElementById('generate');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');


/* Function to GET Web API Data*/
const  getAPIData= async (url='',zipCode,countery,apiKey)=>{
    const response = await fetch(`${url}zip=${zipCode},${countery}&appid=${apiKey}`);
    try{
        const fetchedData = await response.json();
        return fetchedData;
    }
    catch(err){
        console.log("error",err);
    }
};
/* Function to POST data */
const  postToProjectData= async(url='',data={})=>{
    const request = await fetch(url,
        {
            method:'POST',
            credentials:'same-origin',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        });
    try{
        const fetchedData = await request.json();
        return fetchedData;
    }
    catch(err){
        console.log("error",err);
    }
};

/* Function to GET Project Data */
const  getProjectData= async(url='')=>{
    const response = await fetch(url);
    try{
        const fetchedData = await response.json();
        return fetchedData;
    }catch(err){
        console.log("error",err);
    }
};
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'/'+ d.getDate()+'/'+ d.getFullYear();


// Personal API Key for OpenWeatherMap API
const apiKey = 'a3a063e0c9a8c81e6767bf32ec8f188e&units=metric';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const countery = 'us';
let zipCode = '';

// Event listener to add function to existing HTML DOM element
generateButton.addEventListener('click',generateData);
/* Function called by event listener */
function generateData(eve){
    zipCode=zipInput.value;
    getAPIData(baseUrl,zipCode,countery,apiKey) //fetch the data from the Openweather api
        .then(data=>{
            console.log(data); 
            postToProjectData('http://localhost:5000/addProjectData',data);}) // move the data to the projectData in the server side
        .then(()=>{
            return getProjectData('http://localhost:5000/getProjectData');}) //get the data from serverSide 
        .then(data=>{ // data returned from the getProjectData function
            if(data.cod ==='404'){
                date.innerHTML=`<h1 style='color:red; transition:all 0.5s;'>try again</h1>`
                temp.innerHTML=``;
                content.innerHTML=``;
            }
            else{
            date.innerHTML=`<h3>Date is:- <span style="color:red;">${newDate}</span></h3>`;
            temp.innerHTML=`<h3>Temperature is:-<span style="color:red;">${data['main']['temp']} °C</span></h3>`;
            content.innerHTML =`
            <h3>Feeling today:- <span style="color:red;">${feelingArea.value}</span></h3>
            <h3>Countery is <span style="color:red;">${countery}</span></h3> 
            <h3>Weather is <span style="color:red;">${data['weather']['0']['description']}</span></h3>
            <h3>Location is in <span style="color:red;">${data['name']}</span></h3>`;
            }
        });
}