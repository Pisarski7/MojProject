

$(document).ready(function () {
    $(window).scroll(function () {
        let scroll = $(window).scrollTop();
        if (scroll > 0) {
            $(".color").css("background", "rgba(0,0,0,0.4)");
        }

        else {
            $(".color").css("background", "");
        }
    })
})
 var canvas = document.querySelector('canvas');
        var c = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        var particleCount = 350;
        var mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };

        window.addEventListener("mousemove", function (event) {
            mouse.x = event.clientX - canvas.width / 2;
            mouse.y = event.clientY - canvas.height / 2;
        });

        window.addEventListener("resize", function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            lightParticles = [];
            initializeParticles();
        });


        function LightParticle(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;

            this.update = function () {

                this.draw();
            };

            this.draw = function () {
                c.save();
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                c.shadowColor = this.color;
                c.shadowBlur = 15;
                c.shadowOffsetX = 0;
                c.shadowOffsetY = 0;
                c.fillStyle = this.color;
                c.fill();
                c.closePath();
                c.restore();
            };
        }

        var lightParticles = [];

        var timer = 0;
        var opacity = 1;
        var speed = 0.0002;
        var colors = [
            "#0952BD",
            "#A5BFF0",
            "#118CD6",
            "#1AAEE8",
            "#F2E8C9"
        ];

        var initializeParticles;

        (initializeParticles = function () {
            for (var i = 0; i < particleCount; i++) {

                var randomColorIndex = Math.floor(Math.random() * 6);
                var randomRadius = Math.random() * 2;

                // Ensure particles are spawned past screen width and height so
                // there will be no missing stars when rotating canvas
                var x = (Math.random() * (canvas.width + 200)) - (canvas.width + 200) / 2;
                var y = (Math.random() * (canvas.width + 200)) - (canvas.width + 200) / 2;
                lightParticles.push(new LightParticle(x, y, randomRadius, colors[randomColorIndex]));
            }
        })();

        function animate() {
            window.requestAnimationFrame(animate);

            c.save();
            if (isMouseDown === true) {

                // Ease into the new opacity
                var desiredOpacity = 0.01;
                opacity += (desiredOpacity - opacity) * 0.03;
                c.fillStyle = "rgba(18, 18, 28," + opacity + ")";

                // Ease into the new speed
                var desiredSpeed = 0.012;
                speed += (desiredSpeed - speed) * 0.01;
                timer += speed;

            } else {

                // Ease back to the original opacity
                var originalOpacity = 1;
                opacity += (originalOpacity - opacity) * 0.01;
                c.fillStyle = "rgba(18, 18, 28, " + opacity + ")";

                // Ease back to the original speed
                var originalSpeed = 0.001;
                speed += (originalSpeed - speed) * 0.01;
                timer += speed;


            }

            c.fillRect(0, 0, canvas.width, canvas.height);
            c.translate(canvas.width / 2, canvas.height / 2);
            c.rotate(timer);

            for (var i = 0; i < lightParticles.length; i++) {
                lightParticles[i].update();
            }

            c.restore();


        }

        var isMouseDown = false;

        window.addEventListener("mousedown", function () {
            isMouseDown = true;
        });


        window.addEventListener("mouseup", function () {
            isMouseDown = false;
        });

        animate();
        var TxtType = function (el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        };

        TxtType.prototype.tick = function () {
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

            var that = this;
            var delta = 200 - Math.random() * 100;

            if (this.isDeleting) { delta /= 2; }

            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
            }

            setTimeout(function () {
                that.tick();
            }, delta);
        };

        window.onload = function () {
            var elements = document.getElementsByClassName('typewrite');
            for (var i = 0; i < elements.length; i++) {
                var toRotate = elements[i].getAttribute('data-type');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtType(elements[i], JSON.parse(toRotate), period);
                }
            }
            // INJECT CSS
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
            document.body.appendChild(css);
        };
        AOS.init();
        