function load_greetings() {
    $.post(SITE + "themes/default/async/greetings.php", function(e) {
        $("#greetings").html(e.greets);
        $("#hl-status").html(e.hkln)
    }, "json")
}

function start_welcomemsg(e) {
    if (logged_username != "") { e = logged_username; }
    $("body").append('<div id="welcome" style="display: none;"><h2>Welcome, ' + e + '</h2><p class="help-block">You are on hacklover.net</div></div>');
    $("#welcome").fadeIn(1200, function() {
        setTimeout(function() {
            $("#welcome").fadeOut(1e3, function() {
                $("#header h2, #menu, #links, #window-page").fadeIn();

                console.log('aho');
                $("#window-wall").fadeIn();
                open_window("window-wall")
            })
        }, 2e3)
    })
}

function focus_window(e) {
    $(".window").each(function() {
        $(this).css("z-index", 50)
    });
    $("#" + e).css({
        "z-index": 100
    })
}

function open_window(e) {
    $("#" + e).toggleClass("hidden");
    var t = e.replace("window-", "");
    $("#menu li[data-window=" + t + "]").addClass("active");
    if (localStorage[e]) {
        var n = localStorage[e].split(",");
        localStorage[e] = n[0] + "," + n[1] + "," + "1"
    } else {
        if (e == "window-wall") {
            $("#" + e).css("top", 20);
            $("#" + e).css("right", 20)
        }
        if (e == "window-console") {
            $("#" + e).css("top", "auto");
            $("#" + e).css("bottom", 50);
            $("#" + e).css("right", 20)
        }
        if (e == "window-projects") {
            $("#" + e).css("top", 20);
            $("#" + e).css("left", 170)
        }
        /*
        if (e == "window-opo") {
            $("#" + e).css("top", 260);
            $("#" + e).css("left", 170)
        }
        */
        var r = $("#" + e).offset();
        localStorage[e] = r.top + "," + r.left + "," + "1"
    }
    focus_window(e)
}

