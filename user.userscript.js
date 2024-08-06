// ==UserScript==
// @name         xray
// @version      2024-08-06
// @description  this wont be an end of world trust me
// @match        https://starve.io/*
// @require      https://unpkg.com/guify@0.12.0/lib/guify.min.js
// @run-at       document-start
// @grant        none
// ==/UserScript==
let log = console.log;

let Settings = {
    xray: {
        enabled: false,
        key: "KeyJ",
        opacity: 0.40
    }
};

document.addEventListener("keydown", (evt) => {
    if (evt.code === Settings.xray.key) {
        Settings.xray.enabled = !Settings.xray.enabled;
    }
});

function xray() {
    let ctx = document.querySelector("canvas").getContext("2d");
    const DrawImage = ctx.drawImage;

    ctx.drawImage = function() {
        if (Settings.xray.enabled) {
            ctx.globalAlpha = Settings.xray.opacity;
        }
        DrawImage.apply(ctx, arguments);
    };
}

const guisif = {
    initial: () => {
        let GUI = new guify({
            title: "Xray",
            theme: {
                name: "Triade Theme",
                colors: {
                    menuBarBackground: "rgb(35, 35, 35)",
                    menuBarText: "rgb(102, 0, 0)",
                    panelBackground: "rgb(0, 0, 0)",
                    componentBackground: "rgb(22, 22, 22)",
                    componentForeground: "rgb(255, 255, 255)",
                    textPrimary: "rgb(255, 255, 255)",
                    textSecondary: "rgb(85, 210, 50)",
                    textHover: "rgb(0, 0, 0)"
                },
                font: {
                    fontFamily: 'Baloo Paaji',
                    fontSize: '16px',
                    fontWeight: '100'
                },
            },
            align: "left",
            width: 350,
            barMode: "none",
            panelMode: "none",
            opacity: .95,
            root: window.container,
            open: true,
            pollRateMS: 100,
        });

        const Tab = " ";
        GUI.Register([
            {
                type: "checkbox",
                label: Tab + 'Xray',
                object: Settings.xray,
                property: 'enabled',
                onChange: (val) => {
                    Settings.xray.enabled = val;
                }
            },
            {
                type: "range",
                label: Tab + 'Xray Opacity',
                min: 0,
                max: 1,
                step: 0.1,
                object: Settings.xray,
                property: 'opacity',
                scale: "linear",
            },
            {
                type: "display",
                label: "Xray Key:",
                object: Settings.xray,
                property: "key"
            },
            {
                type: "button",
                label: "Set Xray Key",
                action: () => {
                    guisif.controls.setKeyBind("xray");
                }
            },
        ]);
    },

    controls: null,

    controller: class {
        setKeyBind(property) {
            Settings[property].key = "Press any key";
            let keyPressCount = 0;

            document.addEventListener("keydown", function onKeyDown(event) {
                keyPressCount++;
                if (keyPressCount >= 1) {
                    Settings[property].key = event.code === "Escape" ? "NONE" : event.code;
                    document.removeEventListener("keydown", onKeyDown);
                    guisif.saveSettings();
                }
            });
        }
    },

    saveSettings: () => {
        for (let key in Settings) {
            localStorage.setItem(key + "danb", JSON.stringify(Settings[key]));
        }
    },

    loadSettings: () => {
        for (let key in Settings) {
            let storedSetting = localStorage.getItem(key + "danb");
            if (storedSetting) {
                Settings[key] = JSON.parse(storedSetting);
            }
        }
    },

    loadHack: () => {
        guisif.controls = new guisif.controller();
        guisif.loadSettings();
        guisif.initial();
        guisif.saveSettings();
    }
}

function removeAds() {
    let adFrame = document.getElementById("ssIFrame_google");
    let prerollAd = document.getElementById("preroll");
    let trevdaAd = document.getElementById("trevda");
    let style = document.createElement("style");

    if (prerollAd) prerollAd.remove();
    if (trevdaAd) trevdaAd.remove();
    style.innerHTML = ".grecaptcha-badge { visibility: hidden; }";
    document.head.appendChild(style);

new MutationObserver((function(e){for(const c of e)for(const e of c.addedNodes)e.src&&(e.src.includes("server.cmpstar.net")||e.src.includes("sdk.truepush.com")||e.src.includes("sdki.truepush.com")||e.src.includes("adinplay")||e.src.includes("amazon-adsystem.com")||e.src.includes("www.google-analytics.com")||e.src.includes("ib.adnxs.com")||e.src.includes("targeting.unrulymedia.com")||e.src.includes("www.google-analytics.com")||e.src.includes("pagead2.googlesyndication.com")||e.src.includes("doubleclick.net")||e.src.includes("script.4dex.io"))&&(e.src="",e.innerHTML="",e.textContent=""),"wg-ad-container"===e.className&&setTimeout((function(){const e=document.querySelector(".wg-ad-player");e.currentTime=20,e.parentElement.style.display="none"}),1)})).observe(document,{childList:!0,attributes:!0,subtree:!0});

}

function checker() {
    let chat = document.getElementById("chat_block");

    window.dc = atob("d3p2dg==");

    let preroll = document.getElementById("preroll");
    let trevda = document.getElementById("trevda");

    if (chat && preroll && trevda) {
        setTimeout(removeAds, 5000);
        xray();
        guisif.loadHack();
        log("r");
    } else {
        requestAnimationFrame(checker);
    }
}

checker();
