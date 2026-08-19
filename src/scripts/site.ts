const formatTime = (value: number) => {
  if (!Number.isFinite(value)) return '00:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const initNavigation = () => {
  const nav = document.querySelector<HTMLElement>('[data-site-nav]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const links = document.querySelector<HTMLElement>('[data-nav-links]');
  const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    links?.classList.toggle('open', !open);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggle?.setAttribute('aria-expanded', 'false');
      links?.classList.remove('open');
    });
  });

  const updateNavState = () => nav?.classList.toggle('scrolled', window.scrollY > 8);
  updateNavState();
  window.addEventListener('scroll', updateNavState, { passive: true });

  const sections = [...document.querySelectorAll<HTMLElement>('[data-section]')];
  if (!sections.length || !('IntersectionObserver' in window)) return;

  const visible = new Map<string, number>();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = (entry.target as HTMLElement).dataset.section;
      if (!id) return;
      if (entry.isIntersecting) visible.set(id, entry.intersectionRatio);
      else visible.delete(id);
    });

    let current = '';
    let ratio = -1;
    visible.forEach((value, key) => {
      if (value > ratio) {
        current = key;
        ratio = value;
      }
    });

    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.01, 0.2, 0.5] });

  sections.forEach((section) => observer.observe(section));
};

const initPublicationFilters = () => {
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-publication-filter]')];
  const rows = [...document.querySelectorAll<HTMLElement>('[data-publication-row]')];
  const expandButton = document.querySelector<HTMLButtonElement>('[data-publication-expand]');
  const expandLabel = expandButton?.querySelector<HTMLElement>('[data-publication-expand-label]');
  const list = document.querySelector<HTMLElement>('[data-publication-list]');
  const recentYears = new Set(['2025', '2024', '2023', '2021']);
  const initialLimit = Number(list?.dataset.publicationLimit || 5);

  let currentFilter = 'All';
  let expanded = false;

  const matchesFilter = (row: HTMLElement, filter: string) => {
    const year = row.dataset.year || '';
    return filter === 'All' || year === filter || (filter === 'Earlier' && !recentYears.has(year));
  };

  const render = () => {
    let visibleIndex = 0;
    let matchingCount = 0;

    rows.forEach((row) => {
      if (matchesFilter(row, currentFilter)) matchingCount += 1;
    });

    rows.forEach((row) => {
      const matches = matchesFilter(row, currentFilter);
      const withinLimit = currentFilter !== 'All' || expanded || visibleIndex < initialLimit;
      const visible = matches && withinLimit;

      row.hidden = !visible;
      if (matches) visibleIndex += 1;
    });

    if (expandButton) {
      const canExpand = currentFilter === 'All' && matchingCount > initialLimit;
      expandButton.hidden = !canExpand;
      expandButton.setAttribute('aria-expanded', String(expanded));
      expandButton.classList.toggle('expanded', expanded);
    }

    if (expandLabel) {
      expandLabel.textContent = expanded
        ? 'Show less'
        : `Show more (${Math.max(0, matchingCount - initialLimit)})`;
    }
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      currentFilter = button.dataset.publicationFilter || 'All';
      expanded = false;
      buttons.forEach((item) => item.classList.toggle('active', item === button));
      render();
    });
  });

  expandButton?.addEventListener('click', () => {
    expanded = !expanded;
    render();

    if (!expanded) {
      document.querySelector('#publications')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  render();
};

const initGalleries = () => {
  document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((rail) => {
    const id = rail.id;
    const prev = document.querySelector<HTMLButtonElement>(`[data-gallery-prev="${id}"]`);
    const next = document.querySelector<HTMLButtonElement>(`[data-gallery-next="${id}"]`);
    const progress = document.querySelector<HTMLElement>(`[data-gallery-progress="${id}"]`);

    const step = () => {
      const card = rail.querySelector<HTMLElement>('.media-card');
      return card ? card.getBoundingClientRect().width + 18 : Math.max(280, rail.clientWidth * 0.8);
    };

    const update = () => {
      const max = Math.max(0, rail.scrollWidth - rail.clientWidth);
      const ratio = max === 0 ? 1 : rail.scrollLeft / max;
      if (progress) progress.style.transform = `scaleX(${Math.max(0.08, Math.min(1, ratio))})`;
      if (prev) prev.disabled = rail.scrollLeft < 6;
      if (next) next.disabled = rail.scrollLeft > max - 6;
    };

    prev?.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
    rail.addEventListener('scroll', update, { passive: true });
    rail.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') rail.scrollBy({ left: -step(), behavior: 'smooth' });
      if (event.key === 'ArrowRight') rail.scrollBy({ left: step(), behavior: 'smooth' });
    });
    window.addEventListener('resize', update, { passive: true });
    requestAnimationFrame(update);
  });
};

const initLightbox = () => {
  const dialog = document.querySelector<HTMLDialogElement>('[data-media-lightbox]');
  const image = dialog?.querySelector<HTMLImageElement>('[data-lightbox-image]');
  const title = dialog?.querySelector<HTMLElement>('[data-lightbox-title]');
  const close = dialog?.querySelector<HTMLButtonElement>('[data-lightbox-close]');
  if (!dialog || !image || !title) return;

  document.querySelectorAll<HTMLButtonElement>('[data-lightbox-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      image.src = trigger.dataset.lightboxSrc || '';
      image.alt = trigger.dataset.lightboxAlt || '';
      title.textContent = trigger.dataset.lightboxTitle || '';
      dialog.showModal();
    });
  });

  close?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) dialog.close();
  });
};

