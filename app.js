'use strict'

// Standalone data copied from the current Skills & Projects page.
// Keep asset paths relative to this folder so the export can be hosted anywhere.
const skills = [
  ['Programming', ['C', 'C++', 'C#', 'Java', 'Python', 'JavaScript']],
  ['Databases', ['SQL', 'MySQL', 'Oracle', 'SQL Server']],
  ['Development Tools', ['Visual Studio', 'Git', 'GitHub']],
  ['Other Technologies', ['Supabase', 'Cloudflare R2 Object Storage']],
  ['Professional Skills', ['Problem-solving', 'Analytical thinking', 'Team collaboration', 'Technical troubleshooting', 'Continuous learning']],
]

const projects = [
  {
    id: 'transport',
    title: 'AIUB Transport Management System',
    type: 'Academic Group Project',
    technologies: ['C#', 'Windows Forms', 'SQL Server'],
    description: "An academic transport management application developed to support university transportation operations. My work focused on the Student Module and its integration with the application's database.",
    details: ['Student-related functionality', 'Bus schedule viewing', 'Seat booking and management', 'Booking history', 'Database integration'],
    screenshots: [{ src: './aiub-transport-student-dashboard.png', alt: 'AIUB Transport Management System Student Dashboard' }],
    demoUrl: 'https://drive.google.com/file/d/1GCdIdPBBV2P_aprCZlAvR5xGAJZ52hf1/view?usp=sharing',
    githubUrl: 'https://github.com/Fardin-islam10/AIUB-Transport-Management',
  },
  {
    id: 'nocturne',
    title: 'Nocturne — Personal Music Streaming Application',
    type: 'Personal Project',
    technologies: ['Python', 'Java', 'C#', 'JavaScript', 'Supabase', 'Cloudflare R2 Object Storage'],
    description: 'A personal music streaming application project exploring software development and the use of different programming technologies and cloud storage services.',
    details: ['Personal project exploration', 'Multi-technology development', 'Cloud storage services', 'Screenshot area ready for project visuals'],
    screenshots: [{ src: './nocturne-app-screens.png', alt: 'Nocturne app screens: login, home library, now playing, audio information, and settings' }],
    demoUrl: 'https://drive.google.com/file/d/11eXZs9KivVxIhz98lIKEph_qM8ZN9M11/view?usp=sharing',
    githubUrl: 'https://github.com/codeblocker28',
  },
  {
    id: 'player',
    title: 'Player Management System',
    type: 'Programming Project',
    technologies: ['Java'],
    description: 'A Java-based player management project demonstrating programming fundamentals and file handling through reading and writing data.',
    details: ['Java programming fundamentals', 'Reading and writing data', 'File handling', 'Screenshot area ready for project visuals'],
    screenshots: [{ src: './player-management-system.png', alt: 'Player Management System window with Add New Player and Search Player forms' }],
    demoUrl: 'https://drive.google.com/file/d/1Tbg5lhllzC1PpI_HpNi943beFcelZz9T/view?usp=sharing',
    githubUrl: 'https://github.com/codeblocker28',
  },
]

const arrowIcon = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>'
const playIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 5.8v12.4L18 12 8 5.8Z"/></svg>'
const codeIcon = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18-6-6 6-6m6 12 6-6-6-6"/></svg>'

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character])
const renderTags = (tags) => `<div class="tags">${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>`

const skillsGrid = document.querySelector('#skills-grid')
skillsGrid.innerHTML = skills.map(([title, tags]) => `
  <article class="skill-card">
    <h3>${escapeHtml(title)}</h3>
    ${renderTags(tags)}
  </article>
`).join('')

const selector = document.querySelector('#project-selector')
const detail = document.querySelector('#project-detail')

function renderProject(project) {
  const index = projects.findIndex((candidate) => candidate.id === project.id)
  const gallery = project.screenshots?.length
    ? `<div class="project-screenshot-gallery">${project.screenshots.map((shot) => `
        <a class="project-screenshot" href="${escapeHtml(shot.src)}" target="_blank" rel="noopener noreferrer" aria-label="View the ${escapeHtml(shot.alt)} screenshot at full size">
          <img src="${escapeHtml(shot.src)}" alt="${escapeHtml(shot.alt)}" />
        </a>`).join('')}</div>`
    : `<div class="media-placeholder" role="img" aria-label="Project screenshot placeholder">${codeIcon}<span>Project screenshot placeholder</span></div>`

  const resourceLinks = project.demoUrl || project.githubUrl
    ? `<div class="project-resource-links">
        ${project.demoUrl ? `<a class="button primary" href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer">Watch Live Demonstration ${playIcon}</a>` : ''}
        ${project.githubUrl ? `<a class="button secondary" href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer">View on GitHub ${arrowIcon}</a>` : ''}
      </div>`
    : '<div class="placeholder-links"><span>GitHub repository — placeholder</span><span>Live demonstration — placeholder</span></div>'

  detail.innerHTML = `
    ${gallery}
    <div class="detail-body">
      <p class="card-kicker">${escapeHtml(project.type)}</p>
      <h2 id="project-detail-title">${escapeHtml(project.title)}</h2>
      <p>${escapeHtml(project.description)}</p>
      ${renderTags(project.technologies)}
      <h3>Known project details</h3>
      <ul>${project.details.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      ${resourceLinks}
    </div>`

  selector.querySelectorAll('.project-select').forEach((button, buttonIndex) => {
    const active = buttonIndex === index
    button.classList.toggle('active', active)
    button.setAttribute('aria-selected', String(active))
    button.setAttribute('tabindex', active ? '0' : '-1')
  })
}

projects.forEach((project, index) => {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = `project-select${index === 0 ? ' active' : ''}`
  button.setAttribute('role', 'tab')
  button.setAttribute('aria-selected', String(index === 0))
  button.setAttribute('aria-controls', 'project-detail')
  button.innerHTML = `<span>0${index + 1}</span><strong>${escapeHtml(project.title)}</strong>${arrowIcon}`
  button.addEventListener('click', () => renderProject(project))
  button.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const currentIndex = projects.findIndex((candidate) => candidate.id === project.id)
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? projects.length - 1 : (currentIndex + (event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1) + projects.length) % projects.length
    selector.querySelectorAll('.project-select')[nextIndex].focus()
    renderProject(projects[nextIndex])
  })
  selector.append(button)
})

renderProject(projects[0])
