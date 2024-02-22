const login = document.getElementById("login");
const register = document.getElementById("register");

const btnJoinOurChat = document.getElementById("btnJoinOurChat");
const signButton = document.querySelectorAll(".signButton");

const labelEmail = document.getElementById("labelEmail");
const buttonLogin = document.getElementById("buttonLogin");

function chickEmptyinput() {
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
