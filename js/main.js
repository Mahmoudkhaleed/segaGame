// equalization Height and Width of segacont
segaCont.style.height = `${segaCont.offsetWidth}px`;
// the limits of container
var iconHalfWidth = document.querySelector('.icon1').offsetWidth / 2,
  piecesWidth = document.querySelector('.piece').offsetWidth,
  startLeft = segaCont.offsetLeft + 5 + iconHalfWidth,
  startTop = segaCont.offsetTop + 5 + iconHalfWidth,
  endLeft = segaCont.offsetLeft + 5 + segaCont.clientWidth - iconHalfWidth,
  endTop = segaCont.offsetTop + 5 + segaCont.clientWidth - iconHalfWidth,
// the limits of every box + half
  yhalfRow1 = piecesWidth + startTop - iconHalfWidth,
  yhalfRow2 = 2 * piecesWidth + startTop - iconHalfWidth,
  xhalfColumn1 = piecesWidth + startLeft - iconHalfWidth,
  xhalfColumn2 = 2 * piecesWidth + startLeft - iconHalfWidth;
// but active to score
let scores = document.querySelectorAll('.score');
scores.forEach(score => {
  score.classList.remove("active");
  score.classList.contains("sc1") ? score.classList.add("active") : "";
});

// logic
let icons1 = document.querySelectorAll('.icon1');
let icons2 = document.querySelectorAll('.icon2');

loopfun(icons1);
loopfun(icons2);
putOverlay("icon2");

function loopfun(arg) {
  arg.forEach(ico => {
    ico.addEventListener('touchstart', e => {
      e.preventDefault();
      [...e.changedTouches].forEach(touch => {
        ico.style.cssText += `position: absolute;transform:translate(-50%,-50%);`;
        let iden = Math.floor(Math.random() * 999);
        ico.dataset.id = iden;
        ico.parentElement.id = iden;
        if (touch.clientX >= startLeft && touch.clientX <= endLeft) {
          ico.style.cssText += `left:${touch.pageX}px;`;
        }
        if (touch.clientY >= startTop && touch.clientY <= endTop) {
          ico.style.cssText += `top:${touch.pageY}px;`;
        }
      });
    });
    ico.addEventListener('touchmove', e => {
      e.preventDefault();
      [...e.changedTouches].forEach(touch => {
        ico.style.cssText += `position:absolute;transform:translate(-50%,-50%);z-index:30`;
        segaCont.style.position = 'unset'
        if (touch.clientX >= startLeft && touch.clientX <= endLeft) {
          ico.style.cssText += `left:${touch.pageX}px;`;
        }
        if (touch.clientY >= startTop && touch.clientY <= endTop) {
          ico.style.cssText += `top:${touch.pageY}px;`;
        }
      });
    });
    ico.addEventListener('touchend', e => {
      e.preventDefault();
      ico.style.cssText += `position:absolute;transform:translate(-50%,-50%);z-index:0`;
      accordingTo(e, ico);
    });
  });
}

function accordingTo(e, foe) {
  [...e.changedTouches].forEach(touch => {
    // first column
    if (touch.clientY < yhalfRow1 && touch.clientX < xhalfColumn1 && document.querySelector('.p1').innerHTML == "") {
      moveOfIconTo("p1", foe, e);
    } else if (touch.clientY < yhalfRow2 && touch.clientY > yhalfRow1 && touch.clientX < xhalfColumn1 && document.querySelector('.p4').innerHTML == "") {
      moveOfIconTo("p4", foe, e);
    } else if (touch.clientY > yhalfRow2 && touch.clientX < xhalfColumn1 && document.querySelector('.p7').innerHTML == "") {
      moveOfIconTo("p7", foe, e);
    } else if (touch.clientY < yhalfRow1 && touch.clientX > xhalfColumn1 && touch.clientX < xhalfColumn2 && document.querySelector('.p2').innerHTML == "") {
      moveOfIconTo("p2", foe, e);
    // second column
    } else if (touch.clientY < yhalfRow2 && touch.clientY > yhalfRow1 && touch.clientX > xhalfColumn1 && touch.clientX < xhalfColumn2 && document.querySelector('.p5').innerHTML == "") {
      moveOfIconTo("p5", foe, e);
    } else if (touch.clientY > yhalfRow2 && touch.clientX > xhalfColumn1 && touch.clientX < xhalfColumn2 && document.querySelector('.p8').innerHTML == "") {
      moveOfIconTo("p8", foe, e);
    } else if (touch.clientY < yhalfRow1 && touch.clientX > xhalfColumn2 && document.querySelector('.p3').innerHTML == "") {
      moveOfIconTo("p3", foe, e);
    // third column
    } else if (touch.clientY < yhalfRow2 && touch.clientY > yhalfRow1 && touch.clientX > xhalfColumn2 && document.querySelector('.p6').innerHTML == "") {
      moveOfIconTo("p6", foe, e);
    } else if (touch.clientY > yhalfRow2 && touch.clientX > xhalfColumn2 && document.querySelector('.p9').innerHTML == "") {
      moveOfIconTo("p9", foe, e);
    } else {
      foe.style.cssText += `position: unset;transform:translate(0,0);`;
      document.getElementById(foe.dataset.id).appendChild(foe);
    }
  });
}

