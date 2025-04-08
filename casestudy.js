// Case Study Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Locomotive Scroll
  const scroll = new LocomotiveScroll({
    el: document.querySelector('#home'),
    smooth: true,
    lerp: 0.05
  });

  // Case Study Cards Animation
  const cards = document.querySelectorAll('.case-study-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const caseStudyId = card.getAttribute('data-case-study');
      showCaseStudyDetail(caseStudyId);
    });
  });

  // Close Detail Modal
  const closeButtons = document.querySelectorAll('.close-detail');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      hideCaseStudyDetail();
    });
  });

  // Close on Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideCaseStudyDetail();
    }
  });

  // Close on Click Outside
  document.addEventListener('click', (e) => {
    const detailModal = document.querySelector('.case-study-detail');
    if (e.target === detailModal) {
      hideCaseStudyDetail();
    }
  });

  // Initialize reveal animation
  revealCards();
});

function showCaseStudyDetail(caseStudyId) {
  const detailModal = document.querySelector('.case-study-detail');
  const detailContent = document.querySelector('.detail-content');
  const data = caseStudyData[caseStudyId];

  if (!data) {
    console.error('Case study data not found:', caseStudyId);
    return;
  }

  // Reset content opacity
  detailContent.style.opacity = '0';

  // Update content
  detailContent.querySelector('.detail-title').textContent = data.title;
  detailContent.querySelector('.detail-description').textContent = data.description;

  // Update images
  const imagesContainer = detailContent.querySelector('.detail-images');
  imagesContainer.innerHTML = data.images.map(img =>
    `<img class="detail-image" src="${img}" alt="${data.title}">`
  ).join('');

  // Update sections
  const sections = detailContent.querySelectorAll('.section-content');
  const sectionData = [
    data.overview,
    data.process,
    data.solution,
    data.results
  ];

  sections.forEach((section, index) => {
    section.innerHTML = sectionData[index].replace(/\n/g, '<br>');
  });

  // Show modal
  detailModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Animate content in
  gsap.to(detailContent, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power3.out'
  });
}

function hideCaseStudyDetail() {
  const detailModal = document.querySelector('.case-study-detail');
  const detailContent = document.querySelector('.detail-content');

  // Animate content out
  gsap.to(detailContent, {
    opacity: 0,
    y: 50,
    duration: 0.3,
    ease: 'power3.in',
    onComplete: () => {
      detailModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Reveal animations for case study cards
function revealCards() {
  const cards = document.querySelectorAll('.case-study-card');

  cards.forEach((card, index) => {
    // Set initial state
    gsap.set(card, {
      opacity: 1,
      y: 0
    });

    // Animate in
    gsap.from(card, {
      y: 50,
      duration: 0.5,
      delay: index * 0.1,
      ease: 'power3.out'
    });
  });
} 