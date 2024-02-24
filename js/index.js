const login = document.getElementById("login");
const register = document.getElementById("register");

const btnJoinOurChat = document.getElementById("btnJoinOurChat");
const signButton = document.querySelectorAll(".signButton");

const labelEmail = document.getElementById("labelEmail");
const buttonLogin = document.getElementById("buttonLogin");

function checkEmptyinput() {
    buttonLogin.style.opacity = "45";

    if(labelEmail !== ""){
        buttonLogin.style.opacity = "100";
    }
}

function showRegisterAndLogin() {
    register.classList.add("hidden");
    btnJoinOurChat.classList.add("hidden")
  if (login.classList.contains("hidden")) {
    login.classList.remove("hidden");
  } else {
    register.classList.remove("hidden");
    login.classList.add("hidden");
  }
}

signButton.forEach((btn) => {
    btn.addEventListener("click", () => {
        showRegisterAndLogin();
      });
})

btnJoinOurChat.addEventListener("click",() => {
  showRegisterAndLogin();
  headerText.classList.add("hidden")
});




    const words = ["Connect With Tech Enthusiasts From Around The World And Explore The Latest Advancements In Technology Together."];
    const el = document.querySelector("#typewriter");
    const sleepTime = 70; // Adjust this value as needed
    let currWordIndex = 0;

    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };

    const effect = async () => {
        while (true) {
            const currWord = words[currWordIndex];

            for (let i = 0; i < currWord.length; i++) {
                el.innerText = currWord.substring(0, i + 1);
                await sleep(sleepTime);
            }

            await sleep(500);

            if (currWordIndex >= words.length - 1) {
                currWordIndex = 0;
                await sleep(1000);
            } else {
                currWordIndex++;
            }
        }
    };

    effect();

    