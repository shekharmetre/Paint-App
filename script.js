let tool = document.querySelectorAll(".tool");
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let draw = false;
let slected_tool = "brush";
let selected_Color = "#00000";
let color = document.querySelectorAll(".option");
let width = 5;
let rangeValue = document.querySelector("#slider");
let color_picker = document.getElementById("color_picker");
let pageX, pageY, snap;
let clear = document.getElementById('clear')
let save = document.getElementById('save')


let colorChecker = document.getElementById("colorCheck");
rangeValue.addEventListener("input", () => {
  width = rangeValue.value;
});

color.forEach((element) => {
  element.addEventListener("click", () => {
    document
      .querySelector(".ul_color_list .selected_color")
      .classList.remove("selected_color");
    element.classList.add("selected_color");
    selected_Color = window
      .getComputedStyle(element)
      .getPropertyValue("background-color");
  });
});

window.onload = () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};

canvas.addEventListener("mousemove", (e) => {
  if (!draw) return;
  ctx.lineWidth = width;
  ctx.strokeStyle = selected_Color;
  ctx.putImageData(snap, 0, 0);
  if (slected_tool === "brush") {
    ctx.strokeStyle = selected_Color;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (slected_tool === "eraser") {
    ctx.strokeStyle = "#fff";
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (slected_tool === "rectangle") {
    if (colorChecker.checked) {
      return ctx.fillRect(
        e.offsetX,
        e.offsetY,
        pageX - e.offsetX,
        pageY - e.offsetY
      );
    }
    ctx.strokeRect(e.offsetX, e.offsetY, pageX - e.offsetX, pageY - e.offsetY);
  } else if (slected_tool === "circle") {
    console.log("circle clicked");
    ctx.beginPath();
    let radius = Math.sqrt(
      Math.pow(pageX - e.offsetX, 2) + Math.pow(pageY - e.offsetY, 2)
    );
    ctx.arc(pageX, pageY, radius, 0, 2 * Math.PI);
    if (colorChecker.checked) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  } else if (slected_tool === "triangle") {
    ctx.beginPath();
    ctx.moveTo(pageX, pageY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(2 * pageX - e.offsetX, e.offsetY);
    ctx.closePath();
    if (colorChecker.checked) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
});

canvas.addEventListener("mousedown", (e) => {
  ctx.beginPath();
  pageX = e.offsetX;
  pageY = e.offsetY;
  draw = true;
  ctx.fillStyle = selected_Color;
  snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("mouseup", () => {
  ctx.beginPath();
  draw = false;
});

tool.forEach((elemetns) => {
  elemetns.addEventListener("click", () => {
    document
      .querySelector(".top_tools .active_tool")
      .classList.remove("active_tool");
    elemetns.classList.add("active_tool");
    slected_tool = elemetns.id;
    console.log(slected_tool);
  });
});


clear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

save.addEventListener('click',()=>{
    let dataURL = canvas.toDataURL('image/png');
    let a = document.createElement('a');
    a.href = dataURL;
    a.download = 'image.png';
    a.click();
})