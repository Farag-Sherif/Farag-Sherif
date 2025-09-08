//loading page
window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.style.display = "none";
});
//text animation
const displayText = document.querySelector(".displayText");
const textsToDisplay = ['Frontend Developer', 'Web Designer', 'React JS Developer', 'JavaScript Lover'];
let currentTextIndex = 0;

function displayNewText() {
  const textToDisplay = textsToDisplay[currentTextIndex];
  displayText.textContent = '';

  for (let i = 0; i < textToDisplay.length; i++) {
    const span = document.createElement('span');
    span.textContent = textToDisplay[i];
    displayText.appendChild(span);
  }

  currentTextIndex = (currentTextIndex + 1) % textsToDisplay.length;
}

displayNewText();
setInterval(displayNewText, 5000);
//header scroll bg change
let currentPosition = 0;
window.addEventListener("scroll", function () {
  let scrollPosition = window.scrollY;
  const header = document.querySelector("header");
  if (scrollPosition === 0) {
    header.classList.remove("bg-gray-900", "backdrop-blur", "bg-opacity-30", "shadow-lg");
    header.style.transform = "translateY(0%)";
  }
  else {
    if (scrollPosition > currentPosition) {
      header.classList.add("bg-gray-900", "backdrop-blur", "bg-opacity-30", "shadow-lg");
      header.style.transform = "translateY(0%)";
      currentPosition = scrollPosition;
    } else if (scrollPosition < currentPosition) {
      header.style.transform = "translateY(-100%)";
      currentPosition = scrollPosition;
    }
  }
});


// active link in header
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".links a");

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPosition >= sectionTop - sectionHeight / 3 && scrollPosition < sectionTop + sectionHeight - sectionHeight / 3) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === sectionId) {
          link.classList.add("active");
        }
      });
    }
    if(scrollPosition === 0){
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "index.html") {
          link.classList.add("active");
        }
      });
    }
  });
});
//send email js
function sendEmail() {
  Email.send({
    SecureToken: "f4f4e8b3-2d3c-4d0e-8c7d-6f3b8f5e6a1b",
    To: 'farag.sherif500@gmail.com',
    From: document.getElementById("email").value,
    Subject: "New Contact Form Enquiry",
    Body: "Name: " + document.getElementById("name").value
      + "<br> Email: " + document.getElementById("email").value
      + "<br> Message: " + document.getElementById("message").value
  }).then(
    message => alert("Message Sent Successfully")
  );
}
