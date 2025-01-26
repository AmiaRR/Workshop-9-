let webcam; 
let ballSystem = [];
let scale = 18;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);

  
  webcam = createCapture(VIDEO, () => {
    console.log("Webcam started.");
  });
  webcam.size(width / scale, height / scale);
  webcam.hide();

  
  for (let y = 0; y < height; y += scale) {
    for (let x = 0; x < width; x += scale) {
      ballSystem.push(new Triangle(x, y, scale));
    }
  }
}

function draw() {
  background(0);

  
  webcam.loadPixels();
  if (webcam.pixels.length > 0) {
    for (let i = 0; i < ballSystem.length; i++) {
      ballSystem[i].show(); 
    }
  }
}

class Triangle { 
  constructor(x, y, r) { 
    this.x = x;
    this.y = y;
    this.r = r;
  }

  show() { 
    let pX = floor(this.x / scale); 
    let pY = floor(this.y / scale); 

    if (pX >= 0 && pX < webcam.width && pY >= 0 && pY < webcam.height) {
      let index = (pY * webcam.width + pX) * 4;
      let red = webcam.pixels[index];
      let green = webcam.pixels[index + 1];
      let blue = webcam.pixels[index + 2];

      fill(red, green, blue);
    } else {
      fill(0); 
    }

    noStroke(); 
    triangle(
      this.x, this.y - this.r / 2, 
      this.x - this.r / 2, this.y + this.r / 2, 
      this.x + this.r / 2, this.y + this.r / 2
    );
  }
}