function close_window(e) {
    $("#" + e).addClass("hidden");
    var t = e.replace("window-", "");
    $("#menu li[data-window=" + t + "]").removeClass("active");
    if (localStorage[e]) {
        var n = localStorage[e].split(",");
        localStorage[e] = n[0] + "," + n[1] + "," + "0"
    } else {
        var r = $("#" + e).offset();
        localStorage[e] = r.top + "," + r.left + "," + "0"
    }
}
$(document).ready(function() {
    $("[data-toggle=tooltip]").tooltip();

    if (localStorage["window-console"]) {
        var e = localStorage["window-console"].split(",");
        if (parseInt(e[2]) == 1) {
            $("#window-console").removeClass("hidden");
            $("#menu li[data-window=console]").addClass("active")
        }
        $("#window-console").css({
            top: parseInt(e[0]),
            left: parseInt(e[1])
        })
    }
    if (localStorage["window-wall"]) {
        var e = localStorage["window-wall"].split(",");
        if (parseInt(e[2]) == 1) {
            $("#window-wall").removeClass("hidden");
            $("#menu li[data-window=wall]").addClass("active")
        }
        $("#window-wall").css({
            top: parseInt(e[0]),
            left: parseInt(e[1])
        })
    }
    if (localStorage["window-projects"]) {
        var e = localStorage["window-projects"].split(",");
        if (parseInt(e[2]) == 1) {
            $("#window-projects").removeClass("hidden");
            $("#menu li[data-window=projects]").addClass("active")
        }
        $("#window-projects").css({
            top: parseInt(e[0]),
            left: parseInt(e[1])
        })
    }
    if (localStorage["window-page"]) {
        var e = localStorage["window-page"].split(",");
        if (parseInt(e[2]) == 1) {
            $("#window-page").removeClass("hidden")
        }
        $("#window-page").css({
            top: parseInt(e[0]),
            left: parseInt(e[1])
        })
    }
    if (localStorage["window-opo"]) {
        var e = localStorage["window-opo"].split(",");
        if (parseInt(e[2]) == 1) {
            $("#window-opo").removeClass("hidden")
        }
        $("#window-opo").css({
            top: parseInt(e[0]),
            left: parseInt(e[1])
        })
    }
    var t = $(window).height();
    var n = $(window).width();
    $(".window").each(function() {
        var e = $(this).offset();
        var r = $(this).height();
        var i = $(this).width();
        if (e.top + r > t) {
            $(this).css("top", "auto");
            $(this).css("bottom", 20)
        }
        if (e.left + i > n) {
            $(this).css("left", "auto");
            $(this).css("right", 20)
        }
        if (e.top < 0) {
            $(this).css("top", 20)
        }
        if (e.left < 0) {
            $(this).css("left", 20)
        }
    });
    $(".window").draggable({
        handle: ".nav",
        containment: "body",
        start: function() {
            focus_window($(this).attr("id"))
        },
        stop: function(e, t) {
            if ($(this).hasClass("hidden")) {
                var n = 0
            } else {
                var n = 1
            }
            var r = t.position.top + "," + t.position.left + "," + n;
            localStorage[$(this).attr("id")] = r
        }
    });
    $(".window").click(function() {
        var e = $(this).attr("id");
        focus_window(e)
    });
    $(".window .window-btn li").click(function() {
        $(this).closest(".window").attr("id");
        close_window($(this).closest(".window").attr("id"))
    });
    $("#menu li").click(function() {
        var e = $(this).data("window");
        if ($("#window-" + e).hasClass("hidden")) {
            open_window("window-" + e);
            focus_window("window-" + e)
        } else {
            close_window("window-" + e)
        }
        if (e == "console") {
            if ($("#window-console").hasClass("hidden")) {
                load_terminal(false)
            } else {
                load_terminal(true)
            }
        }
    });
    if ($(".vote_website").length > 0) {
        $.post(SITE + "themes/default/async/vote_website.php", {
            read: 1
        }, function(e) {
            $(".vote_website .span6").removeClass("selected");
            $(".vote_website ." + e.votoscelto).addClass("selected");
            if (e.countY) {
                $(".vote_website .green .nvote").text(e.countY)
            }
            if (e.countN) {
                $(".vote_website .red .nvote").text(e.countN)
            }
            if (e.show_votes == true) {
                $(".nvote").animate({
                    opacity: 1
                }, 1e3)
            }
        }, "json")
    }
    $(".vote_website .span6").click(function() {
        if ($(this).hasClass("green")) {
            tipo = "y"
        }
        if ($(this).hasClass("red")) {
            tipo = "n"
        }
        if (tipo) {
            $.post(SITE + "themes/default/async/vote_website.php", {
                tipo: tipo
            }, function(e) {
                if (e.voto == "y") {
                    $(".vote_website .span6").removeClass("selected");
                    $(".vote_website .green").addClass("selected");
                    $(".vote_website .green .nvote").text(e.countY).slideDown();
                    $(".vote_website .red .nvote").text(e.countN).slideDown()
                }
                if (e.voto == "n") {
                    $(".vote_website .span6").removeClass("selected");
                    $(".vote_website .red").addClass("selected");
                    $(".vote_website .green .nvote").text(e.countY).slideDown();
                    $(".vote_website .red .nvote").text(e.countN).slideDown()
                }
            }, "json")
        }
    });
    if ($("#greetings").length > 0) {
        load_greetings();
        var r = setInterval(function() {
            load_greetings()
        }, 5e3)
    }
    $(".slidetxt_header .n3").rainbow({
        colors: ["#ff5b5b", "#f28922", "#fff200", "#ece134", "#67bd45", "#28abe2", "#5688db", "#b279f9"],
        animate: true,
        animateInterval: 180,
        pad: false,
        pauseLength: 100
    })
});
(function(e) {
    e.fn.rainbow = function(t) {
        this.each(function() {
            t.originalText = e(this).html();
            t.iterations = 0;
            if (!t.pauseLength) {
                t.pauseLength = t.animateInterval
            }
            e(this).data("options", t);
            if (t.pad) {
                for (x = 0; x < t.originalText.length; x++) {
                    t.colors.unshift(t.colors[t.colors.length - 1])
                }
            }
            e.fn.rainbow.render(this)
        })
    };
    e.fn.pauseRainbow = function() {
        this.each(function() {
            var t = e(this).data("options");
            if (t) {
                t.animate = false;
                e(this).data("options", t)
            }
        })
    };
    e.fn.resumeRainbow = function() {
        this.each(function() {
            var t = e(this).data("options");
            if (t) {
                t.animate = true;
                e(this).data("options", t);
                e.fn.rainbow.render(this)
            }
        })
    };
    e.fn.rainbow.render = function(t) {
        var n = e(t).data("options");
        var r = n.originalText.split("");
        n.iterations++;
        var i = "";
        var s = 0;
        for (var o in r) {
            if (r[o] != " ") {
                i = i + '<span style="color: ' + n.colors[s] + ';">' + r[o] + "</span>";
                s++
            } else {
                i = i + " "
            }
            if (s >= n.colors.length) {
                s = 0
            }
        }
        e(t).html(i);
        var u = n.iterations % n.colors.length == 0;
        if (n.animate) {
            (function(t, n) {
                var r = e(t).data("options");
                var i = setTimeout(function() {
                    e.fn.rainbow.shift(t)
                }, n);
                r.interval = i;
                e(t).data("options", r)
            })(t, u ? n.pauseLength : n.animateInterval)
        }
    };
    e.fn.rainbow.shift = function(t) {
        var n = e(t).data("options");
        var r = n.colors.pop();
        n.colors.unshift(r);
        e.fn.rainbow.render(t)
    };
    e.fn.drags = function(t) {
        t = e.extend({
            handle: "",
            cursor: "move"
        }, t);
        if (t.handle === "") {
            var n = this
        } else {
            var n = this.find(t.handle)
        }
        return n.css("cursor", t.cursor).on("mousedown", function(n) {
            if (t.handle === "") {
                var r = e(this).addClass("draggable")
            } else {
                var r = e(this).addClass("active-handle").parent().addClass("draggable")
            }
            var i = r.css("z-index"),
                s = r.outerHeight(),
                o = r.outerWidth(),
                u = r.offset().top + s - n.pageY,
                a = r.offset().left + o - n.pageX;
            r.css("z-index", 1e3).parents().on("mousemove", function(t) {
                e(".draggable").offset({
                    top: t.pageY + u - s,
                    left: t.pageX + a - o
                }).on("mouseup", function() {
                    e(this).removeClass("draggable").css("z-index", i)
                })
            });
            n.preventDefault()
        }).on("mouseup", function() {
            if (t.handle === "") {
                e(this).removeClass("draggable")
            } else {
                e(this).removeClass("active-handle").parent().removeClass("draggable")
            }
        })
    }
})(jQuery)