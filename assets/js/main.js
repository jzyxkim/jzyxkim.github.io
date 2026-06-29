/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Background.
		$wrapper._parallax(0.925);

	// Nav Panel.

		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
					'<nav>' +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				});

			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

					// Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}

})(jQuery);

/* ═══════════════════════════════════════════════════════════════════════
   COMPLETE REPLACEMENT <script> FOR index.html
   Replace everything between your existing <script> and </script> tags
   with this file's contents.
   ═══════════════════════════════════════════════════════════════════════ */

/* ── TAB PAGE SYSTEM ── */
const TAB_ORDER = ['home','about','skills','experience','projects','education','resume','contact'];
let currentTab = 'home';

const tabBtns   = document.querySelectorAll('.tab-btn');
const pages     = document.querySelectorAll('.page-section');
const indicator = document.getElementById('tabIndicator');

function updateIndicator(activeBtn) {
  const bar     = document.getElementById('tabBar');
  const barRect = bar.getBoundingClientRect();
  const btnRect = activeBtn.getBoundingClientRect();
  indicator.style.left  = (btnRect.left - barRect.left + bar.scrollLeft) + 'px';
  indicator.style.width = btnRect.width + 'px';
}

function switchTab(tabId, direction) {
  if (tabId === currentTab) return;
  const prevTab = currentTab;
  currentTab    = tabId;

  tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  if (activeBtn) {
    updateIndicator(activeBtn);
    activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  const prevIdx = TAB_ORDER.indexOf(prevTab);
  const nextIdx = TAB_ORDER.indexOf(tabId);
  const dir     = direction || (nextIdx > prevIdx ? 'right' : 'left');

  const prevPage = document.getElementById('page-' + prevTab);
  if (prevPage) prevPage.classList.remove('active','visible','enter-right','enter-left');

  const nextPage = document.getElementById('page-' + tabId);
  if (nextPage) {
    nextPage.classList.add('active');
    nextPage.classList.remove('enter-right','enter-left','visible');
    void nextPage.offsetWidth;
    nextPage.classList.add(dir === 'right' ? 'enter-right' : 'enter-left');
    window.scrollTo({ top: 0, behavior: 'instant' });

    // reveal .reveal elements
    setTimeout(() => {
      nextPage.querySelectorAll('.reveal:not(.up)').forEach(el => {
        if (!el._obsAttached) { revealObs.observe(el); el._obsAttached = true; }
      });
    }, 50);

    // ── run the tab-specific animation ──
    runTabAnimation(tabId);

    if (tabId === 'home') reinitCanvas();
  }

  history.replaceState(null, '', '#' + tabId);
}

tabBtns.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

document.querySelector('.nav-logo').addEventListener('click', e => {
  e.preventDefault(); switchTab('home');
});

document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const hash = a.getAttribute('href').slice(1);
  if (TAB_ORDER.includes(hash)) { e.preventDefault(); switchTab(hash); }
});

window.addEventListener('load', () => {
  const homeBtn = document.querySelector('.tab-btn[data-tab="home"]');
  if (homeBtn) updateIndicator(homeBtn);
  const homePage = document.getElementById('page-home');
  if (homePage) { void homePage.offsetWidth; homePage.classList.add('enter-right'); }
  const hash = location.hash.slice(1);
  if (hash && TAB_ORDER.includes(hash)) switchTab(hash);
  else runTabAnimation('home');
});

window.addEventListener('resize', () => {
  const activeBtn = document.querySelector('.tab-btn.active');
  if (activeBtn) updateIndicator(activeBtn);
});

