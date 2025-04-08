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
  const modal = document.querySelector('.case-study-detail');
  const content = modal.querySelector('.detail-content');
  const caseStudy = caseStudyData[caseStudyId];

  if (!caseStudy) {
    console.error('Case study data not found:', caseStudyId);
    return;
  }

  // Update modal content
  content.querySelector('.detail-title').textContent = caseStudy.title || '';
  content.querySelector('.detail-description').textContent = caseStudy.description || '';

  // Update images
  const imagesContainer = content.querySelector('.detail-images');
  if (caseStudy.images && caseStudy.images.length > 0) {
    imagesContainer.innerHTML = caseStudy.images.map(img =>
      `<img src="${img}" alt="${caseStudy.title || 'Case study image'}">`
    ).join('');
  } else {
    imagesContainer.innerHTML = '<p>No images available</p>';
  }

  // Update sections and hide empty ones
  const sections = content.querySelectorAll('.detail-section');
  const sectionData = [
    { title: 'Overview', content: caseStudy.overview },
    { title: 'Process', content: caseStudy.process },
    { title: 'Solution', content: caseStudy.solution },
    { title: 'Results', content: caseStudy.results }
  ];

  sections.forEach((section, index) => {
    const sectionContent = section.querySelector('.section-content');
    const sectionTitle = section.querySelector('.section-title');

    // Check if the section has content
    if (sectionData[index].content) {
      // Show the section
      section.style.display = 'block';

      // Update the content
      if (sectionData[index].content.trim().startsWith('<')) {
        // If it's HTML, set it directly
        sectionContent.innerHTML = sectionData[index].content;
      } else {
        // Otherwise, use the existing text replacement
        sectionContent.innerHTML = sectionData[index].content.replace(/\n/g, '<br>');
      }
    } else {
      // Hide the section if it has no content
      section.style.display = 'none';
    }
  });

  // Show modal with animation
  document.body.classList.add('modal-open');
  modal.classList.add('active');

  // Scroll to top of modal
  modal.scrollTop = 0;

  // Animate content in
  gsap.to(content, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power3.out'
  });
}

function hideCaseStudyDetail() {
  const modal = document.querySelector('.case-study-detail');
  const content = modal.querySelector('.detail-content');

  // Animate content out
  gsap.to(content, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    ease: 'power3.in',
    onComplete: () => {
      // Hide modal
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  });
}

// Reveal animations for case study cards
function revealCards() {
  const cards = document.querySelectorAll('.case-study-card');

  cards.forEach((card, index) => {
    // Set initial state
    gsap.set(card, {
      opacity: 0,
      y: 50
    });

    // Animate in
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: index * 0.1,
      ease: 'power3.out'
    });
  });
} 