// Case Study Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
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

  // Store current scroll position
  const scrollPosition = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = '100%';

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

  // Handle portfolio link
  const portfolioLinkContainer = modal.querySelector('.portfolio-link-container');
  if (caseStudy.portfolioLink) {
    portfolioLinkContainer.innerHTML = `
      <a href="${caseStudy.portfolioLink}" target="_blank" rel="noopener noreferrer" class="portfolio-link">
        View on Behance
        <svg viewBox="0 0 24 24">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.109 2.129h-8.91c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-8.79-5.375h5.343c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.866 2.219zm-9.574 6.768v-13.393h7.894v1.5h-6.394v4.5h5.5v1.5h-5.5v5.893h-1.5z"/>
        </svg>
      </a>
    `;
  } else {
    portfolioLinkContainer.innerHTML = '';
  }

  // Show modal
  document.body.classList.add('modal-open');
  modal.classList.add('active');

  // Scroll to top of modal
  content.scrollTop = 0;
}

function hideCaseStudyDetail() {
  const modal = document.querySelector('.case-study-detail');
  const content = modal.querySelector('.detail-content');
  const scrollPosition = parseInt(document.body.style.top.replace('-', '')) || 0;

  // Hide modal
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');

  // Restore scroll position
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollPosition);
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