/* ── NAV scroll effect ── */
const nav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('up'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('#page-home .reveal').forEach(el => {
  revealObs.observe(el); el._obsAttached = true;
});

/* ══════════════════════════════════════════
   TAB ANIMATIONS
   ══════════════════════════════════════════ */
function runTabAnimation(tab) {
  const handlers = {
    home:       animHome,
    about:      animAbout,
    skills:     animSkills,
    experience: animExperience,
    projects:   animProjects,
    education:  animEducation,
    resume:     animResume,
    contact:    animContact,
  };
  // small delay so the page transition plays first
  setTimeout(() => { if (handlers[tab]) handlers[tab](); }, 120);
}

/* ── HOME: system boot sequence ── */
function animHome() {
  // 1. Inject boot log above hero content if not already present
  let log = document.getElementById('bootLog');
  if (!log) {
    log = document.createElement('div');
    log.id = 'bootLog';
    log.className = 'boot-log';
    const entries = [
      { text: 'SYS :: Signal canvas',        cls: 'ok' },
      { text: 'ROS :: Node architecture',     cls: 'ok' },
      { text: 'HW  :: Sensor array',          cls: 'ok' },
      { text: 'NAV :: Autonomous stack',      cls: 'warn' },
      { text: 'CV  :: Computer vision',       cls: 'ok' },
      { text: 'UI  :: Portfolio shell',       cls: 'warn' },
    ];
    entries.forEach(e => {
      const div = document.createElement('div');
      div.className = 'boot-entry ' + e.cls;
      div.textContent = e.text;
      log.appendChild(div);
    });
    // Insert before .hero-eyebrow
    const eyebrow = document.querySelector('.hero-eyebrow');
    if (eyebrow) eyebrow.parentNode.insertBefore(log, eyebrow);
  }

  // reset
  const bootEntries = log.querySelectorAll('.boot-entry');
  bootEntries.forEach(e => e.classList.remove('on'));

  const heroEls = document.querySelectorAll(
    '.hero-eyebrow,.hero-name,.hero-role,.hero-desc,.hero-actions,.hero-stats'
  );
  heroEls.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(22px)'; });

  // fire boot log entries
  bootEntries.forEach((entry, i) => {
    setTimeout(() => entry.classList.add('on'), i * 110);
  });

  // after log finishes, animate hero in
  const logDuration = bootEntries.length * 110 + 200;
  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
      el.style.opacity    = '1';
      el.style.transform  = 'translateY(0)';
    }, logDuration + i * 100);
  });

  // clean up log after everything has settled
  setTimeout(() => {
    log.style.transition = 'opacity 0.6s';
    log.style.opacity    = '0';
    setTimeout(() => { log.style.display = 'none'; }, 650);
  }, logDuration + heroEls.length * 100 + 800);
}

/* ── ABOUT: typewriter ── */
function animAbout() {
  const h2    = document.querySelector('#page-about .about-content h2');
  const paras = document.querySelectorAll('#page-about .about-content p');
  const chips = document.querySelectorAll('#page-about .skill-chip');
  if (!h2) return;

  const originalTitle = h2.textContent.trim();
  h2.textContent = '';

  // remove any old cursor
  const oldCursor = h2.querySelector('.tw-cursor');
  if (oldCursor) oldCursor.remove();
  const cursor = document.createElement('span');
  cursor.className = 'tw-cursor';
  h2.appendChild(cursor);

  // reset paras and chips
  paras.forEach(p => p.classList.remove('tw-visible'));
  chips.forEach(c => c.classList.remove('tw-chip-show'));

  // type title
  let i = 0;
  function typeChar() {
    if (i < originalTitle.length) {
      h2.insertBefore(document.createTextNode(originalTitle[i]), cursor);
      i++;
      setTimeout(typeChar, 24 + Math.random() * 20);
    } else {
      // remove blinking cursor
      setTimeout(() => cursor.remove(), 400);
      revealParas();
    }
  }
  typeChar();

  function revealParas() {
    paras.forEach((p, idx) => {
      setTimeout(() => p.classList.add('tw-visible'), idx * 420);
    });
    const chipDelay = paras.length * 420 + 100;
    chips.forEach((c, idx) => {
      setTimeout(() => c.classList.add('tw-chip-show'), chipDelay + idx * 70);
    });
  }
}

