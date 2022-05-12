function setDash(e) {
    if (e == 0) {
        $("body").removeClass("dash");
        $("#header #dash, #start_menu").remove();
        $("#header .row-fluid, .open_menu_left, .slidetxt_header ul").fadeIn();
        $("#special_span").attr("class", "span9 offset1");
        clearInterval(monitor_interval);
        clearInterval(feedlist_interval);
        clearInterval(t)
    } else {
        $("body").addClass("dash");
        $("#header #dash").remove();
        $("#special_span").attr("class", "span12");
        var n = '<div id="start_menu"><div class="container"><div class="start_logo"></div><div class="menu_box"><div class="inner_white"></div><div class="outer"></div></div><div class="time"></div></div></div>';
        var r = '<div class="host_monitor span3"><h3>Host Monitor</h3><div class="inner"></div></div>';
        var i = '<div class="feeds"><h3>RSS Reader</h3><div class="inner"><ul></ul></div></div>';
        $("#header").append('<div id="dash"><div class="row-fluid">' + r + i + "</div></div>").hide().fadeIn();
        $("body").prepend(n);
        startTime();
        $("#header #dash").slideDown(function() {
            correct_terminalsize()
        });
        load_hostmonitor();
        monitor_interval = setInterval(function() {
            load_hostmonitor()
        }, 3e4);
        feedlist_lastfeedtime = 0;
        load_feedlist();
        feedlist_interval = setInterval(function() {
            load_feedlist()
        }, 3e4)
    }
}

function load_hostmonitor() {
    $.post(SITE + "themes/default/async/terminal.php", {
        action: "load_hostmonitor",
        requirelogin: true,
        username: logged_username,
        key: logged_key
    }, function(e) {
        if (e) {
            if (e.error) {
                term.echo(e.error)
            } else {
                $("#header #dash .host_monitor .inner").html(e.html);
                correct_terminalsize();
                if (e.offlinehost > 0 && e.offlinehost != offlinehost) {
                    offlinehost = e.offlinehost;
                    if (offlinehost == 1) {
                        var t = "host is offline"
                    } else {
                        var t = "hosts are offline"
                    }
                }
            }
        }
    })
}

function load_feedlist() {
    $.post(SITE + "themes/default/async/terminal.php", {
        action: "load_feedlist",
        time: feedlist_lastfeedtime,
        requirelogin: true,
        username: logged_username,
        key: logged_key
    }, function(e) {
        if (e) {
            if (e.error) {
                term.echo(e.error)
            } else {
                if (e.prepend == 1) {
                    $("#header #dash .feeds .inner ul").prepend(e.html)
                } else {
                    $("#header #dash .feeds .inner ul").html(e.html)
                }
                if (e.last_timestamp) {
                    feedlist_lastfeedtime = e.last_timestamp
                }
                Shadowbox.setup();
                correct_terminalsize();
                if (e.newfeeds > 0) {
                    if (e.newfeeds == 1) {
                        var t = "new feed"
                    } else {
                        var t = "new feeds"
                    }
                }
            }
        }
    })
}

function reload_feedlist() {
    $("#dash .feeds ul li").remove();
    feedlist_lastfeedtime = 0;
    load_feedlist()
}

function correct_terminalsize() {
    var e = $(window).height() - $("#header").height() - 145;
    $("#terminal").height(e)
}

function logout() {
    localStorage["logged_username"] = "";
    localStorage["logged_key"] = "";
    localStorage["dash"] = 0;
    logged_username = "";
    logged_key = "";
    greetings_username = "guest";
    havelogins = false;
    window.location.reload()
}

function colourize(e, t) {
    if (t) {
        t = t.toLowerCase()
    }
    string_c = e;
    if (t == "white") {
        string_c = "[1;37m" + string_c + "[0m"
    }
    if (t == "bgray") {
        string_c = "[0;37m" + string_c + "[0m"
    }
    if (t == "dgray") {
        string_c = "[1;30m" + string_c + "[0m"
    }
    if (t == "black") {
        string_c = "[0;30m" + string_c + "[0m"
    }
    if (t == "blue") {
        string_c = "[0;34m" + string_c + "[0m"
    }
    if (t == "bblue") {
        string_c = "[1;34m" + string_c + "[0m"
    }
    if (t == "cyan") {
        string_c = "[0;36m" + string_c + "[0m"
    }
    if (t == "bcyan") {
        string_c = "[1;36m" + string_c + "[0m"
    }
    if (t == "green") {
        string_c = "[0;32m" + string_c + "[0m"
    }
    if (t == "bgreen") {
        string_c = "[1;32m" + string_c + "[0m"
    }
    if (t == "yellow") {
        string_c = "[0;33m" + string_c + "[0m"
    }
    if (t == "byellow") {
        string_c = "[1;33m" + string_c + "[0m"
    }
    if (t == "red") {
        string_c = "[0;31m" + string_c + "[0m"
    }
    if (t == "bred") {
        string_c = "[1;31m" + string_c + "[0m"
    }
    if (t == "purple") {
        string_c = "[0;35m" + string_c + "[0m"
    }
    if (t == "bpurple") {
        string_c = "[1;35m" + string_c + "[0m"
    }
    return string_c
}

function colourize_hex(e) {
    if (e) {
        e = e.toLowerCase()
    }
    if (e == "white") {
        return "#FFF"
    }
    if (e == "bgray") {
        return "#AAA"
    }
    if (e == "dgray") {
        return "#000"
    }
    if (e == "black") {
        return "#000"
    }
    if (e == "blue") {
        return "#00A"
    }
    if (e == "bblue") {
        return "#55F"
    }
    if (e == "cyan") {
        return "#0AA"
    }
    if (e == "green") {
        return "#008400"
    }
    if (e == "bgreen") {
        return "#44D544"
    }
    if (e == "yellow") {
        return "#A50"
    }
    if (e == "byellow") {
        return "#FF5"
    }
    if (e == "red") {
        return "#A00"
    }
    if (e == "bred") {
        return "#F55"
    }
    if (e == "purple") {
        return "#A0A"
    }
    if (e == "bpurple") {
        return "#F5F"
    }
}

