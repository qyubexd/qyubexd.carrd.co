document.querySelectorAll('.card-scroller').forEach(el => {
  let down = false, dragged = false, startX = 0, startScroll = 0;

  el.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse') return;   // phones use native swipe
    down = true; dragged = false;
    startX = e.clientX;
    startScroll = el.scrollLeft;
  });

  window.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!dragged && Math.abs(dx) > 5) {
      dragged = true;
      el.classList.add('is-dragging');
    }
    if (dragged) el.scrollLeft = startScroll - dx;
  });

  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    const pos = el.scrollLeft;
    el.classList.remove('is-dragging');
    el.scrollLeft = pos;                     // lets snapping settle
  });

  el.addEventListener('click', e => {        // ignore the click after a drag
    if (dragged) { e.preventDefault(); dragged = false; }
  }, true);

  el.addEventListener('dragstart', e => e.preventDefault());
});