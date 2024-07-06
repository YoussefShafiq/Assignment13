/// <reference types="../@types/jquery" />


$('.acc-head').on('click', function () {
    $('.acc-body').not($(this).next()).slideUp(400);
    $(this).next().slideToggle(400);
});

$('.defaultsec').next().slideDown(600);
// $(window).on('scroll', () => {
//     let scrolltop = $(window).scrollTop()
//     console.log(scrolltop);
//     if (scrolltop > 300) {
//         setTimeout(() => {
//         })
//     }
// })





// $('.acc-head').on('mouseleave', function () {
//     $('.acc-body').not($(this).next()).slideUp(400);
//     $(this).next().slideToggle(400);
// });



$('.section').on('click', function () {
    console.log('hello');
    setTimeout(() => {
        $(this).animate({ width: "800px" }, 200)
    }, 1000);
})

$('#closeicon').on('click', function () {
    $('.sidenav').animate({ width: `0` }, 500)
    $('.show').animate({ left: `0px` }, 500)
})

$('.show').on('click', function () {

    $('.sidenav').animate({ width: `200` }, 500)
    $('.show').animate({ left: `200px` }, 500)
})
const audio = new Audio('../images/mixkit-urgent-simple-tone-loop-2976.wav');

let sec = 0;

$('#timerstart').on('click', function () {
    sec = $('#timerinput').val()
    if ($('#timerinput').val()) {
        if ($('#timerinput').val() > 0) {
            $('.timer').text(sec)
            // console.log(sec);
            var refreshId = setInterval(() => {
                sec--
                if (sec < 0) {
                    audio.play();
                    clearInterval(refreshId);
                } else {
                    $('.timer').text(sec)
                }
            }, 1000)
        } else {
            console.log($('#timerinput').val());
            alert('enter positive number of seconds')
        }

    } else {
        alert('enter time')
    }

})

$('#mute').on('click', function () {
    audio.pause()
})

$('#reset').on('click', function () {
    $('#timerinput').val('')
})

$('#stop').on('click', function () {
    sec = 0;
    $('#timerinput').val('');
    $('.timer').text('00')
})



function startCountdown(days, hours, minutes, seconds) {
    let totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;

    function updateCountdown() {
        if (totalSeconds <= 0) {
            clearInterval(interval);
            $('#sec').text('0')
            return;
        }

        let d = Math.floor(totalSeconds / 86400);
        let h = Math.floor((totalSeconds % 86400) / 3600);
        let m = Math.floor((totalSeconds % 3600) / 60);
        let s = Math.floor(totalSeconds % 60);

        $('#days').text(d)
        $('#hours').text(h)
        $('#min').text(m)
        $('#sec').text(s)

        totalSeconds--;
    }

    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
}

function datecountdown(timeDifference) {
    let d = timeDifference.days;
    let h = timeDifference.hours;
    let m = timeDifference.minutes;
    let s = timeDifference.seconds;
    startCountdown(d, h, m, s)
}

function calculateTimeDifference(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);

    if (target <= now) {
        return "The target date must be in the future.";
    }

    const totalSeconds = Math.floor((target - now) / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}
let interval;
$('.seetime').on('click', function () {
    clearInterval(interval);
    let targettime = $(this).attr('date')
    const timeDifference = calculateTimeDifference(targettime);
    datecountdown(timeDifference)
    console.log(targettime);
})

datecountdown(calculateTimeDifference('2024-07-14T23:59:59'))





$('#message').on('input', function () {
    let val = $('#message').val()
    let len = val.length
    let remaining = 100 - len
    if (remaining >= 0) {
        $('#messagecounter').text(remaining)
    }
    console.log(len);
})

console.log($('#duration').offset().top);



$('.navitem').on('click', function () {
    $('.navitem').removeClass('active')
    $(this).addClass('active')
    let ahref = $(this).attr('href')
    let sectionoffset = $(ahref).offset().top
    $('html, body').animate({ scrollTop: sectionoffset }, 0);
})