// short cut for moving of icon
function moveOfIconTo(piese, foe, e) {
  foe.style.cssText += `position: unset;transform:translate(0,0);`;
  foe.classList.remove('unmoved');
  document.querySelector(`.${piese}`).appendChild(foe);
  document.getElementById(foe.dataset.id).id = '';
  changesInMove(e, foe);
  shortOf(1, 'icon1');
  shortOf(2, 'icon2');
}
// logic of changing score and put an overly to the pieces that has icons
function changesInMove(e, icon) {
  document.querySelectorAll('.piece').forEach(piece => {
    piece.classList.contains('stopped') ?
      piece.classList.remove('stopped') : "";
    piece.classList.remove('fw-icon1', 'fw-icon2');
    document.querySelectorAll('.overlay').forEach(overlay => overlay.remove());
  });

  let sc1 = document.querySelector(`.sc1`);
  let sc2 = document.querySelector(`.sc2`);
  if (e.target.classList[1] == "icon1" && sc1.classList.contains("active")) {
    sc1.classList.remove("active");
    sc2.classList.add("active");
    putOverlay("icon1");
  } else if (e.target.classList[1] == "icon2" && sc2.classList.contains("active")) {
    sc2.classList.remove("active");
    sc1.classList.add("active");
    putOverlay("icon2");
  }
}
// function for form overlay
function putOverlay(icon) {
  document.querySelectorAll(`.${icon}`).forEach(icoPiece => {
    icoPiece.parentElement.classList.add('stopped');
    icoPiece.parentElement.classList.add(`fw-${icon}`);
    let overlay = document.createElement('div');
    overlay.className = 'overlay';
    icoPiece.parentElement.appendChild(overlay);
    if (icoPiece.classList.contains("icon1")) {
      icoPiece.classList.add('uppar-as-unmoved');
      document.querySelectorAll('.icon2').forEach(i => i.classList.remove('uppar-as-unmoved'))
    } else if (icoPiece.classList.contains("icon2")){
      icoPiece.classList.add('uppar-as-unmoved');
      document.querySelectorAll('.icon1').forEach(i => i.classList.remove('uppar-as-unmoved'))
    }
  });
}