/* ── SKILLS: power-on cards ── */
function animSkills() {
  const cards = document.querySelectorAll('#page-skills .sk-card');
  cards.forEach(card => {
    card.classList.remove('sk-boot');
    // force re-flow so animation can replay
    void card.offsetWidth;
  });
  cards.forEach((card, i) => {
    setTimeout(() => card.classList.add('sk-boot'), i * 95);
  });
}

/* ── EXPERIENCE: timeline draws itself ── */
function animExperience() {
  const list  = document.querySelector('#page-experience .exp-list');
  const items = document.querySelectorAll('#page-experience .exp-item');
  if (!list) return;

  list.classList.remove('tl-drawn');
  items.forEach(item => item.classList.remove('tl-show'));

  // draw the spine
  setTimeout(() => list.classList.add('tl-drawn'), 80);

  // slide items in, staggered
  items.forEach((item, i) => {
    setTimeout(() => item.classList.add('tl-show'), 300 + i * 320);
  });
}

/* ── PROJECTS: camera focus lock ── */
function animProjects() {
  const cards = document.querySelectorAll('#page-projects .proj');
  cards.forEach(card => {
    card.classList.remove('cam-focus');
    void card.offsetWidth;

    // inject reticle SVG into each .proj-img if not already there
    const img = card.querySelector('.proj-img');
    if (img && !img.querySelector('.proj-reticle')) {
      const reticle = document.createElement('div');
      reticle.className = 'proj-reticle';
      reticle.innerHTML = `
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="99" height="99"
            fill="none" stroke="rgba(218,166,19,0.55)" stroke-width="0.8"/>
          <!-- corner brackets -->
          <polyline points="0,12 0,0 12,0" fill="none" stroke="rgba(218,166,19,0.85)" stroke-width="1.5"/>
          <polyline points="88,0 100,0 100,12" fill="none" stroke="rgba(218,166,19,0.85)" stroke-width="1.5"/>
          <polyline points="100,88 100,100 88,100" fill="none" stroke="rgba(218,166,19,0.85)" stroke-width="1.5"/>
          <polyline points="12,100 0,100 0,88" fill="none" stroke="rgba(218,166,19,0.85)" stroke-width="1.5"/>
          <!-- centre cross -->
          <line x1="44" y1="50" x2="50" y2="50" stroke="rgba(218,166,19,0.6)" stroke-width="0.8"/>
          <line x1="56" y1="50" x2="62" y2="50" stroke="rgba(218,166,19,0.6)" stroke-width="0.8"/>
          <line x1="50" y1="44" x2="50" y2="50" stroke="rgba(218,166,19,0.6)" stroke-width="0.8"/>
          <line x1="50" y1="56" x2="50" y2="62" stroke="rgba(218,166,19,0.6)" stroke-width="0.8"/>
          <circle cx="50" cy="50" r="4" fill="none" stroke="rgba(218,166,19,0.45)" stroke-width="0.8"/>
        </svg>`;
      img.appendChild(reticle);
    }
  });

  // stagger the focus animation across card positions
  cards.forEach((card, i) => {
    // 2-column grid: row 0 fires first, row 1 slightly later
    const row = Math.floor(i / 2);
    const col = i % 2;
    const delay = row * 160 + col * 80;
    setTimeout(() => card.classList.add('cam-focus'), delay);
  });
}

/* ── EDUCATION: stamp press ── */
function animEducation() {
  const cards = document.querySelectorAll('#page-education .edu-card');
  cards.forEach(card => {
    card.classList.remove('stamp-in');
    void card.offsetWidth;

    // inject stamp mark if not already there
    if (!card.querySelector('.edu-stamp-mark')) {
      const mark = document.createElement('div');
      mark.className = 'edu-stamp-mark';
      mark.textContent = '✦';
      card.appendChild(mark);
    }
  });

  cards.forEach((card, i) => {
    setTimeout(() => card.classList.add('stamp-in'), i * 160);
  });
}

