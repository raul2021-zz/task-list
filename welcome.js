const buttons = document.querySelectorAll('button[type="submit"]');
buttons.forEach(
  function(button) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      setMsg("");
      const action = e.target.getAttribute("action");
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      console.log(email, password, action);
      if (action == "register") {
        register(email, password);
      } else {
        login(email, password);
      }
    });
  }
);

async function register(email, password) {
  let error = null;
  await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    handleError(error.message);
    error = error.code;
  }).finally(function() {
    if (error) {
      window.location.replace("tasklist.html");
    }
  });
}

async function login(email, password) {
  let error = null;
  await firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    handleError(error.message);
    error = error.code;
  }).finally(function() {
    if (error) {
      window.location.replace("tasklist.html");
    }
  });
}

function handleError(errorMessage) {
  let message = document.getElementById("message");
  setMsg(errorMessage);
  message.style.color = "red";
}

function setMsg(text) {
  message.textContent = text;
}