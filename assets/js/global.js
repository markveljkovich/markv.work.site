/* Easing
======================================== */
const
	ease    = $.bez([0.17, 0, 0.83, 1]),
	speed   = 300;

/* Height viewport
======================================== */
function heights() {
    const root = document.documentElement;
    root.style.setProperty('--h', window.innerHeight + 'px');
    root.style.setProperty('--menu', document.querySelector('#sa_menu')?.offsetHeight + 'px');
}


/* Clock
======================================== */
function clock() {
    const timeInSpain = new Date().toLocaleTimeString("en-GB", { timeZone: "Europe/Madrid" });
    $('#clock').text(timeInSpain);
}


/* About
======================================== */
$("#info_toggle").click(function(){
    $("#about").fadeToggle(speed, ease, function() {
        if ($(this).is(":visible")) {
            $("html").attr("data-about", "open");
        } else {
            $("html").attr("data-about", "closed");
        }
    });
    
    $("#sa_menu").toggleClass('transparent');
    
    var buttonText = $(this).text() == "About" ? "(Close)" : "About";
    $(this).text(buttonText);
});


/* Page Transitions
======================================== */
const faders = $(".fader");

faders.on("click", function (event) {
    if (!$(this).attr("target")) {
        event.preventDefault();
        const href = $(this).attr("href");
        $('#loader').fadeIn(speed, function() {
            window.location.href = href;
        });
    }
});

$(window).on("pageshow", function (event) {
    if (event.originalEvent.persisted) {
        $('#loader').fadeOut(speed);
    }
});

/* Lazy Videos
======================================== */
const lazyVideos = document.querySelectorAll('video.lazy');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const video = entry.target;

            // Attempt to autoplay
            video.play().then(() => {
                // Autoplay started
                video.classList.remove('lazy');
                video.classList.add('lazyloaded');
                console.log('video loaded');
            }).catch(err => {
                // Autoplay failed (e.g., browser restrictions)
                console.warn('Autoplay failed:', err);
            });

            observer.unobserve(video);
        }
    });
});

lazyVideos.forEach(video => {
    observer.observe(video);
});


/* Init
======================================== */
heights(); clock();
setInterval(clock, 1000);

setTimeout(function() {
	$('#loader').fadeOut(speed);
}, speed, ease);


/* Resize
======================================== */
$(window).resize(function(){
	heights();
});


/* Lenis
======================================== */
const lenis = new Lenis({
    autoRaf: true,
});

$("#btt").click(function() {
    lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    });
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);