function load_terminal(e) {
    if (e == false) {
        $("#box, #footer").fadeIn();
        $("#terminal").hide()
    } else {
        $("#box, #footer").hide();
        $("#terminal").hide().fadeIn();
        $("#terminal").terminal(function(e, t) {
            if (e.match(/^ /) == false) {
                e = e.toLowerCase()
            }
            e = e.replace(/^[\u0080-\uffff]/g, "");
            if (e == "about") {
                t.echo("\nMy personal console, made public to make it useful.\nEnjoy and leave a message in the homepage!\n\nWritten with the awesome jQuery Terminal Emulator by Jakub Jankiewicz\nhttp://terminal.jcubic.pl\n")
            }
            if (e == "reload" || e == "refresh") {
                window.location.reload()
            }
            if (e == "colors" || e == "colours") {
                t.echo(colourize("\n:: List of available colours\n\n", h2_color));
                t.echo("DEFAULT");
                t.echo(colourize("WHITE", "WHITE"));
                t.echo(colourize("BGRAY", "BGRAY"));
                t.echo(colourize("BLUE", "BLUE"));
                t.echo(colourize("BBLUE", "BBLUE"));
                t.echo(colourize("CYAN", "CYAN"));
                t.echo(colourize("GREEN", "GREEN"));
                t.echo(colourize("BGREEN", "BGREEN"));
                t.echo(colourize("YELLOW", "YELLOW"));
                t.echo(colourize("BYELLOW", "BYELLOW"));
                t.echo(colourize("RED", "RED"));
                t.echo(colourize("BRED", "BRED"));
                t.echo(colourize("PURPLE", "PURPLE"));
                t.echo(colourize("BPURPLE", "BPURPLE"));
                t.echo("")
            }
            if (e == "portfolio") {
                t.echo(colourize("\nI've made these websites\n", h2_color));
                t.echo("");
                t.echo("http://www.minecraft-italia.it / 2011");
                t.echo("http://www.igta5.it / 2012");
                t.echo("http://www.ilpaliodiroe.it / 2013");
                t.echo("http://www.swmsa.ch / 2014");
                t.echo("http://www.404simulator.com / 2014");
                t.echo("http://www.aziendaagricolanc.it / 2014");
                t.echo("http://hrevolution.altervista.org / 2014");
                t.echo("")
            }
            if (e == "tebaide") {
                t.echo(colourize("\nBest works made in Tebaide Web Agency\n", h2_color));
                t.echo("");
                t.echo("http://www.miralago.it / 2012");
                t.echo("http://www.borgolevigne.com / 2012");
                t.echo("http://www.torresanmarco.it / 2013");
                t.echo("http://www.piantelle.it / 2013");
                t.echo("http://www.tebaide.it / 2014");
                t.echo("http://www.villafiordaliso.it / 2014");
                t.echo("http://www.aqanat.com / 2014");
                t.echo("http://www.boodiv.it / 2014");
                t.echo("http://www.nauticabenaco.it / 2014 [NEW]");
                t.echo("http://www.camping-riviera.com / 2014 [NEW]");
                t.echo("http://www.hotel-gardenia.it / 2014 [NEW]");
                t.echo("https://booking.tebaide.it V2 / 2014 [NEW]");
                t.echo("")
            }
            if (e == "dash") {
                if (havelogins == true) {
                    setDash(1);
                    localStorage["dash"] = 1
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e == "help" || e == "?") {
                t.echo("");
                if (logged_username == "") {
                    t.echo(colourize("ACCOUNT CMD", menu_color));
                    t.echo(colourize("login", "white") + "                  Login with your account");
                    t.echo(colourize("register", "white") + "               Create a new account")
                } else {
                    t.echo(colourize("ACCOUNT CMD", menu_color));
					t.echo(colourize("changename", "white") + "             Change your username");
                    t.echo(colourize("changepw", "white") + "               Change your password");
                    t.echo(colourize("changemail", "white") + "             Change your e-mail");
                    t.echo(colourize("changecolor", "white") + "            Change your nickname color");
                    t.echo(colourize("rmaccount", "white") + "              Permanently delete your account");
                    t.echo(colourize("logout", "white") + "                 Disconnect from your account")
                }
                t.echo("");
                t.echo(colourize("WEBSITE CMD", menu_color));
                t.echo(colourize("wall <msg>", "white") + "             Say hello in the homepage");
                t.echo(colourize("about", "white") + "                  Some informations about this tool");
                t.echo(colourize("stats", "white") + "                  Some statistics");
                //t.echo(colourize("chat", "white") + "                   A basic real time chat");
                t.echo(colourize("score", "white") + "                  Scoreboard of those who use more commands");
                t.echo(colourize("reload", "white") + "                 Refresh this web page");
                t.echo("");
                t.echo(colourize("UTILITIES", menu_color));
                t.echo(colourize("md5 <string>", "white") + "           Encrypt a string in MD5");
                t.echo(colourize("sha1 <string>", "white") + "          Encrypt a string in SHA-1");
                t.echo(colourize("sha256 <string>", "white") + "        Encrypt a string in SHA-256");
                t.echo(colourize("sha512 <string>", "white") + "        Encrypt a string in SHA-512");
                t.echo("");
                //t.echo(colourize("time", "white") + "                   Print current time");
                t.echo(colourize("ts", "white") + "                     Print current UNIX TimeStamp");
                t.echo(colourize("tots <date>", "white") + "            Convert a date (like d-m-y, m/d/y, now + 1 hour) in UNIX TimeStamp");
                t.echo(colourize("fromts <time>", "white") + "          Convert UNIX TimeStamp to a readable date");
                t.echo("");
                t.echo(colourize("ip", "white") + "                     Show your IP address");
                t.echo(colourize("fping <ip>", "white") + "             Determine if host or IP address is online");
                t.echo(colourize("ping <ip>", "white") + "              Determine latency of host or IP address");
                t.echo(colourize("geoip <ip>", "white") + "             Get country location of an IP");
                t.echo("")
            }
            if (e == "register") {
                if (havelogins == false) {
                    t.echo(colourize("\n:: Create a new account\n\n", h2_color));
                    var n = e;
                    t.push(function(e) {
                        if (e != "") {
                            var r = e;
                            t.pop();
                            t.set_mask(true);
                            t.push(function(e) {
                                if (e != "") {
                                    var i = e;
                                    t.pop();
                                    t.push(function(e) {
                                        if (e != "") {
                                            var s = e;
                                            if (i != s) {
                                                t.echo("\nThe password is incorrect.\n")
                                            } else {
                                                $.post(SITE + "themes/default/async/terminal.php", {
                                                    action: n,
                                                    username: r,
                                                    password: i
                                                }, function(e) {
                                                    if (e.error) {
                                                        t.echo(e.error);
                                                        t.set_mask(false)
                                                    } else {
                                                        t.set_mask(false);
                                                        if (e.response) {
                                                            t.echo(e.response)
                                                        } else {
                                                            t.echo("\nProblems creating an account.\n")
                                                        }
                                                    }
                                                }, "json");
                                                t.pop()
                                            }
                                        }
                                    }, {
                                        prompt: "Confirm password: "
                                    })
                                }
                            }, {
                                prompt: "Password: "
                            })
                        }
                    }, {
                        prompt: "Username: "
                    })
                } else {
                    t.echo("\nYou are already logged in.\n")
                }
            }
            if (e == "login") {
                if (havelogins == false) {
                    var n = e;
                    t.echo(colourize("\n:: Login with your account\n\n", h2_color));
                    t.push(function(e) {
                        if (e != "") {
                            var r = e;
                            t.pop();
                            t.set_mask(true);
                            t.push(function(e) {
                                if (e != "") {
                                    var i = e;
                                    t.pop();
                                    t.set_mask(false);
                                    $.post(SITE + "themes/default/async/terminal.php", {
                                        action: n,
                                        username: r,
                                        password: i
                                    }, function(e) {
                                        if (e.response) {
                                            if (e.logged == 1) {
                                                localStorage["logged_username"] = e.logged_username;
                                                localStorage["logged_key"] = e.logged_key;
                                                localStorage["username_color"] = e.username_color;
                                                logged_username = localStorage["logged_username"];
                                                logged_key = localStorage["logged_key"];
                                                username_color = localStorage["username_color"];
                                                stars_colour = colourize_hex(username_color);
                                                havelogins = true;
                                                t.echo("\nWelcome, " + colourize(logged_username, username_color) + "!")
                                            } else {
                                                localStorage["logged_username"] = "";
                                                localStorage["logged_key"] = "";
                                                localStorage["username_color"] = "";
                                                logged_username = false;
                                                logged_key = false
                                            }
                                            t.echo(e.response)
                                        } else {
                                            t.echo("\nProblems signing in to your account.\n");
                                            localStorage.clear();
                                            logged_username = false;
                                            logged_key = false
                                        }
                                    }, "json").fail(function(e, n, r) {
                                        t.echo("\nAn unexpected error has occurred.\n");
                                        t.resume()
                                    });
                                    t.pop()
                                }
                            }, {
                                prompt: "Password: "
                            })
                        }
                    }, {
                        prompt: "Username: "
                    })
                } else {
                    t.echo("\nYou are already logged in.\n")
                }
            }
            if (e == "logout") {
                if (havelogins == true) {
                    $.post(SITE + "themes/default/async/terminal.php", {
                        action: e,
                        username: logged_username,
                        key: logged_key
                    }, function(e) {
                        t.resume();
                        if (e.error) {
                            t.echo(e.error);
                            logout()
                        } else {
                            t.echo(e.response);
                            logout()
                        }
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e == "checklogin") {
                if (havelogins == true) {
                    t.pause();
                    $.post(SITE + "themes/default/async/terminal.php", {
                        action: "checkUser",
                        username: logged_username,
                        key: logged_key
                    }, function(e) {
                        t.resume();
                        if (e.error) {
                            t.echo(e.error);
                            logout()
                        } else {
                            t.echo("\nYou are logged in.\n")
                        }
                        t.pop()
                    }).fail(function(e, n, r) {
                        t.echo("\nAn unexpected error has occurred.\n");
                        t.resume()
                    })
                } else {
                    t.echo("\nYou are not logged in.\n");
                    t.pop()
                }
            }
            if (e == "changecolor") {
                var n = e;
                if (havelogins == true) {
                    t.echo(colourize("\n:: Type a color for your nickname. Available colors:\n\n", h2_color));
                    t.echo(colourize("WHITE", "WHITE"));
                    t.echo(colourize("BGRAY", "BGRAY"));
                    t.echo(colourize("BLUE", "BLUE"));
                    t.echo(colourize("BBLUE", "BBLUE"));
                    t.echo(colourize("CYAN", "CYAN"));
                    t.echo(colourize("GREEN", "GREEN"));
                    t.echo(colourize("BGREEN", "BGREEN"));
                    t.echo(colourize("YELLOW", "YELLOW"));
                    t.echo(colourize("BYELLOW", "BYELLOW"));
                    t.echo(colourize("RED", "RED"));
                    t.echo(colourize("BRED", "BRED"));
                    t.echo(colourize("PURPLE", "PURPLE"));
                    t.echo(colourize("BPURPLE", "BPURPLE"));
                    t.echo("");
                    t.push(function(e) {
                        t.pause();
                        e = e.replace(/^[\u0080-\uffff]/g, "");
                        $.post(SITE + "themes/default/async/terminal.php", {
                            action: n,
                            color: e,
                            requirelogin: true,
                            username: logged_username,
                            key: logged_key
                        }, function(e) {
                            t.resume();
                            if (e.error) {
                                t.echo(e.error)
                            } else {
                                t.echo(e.response);
                                localStorage["username_color"] = e.color;
                                username_color = localStorage["username_color"];
                                stars_colour = colourize_hex(e.color);
                                greetings_username = colourize(logged_username, username_color);
                                t.echo("Welcome, " + greetings_username + "!");
                                if (stars_active == 1) {
                                    t.echo("You have to " + colourize("reload", "white") + " the page, to change the stars falling's color")
                                }
                                t.echo("")
                            }
                        }).fail(function(e, n, r) {
                            t.echo("\nAn unexpected error has occurred.\n");
                            t.resume()
                        });
                        t.pop()
                    }, {
                        prompt: "Color: "
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e == "banana") {
                t.push(function(e) {
                    if (e.match(/y|yes|si|s/i)) {
                        t.echo("\nLe banane sono state spedite,\nverranno consegnate in 2 giorni lavorativi.\n");
                        t.pop()
                    } else if (e.match(/n|no/i)) {
                        t.echo("\nNiente banane per te.\n");
                        t.pop()
                    }
                }, {
                    prompt: "\nSei sicuro di volere procedere con l'acquisto? Y/N "
                })
            }
            if (e.match(/^wall *.+/)) {
                if (havelogins == true) {
                    e = e.match(/^wall *(.+)/)[1];
                    if (e != "") {
                        var n = "wall";
                        t.pause();
                        $.post(SITE + "themes/default/async/terminal.php", {
                            action: n,
                            greeting: e,
                            requirelogin: true,
                            username: logged_username,
                            key: logged_key
                        }, function(e) {
                            t.resume();
                            if (e.error) {
                                t.echo(e.error)
                            } else {
                                t.echo(e.response)
                            }
                        }).fail(function(e, n, r) {
                            t.echo("\nAn unexpected error has occurred.\n");
                            t.resume()
                        });
                        t.pop()
                    } else {
                        t.echo(colourize("wall <msg>", "white") + "           Say hello in the homepage");
                        t.echo(colourize("rwall", "white") + "                Remove your last message if was sent within 1 hour")
                    }
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e == "rwall") {
                var n = e;
                t.pause();
                $.post(SITE + "themes/default/async/terminal.php", {
                    action: n,
                    requirelogin: true,
                    username: logged_username,
                    key: logged_key
                }, function(e) {
                    t.resume();
                    if (e.response) {
                        t.echo(e.response)
                    }
                }, "json").fail(function(e, n, r) {
                    t.echo("\nAn unexpected error has occurred.\n");
                    t.resume()
                });
                t.pop()
            }
            if (e.match(/^echo *.+/)) {
                e = e.match(/^echo *(.+)/)[1];
                t.echo("\n" + greetings_username + ": " + e + "\n");
                t.pop()
            }
            if (e == "time") {
                t.pause();
                $.post(SITE + "themes/default/async/terminal.php", {
                    action: e
                }, function(e) {
                    t.resume();
                    if (e.error) {
                        t.echo(e.error)
                    } else {
                        t.echo("\nCurrent time: " + colourize(e.response, "white") + "\n")
                    }
                }).fail(function(e, n, r) {
                    t.echo("\nAn unexpected error has occurred.\n");
                    t.resume()
                })
            }
            if (e == "timestamp" || e == "ts") {
                t.pause();
                $.post(SITE + "themes/default/async/terminal.php", {
                    action: e
                }, function(e) {
                    t.resume();
                    if (e.error) {
                        t.echo(e.error)
                    } else {
                        t.echo("\nCurrent UNIX TimeStamp is " + colourize(e.response, "white") + "\n")
                    }
                }).fail(function(e, n, r) {
                    t.echo("\nAn unexpected error has occurred.\n");
                    t.resume()
                })
            }
            if (e.match(/^md5 *.+/)) {
                var n = "md5";
                e = e.match(/^md5 *(.+)/)[1];
                t.pause();
                $.post(SITE + "themes/default/async/terminal.php", {
                    action: n,
                    string: e,
                    username: logged_username,
                    key: logged_key
                }, function(n) {
                    t.resume();
                    if (n.error) {
                        t.echo(n.error)
                    } else {
                        t.echo("\nMD5 hash for '" + e + "' is " + colourize(n.response, "white") + "\n")
                    }
                }).fail(function(e, n, r) {
                    t.echo("\nAn unexpected error has occurred.\n");
                    t.resume()
                })
            }
            if (e.match(/^sha1 *.+/)) {
                var n = "sha1";
                if (havelogins == true) {
                    e = e.match(/^sha1 *(.+)/)[1];
                    t.pause();
                    $.post(SITE + "themes/default/async/terminal.php", {
                        action: n,
                        string: e,
                        requirelogin: true,
                        username: logged_username,
                        key: logged_key
                    }, function(n) {
                        t.resume();
                        if (n.error) {
                            t.echo(n.error)
                        } else {
                            t.echo("\nSHA-1 hash for '" + e + "' is " + colourize(n.response, "white") + "\n")
                        }
                    }).fail(function(e, n, r) {
                        t.echo("\nAn unexpected error has occurred.\n");
                        t.resume()
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e.match(/^sha256 *.+/)) {
                var n = "sha256";
                if (havelogins == true) {
                    e = e.match(/^sha256 *(.+)/)[1];
                    t.pause();
                    $.post(SITE + "themes/default/async/terminal.php", {
                        action: n,
                        string: e,
                        requirelogin: true,
                        username: logged_username,
                        key: logged_key
                    }, function(n) {
                        t.resume();
                        if (n.error) {
                            t.echo(n.error)
                        } else {
                            t.echo("\nSHA-256 hash for '" + e + "' is " + colourize(n.response, "white") + "\n")
                        }
                    }).fail(function(e, n, r) {
                        t.echo("\nAn unexpected error has occurred.\n");
                        t.resume()
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e.match(/^sha512 *.+/)) {
                var n = "sha512";
                if (havelogins == true) {
                    e = e.match(/^sha512 *(.+)/)[1];
                    t.pause();
                    $.post(SITE + "themes/default/async/terminal.php", {
                        action: n,
                        string: e,
                        requirelogin: true,
                        username: logged_username,
                        key: logged_key
                    }, function(n) {
                        t.resume();
                        if (n.error) {
                            t.echo(n.error)
                        } else {
                            t.echo("\nSHA-512 hash for '" + e + "' is " + colourize(n.response, "white") + "\n")
                        }
                    }).fail(function(e, n, r) {
                        t.echo("\nAn unexpected error has occurred.\n");
                        t.resume()
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e.match(/^ip2c *.+/)) {
                var n = "ip2c";
                if (havelogins == true) {
                    e = e.match(/^ip2c *(.+)/)[1];
                    t.pause();
                    $.post(SITE + "themes/default/async/terminal.php", {
                        action: n,
                        ip: e,
                        requirelogin: true,
                        username: logged_username,
                        key: logged_key
                    }, function(e) {
                        t.resume();
                        if (e.error) {
                            t.echo(e.error)
                        } else {
                            t.echo(e.response)
                        }
                    }).fail(function(e, n, r) {
                        t.echo("\nAn unexpected error has occurred.\n");
                        t.resume()
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e.match(/^tots *.+/)) {
                var n = "tots";
                if (havelogins == true) {
                    e = e.match(/^tots *(.+)/)[1];
                    t.pause();
                    $.post(SITE + "themes/default/async/terminal.php", {
                        action: n,
                        date: e,
                        requirelogin: true,
                        username: logged_username,
                        key: logged_key
                    }, function(e) {
                        t.resume();
                        if (e.error) {
                            t.echo(e.error)
                        } else {
                            t.echo("\nYour date was converted in " + colourize(e.response, "white") + "\n")
                        }
                    }).fail(function(e, n, r) {
                        t.echo("\nAn unexpected error has occurred.\n");
                        t.resume()
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e.match(/^fromts *.+/)) {
                var n = "fromts";
                if (havelogins == true) {
                    e = e.match(/^fromts *(.+)/)[1];
                    t.pause();
                    $.post(SITE + "themes/default/async/terminal.php", {
                        action: n,
                        time: e,
                        requirelogin: true,
                        username: logged_username,
                        key: logged_key
                    }, function(e) {
                        t.resume();
                        if (e.error) {
                            t.echo(e.error)
                        } else {
                            t.echo("\nYour UNIX TimeStamp was converted in " + colourize(e.response, "white") + "\n")
                        }
                    }).fail(function(e, n, r) {
                        t.echo("\nAn unexpected error has occurred.\n");
                        t.resume()
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e == "changepw") {
                var n = e;
                if (havelogins == true) {
                    t.echo(colourize("\n:: Type your new password\n\n", h2_color));
                    t.push(function(e) {
                        if (e != "") {
                            var r = e;
                            t.pause();
                            $.post(SITE + "themes/default/async/terminal.php", {
                                action: n,
                                newpassword: r,
                                requirelogin: true,
                                username: logged_username,
                                key: logged_key
                            }, function(e) {
                                t.resume();
                                if (e.error) {
                                    t.echo(e.error)
                                } else {
                                    t.echo(e.response);
                                    logged_key = e.logged_key;
                                    localStorage["logged_key"] = e.logged_key
                                }
                            }).fail(function(e, n, r) {
                                t.echo("\nAn unexpected error has occurred.\n");
                                t.resume()
                            });
                            t.pop()
                        } else {
							t.echo("\nPassword change has been skipped.\n");
							t.pop()
						}
                    }, {
                        prompt: "Password: "
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e == "changename") {
                var n = e;
                if (havelogins == true) {
                    t.echo(colourize("\n:: Type your new username\n\n", h2_color));
                    t.push(function(e) {
                        if (e != "") {
                            var r = e;
                            t.pause();
                            $.post(SITE + "themes/default/async/terminal.php", {
                                action: n,
                                newusername: r,
                                requirelogin: true,
                                username: logged_username,
                                key: logged_key
                            }, function(e) {
                                t.resume();
                                if (e.error) {
                                    t.echo(e.error)
                                } else {
									localStorage["logged_username"] = logged_username = e.newusername;
                                    t.echo(e.response)
                                }
                            }).fail(function(e, n, r) {
                                t.echo("\nAn unexpected error has occurred.\n");
                                t.resume()
                            });
                            t.pop()
                        } else {
							t.echo("\nUsername change has been skipped.\n");
							t.pop()
						}
                    }, {
                        prompt: "Username: "
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
			if (e == "changemail") {
                var n = e;
                if (havelogins == true) {
                    t.echo(colourize("\n:: Type your new mail\n\n", h2_color));
                    t.push(function(e) {
                        if (e != "") {
                            var r = e;
                            t.pause();
                            $.post(SITE + "themes/default/async/terminal.php", {
                                action: n,
                                mail: r,
                                requirelogin: true,
                                username: logged_username,
                                key: logged_key
                            }, function(e) {
                                t.resume();
                                if (e.error) {
                                    t.echo(e.error)
                                } else {
                                    t.echo(e.response)
                                }
                            }).fail(function(e, n, r) {
                                t.echo("\nAn unexpected error has occurred.\n");
                                t.resume()
                            });
                            t.pop()
                        } else {
							t.echo("\Mail change has been skipped.\n");
							t.pop()
						}
                    }, {
                        prompt: "E-mail: "
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
			if (e == "rmaccount") {
                var n = e;
                if (havelogins == true) {
                    t.echo(colourize("\n:: Are you sure to delete your account? Y/N\n\n", h2_color));
                    t.push(function(e) {
                        if (e.toLowerCase() == "y") {
                            var r = e;
                            t.pause();
                            $.post(SITE + "themes/default/async/terminal.php", {
                                action: n,
                                requirelogin: true,
                                username: logged_username,
                                key: logged_key
                            }, function(e) {
                                t.resume();
                                if (e.error) {
                                    t.echo(e.error)
                                } else {
                                    t.echo(e.response)
									setTimeout(function() { logout(); }, 1500);
                                }
                            }).fail(function(e, n, r) {
                                t.echo("\nAn unexpected error has occurred.\n");
                                t.resume()
                            });
                            t.pop()
                        } else {
							t.pop()
						}
                    }, {
                        prompt: "Confirm: "
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e == "ip") {
                $.post(SITE + "themes/default/async/terminal.php", {
                    action: e,
                    username: logged_username,
                    key: logged_key
                }, function(e) {
                    t.resume();
                    t.echo("\nYour IP is " + colourize(e.response, "white") + "\n")
                }).fail(function(e, n, r) {
                    t.echo("\nAn unexpected error has occurred.\n");
                    t.resume()
                })
            }
            /*if (e == "chat") {
				if (havelogins == true) {
					loadChat();
				} else {
                    t.echo("\nYou are not logged in.\n")
                }
            }*/
            if (e.match(/^ping *.+/)) {
                var n = "ping";
                if (havelogins == true) {
                    e = e.match(/^ping *(.+)/)[1];
                    t.pause();
                    $.post(SITE + "themes/default/async/terminal.php", {
                        action: n,
                        host: e,
                        requirelogin: true,
                        username: logged_username,
                        key: logged_key
                    }, function(n) {
                        t.resume();
                        if (n.error) {
                            t.echo(n.error)
                        } else {
                            if (n.response) {
                                t.echo("\n" + n.response + "\n")
                            } else {
                                if (n.ip) {
                                    ip_left = e + " (" + colourize(n.ip, "white") + ")"
                                } else {
                                    ip_left = e
                                }
                                t.echo("\n" + ip_left + " has a latency of " + colourize(n.latency + " ms", "white") + "\n")
                            }
                        }
                    }).fail(function(e, n, r) {
                        t.echo("\nAn unexpected error has occurred.\n");
                        t.resume()
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e.match(/^fping *.+/)) {
                var n = "fping";
                if (havelogins == true) {
                    e = e.match(/^fping *(.+)/)[1];
                    t.pause();
                    $.post(SITE + "themes/default/async/terminal.php", {
                        action: n,
                        host: e,
                        requirelogin: true,
                        username: logged_username,
                        key: logged_key
                    }, function(n) {
                        t.resume();
                        if (n.error) {
                            t.echo(n.error)
                        } else {
                            t.echo("\n" + e + colourize(n.response, "white") + "\n")
                        }
                    }).fail(function(e, n, r) {
                        t.echo("\nAn unexpected error has occurred.\n");
                        t.resume()
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e.match(/^geoip *.+/)) {
                var n = "geoip";
                if (havelogins == true) {
                    e = e.match(/^geoip *(.+)/)[1];
                    t.pause();
                    $.post(SITE + "themes/default/async/terminal.php", {
                        action: n,
                        ip: e,
                        requirelogin: true,
                        username: logged_username,
                        key: logged_key
                    }, function(n) {
                        t.resume();
                        if (n.error) {
                            t.echo(n.error)
                        } else {
                            t.echo("\nCountry location for " + e + " is " + colourize(n.country, "white") + "\n")
                        }
                    }).fail(function(e, n, r) {
                        t.echo("\nAn unexpected error has occurred.\n");
                        t.resume()
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e.match(/^monitor *.+/)) {
                var n = "monitor";
                if (havelogins == true) {
                    e = e.match(/^monitor *(.+)/)[1];
                    monitor_host = e.split(" ");
                    if (monitor_host[0]) {
                        var r = monitor_host[0];
                        var i = e.replace(r + " ", "")
                    } else {
                        var r = e;
                        var i = ""
                    }
                    t.pause();
                    $.post(SITE + "themes/default/async/terminal.php", {
                        action: n,
                        host: r,
                        namehost: i,
                        requirelogin: true,
                        username: logged_username,
                        key: logged_key
                    }, function(e) {
                        t.resume();
                        if (e.error) {
                            t.echo(e.error)
                        } else {
                            if (r == "clear") {
                                if (e.response == 1) {
                                    t.echo("\nYou have cleared the monitoring list.\n");
                                    $("#dash .host_monitor .inner .host").remove()
                                } else {
                                    t.echo("\nMonitoring list is already empty.\n")
                                }
                            } else if (r == "remove") {
                                if (e.response == 1) {
                                    t.echo("\nYou have removed the host from the monitoring list.\n")
                                } else {
                                    t.echo("\nCan't remove this host from the monitoring list.\n")
                                }
                            } else {
                                t.echo("\nYou have added " + colourize(e.response, "white") + " to the monitoring list, type " + colourize("dash", "white") + " to open the dashboard or " + colourize("monitor clear", "white") + " to clear the list\n")
                            }
                        }
                    }).fail(function(e, n, r) {
                        t.echo("\nAn unexpected error has occurred.\n");
                        t.resume()
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e.match(/^feed *.+/)) {
                var n = "feed";
                if (havelogins == true) {
                    e = e.match(/^feed *(.+)/)[1];
                    parameters = e.split(" ");
                    if (parameters[0]) {
                        var s = parameters[0];
                        var o = e.replace(s + " ", "")
                    } else {
                        var s = e;
                        var o = ""
                    }
                    t.pause();
                    $.post(SITE + "themes/default/async/terminal.php", {
                        action: n,
                        parameter1: s,
                        parameter2: o,
                        requirelogin: true,
                        username: logged_username,
                        key: logged_key
                    }, function(e) {
                        t.resume();
                        if (e.error) {
                            t.echo(e.error)
                        } else {
                            if (s == "clear") {
                                if (e.response > 0) {
                                    t.echo("\nYou have cleared RSS Reader list.\n");
                                    reload_feedlist()
                                } else {
                                    t.echo("\nRSS Reader list is already empty.\n")
                                }
                            } else if (s == "remove") {
                                if (e.response > 0) {
                                    t.echo("\nYou have removed the Feed from the list.\n");
                                    reload_feedlist()
                                } else {
                                    t.echo("\nCan't remove this Feed from the list.\n")
                                }
                            } else {
                                if (e.error) {
                                    t.echo("\n" + colourize(e.error, "white") + "\n")
                                } else {
                                    t.echo("\nYou have added " + colourize(e.response, "white") + " to the RSS Reader list.\n")
                                }
                            }
                        }
                    }).fail(function(e, n, r) {
                        t.echo("\nAn unexpected error has occurred.\n");
                        t.resume()
                    })
                } else {
                    t.echo("\nYou are not logged in.\n")
                }
            }
            if (e == "stats") {
                var n = e;
                t.pause();
                $.post(SITE + "themes/default/async/terminal.php", {
                    action: n
                }, function(e) {
                    t.resume();
                    if (e.response) {
                        t.echo(e.response)
                    }
                }, "json").fail(function(e, n, r) {
                    t.echo("\nAn unexpected error has occurred.\n");
                    t.resume()
                });
                t.pop()
            }
            if (e == "score") {
                var n = e;
                t.pause();
                $.post(SITE + "themes/default/async/terminal.php", {
                    action: n
                }, function(e) {
                    t.resume();
                    if (e.response) {
                        t.echo(e.response)
                    }
                }, "json").fail(function(e, n, r) {
                    t.echo("\nAn unexpected error has occurred.\n");
                    t.resume()
                });
                t.pop()
            }
            if (e == "wall") {
                t.echo(colourize("\nWALL USAGE\n", menu_color));
                t.echo(colourize("wall <msg>", "white") + "            Send <msg> in the homepage");
                t.echo(colourize("rwall", "white") + "                 Remove the message if sent within 1 hour");
                t.echo()
            }
            if (e == "md5") {
                t.echo(colourize("\nMD5 USAGE\n", menu_color));
                t.echo(colourize("md5 <string>", "white") + "          Encrypt <string> in MD5");
                t.echo()
            }
            if (e == "sha1") {
                t.echo(colourize("\nSHA1 USAGE\n", menu_color));
                t.echo(colourize("sha1 <string>", "white") + "         Encrypt <string> in SHA-1");
                t.echo()
            }
            if (e == "sha256") {
                t.echo(colourize("\nSHA256 USAGE\n", menu_color));
                t.echo(colourize("sha256 <string>", "white") + "       Encrypt <string> in SHA-256");
                t.echo()
            }
            if (e == "sha512") {
                t.echo(colourize("\nSHA512 USAGE\n", menu_color));
                t.echo(colourize("sha512 <string>", "white") + "       Encrypt <string> in SHA-512");
                t.echo()
            }
            if (e == "tots") {
                t.echo(colourize("\nTOTS USAGE\n", menu_color));
                t.echo(colourize("tots <date>", "white") + "           Convert <date> in UNIX TimeStamp");
                t.echo("\nDate formats accepted: d-m-y, m/d/y, 1 hour, now + 2 days, tomorrow, 2 days, 1 week\nMore info http://php.net/function.date.php");
                t.echo()
            }
            if (e == "fromts") {
                t.echo(colourize("\nFROMTS USAGE\n", menu_color));
                t.echo(colourize("fromts <time>", "white") + "         Convert <timestamp> to a readable date");
                t.echo()
            }
            if (e == "feed") {
                t.echo(colourize("\nFEED USAGE\n", menu_color));
                t.echo(colourize("feed <url>", "white") + "            Add <feed_url> to the feed list");
                t.echo(colourize("feed remove <url>", "white") + "     Remove <feed_url> from the feed list (also works with a piece of url)");
                t.echo(colourize("feed clear", "white") + "            Clear the feed list");
                t.echo(colourize("dash", "white") + "                  Open your dashboard");
                t.echo("\nExample: " + colourize("feed http:&#47;&#47;www.example.com/rss.xml", "white") + '\n\nThis function is used to add or remove feeds to your "RSS Reader" (you must enter the Dashboard to view this feature).\nYou\'ll receive a desktop notification when a new feed will discovered.');
                t.echo()
            }
            if (e == "monitor") {
                t.echo(colourize("\nMONITOR USAGE\n", menu_color));
                t.echo(colourize("monitor <host> <name>", "white") + "  Add <host> to the monitor list. <name> is optional");
                t.echo(colourize("monitor remove <host>", "white") + "  Remove <host> from the monitor list");
                t.echo(colourize("monitor clear", "white") + "          Clear the monitor list");
                t.echo(colourize("dash", "white") + "                   Open your dashboard");
                t.echo("\nExample: " + colourize("monitor 49.53.70.25 PC Work", "white") + "\n\nThis function helps you to check if a list of hosts are online or offline (you must enter the Dashboard to view this feature).\nYou'll receive a desktop notification when host goes offline.");
                t.echo()
            }
            if (e == "ping") {
                t.echo(colourize("\nPING USAGE\n", menu_color));
                t.echo(colourize("ping <ip>", "white") + "              Determine latency of host or IP address");
                t.echo()
            }
            if (e == "fping") {
                t.echo(colourize("\nFPING USAGE\n", menu_color));
                t.echo(colourize("fping <ip>", "white") + "             Determine if host or IP address is online");
                t.echo()
            }
            if (e == "geoip") {
                t.echo(colourize("\nGEOIP USAGE\n", menu_color));
                t.echo(colourize("geoip <ip>", "white") + "             Get country location of an IP");
                t.echo()
            }
        }, {
            greetings: "hackuva console :: Version " + terminal_version + "\nCopyright (C) 2015 hackuva\n\nWelcome " + greetings_username + "! Type " + colourize("help", "white") + " to show the list of available commands.\n",
            height: 500
        });
        correct_terminalsize()
    }
}

function startTime() {
    var e = new Date;
    var n = e.getHours();
    var r = e.getMinutes();
    var i = e.getSeconds();
    n = checkTime(n);
    r = checkTime(r);
    i = checkTime(i);
    $("#start_menu .time").html(n + ":" + r + ":" + i);
    t = setTimeout(function() {
        startTime()
    }, 500)
}

function checkTime(e) {
    if (e < 10) {
        e = "0" + e
    }
    return e
}

function sparkle() {
    var e;
    if (x != ox || y != oy) {
        ox = x;
        oy = y;
        for (e = 0; e < sparkles; e++)
            if (!starv[e]) {
                star[e].style.left = (starx[e] = x) + "px";
                star[e].style.top = (stary[e] = y) + "px";
                star[e].style.clip = "rect(0px, 5px, 5px, 0px)";
                star[e].style.visibility = "visible";
                starv[e] = 50;
                break
            }
    }
    for (e = 0; e < sparkles; e++) {
        if (starv[e]) update_star(e);
        if (tinyv[e]) update_tiny(e)
    }
    setTimeout("sparkle()", 20)
}

function update_star(e) {
    if (--starv[e] == 25) star[e].style.clip = "rect(1px, 4px, 4px, 1px)";
    if (starv[e]) {
        stary[e] += 1 + Math.random() * 3;
        if (stary[e] < shigh + sdown) {
            star[e].style.top = stary[e] + "px";
            starx[e] += (e % 5 - 2) / 5;
            star[e].style.left = starx[e] + "px"
        } else {
            star[e].style.visibility = "hidden";
            starv[e] = 0;
            return
        }
    } else {
        tinyv[e] = 50;
        tiny[e].style.top = (tinyy[e] = stary[e]) + "px";
        tiny[e].style.left = (tinyx[e] = starx[e]) + "px";
        tiny[e].style.width = "2px";
        tiny[e].style.height = "2px";
        star[e].style.visibility = "hidden";
        tiny[e].style.visibility = "visible"
    }
}

function update_tiny(e) {
    if (--tinyv[e] == 25) {
        tiny[e].style.width = "1px";
        tiny[e].style.height = "1px"
    }
    if (tinyv[e]) {
        tinyy[e] += 1 + Math.random() * 3;
        if (tinyy[e] < shigh + sdown) {
            tiny[e].style.top = tinyy[e] + "px";
            tinyx[e] += (e % 5 - 2) / 5;
            tiny[e].style.left = tinyx[e] + "px"
        } else {
            tiny[e].style.visibility = "hidden";
            tinyv[e] = 0;
            return
        }
    } else tiny[e].style.visibility = "hidden"
}

function mouse(e) {
    if (stars_active == 1) {
        set_scroll();
        y = e ? e.pageY : event.y + sdown;
        x = e ? e.pageX : event.x + sleft
    }
}

function set_scroll() {
    if (typeof self.pageYOffset == "number") {
        sdown = self.pageYOffset;
        sleft = self.pageXOffset
    } else if (document.body.scrollTop || document.body.scrollLeft) {
        sdown = document.body.scrollTop;
        sleft = document.body.scrollLeft
    } else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
        sleft = document.documentElement.scrollLeft;
        sdown = document.documentElement.scrollTop
    } else {
        sdown = 0;
        sleft = 0
    }
}

function set_width() {
    if (typeof self.innerWidth == "number") {
        swide = self.innerWidth;
        shigh = self.innerHeight
    } else if (document.documentElement && document.documentElement.clientWidth) {
        swide = document.documentElement.clientWidth;
        shigh = document.documentElement.clientHeight
    } else if (document.body.clientWidth) {
        swide = document.body.clientWidth;
        shigh = document.body.clientHeight
    }
}

function createDiv(e, t, n) {
    var r = document.createElement("div");
    r.style.position = "absolute";
    r.style.height = e + "px";
    r.style.width = t + "px";
    r.style.overflow = "hidden";
    r.style.backgroundColor = n;
    return r
}

/* CHAT FN */
function loadChat() {
	open_window("window-nodejs-chat");
	focus_window("nodejs-chat");
	
	if (!socket) {
		if (localStorage["logged_username"] != "" && localStorage["logged_key"] != "") {
			var user_access = {
				username: localStorage["logged_username"],
				key: localStorage["logged_key"]
			}
			var messages = [];
			
			// Si connette al web server
			socket = io.connect('http://www.hacklover.net:1337');
			
			// Setta username iniziale
			socket.emit("join", user_access);
			
			// Da focus a input iniziale
			setTimeout(function() {
				$("#window-nodejs-chat .input-chat input").focus();
			}, 500);
			
			// Riceve segnale 'update'
			socket.on('update', function (data) {
				if(data.message) {
					// Caga nuovi messaggi
					$("#window-nodejs-chat .messages .inner").append(renderMessage(data));
					
					// Scrolla div in basso
					$("#window-nodejs-chat .messages").scrollTop($("#window-nodejs-chat .messages")[0].scrollHeight);
				} else {
					console.log("There is a problem:", data);
				}
			});
			
			// Riceve segnale per popolare lista connessi
			socket.on('update-people', function (data) {
				$("#window-nodejs-chat .people .inner").empty();
				
				$.each(data, function(index, person) {
					$("#window-nodejs-chat .people .inner").append(renderPeople(person, index));
				});
			});
		}
	}
}
function renderMessage(data) {
	if (data.message) {
		if (data.username) {
			return '<div class="c-row">\
			<span class="username">'+data.username+'</span>\
			<span class="message">'+data.message+'</span>\
			</div>';
		} else {
			return '<div class="c-row">\
			<span class="message">'+data.message+'</span>\
			</div>'
		}
	}
}
function renderPeople(data, id) {
	if (data.username) {
		return '<div class="c-row clamp">\
		<span data-id="'+id+'" class="username">'+data.username+'</span>\
		</div>';
	}
}

if (!localStorage["logged_username"]) {
    localStorage["logged_username"] = ""
}
if (!localStorage["dash"]) {
    localStorage["dash"] = 0
}
var h2_color = "WHITE";
var menu_color = "YELLOW";
var monitor_interval;
var feedlist_interval;
var feedlist_lastfeedtime = 0;
var offlinehost = 0;
var stars_colour;
var stars_active;
var socket;

hl_notification_image = "http://www.hacklover.net/images/4e7a1-hacklover.jpg";
if (!localStorage["logged_username"]) {
    localStorage["logged_username"] = ""
}
var logged_username = localStorage["logged_username"];
var logged_key = localStorage["logged_key"];
var username_color = localStorage["username_color"];
if (username_color != "" && username_color != null) {
    stars_colour = colourize_hex(username_color)
} else {
    stars_colour = "#3971A6"
}
if (localStorage["stars_active"] != "" && localStorage["stars_active"] != null) {
    stars_active = parseInt(localStorage["stars_active"]);
    $("#header .square").addClass("active")
} else {
    stars_active = 0
}
if (logged_username != "" && logged_key != "") {
    var havelogins = true
} else {
    var havelogins = false
}
if (logged_username === "") {
    greetings_username = "guest"
} else {
    greetings_username = colourize(logged_username, username_color)
}
$(window).resize(function() {
    correct_terminalsize()
});
$(document).ready(function() {
    if ($("body").hasClass("console")) {
        $(".menu_header .menu_btn #open_terminal").addClass(".open");
        load_terminal(true)
    }
    if ($("#window-console").hasClass("hidden") == false) {
        load_terminal(true)
    }
    if (localStorage["dash"] == 1 && havelogins == true) {
        load_terminal(true);
        setDash(1)
    }
    $("#close").click(function() {
        load_terminal(false);
        setDash(0);
        localStorage["dash"] = 0
    });
    $("#header .square").click(function() {
        if (stars_active == 1) {
            stars_active = 0;
            localStorage["stars_active"] = 0;
            $("#header .square").removeClass("active")
        } else {
            stars_active = 1;
            localStorage["stars_active"] = 1;
            $("#header .square").addClass("active")
        }
    });
    var e;
    $(document).on("mouseenter", "#dash .feeds ul li", function() {
        var t = $(this);
        e = setTimeout(function() {
            t.find(".description").slideDown()
        }, 800)
    }).on("mouseleave", "#dash .feeds ul li", function() {
        $(this).find(".description").slideUp();
        clearInterval(e)
    }).on("click", "#start_menu .start_logo", function() {
        $.post(SITE + "themes/default/async/terminal_start.php", {
            action: "initialize",
            requirelogin: true,
            username: logged_username,
            key: logged_key
        }, function(e) {
            $("#start_menu div.container div.menu_box div.outer").html("<div class='user_info'><img src='http://www.gravatar.com/avatar/" + e.avatar_hash + "' alt='' />" + e.username + "</div>")
        });
        $("#start_menu .menu_box").toggle()
    }).on("keyup", "#window-nodejs-chat .input-chat .field", function(e) {
		if (e.keyCode == 13) {
			var text = $(".field").val();
			socket.emit('send', { message: text });
			
			$(this).val("");
		}
	});
});

var sparkles = 60;
var x = ox = 400;
var y = oy = 300;
var swide = 800;
var shigh = 600;
var sleft = sdown = 0;
var tiny = new Array;
var star = new Array;
var starv = new Array;
var starx = new Array;
var stary = new Array;
var tinyx = new Array;
var tinyy = new Array;
var tinyv = new Array;
$(function() {
    var e, t, n, r;
    for (var e = 0; e < sparkles; e++) {
        var t = createDiv(3, 3, stars_colour);
        t.style.visibility = "hidden";
        document.body.appendChild(tiny[e] = t);
        starv[e] = 0;
        tinyv[e] = 0;
        var t = createDiv(5, 5, stars_colour);
        t.style.backgroundColor = "transparent";
        t.style.visibility = "hidden";
        var n = createDiv(1, 5, stars_colour);
        var r = createDiv(5, 1, stars_colour);
        t.appendChild(n);
        t.appendChild(r);
        n.style.top = "2px";
        n.style.left = "0px";
        r.style.top = "0px";
        r.style.left = "2px";
        document.body.appendChild(star[e] = t)
    }
    set_width();
    sparkle()
});
$("body").mousemove(function(e) {
    if (stars_active == 1) {
        mouse(e)
    }
});
window.onresize = set_width