/* ── RESUME: document render progress ── */
function animResume() {
  const wrap = document.querySelector('#page-resume .resume-wrap');
  if (!wrap) return;

  // inject render UI once
  let renderUI = document.getElementById('resumeRenderUI');
  if (!renderUI) {
    renderUI = document.createElement('div');
    renderUI.id = 'resumeRenderUI';
    renderUI.className = 'resume-render-wrap';
    renderUI.innerHTML = `
      <div class="render-label" id="renderLabel">Rendering document…</div>
      <div class="render-progress">
        <div class="render-bar" id="renderBar"></div>
      </div>
      <div style="width:100%;max-width:480px;border:1px solid var(--border);overflow:hidden;background:var(--panel)">
        <div style="height:36px;background:rgba(218,166,19,0.07);border-bottom:1px solid rgba(218,166,19,0.15);
                    display:flex;align-items:center;padding:0 14px;gap:7px;">
          <div style="width:8px;height:8px;border-radius:50%;background:#FF605C"></div>
          <div style="width:8px;height:8px;border-radius:50%;background:#FFBD44"></div>
          <div style="width:8px;height:8px;border-radius:50%;background:#00CA4E"></div>
        </div>
        <div style="padding:18px 24px" id="docLinesWrap">
          <div class="doc-render-line w-name"></div>
          <div class="doc-render-line w-sm" style="margin-bottom:14px"></div>
          <div class="doc-render-line section-bar"></div>
          <div class="doc-render-line w-full"></div>
          <div class="doc-render-line w-lg"></div>
          <div class="doc-render-line w-full"></div>
          <div class="doc-render-line w-md" style="margin-bottom:14px"></div>
          <div class="doc-render-line section-bar"></div>
          <div class="doc-render-line w-full"></div>
          <div class="doc-render-line w-lg"></div>
          <div class="doc-render-line w-sm" style="margin-bottom:14px"></div>
          <div class="doc-render-line section-bar"></div>
          <div class="doc-render-line w-full"></div>
          <div class="doc-render-line w-md"></div>
          <div class="doc-render-line w-sm"></div>
        </div>
      </div>`;
    // insert before the existing resume frame
    const frame = wrap.querySelector('.resume-frame');
    if (frame) wrap.insertBefore(renderUI, frame);
    else wrap.prepend(renderUI);
  }

  // reset
  const bar   = document.getElementById('renderBar');
  const label = document.getElementById('renderLabel');
  const lines = document.querySelectorAll('#docLinesWrap .doc-render-line');
  bar.style.transition = 'none';
  bar.style.width      = '0%';
  label.textContent    = 'Rendering document…';
  lines.forEach(l => {
    l.style.transition = 'none';
    l.style.transform  = 'scaleX(0)';
  });

  // progress bar
  let pct = 0;
  const iv = setInterval(() => {
    pct = Math.min(100, pct + Math.random() * 7 + 2.5);
    bar.style.transition = 'width 0.06s linear';
    bar.style.width = Math.round(pct) + '%';
    if (pct >= 100) {
      clearInterval(iv);
      label.textContent = 'Document ready — download below';
    }
  }, 55);

  // lines draw left to right
  lines.forEach((line, i) => {
    setTimeout(() => {
      line.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
      line.style.transform  = 'scaleX(1)';
    }, i * 75 + 80);
  });
}