// give true to right position
function giveTrue(pNum, icon) {
  if (!(document.querySelector(`.p${pNum}`).children.item(0) ? document.querySelector(`.p${pNum}`).children.item(0).classList.contains('unmoved') : false)) {
    return document.querySelector(`.p${pNum}`).classList.contains(`fw-${icon}`)
  }
}
// assumptions
function shortOf(scoreNum, icon) {
  if (giveTrue(1, icon) && giveTrue(2, icon) && giveTrue(3, icon)) {
    console.log('first row')
    addNumTo(scoreNum, 'rt');
    appareNext();
  } else if (giveTrue(4, icon) && giveTrue(5, icon) && giveTrue(6, icon)) {
    console.log('secand row')
    addNumTo(scoreNum, 'rm');
    appareNext();
  } else if (giveTrue(7, icon) && giveTrue(8, icon) && giveTrue(9, icon)) {
    console.log('third row')
    addNumTo(scoreNum, 'rb');
    appareNext();
  } else if (giveTrue(1, icon) && giveTrue(4, icon) && giveTrue(7, icon)) {
    console.log('first column')
    addNumTo(scoreNum, 'cr');
    appareNext();
  } else if (giveTrue(2, icon) && giveTrue(5, icon) && giveTrue(8, icon)) {
    console.log('secand column')
    addNumTo(scoreNum, 'cm');
    appareNext();
  } else if (giveTrue(3, icon) && giveTrue(6, icon) && giveTrue(9, icon)) {
    console.log('third column')
    addNumTo(scoreNum, 'cl');
    appareNext();
  } else if (giveTrue(1, icon) && giveTrue(5, icon) && giveTrue(9, icon)) {
    console.log('first cross')
    addNumTo(scoreNum, 'sr');
    appareNext();
  } else if (giveTrue(3, icon) && giveTrue(5, icon) && giveTrue(7, icon)) {
    console.log('secand cross')
    addNumTo(scoreNum, 'sl');
    appareNext();
  }
}
// increasing if the score
function addNumTo(scoreNum, pos) {
  scores.forEach(score => {
    score.classList.remove("active");
    score.classList.remove('last-winner');
  });
  document.querySelector(`.sc${scoreNum}`).innerHTML++;
  
  document.querySelector(`.sc${scoreNum}`).classList.add('last-winner');
  document.querySelector('.sega-cont').classList.add('act');
  setTimeout(() => {
    document.querySelector('.sega-cont').classList.add(pos);
  });
}
// stop the game
function appareNext() {
  if (next.classList.contains('down')) {
    next.classList.remove('down');
  }
  next.classList.add('active');
  next.style.display = 'flex'
  setTimeout(() => {
    next.style.opacity = '1';
  }, 0);

  let overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.style.cssText = `position: absolute;top: 0;left: 0; width: 100%;height: 100%;z-index: 999;`;
  segaCont.appendChild(overlay);
}
// on next click
next.addEventListener('click', () => {
  let loadingOver = document.createElement('div');
  loadingOver.className = 'loading-over';
  loadingOver.innerHTML = `<span style='color: #0098D4;text-transform: capitalize'>S</span>ega`
  segaCont.appendChild(loadingOver);
  segaCont.style.position = 'relative'
  setTimeout(() => {
    segaCont.style.position = 'unset';
    loadingOver.remove();
  }, 1000)
  setTimeout(() => {
    if (!next.classList.contains('active')) {
      next.classList.add('active');
    }
    if (!next.classList.contains('down')) {
      next.classList.add('down');
    }
    document.querySelector('.sega-cont>.overlay').remove();
    document.querySelectorAll('.sega-cont .piece .overlay').forEach(over => over.remove())
    document.querySelector('.sega-cont').classList.remove('act', 'rt', 'rm', 'rb', 'cl', 'cm', 'cr', 'sl', 'sr');
    fistPiece = '';
    secandPiece = '';
    document.querySelectorAll('.piece').forEach(p => {
      p.remove();
    });
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
    setTimeout(() => {
      let icons1 = document.querySelectorAll('.icon1');
      let icons2 = document.querySelectorAll('.icon2');
      loopfun(icons1);
      loopfun(icons2);
    });
    if (document.querySelector('.sc1').classList.contains('last-winner')) {
      document.querySelector('.sc1').classList.add('active');
      putOverlay("icon2");
    } else if (document.querySelector('.sc2').classList.contains('last-winner')){
      document.querySelector('.sc2').classList.add('active');
      putOverlay("icon1");
    }
    // if (document.querySelector('.sc1').innerHTML > document.querySelector('.sc2').innerHTML) {
    //   document.querySelector('.sc1').classList.add('active');
    //   putOverlay("icon2");
    // } else if (document.querySelector('.sc1').innerHTML < document.querySelector('.sc2').innerHTML) {
    //   document.querySelector('.sc2').classList.add('active');
    //   putOverlay("icon1");
    // } else if (document.querySelector('.sc1').innerHTML == document.querySelector('.sc2').innerHTML) {
    //   document.querySelector('.sc1').classList.add('active');
    //   putOverlay("icon2");
    // }
    setTimeout(() => {
      next.style.display = 'none';
    }, 300);
  }, 500)
});