const initVideoCompare = () => {
  document.querySelectorAll<HTMLElement>('[data-video-compare-box]').forEach((box) => {
    const compare = box.querySelector<HTMLElement>('[data-video-compare]');
    const sdr = box.querySelector<HTMLVideoElement>('[data-compare-sdr]');
    const hdr = box.querySelector<HTMLVideoElement>('[data-compare-hdr]');
    const drag = box.querySelector<HTMLElement>('[data-compare-drag]');
    const play = box.querySelector<HTMLButtonElement>('[data-compare-play]');
    const playIcon = box.querySelector<HTMLElement>('[data-compare-play-icon]');
    const progress = box.querySelector<HTMLInputElement>('[data-compare-progress]');
    const center = box.querySelector<HTMLButtonElement>('[data-compare-center]');
    const fullscreen = box.querySelector<HTMLButtonElement>('[data-compare-fullscreen]');
    const time = box.querySelector<HTMLElement>('[data-compare-time]');

    if (!compare || !sdr || !hdr || !drag || !play || !progress || !time) return;
    const videos = [sdr, hdr];
    let position = 50;
    let dragging = false;
    let seeking = false;

    const duration = () => Math.min(
      Number.isFinite(sdr.duration) ? sdr.duration : Infinity,
      Number.isFinite(hdr.duration) ? hdr.duration : Infinity
    );

    const setPosition = (value: number) => {
      position = Math.max(0, Math.min(100, value));
      compare.style.setProperty('--compare-position', `${position}%`);
      drag.setAttribute('aria-valuenow', String(Math.round(position)));
      drag.setAttribute('aria-valuetext', `${Math.round(position)} percent SDR and ${Math.round(100 - position)} percent HDR`);
    };

    const setPositionFromPointer = (event: PointerEvent) => {
      const bounds = compare.getBoundingClientRect();
      setPosition(((event.clientX - bounds.left) / bounds.width) * 100);
    };

    drag.addEventListener('pointerdown', (event) => {
      dragging = true;
      drag.setPointerCapture(event.pointerId);
      setPositionFromPointer(event);
    });
    drag.addEventListener('pointermove', (event) => dragging && setPositionFromPointer(event));
    ['pointerup', 'pointercancel'].forEach((name) => drag.addEventListener(name, (event) => {
      dragging = false;
      const e = event as PointerEvent;
      if (drag.hasPointerCapture?.(e.pointerId)) drag.releasePointerCapture(e.pointerId);
    }));
    drag.addEventListener('keydown', (event) => {
      const step = event.shiftKey ? 5 : 1;
      if (event.key === 'ArrowLeft') setPosition(position - step);
      else if (event.key === 'ArrowRight') setPosition(position + step);
      else if (event.key === 'Home') setPosition(0);
      else if (event.key === 'End') setPosition(100);
      else return;
      event.preventDefault();
    });

    const updateTime = () => {
      const shared = duration();
      if (!Number.isFinite(shared) || shared <= 0) return;
      if (!seeking) progress.value = String((sdr.currentTime / shared) * 100);
      time.textContent = `${formatTime(sdr.currentTime)} / ${formatTime(shared)}`;
      progress.style.setProperty('--progress-position', `${progress.value}%`);
      if (!hdr.paused && Math.abs(hdr.currentTime - sdr.currentTime) > 0.08) hdr.currentTime = sdr.currentTime;
    };

    const seek = () => {
      const shared = duration();
      if (!Number.isFinite(shared) || shared <= 0) return;
      const target = (Number(progress.value) / 100) * shared;
      videos.forEach((video) => { video.currentTime = target; });
      updateTime();
    };

    progress.addEventListener('pointerdown', () => { seeking = true; });
    progress.addEventListener('input', seek);
    progress.addEventListener('change', () => { seek(); seeking = false; });
    progress.addEventListener('pointerup', () => { seek(); seeking = false; });

    play.addEventListener('click', async () => {
      if (sdr.paused) {
        try {
          await Promise.all(videos.map((video) => video.play()));
          if (playIcon) playIcon.textContent = '❚❚';
          play.setAttribute('aria-label', 'Pause');
        } catch {
          // Browser may block autoplay until another explicit interaction.
        }
      } else {
        videos.forEach((video) => video.pause());
        if (playIcon) playIcon.textContent = '▶';
        play.setAttribute('aria-label', 'Play');
      }
    });

    videos.forEach((video) => {
      video.addEventListener('loadedmetadata', updateTime);
      video.addEventListener('ended', () => {
        videos.forEach((item) => item.pause());
        if (playIcon) playIcon.textContent = '▶';
        play.setAttribute('aria-label', 'Play');
      });
    });
    sdr.addEventListener('timeupdate', updateTime);

    center?.addEventListener('click', () => setPosition(50));
    fullscreen?.addEventListener('click', async () => {
      if (!document.fullscreenElement) await compare.requestFullscreen?.();
      else await document.exitFullscreen?.();
    });

    setPosition(50);
    updateTime();
  });
};

const initReveal = () => {
  const items = [...document.querySelectorAll<HTMLElement>('.publication-row, .course-card, .research-detail-block, .secondary-research-card')];
  if (!items.length || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      (entry.target as HTMLElement).classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px' });
  items.forEach((item) => observer.observe(item));
};

export const initSite = () => {
  initNavigation();
  initPublicationFilters();
  initGalleries();
  initLightbox();
  initVideoCompare();
  initReveal();
};
