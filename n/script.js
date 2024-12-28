const candles = document.querySelectorAll(".candle");
const message = document.getElementById("message");

navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then((stream) => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    microphone.connect(analyser);

    function detectBlow() {
      analyser.getByteFrequencyData(dataArray);
      const volume =
        dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;

      if (volume > 30) {
        // Üfürmə səviyyəsi
        candles.forEach((candle) => candle.classList.add("off"));
        setTimeout(() => {
          message.textContent =
            "Gözəllik, səmimilik, ağıl və cəsarət olan bu qızın ad günü mübarək 😇😇 Arzu edirəm kədər səndən uzaq və sağlıq👩🏻‍⚕,uğur🐞,pul 💸💸 dolu günlər daim səninlə olsun.Bir ömür  hər şeyin ən gözəli.🙏🏻🙏🏻 Neçə gözəl xoşbəxt illərə..";
        }, 1000);
      }
    }

    setInterval(detectBlow, 100);
  })
  .catch((err) => {
    alert("Demişdim axı Mikrofona giriş icazəsi lazımdır!");
  });
