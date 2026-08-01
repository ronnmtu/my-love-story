const words = ['Hey Nyawira...', 'I made something just for you.'];

let line = 0, char = 0;


const typed = document.querySelector('#typed');

function type() {
  if (char < words[line].length) {
    typed.innerHTML += words[line][char++];
    setTimeout(type, 65)
  }
  else if (line === 0) {
    setTimeout(() => {
      line++; char = 0;
      typed.innerHTML = '';
      type()
    }, 900)
  }
  else typed.innerHTML += '<span class="cursor">|</span>'
} type();

document.querySelector('#open').onclick = () => {
  document.querySelector('#welcome').style.display = 'none';
  document.querySelector('#story').classList.add('show');
  window.scrollTo(0, 0)
};

document.querySelectorAll('.reason').forEach(card => card.onclick = () => {
  card.classList.toggle('opened');
  card.querySelector('small').textContent = card.classList.contains('opened') ? 'Close' : 'Open me'
}
);

const start = new Date('2024-10-22T19:30:00').getTime();

function clock() {
  let d = Math.max(0, Date.now() - start);
  let v = [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24,
  Math.floor(d / 6e4) % 60,
  Math.floor(d / 1e3) % 60];
  ['days', 'hours', 'minutes', 'seconds'].forEach((id, i) =>
    document.getElementById(id).textContent = v[i])
}
clock();
setInterval(clock, 1000);

const quiz = [
  { q: 'When did we first share our feelings?', a: ['June 15th', 'October 22nd', 'February 14th', "New Year's Eve"], c: 'June 15th', r: 'June 15th ♥ — the day the talking stage stopped pretending.' },

  { q: 'What was my first gift to you?', a: ['A plushie, a necklace & a bracelet', 'Perfume', 'A journal', 'Flowers'], c: 'A plushie, a necklace & a bracelet', r: 'A plushie with a necklace and a bracelet — and you still have all three.' },

  { q: 'What was your first gift to me?', a: ['Perfume, a sudoku book & a journal', 'A watch', 'A plushie', 'Chocolate'], c: 'Perfume, a sudoku book & a journal', r: 'Perfume, a sudoku book and a journal. You knew me too well already.' },

  {
    q: 'What was my very first nickname for you?', a: ['Nyams', 'Nyamburu', 'Little jar of ashes'], c: 'Nyams', r: 'Nyams ♥ — the first of many, and still the softest one.'
  }
];

let qi = 0, chosen = [], locked = false;

function renderQuiz() {
  const x = quiz[qi], question = document.querySelector('#question'), answers = document.querySelector('#answers'), feedback = document.querySelector('#feedback'); if (qi === quiz.length) {
    question.textContent = `${chosen.filter((a, i) => a === quiz[i].c).length}/${quiz.length} ♥`; answers.innerHTML = '<button id="again">Try again</button>';
    feedback.textContent = 'Perfect score or not — you are still my favourite answer.';
    document.querySelector('#again').onclick = () => {
      qi = 0; chosen = [];
      renderQuiz()
    };
    return

  }

  question.textContent = `Question ${qi + 1} of ${quiz.length}: ${x.q}`; feedback.textContent = '';
  answers.innerHTML = x.a.map(a => `<button>${a}</button>`).join('');

  document.querySelectorAll('#answers button').forEach(b => b.onclick = () => {
    if (locked) return; locked = true; let picked = b.textContent; chosen.push(picked);
    document.querySelectorAll('#answers button').forEach(z => {
      if (z.textContent === x.c) z.style.background = '#dff1de';
      else if (z === b) z.style.background = '#f4dddd'
    });

    feedback.textContent = picked === x.c ? x.r : `Almost — ${x.r}`;

    // Remove any existing Next button
    document.querySelector("#nextQuiz")?.remove();

    const next = document.createElement("button");
    next.id = "nextQuiz";
    next.className = "love-button";
    next.textContent = qi === quiz.length - 1 ? "Finish" : "Next";

    next.onclick = () => {
      qi++;
      locked = false;
      renderQuiz();
    };

    feedback.after(next);
  })
}

renderQuiz();
document.querySelector('#gift').onclick = () => {
  document.querySelector('#gift').parentElement.style.display = 'none';
  let letter = document.querySelector('#letter');
  letter.hidden = false;
  letter.scrollIntoView({ behavior: 'smooth' });
  let text = "Happy Girlfriend's Day ♥", i = 0,
    target = document.querySelector('#letterTitle');
  let timer = setInterval(() => {
    target.textContent = text.slice(0, ++i);
    if (i === text.length) clearInterval(timer)
  },
    65)
};

function hearts() {
  for (let i = 0; i < 50; i++) {
    let h = document.createElement('span');
    h.className = 'burst';
    h.textContent = '♥';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.fontSize = (14 + Math.random() * 28) + 'px';
    h.style.setProperty('--x', (Math.random() * 200 - 100) + 'px');
    document.body.appendChild(h); setTimeout(() => h.remove(), 3200)
  }
}

document.querySelector('#love').onclick = () => {
  hearts();
  document.querySelector('#loveReply').textContent = 'Cant wait to see you!!'
};

