const ADMIN_USER = "hanbu22";
const ADMIN_PASS = "hanbu22vn@";

function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if(user === ADMIN_USER && pass === ADMIN_PASS){
        localStorage.setItem("loggedIn","true");

        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("chatScreen").style.display = "block";
    }
    else{
        document.getElementById("loginError").innerText =
            "Invalid username or password";
    }
}

function logout(){
    localStorage.removeItem("loggedIn");
    location.reload();
}

window.onload = () => {
    if(localStorage.getItem("loggedIn") === "true"){
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("chatScreen").style.display = "block";
    }
};

async function sendMessage(){

    const input = document.getElementById("messageInput");

    const message = input.value.trim();

    if(!message) return;

    const chatBox = document.getElementById("chatBox");

    chatBox.innerHTML += `
        <div class="user">${message}</div>
    `;

    input.value = "";

    try{

        const response = await fetch("/.netlify/functions/chat",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                message
            })
        });

        const data = await response.json();

        chatBox.innerHTML += `
            <div class="bot">${data.reply}</div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    }catch(err){

        chatBox.innerHTML += `
            <div class="bot">Error connecting to AI.</div>
        `;

    }
}
