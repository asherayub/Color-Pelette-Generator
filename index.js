const getColorBtn = document.getElementById("get-color");
const SchemeMode = document.getElementById("mode");
const header = document.getElementById("header");

setInterval(() => {
  header.style.color = `#${generateRandomColor()}`;
}, 2000);

getColorBtn.addEventListener("click", () => {
  let colorPicker = document.getElementById("color-picker");
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorPicker.value.slice(
      1
    )}&mode=${SchemeMode.value}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      renderStripes(data);
    });
});

const renderStripes = (data) => {
  document.querySelector(".color__stripes").innerHTML = `
  <div class="stripe__1">
    <div class="color__stripe color__stripe1"></div>
    <p class="stripe__1__hex">${data.colors[0].hex.value}</p>
  </div>
  <div class="stripe__2">
    <div class="color__stripe color__stripe2"></div>
    <p class="stripe__2__hex">${data.colors[1].hex.value}</p>
  </div>
  <div class="stripe__3">
    <div class="color__stripe color__stripe3"></div>
    <p class="stripe__3__hex">${data.colors[2].hex.value}</p>
  </div>
  <div class="stripe__4">
    <div class="color__stripe color__stripe4"></div>
    <p class="stripe__4__hex">${data.colors[3].hex.value}</p>
  </div>
  <div class="stripe__5">
    <div class="color__stripe color__stripe5"></div>
    <p class="stripe__5__hex">${data.colors[4].hex.value}</p>
  </div>
  `;

  document.querySelector(".color__stripe1").style.backgroundColor =
    data.colors[0].hex.value;
  document.querySelector(".color__stripe2").style.backgroundColor =
    data.colors[1].hex.value;
  document.querySelector(".color__stripe3").style.backgroundColor =
    data.colors[2].hex.value;
  document.querySelector(".color__stripe4").style.backgroundColor =
    data.colors[3].hex.value;
  document.querySelector(".color__stripe5").style.backgroundColor =
    data.colors[4].hex.value;
  clickToCopy();
};

const clickToCopy = () => {
  document.querySelectorAll(".color__stripe").forEach((stripe) => {
    stripe.addEventListener("click", (e) => {
      navigator.clipboard.writeText(
        e.path[0].parentElement.querySelector("p").textContent
      );
      alert(
        `Color Code ${
          e.path[0].parentElement.querySelector("p").textContent
        } Copied!`
      );
    });
  });
};

const generateRandomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};
