// Mode state
let isPortfolioMode = true;
const body = document.body;
const portfolioBtn = document.getElementById('portfolioBtn');
const blogBtn = document.getElementById('blogBtn');
const fabSwitch = document.getElementById('fabSwitch');
const flash = document.getElementById('flash');

function triggerFlash() {
  flash.classList.remove('active');
  // Force reflow so the animation restarts
  void flash.offsetWidth;
  flash.classList.add('active');
  flash.addEventListener('animationend', () => flash.classList.remove('active'), { once: true });
}

function setMode(portfolio) {
  if (isPortfolioMode === portfolio) return;
  isPortfolioMode = portfolio;

  triggerFlash();

  if (isPortfolioMode) {
    body.classList.remove('blog-mode');
    body.classList.add('portfolio-mode');
    portfolioBtn.classList.add('active');
    blogBtn.classList.remove('active');
  } else {
    body.classList.remove('portfolio-mode');
    body.classList.add('blog-mode');
    portfolioBtn.classList.remove('active');
    blogBtn.classList.add('active');
  }

  // Scroll to top on switch
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

portfolioBtn.addEventListener('click', () => setMode(true));
blogBtn.addEventListener('click', () => setMode(false));
fabSwitch.addEventListener('click', () => setMode(!isPortfolioMode));

// Keyboard shortcut (S key) — skip if typing in an input
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.metaKey) {
    setMode(!isPortfolioMode);
  }
});
