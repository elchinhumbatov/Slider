$(document).ready(function () {
  let images = [ "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"];
  let slider = $("#slider");
  let slide = $("#slide");
  let x = 0; let y = -1; let dir = 1; let offset = 0; let param = 0; let t, loader;
  let circle = document.getElementById("pr_circle");
  let radius = circle.r.baseVal.value;
  let s = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${s} ${s}`;
  circle.style.strokeDashoffset = 99;

  function setProgress() {
    if (param == 100) param = 0;
    offset = s - (param / 100) * s;
    circle.style.strokeDashoffset = offset;
    $('text').html(x+1 + '/9');
  }

  slider.click(function (e) {
    if (e.pageX > $(window).width() / 2) { dir = 1; x++; } 
    else { dir = -1; x--; }
    start();
  });

  start();

  function start() {
    param = 0;
    stop();
    show();
    t = setInterval(() => { x++; show(); }, 3000);
    loader = setInterval(() => { param++; setProgress(); }, 30);
  }

  function stop() {
    clearInterval(t);
    clearInterval(loader);
  }

  function show() {
    if (x == images.length) x = 0;
    if (x < 0) x = images.length - 1;
    slide
      .css({
        left: dir * 100 + "%",
        backgroundImage: getPath(),
      })
      .animate({ left: 0 }, 500, () => {
        slider.css("backgroundImage", getPath());
      });

    y = x;  

    if (y == images.length) y = 0;

    //   if (y % 3 == 0) {
    $(".thumb").animate({ left: y * -140 });
    //   }
  }

  function getPath() {
    return "url('img/" + images[x] + "')";
  }

  $(".thumb").append(
    images.map((item) => '<img src="img/' + item + '" />')
  );

  $(".thumb>img").click(function () {
    x = $(this).index();
    start();
  });

  $('.next').click(function() {
    y++;
    if (y == images.length) y = 0;
    $(".thumb").animate({ left: y * -140 });
  });

  $('.prev').click(function() {
    y--;
    if (y == -1) y = images.length-1;
    $(".thumb").animate({ left: y * -140 });
  });

  $('.mini').hover(()=>stop(), ()=>start());

});
