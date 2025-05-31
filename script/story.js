const scenes = [
  { id: 1, text: "Di sebuah desa kecil di pinggiran kerajaan Priest Empire, hiduplah seorang anak yatim piatu yang tinggal di panti asuhan.", choices: [{ text: "Lanjut", next: 2 }] },
  { id: 2, text: "Ia kehilangan orang tuanya dalam kecelakaan tragis.", choices: [{ text: "Lanjut", next: 3 }] },
  { id: 3, text: "Satu-satunya cahaya dalam hidupnya adalah seorang gadis kecil bernama Alice, yang selalu hadir untuknya.", choices: [{ text: "Lanjut", next: 4 }] },
  { id: 4, text: "Alice selalu memimpikan masa depan yang damai dan bahagia, yang ingin ia jalani bersamamu.", choices: [{ text: "Lanjut", next: 5 }] },
  { id: 5, text: "Saat bermain bersama Alice, kalian didatangi oleh seorang utusan dewa.", choices: [{ text: "Lanjut", next: 6 }] },
  { id: 6, text: "Ia menyampaikan wahyu bahwa kamu adalah sang pahlawan terpilih untuk melawan Raja Iblis.", choices: [{ text: "Lanjut", next: 7 }] },
  { id: 7, text: "Utusan itu memberimu kekuatan untuk mengembalikan waktu.", choices: [{ text: "Lanjut", next: 8 }] },
  { id: 8, text: "Kamu pun berlatih keras bersama Alice hingga larut malam.", choices: [{ text: "Lanjut", next: 9 }] },
  { id: 9, text: "Bertahun-tahun berlalu, kamu tumbuh menjadi remaja yang kuat, memimpin party berisi para pahlawan lainnya.", choices: [{ text: "Lanjut", next: 10 }] },
  { id: 10, text: "Alice pun bergabung dalam party itu.", choices: [{ text: "Lanjut", next: 11 }] },
  { id: 11, text: "Kalian menyelamatkan banyak orang dan memukul mundur pasukan Raja Iblis dari berbagai wilayah.", choices: [{ text: "Lanjut", next: 12 }] },
  { id: 12, text: "Namun kamu menyadari tidak semua orang bisa diselamatkan.", choices: [{ text: "Lanjut", next: 13 }] },
  { id: 13, text: "Sebagian orang menyalahkanmu atas kematian orang terkasih mereka.", choices: [{ text: "Lanjut", next: 14 }] },
  { id: 14, text: 'Tapi Alice selalu tersenyum, menguatkanmu: "Kamu adalah pahlawan. Aku selalu mendukungmu apapun keputusanmu."', choices: [{ text: "Lanjut", next: 15 }] },
  { id: 15, text: "Akhirnya, kamu sampai di istana Raja Iblis.", choices: [{ text: "Lanjut", next: 16 }] },
  { id: 16, text: "Kamu telah mengulang pertempuran ini 30 kali.", choices: [{ text: "Lanjut", next: 17 }] },
  { id: 17, text: "Dan setiap kali kamu menang, Raja Iblis merasuki Alice.", choices: [{ text: "Lanjut", next: 18 }] },
  { id: 18, text: "Satu-satunya cara menyelamatkan dunia... adalah membunuhnya.", choices: [{ text: "Lanjut", next: 19 }] },
  { id: 19, text: "Namun, ada satu mantra kuno yang bisa mengirim Raja Iblis ke masa lalu... dengan bayaran nyawamu.", choices: [{ text: "Lanjut", next: 20 }] },
  { id: 20, text: "Apa pilihanmu kali ini?", choices: [{ text: "Lanjut ke pertarungan terakhir", next: 21 }] 
  },
  {
    id: 21,
    text: "Ini adalah perulangan ke-31. Alice kembali dirasuki Raja Iblis...",
    choices: [
      { text: "Hadapi Alice", next: 22 },
      { text: "Gunakan mantra kuno", next: 23 },
    ],
  },
  {
    id: 22,
    text: "Alice berdiri di hadapanmu, matanya hitam pekat. Suaranya bukan miliknya.",
    choices: [
      { text: "Bunuh Alice demi dunia", next: 24 },
      { text: "Ragukan pilihanmu...", next: 25 },
    ],
  },
  {
    id: 23,
    text: "Mantra kuno bergetar di tanganmu. Kau tahu, jika kau menggunakannya... hidupmu berakhir.",
    choices: [
      {
        text: "Gunakan mantra dan kirimkan Raja Iblis ke masa lalu",
        next: "end2",
      },
      { text: "Tunda dan hadapi Alice", next: 21 },
    ],
  },
  {
    id: 24,
    text: "Kau menikam Alice. Dunia kembali damai, namun kau kehilangan bagian dari dirimu.",
    choices: [{ text: "Akhiri", next: "end1" }],
  },
  {
    id: 25,
    text: "Alice tersenyum... untuk sesaat. Mungkin masih ada harapan.",
    choices: [
      { text: "Coba berbicara dengannya", next: 26 },
      { text: "Gunakan mantra sekarang", next: "end2" },
    ],
  },
  {
    id: 26,
    text: "Alice tiba tiba menyerangmu. Jiwanya bergetar, antara sadar dan berbisik: \"bunuhlah aku untuk masa depan impian kita.\"",
    choices: [{ text: "Serangan Terakhir", next: 24 }],
  },
];

const endings = {
  end1: "Anda berhasil menyelamatkan dunia namun anda kehilangan orang yang anda ingin lindungi, namun dia tidak berada dimasa depan bersamamu di masa depan yang kalian impikan. You won, but was it worth it?",
  end2: "Anda berhasil menyelamatkan dunia dengan konsekuensi anda telah mati bersama raja iblis, anda tidak dapat menikmati masa depannya yang anda impikan bersama Alice. You are not part of the future you dream of.",
};

const textElement = document.querySelector(".text");
const choicesElement = document.querySelector(".choices");
const title = document.querySelector(".title");
const span = document.querySelector('.span')
const startButton = document.querySelector(".btn-start");
const quote = document.querySelector('.quote');
const wm = document.querySelector('.wm')

let typing = false;

function startGame() {
  startButton.style.display = "none";
  title.style.display = "none";
  quote.style.display = "none";
  wm.style.display = 'none';
  showScene(1);
}

async function showScene(id) {
  const scene = scenes.find((s) => s.id === id);
  if (!scene) return;
  choicesElement.innerHTML = "";
  await typeText(scene.text);
  scene.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.classList.add("choice-button");
    button.onclick = () => {
      if (typeof choice.next === "string") {
        showEnding(choice.next);
      } else {
        showScene(choice.next);
      }
    };
    choicesElement.appendChild(button);
  });
}

async function typeText(text) {
  typing = true;
  textElement.textContent = "";
  for (let i = 0; i < text.length; i++) {
    textElement.textContent += text[i];
    await new Promise((resolve) => setTimeout(resolve, 30));
  }
  typing = false;
}

async function showEnding(endId) {
  choicesElement.innerHTML = "";
  await typeText(endings[endId]);
}

function musicBackground() {
  const music = document.querySelector('.music')
  music.play();
  music.loop = true;
  music.muted = false;
}

span.addEventListener('click', () => {
  musicBackground()
})

startButton.addEventListener("click", startGame);