/* ── CONTACT: terminal boot ── */
function animContact() {
  // inject terminal shell above the contact form if not already there
  const section = document.querySelector('#page-contact #contact');
  if (!section) return;

  let shell = document.getElementById('contactTermShell');
  if (!shell) {
    shell = document.createElement('div');
    shell.id        = 'contactTermShell';
    shell.className = 'term-shell reveal up';
    shell.innerHTML = `
      <div class="term-header-bar">
        <div class="term-dot-r"></div>
        <div class="term-dot-y"></div>
        <div class="term-dot-g"></div>
        <span class="term-title-bar">contact.sh — active</span>
      </div>
      <div class="term-line prompt" data-tdelay="0">$ initialising secure channel…</div>
      <div class="term-line"        data-tdelay="320">→ encryption layer — OK</div>
      <div class="term-line prompt" data-tdelay="620">$ mounting contact form…</div>
      <div class="term-line"        data-tdelay="940">→ form ready <span class="term-cursor-inline"></span></div>`;

    // insert at the top of the contact grid
    const grid = section.querySelector('.contact-grid');
    if (grid) grid.insertBefore(shell, grid.firstChild);
  }

  // reset terminal lines
  const termLines = shell.querySelectorAll('.term-line');
  termLines.forEach(l => l.classList.remove('term-show'));

  // reset form field visibility
  const formFields = document.querySelectorAll('#page-contact .cf .fg');
  formFields.forEach(f => f.classList.remove('term-field-show'));

  // fire lines
  termLines.forEach(line => {
    const d = parseInt(line.dataset.tdelay) || 0;
    setTimeout(() => line.classList.add('term-show'), d);
  });

  // reveal form fields after terminal finishes
  const lastDelay = Math.max(...[...termLines].map(l => parseInt(l.dataset.tdelay) || 0));
  formFields.forEach((field, i) => {
    setTimeout(() => field.classList.add('term-field-show'), lastDelay + 300 + i * 180);
  });
}

