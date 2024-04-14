const RESPONSIVE_BREAKPOINT = 900;
const ITEM_RADIAL_DISTANCE = 550;

let tables = [];

function preload() {
  tables.push(loadTable('section-leon.csv', 'csv'));
  tables.push(loadTable('section-marcele.csv', 'csv'));
  tables.push(loadTable('section-moon.csv', 'csv'));
  tables.push(loadTable('section-eric.csv', 'csv'));
}

function setup() {
  noCanvas();

  const itemsArray = [];

  tables.forEach((table) => {
    // parse and create "creature" items.
    for (let r = 0; r < table.getRowCount(); r++) {
      const name = table.get(r, 0);
      const remark = table.get(r, 1);
      const link = table.get(r, 2);
      itemsArray.push({ name, remark, link });
    }
  });

  // shuffle the items array randomly
  itemsArray.sort(() => Math.random() - 0.5);

  // create items from the shuffled array
  itemsArray.forEach((item) => {
    createItem(item.name, item.remark, item.link);
  });

  // then, apply rotation to each item.
  applyRotation();

  // add additional effects :D
  applyRandomHoverColor();
  rotateByScrolling();
}

function draw() {
  noLoop();
}

function createItem(name, remark, link) {
  const div = document.createElement('div');
  div.classList.add('creature-item');
  const container = document.querySelector('.creature-container');
  container.appendChild(div);

  const spacer = document.createElement('div');
  spacer.classList.add('spacer');
  spacer.style.width = `${floor(random(30, 150))}px`;
  div.appendChild(spacer);

  const h3 = document.createElement('h3');
  h3.textContent = name;
  h3.addEventListener('click', () => {
    window.open(link, 'Project');
  });
  div.appendChild(h3);

  const p = document.createElement('p');
  p.textContent = remark;
  div.appendChild(p);
}

function applyRotation() {
  const items = document.querySelectorAll('.creature-item');
  if (window.innerWidth >= RESPONSIVE_BREAKPOINT) {
    document.body.style.overflow = 'hidden';
    items.forEach((item, i) => {
      const angle = (360 / items.length) * i;
      item.style.transform = `rotate(${angle}deg) translate(${ITEM_RADIAL_DISTANCE}px)`;
    });

  } else {
    // if window is smaller than "RESPONSIVE_BREAKPOINT", remove rotation.
    document.body.style.overflow = 'auto';
    const items = document.querySelectorAll('.creature-item');
    items.forEach((item) => {
      item.style.transform = 'none';
    });
  }
}

function applyRandomHoverColor() {
  // get h3 from each item, then apply random hover color to it.
  const items = document.querySelectorAll('.creature-item h3');

  items.forEach((item) => {
    item.addEventListener('mouseover', () => {
      item.style.backgroundColor = `hsl(${floor(random(0, 360))}, 100%, 50%)`;
      item.style.color = 'black';
    });
    item.addEventListener('mouseleave', () => {
      item.style.backgroundColor = 'black';
      item.style.color = 'white';
    });
  });
}

function rotateByScrolling() {
  if (window.innerWidth >= RESPONSIVE_BREAKPOINT) {
    window.addEventListener('wheel', handleWheelEvent, { passive: false });
  } else {
    const container = document.querySelector('.creature-container-rotator');
    container.style.transform = 'none';
    window.removeEventListener('wheel', handleWheelEvent);
  }
}

let angle = 0;
function handleWheelEvent(event) {
  angle += floor(event.deltaY * 0.1);
  const container = document.querySelector('.creature-container-rotator');
  container.style.transform = `rotate(${angle}deg)`;
  event.preventDefault();
}

window.addEventListener('resize', () => {
  applyRotation();
  rotateByScrolling();
});