<canvas id="canvas"></canvas>
    <script>
    const canvasEl = document.querySelector('#canvas');

    const l = canvasEl.width = window.innerWidth;
    const f = canvasEl.height = window.innerHeight * 2;

    function loop() {
      requestAnimationFrame(loop);
    	ctx.clearRect(0,0,l,f);

      confs.forEach((conf) => {
        conf.update();
        conf.draw();
      })
    }

    function Confetti() {
      const colours = ['cyan', 'lime', 'fuchsia','yellow'];

      this.x = Math.round(Math.random() * l);
      this.y = Math.round(Math.random() * f)-(f/2);
      this.rotation = Math.random()*360;

      const size = Math.random()*(l/60);
      this.size = size < 15 ? 15 : size;

      this.color = colours[Math.floor(colours.length * Math.random())];

      this.speed = this.size/7;

      this.opacity = Math.random();

      this.shiftDirection = Math.random() > 0.5 ? 1 : -1;
    }

    Confetti.prototype.border = function() {
      if (this.y >= f) {
        this.y = f;
      }
    }

    Confetti.prototype.update = function() {
      this.y += this.speed;

      if (this.y <= f) {
        this.x += this.shiftDirection/5;
        this.rotation += this.shiftDirection*this.speed/100;
      }

      this.border();
    };

    Confetti.prototype.draw = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, this.rotation, this.rotation+(Math.PI/2));
      ctx.lineTo(this.x, this.y);
      ctx.closePath();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.fill();
    };

    const ctx = canvasEl.getContext('2d');
    const confNum = Math.floor(l / 3);
    const confs = new Array(confNum).fill().map(_ => new Confetti());

    loop();


    </script>
