window.onload = () => {
    var demo = document.querySelector('.demo');
    var msg = document.querySelector('.feed h2');
    var play = document.querySelector('#replay');
    var ground = document.querySelector('.ground');
    var ambu = document.querySelector('.ambu');
    var gameafter = document.querySelector('.gameafter');
    function all() {
        var savings = 0;
        var body = document.querySelector('body');
        //	resize cloud when window on resize
        var cloud = document.querySelectorAll('.cloud');
        var clength = cloud.length;
        for (i = 0; clength > i; i++) {
            var cloud_style = window.getComputedStyle(cloud[i]);
            cloud[i].style.setProperty('--cwidth', cloud_style.width);
        }

        var drop = document.querySelectorAll('.rain ul li');
        var dlength = drop.length;
        for (i = 0; dlength > i; i++) {
            var drop_style = window.getComputedStyle(drop[i]);
            drop[i].style.setProperty('--dwidth', drop_style.width);
        }

        var bkt = document.querySelector('.bkt');
        var bkt_style = window.getComputedStyle(bkt);
        bkt.style.setProperty('--bwidth', bkt_style.width);

        var point = document.querySelector('.ope');
        var point_style = window.getComputedStyle(point);
        var ground_style = window.getComputedStyle(ground);
        point.style.setProperty('--gwidth', ground_style.width);
        var ground_r = ground.getBoundingClientRect();
        var ind = document.querySelector('.ind');
        // ind.style.top = bkt_rr.y;


        var sharp = document.querySelector('.sharp');
        var ambu_style = window.getComputedStyle(ambu);
        var ambu_r = undefined;
        var awidth = parseFloat(ambu_style.width);
        var sharp1 = awidth / 2;
        var sharp2 = awidth + awidth / 4;
        var aheight = awidth * 7 + awidth / 2;
        ambu.style.setProperty('--aheight', aheight);
        sharp.style.borderWidth = "0 " + sharp1 + "px " + sharp2 + "px " + sharp1 + "px";
        var poiy_new = undefined;
        poiy_new = ground_r.height * 0.60;

        var water = document.querySelector('.water');
        var water_style = window.getComputedStyle(water);
        var waterstate = parseInt(water_style.top);
        var waterview = undefined;

        //////////////////////////////////////
        ///////////////////////////////////////
        /////////////////////////////////////

        var rain = document.querySelectorAll('.rain');
        var temp = 0;
        rainfall(0);
        setInterval(function () {
            var rain_active = Math.floor(Math.random() * (3 - 0) + 0);
            if (temp == rain_active) {
                if (rain_active == 2) {
                    rain_active = 0;
                }
                else {
                    rain_active++;
                }
            }
            temp = rain_active;
            rainfall(rain_active);
            seeni(temp);
        }, 3000);
        // current rain falling
        function rainfall(x) {
            for (var i = 0; i < 3; i++) {
                if (i == x) {
                    rain[i].style.display = "block";
                }
                else {
                    rain[i].style.display = "none";
                }
            }
        }
        seeni(0);

        function seeni(s) {
            var bkt_r = bkt.getBoundingClientRect();
            var bkt_sa = bkt_r.x;
            var bkt_sb = bkt_r.width + bkt_r.x;
            var hide = document.querySelectorAll('.hide');
            for (var i = 0; i < 3; i++) {
                var hide_r = hide[i].getBoundingClientRect();
                var xxx = bkt_r.y - hide_r.y;
                xxx += 7;
                var bkt_per = bkt_r.width / 2;
                var bkt_pa = bkt_sa - bkt_per;
                var bkt_pb = bkt_sb - (bkt_per / 2);
                if (hide_r.x > bkt_pa && hide_r.x < bkt_pb) {
                    hide[i].style.height = xxx + "px";
                    if (i == s) {
                        // body.style.background="red";
                        savings++;
                        var save = Math.round(savings / 8);
                        ind.innerHTML = save + "%";
                        // demo.innerHTML = savings;
                        if (save > 100) {
                            ground.style.display = "none";
                            replay(1);
                        }
                        if (save > 100 - waterstate) {
                            waterview = save - (100 - waterstate);
                            var fff = waterstate - waterview;
                            if (fff < 3) { fff = 3 };
                            water.style.top = fff;
                        }
                    }
                    else {
                        // body.style.background="green";
                    }
                }
                else {
                    hide[i].style.height = "100%";
                }
            }
        }

        setInterval(games, 50);

        function games() {
            seeni(temp);
        }

        // var body = document.querySelector('body');
        var che = 0;
        ground.addEventListener('touchmove', touchkeep);
        var point_offw = parseFloat(point_style.width) / 2;
        var keeping = function mousekeep(e) {
            var tx = e.clientX;
            var ty = e.clientY;
            var poix = (tx - ground_r.x) - point_offw;
            var poiy = (ty - ground_r.y) - point_offw;
            if (poiy < poiy_new) {
                poiy = poiy_new;
            }
            point.style.top = poiy;
            point.style.left = poix;
            bkt.style.top = (poiy - parseFloat(bkt_style.width) / 2) - 5;
            bkt.style.left = poix + parseFloat(bkt_style.width) / 5;
        }
        function touchkeep(e) {
            var tx = e.touches[0].clientX;
            var ty = e.touches[0].clientY;
            var poix = (tx - ground_r.x) - point_offw;
            var poiy = (ty - ground_r.y) - point_offw;
            if (poiy < poiy_new) {
                poiy = poiy_new;
            }
            point.style.top = poiy;
            point.style.left = poix;
            bkt.style.top = (poiy - parseFloat(bkt_style.width) / 2) - 5;
            bkt.style.left = poix + parseFloat(bkt_style.width) / 5;
        }
        point.onclick = function () {
            if (che == 0) {
                ground.addEventListener('mousemove', keeping);
                point.style.cursor = "grabbing";
                che = 1;
            }
            else {
                ground.removeEventListener('mousemove', keeping);
                point.style.cursor = "pointer";
                che = 0;
            }
        }

        var stop = undefined;
        var stops = undefined;
        var tops = poiy_new - parseInt(bkt_style.width) * 1.5;
        ambu.style.setProperty('--tops', tops);
        var bottoms = parseInt(ground_style.height) - 100;
        ambu.style.setProperty('--bottoms', bottoms);

        var exact = Math.floor(Math.random() * (bottoms - tops) + tops);
        var left = parseInt(ground_style.width) + parseInt(ground_style.width) / 3;
        function force() {
            ambu.style.transition = "0s";
            sharp.style.borderBottomColor = "red";
            stops = setTimeout(() => {
                sharp.style.borderBottomColor = "grey";
                ambu.style.animationPlayState = "paused";
                ambu.style.transition = "1s";
                findout(1);
                ambu.style.left = left;
                ambu.style.visibility = "hidden";
                stop = setTimeout(() => {
                    ambu.style.left = (parseInt(ground_style.width) * 0.15) * -1;
                    ambu.style.animationPlayState = "running";
                    ambu.style.transition = "0s";
                    ambu.style.visibility = "visible";
                    findout(0);
                }, 1000);
            }, 1000);
        }
        var sec = Math.floor(Math.random() * (6 - 3) + 3);
        sec *= 1000;
        var stopss = setInterval(() => {
            force();
            sec += 1000;
            if (sec == 6000) {
                sec = 3000;
            }
        }, sec);


        function findout(find) {
            if (find == 1) {
                var out = setInterval(() => {
                    bkt_r = bkt.getBoundingClientRect();
                    ambu_r = ambu.getBoundingClientRect();
                    var bkt_top = bkt_r.y;
                    var bkt_bot = bkt_r.y + bkt_r.width;
                    bkt_top -= 5;
                    bkt_bot -= 5;
                    var ambu_tb = ambu_r.x + ambu_r.width;
                    var bkt_tb = bkt_r.x + bkt_r.width;
                    var ans = bkt_r.x - ground_r.x - ambu_r.width;
                    if (bkt_r.x < ambu_tb && ambu_tb < bkt_tb && ambu_r.y < bkt_bot && ambu_r.y > bkt_top) {
                        clearInterval(stopss);
                        clearTimeout(stop);
                        clearTimeout(stops);
                        ambu.animationPlayState = "paused";
                        ambu.style.visibility = "visible";
                        ambu.style.transition = "0s";
                        ambu.style.left = ans + ground_r.width / 4.5;
                        ground.removeEventListener('mousemove', keeping);
                        point.style.cursor = "default";
                        ground.removeEventListener('touchmove', touchkeep);
                        clearInterval(out);
                        replay(0);
                    }
                }, 50);
            }
            else {
                clearInterval(out);
                body.style.background = "lightgrey";
            }
        }
        function replay(x) {
            savings = 0;
            setTimeout(() => {
                ambu.style.display = "none";
                ground.style.display = "none";
                gameafter.style.display = "block";
            }, 1000);
            if (x) {
                gameafter.style.display = "block";
                msg.innerHTML = "You Win";
                msg.style.background = "green";
            }
        }

    }
    all();

    play.onclick = function () {
        location.reload();
    }

    setTimeout(() => {
        ground.style.visibility = "visible";
    }, 1000);
}