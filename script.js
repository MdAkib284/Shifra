let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")

function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak)
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    let minutes = day.getMinutes();

    // Time ko readable banane ke liye
    let ampm = hours >= 12 ? "PM" : "AM";
    let displayHour = hours % 12;
    displayHour = displayHour ? displayHour : 12; // 0 ko 12 banane ke liye
    let displayMinutes = minutes < 10 ? "0" + minutes : minutes;

    let currentTime = `${displayHour}:${displayMinutes} ${ampm}`;

    if (hours >= 0 && hours < 12) {
        speak(`Good Morning Sir, the time is ${currentTime}`);
    } 
    else if (hours >= 12 && hours < 17) {
        speak(`Good Afternoon Sir, the time is ${currentTime}`);
    } 
    else if (hours >= 17 && hours < 22) {
        speak(`Good Evening Sir, the time is ${currentTime}`);
    } 
    else {
        speak(`Good Night Sir, the time is ${currentTime}`);
    }
}

window.addEventListener('load', () => {
    wishMe();
});
let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition
let recognition =new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display="none"
    voice.style.display="block"
})
function takeCommand(message){
    btn.style.display="flex"
     voice.style.display="none"
    if(message.includes("hello")||message.includes("hey")){
        speak("hello sir,what can i help you?")
    }
    else if(message.includes("who are you")){
        speak("i am virtual assistant ,created by  Muhammad Aqib sir")
    }else if(message.includes("open youtube")){
        speak("opening youtube....")
        window.open("https://www.youtube.com/","_blank")
    }
    else if(message.includes("open google")){
        speak("opening google....")
        window.open("https://www.google.com/","_blank")
    }
    else if(message.includes("open facebook")){
        speak("opening facebook....")
        window.open("https://www.facebook.com/","_blank")
    }
    else if(message.includes("open instagram")){
        speak("opening instagram....")
        window.open("https://www.instagram.com/","_blank")
    }
    else if(message.includes("open calculator")){
        speak("opening  calculator....")
        window.open("calculator://")
    }
    else if(message.includes("open whatsapp")){
        speak("opening whatsapp...")
        window.open("whatsapp://")
    }
    else if(message.includes("time")){
        let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }
     else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
    }
    else{
        let finalText="This is what i found on internet regarding" + message.replace("shipra","") || message.replace("shifra","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("shipra","")}`,"_blank")
    }
}