const memories = [
  {
    image: "images/WhatsApp Image 2026-03-26 at 15.30.52(1).jpeg",
    caption: 'Tongues out',
    story: "I believe this was a foreshadowing of the trip back to your place."
  },
  { image: "images/WhatsApp Image 2026-08-01 at 10.34.43 (1).jpeg", caption: 'Just us being us', story: 'We were just ourselves, and that was perfect.' },

  { image: "images/IMG_20250802_214853_029.jpg", caption: 'Whos this?', story: 'I love how i just have this random photo. Somewhat a reminder that you are still silly(most uncringiest way i could say it)' },
  { image: "images/WhatsApp Image 2026-08-01 at 10.34.46 (2).jpeg", caption: 'Golden hour on you', story: 'The golden hour always makes you look beautiful. Gives an extra glow to your already amazing skin' },
  { image: "images/WhatsApp Image 2026-08-01 at 10.35.19 (2).jpeg", caption: 'Late night memories', story: 'One of my favourite photos of us teogether, defo top 5' },
  { image: "images/IMG_20250802_213014_544.jpg", caption: 'A pretty smile', story: 'Your smile could light up the darkest room.' },
  { image: "images/WhatsApp Image 2026-08-01 at 10.34.42.jpeg", caption: 'Kitchen queen', story: 'You are the best cook-helper I know. Even though you do need to improve on cutting the onions' },
  { image: "images/WIN_20250508_20_55_26_Pro.jpg", caption: 'Night Prep silliness', story: 'Those late night conversations mean everything to me. Can never forget those night preps that genuinly carried that term.' },
  { image: "images/IMG_20250802_213726_807.jpg", caption: 'Sunshine looks good on you', story: 'Please never stop taking phtos at the golden hour and ofc sending them to me.' },
  { image: "images/WhatsApp Image 2026-08-01 at 10.34.45 (3).jpeg", caption: 'The little details I adore', story: 'I love all the little things about you.' },
  { image: "images/WhatsApp Image 2026-08-01 at 10.35.16 (2).jpeg", caption: 'Beautiful, always', story: 'You are beautiful, inside and out. You got the most beautiful soul of all time.' },
  { image: "images/WhatsApp Image 2026-08-01 at 10.35.21 (2).jpeg", caption: 'Simply stunning', story: 'You are simply stunning!' }
];
const gallery = document.querySelector("#gallery");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const lightboxStory = document.querySelector("#lightboxStory");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const closeViewer = document.querySelector("#closeViewer");

let currentMemory = 0;


// Build Gallery
memories.forEach((memory, index) => {

  const card = document.createElement("button");
  card.className = "polaroid";

  const img = document.createElement("img");
  img.src = memory.image;
  img.alt = memory.caption;

  const caption = document.createElement("span");
  caption.textContent = memory.caption;

  card.appendChild(img);
  card.appendChild(caption);

  card.addEventListener("click", () => {
    openMemory(index);
  });

  gallery.appendChild(card);

});


// ===========================
// OPEN MEMORY
// ===========================

function openMemory(index) {

  currentMemory = index;

  const memory = memories[index];

  lightbox.hidden = false;

  lightboxImage.src = memory.image;
  lightboxCaption.textContent = memory.caption;
  lightboxStory.textContent = memory.story;

  lightboxImage.onload = function () {

    lightboxImage.classList.remove("portrait", "landscape");

    if (this.naturalHeight > this.naturalWidth) {
      lightboxImage.classList.add("portrait");
    } else {
      lightboxImage.classList.add("landscape");
    }

  };

  // Previous button
  prevBtn.style.visibility = currentMemory === 0 ? "hidden" : "visible";

  // Next button
  if (currentMemory === memories.length - 1) {
    nextBtn.textContent = "Exit Memory Viewer ❤️";
  } else {
    nextBtn.textContent = "Next →";
  }

}


// ===========================
// BUTTONS
// ===========================

prevBtn.addEventListener("click", () => {

  if (currentMemory > 0) {
    openMemory(currentMemory - 1);
  }

});

nextBtn.addEventListener("click", () => {

  if (currentMemory === memories.length - 1) {

    lightbox.hidden = true;
    return;

  }

  openMemory(currentMemory + 1);

});

closeViewer.addEventListener("click", () => {

  lightbox.hidden = true;

});


// Close when clicking outside viewer
lightbox.addEventListener("click", (e) => {

  if (e.target === lightbox) {
    lightbox.hidden = true;
  }

});


// Escape key
document.addEventListener("keydown", (e) => {

  if (e.key === "Escape") {
    lightbox.hidden = true;
  }

});

const audio = new Audio("music/nafeesisboujee - spin u round (Lyrics) - (320 Kbps).mp3");
audio.loop = true;

const musicBtn = document.querySelector("#music");

musicBtn.onclick = () => {

  if (audio.paused) {

    audio.play();
    musicBtn.textContent = "❚❚";

  } else {

    audio.pause();
    musicBtn.textContent = "♫";

  }

}

document.querySelector('#theme').onclick = () => {
  document.body.classList.toggle('dark');
  document.querySelector('#theme').textContent = document.body.classList.contains('dark') ? '☀' : '☾'
};

let lastHeart = 0;
addEventListener('pointermove', e => {
  if (performance.now() - lastHeart < 110)
    return; lastHeart = performance.now();
  let h = document.createElement('span');
  h.className = 'cursor-heart';
  h.textContent = '♥';
  h.style.left = e.clientX + 'px';
  h.style.top = e.clientY + 'px';
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 1200)
});