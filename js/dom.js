// navigation
let nav = document.createElement('div');
nav.className = 'nav';
let logo = document.createElement('div');
logo.className = 'logo'
logo.innerHTML = `<span style='color: #0098D4;text-transform: capitalize'>S</span>ega`;
nav.appendChild(logo);
document.body.appendChild(nav);

// container 
let cont = document.createElement('div');
cont.className = 'container';

// score container
let segaScore = document.createElement('div');
segaScore.className = 'sega-score';
cont.appendChild(segaScore);
for (let i = 0; i < 2; i++) {
  let scores = document.createElement('div');
  scores.className = `score sc${i+1}`;
  scores.innerText = 0;
  segaScore.appendChild(scores)
}
// sega container
let segaCont = document.createElement('div');
segaCont.className = 'sega-cont';
for (let i = 0; i < 9; i++) {
  let pieces = document.createElement('div');
  pieces.className = `piece p${i+1}`;
  segaCont.appendChild(pieces);
  if (i <= 2) {
    let icon = document.createElement('div');
    icon.className = `i${i+1} icon1 unmoved`;
    icon.style.cssText = `font-size:50px;background-color: var(--blue);border-radius:50%;width:70px;height:70px;`
    pieces.appendChild(icon);
  }
  if (i >= 6) {
    let icon = document.createElement('div');
    icon.className = `i${i+1} icon2 unmoved`;
    icon.style.cssText = `border:solid;border-width: 0 35px 60px 35px;border-color: transparent transparent var(--red) transparent;`
    pieces.appendChild(icon);
  }
};
cont.appendChild(segaCont);

let next = document.createElement('button');
next.className = 'next';
next.innerHTML = `Next <i class="fas fa-angle-right ic"></i>`;
cont.appendChild(next);
document.body.appendChild(cont);

let footer = document.createElement('div');
let copy = document.createElement('div');
footer.className = 'footer';
copy.innerHTML = `&copy; 2022 made by mahmoud khaled`;
footer.appendChild(copy);
document.body.appendChild(footer);