/* ── SIGNAL CANVAS (hero background) ── */
function reinitCanvas() {
  const c = document.getElementById('sigCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H, mx = 0.5, my = 0.5, t = 0;

  function resize() { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; }
  window.addEventListener('resize', resize);
  resize();

  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      mx = (e.clientX - r.left) / W;
      my = (e.clientY - r.top)  / H;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.012;
    const gx = W / 18, gy = H / 10;
    for (let r = 0; r <= 10; r++) for (let cc = 0; cc <= 18; cc++) {
      const px = cc * gx, py = r * gy;
      const dist = Math.hypot(px / W - mx, py / H - my);
      const a    = Math.max(0, 0.12 - dist * 0.22);
      ctx.beginPath(); ctx.arc(px, py, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(218,166,19,${a})`; ctx.fill();
    }
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(218,166,19,0.20)'; ctx.lineWidth = 1.5;
    for (let x = 0; x <= W; x += 2) {
      const norm = x / W, freq = 3 + mx * 4, amp = H * 0.08 * (0.5 + my * 0.8);
      const y = H * 0.5 + Math.sin(norm * Math.PI * freq + t) * amp
                        + Math.sin(norm * Math.PI * freq * 1.7 + t * 0.7) * (amp * 0.3);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(97,61,170,0.12)'; ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += 2) {
      const norm = x / W;
      const y    = H * 0.35 + Math.sin(norm * Math.PI * 5 + t * 1.3) * H * 0.04;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    requestAnimationFrame(draw);
  }
  draw();
}
reinitCanvas();

/* ── CONTACT FORM ── */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value.trim() || 'Portfolio Enquiry';
  const msg     = document.getElementById('cf-msg').value.trim();
  const fb      = document.getElementById('formFeedback');
  if (!name || !email || !msg) {
    fb.textContent = 'Please fill in all required fields.'; fb.className = 'cf-fb err'; return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fb.textContent = 'Please enter a valid email address.'; fb.className = 'cf-fb err'; return;
  }
  window.location.href = `mailto:jinziyu100@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + msg)}`;
  fb.textContent = 'Opening your email client…'; fb.className = 'cf-fb ok';
  this.reset();
  setTimeout(() => { fb.textContent = ''; fb.className = 'cf-fb'; }, 4000);
});

/* ── SKILL CHIPS ── */
document.querySelectorAll('.skill-chip').forEach(chip => {
  chip.style.cursor = 'pointer';
  chip.addEventListener('click', () => chip.classList.toggle('active'));
});

/* ── RESUME IFRAME FALLBACK ── */
const resumeIframe = document.getElementById('resumeIframe');
if (resumeIframe) {
  resumeIframe.addEventListener('error', function() {
    this.closest('.resume-frame').outerHTML = `
      <div style="background:var(--card);border:1px solid var(--border);padding:60px 40px;
                  text-align:center;max-width:820px;width:100%">
        <i class="bi bi-file-earmark-pdf"
           style="font-size:2.5rem;color:var(--amber);display:block;margin-bottom:16px"></i>
        <p style="color:var(--text-2);margin-bottom:0">
          Resume preview unavailable — use the download button below.
        </p>
      </div>`;
  });
}

/* ══════════════════════════════════════════
   ROBOTICS HUD MOUSE SYSTEM (unchanged)
   ══════════════════════════════════════════ */
(function(){
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  const canvas = document.getElementById('hud-canvas');
  const ctx    = canvas.getContext('2d');
  const tag    = document.getElementById('hud-tag');

  let W, H;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize);
  resize();

  let mx = W/2, my = H/2, lx = W/2, ly = H/2;
  let t = 0, isHover = false;
  let lastTX = mx, lastTY = my, distAcc = 0;
  const trail = [];
  const pings = [];

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    const dx = mx - lastTX, dy = my - lastTY;
    distAcc += Math.hypot(dx, dy);
    if (distAcc >= 12) {
      distAcc = 0; lastTX = mx; lastTY = my;
      trail.push({ x: mx, y: my, life: 1.0 });
      if (trail.length > 22) trail.shift();
    }
    const hoverEl = e.target.closest('.sk-card,.proj,.edu-card,.exp-item,a,button,.tab-btn,.skill-chip');
    isHover = !!hoverEl;
    const cardEl = e.target.closest('.sk-card,.proj,.edu-card,.exp-item');
    if (cardEl) {
      const h   = cardEl.querySelector('h3');
      const num = cardEl.querySelector('.sk-num,.proj-id,.edu-period,.exp-date');
      tag.textContent = (num ? num.textContent.trim().toUpperCase() + ' · ' : '')
                      + (h ? h.textContent.trim().toUpperCase().slice(0,28) : 'TARGET');
      tag.style.left = (mx + 24) + 'px';
      tag.style.top  = (my - 18) + 'px';
      tag.classList.add('visible');
      if (!cardEl._scanning) {
        cardEl._scanning = true;
        cardEl.classList.remove('scanning');
        void cardEl.offsetWidth;
        cardEl.classList.add('scanning');
        setTimeout(() => { cardEl._scanning = false; }, 900);
      }
    } else {
      tag.classList.remove('visible');
    }
  });

  document.addEventListener('click', e => {
    pings.push({ x: e.clientX, y: e.clientY, r: 0, life: 1.0 });
  });

  function drawReticle(x, y, hover) {
    const R   = hover ? 24 : 16;
    const R2  = hover ? 38 : 28;
    const ROT = t * (hover ? 2.0 : 0.9);
    ctx.save(); ctx.translate(x, y);
    ctx.beginPath(); ctx.arc(0, 0, R2, 0, Math.PI*2);
    ctx.setLineDash([5,7]); ctx.lineDashOffset = -ROT * 20;
    ctx.strokeStyle = `rgba(218,166,19,${hover ? 0.6 : 0.32})`; ctx.lineWidth = 1;
    ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI*2);
    ctx.strokeStyle = `rgba(218,166,19,${hover ? 0.95 : 0.70})`;
    ctx.lineWidth = hover ? 1.5 : 1; ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 2.5, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(218,166,19,1)'; ctx.fill();
    const gap = R + 5, len = 10;
    ctx.strokeStyle = 'rgba(218,166,19,0.85)'; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-gap-len,0); ctx.lineTo(-gap,0);
    ctx.moveTo(gap,0);      ctx.lineTo(gap+len,0);
    ctx.moveTo(0,-gap-len); ctx.lineTo(0,-gap);
    ctx.moveTo(0,gap);      ctx.lineTo(0,gap+len);
    ctx.stroke();
    ctx.lineWidth = hover ? 2 : 1.5;
    ctx.strokeStyle = hover ? 'rgba(218,160,0,1)' : 'rgba(218,166,19,0.7)';
    [0,Math.PI/2,Math.PI,3*Math.PI/2].forEach(a => {
      const bx=Math.cos(a+ROT)*R2, by=Math.sin(a+ROT)*R2;
      const tx=Math.cos(a+ROT+Math.PI/2)*8, ty=Math.sin(a+ROT+Math.PI/2)*8;
      ctx.beginPath();
      ctx.moveTo(bx+tx,by+ty); ctx.lineTo(bx,by); ctx.lineTo(bx-tx,by-ty);
      ctx.stroke();
    });
    if (hover) {
      ctx.beginPath(); ctx.arc(0,0,R2+12,-ROT*0.6,-ROT*0.6+Math.PI*0.65);
      ctx.strokeStyle='rgba(97,61,170,0.6)'; ctx.lineWidth=1.5; ctx.stroke();
      ctx.beginPath(); ctx.arc(0,0,R+8,ROT*0.5,ROT*0.5+Math.PI*1.2);
      ctx.strokeStyle='rgba(0,13,170,0.4)'; ctx.lineWidth=1; ctx.stroke();
    }
    ctx.font='9px "DM Mono",monospace';
    ctx.fillStyle='rgba(218,166,19,0.5)';
    ctx.fillText('X:'+String(Math.round(x)).padStart(4,'0'),R2+7,-5);
    ctx.fillText('Y:'+String(Math.round(y)).padStart(4,'0'),R2+7,9);
    ctx.restore();
  }

  function drawTrail() {
    for (let i = 1; i < trail.length; i++) {
      const a = trail[i-1], b = trail[i];
      const alpha = (i / trail.length) * a.life * 0.5;
      ctx.beginPath(); ctx.moveTo(a.x,a.y);
      ctx.lineTo(b.x,a.y); ctx.lineTo(b.x,b.y);
      ctx.strokeStyle=`rgba(218,166,19,${alpha})`;
      ctx.lineWidth=1; ctx.setLineDash([3,5]); ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(b.x,b.y,2,0,Math.PI*2);
      ctx.fillStyle=`rgba(218,160,0,${alpha*0.7})`; ctx.fill();
    }
    trail.forEach(n => n.life -= 0.016);
    for (let i = trail.length-1; i >= 0; i--) { if (trail[i].life <= 0) trail.splice(i,1); }
  }

  function drawPings() {
    for (let i = pings.length-1; i >= 0; i--) {
      const p = pings[i];
      p.r += 4.5; p.life -= 0.032;
      if (p.life <= 0) { pings.splice(i,1); continue; }
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.strokeStyle=`rgba(218,166,19,${p.life*0.75})`; ctx.lineWidth=1.5; ctx.stroke();
      if (p.r > 16) {
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r-14,0,Math.PI*2);
        ctx.strokeStyle=`rgba(97,61,170,${p.life*0.4})`; ctx.lineWidth=1; ctx.stroke();
      }
      [0,Math.PI/2,Math.PI,3*Math.PI/2].forEach(a => {
        ctx.beginPath();
        ctx.moveTo(p.x+Math.cos(a)*(p.r-5),p.y+Math.sin(a)*(p.r-5));
        ctx.lineTo(p.x+Math.cos(a)*(p.r+5),p.y+Math.sin(a)*(p.r+5));
        ctx.strokeStyle=`rgba(218,166,19,${p.life})`; ctx.lineWidth=1.5; ctx.stroke();
      });
    }
  }

  function loop() {
    ctx.clearRect(0,0,W,H);
    t += 0.04;
    lx += (mx-lx)*0.18; ly += (my-ly)*0.18;
    drawTrail(); drawPings(); drawReticle(lx,ly,isHover);
    requestAnimationFrame(loop);
  }
  loop();
})();
