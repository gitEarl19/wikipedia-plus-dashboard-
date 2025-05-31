import { fetchDashboardSections } from './api.js';

let fullData = [];

function createSectionCard({ title, sections }) {
  const card = document.createElement('div');
  card.className = 'section-card';

  const heading = document.createElement('h2');
  heading.textContent = title;
  card.appendChild(heading);

  const list = document.createElement('ul');
  sections.slice(0, 5).forEach(section => {
    const li = document.createElement('li');
    li.textContent = section.line;
    list.appendChild(li);
  });

  card.appendChild(list);
  return card;
}

export async function renderSections(filter = '') {
  const container = document.getElementById('sections');
  const loader = document.getElementById('loader');
  container.innerHTML = '';
  loader.style.display = 'block';

  if (!fullData.length) {
    fullData = await fetchDashboardSections();
  }

  const filtered = filter
    ? fullData.filter(d => d.title.toLowerCase().includes(filter.toLowerCase()))
    : fullData;

  filtered.forEach((data, i) => {
    const card = createSectionCard(data);
    card.style.animationDelay = `${i * 0.1}s`;
    container.appendChild(card);
  });

  loader.style.display = 'none';
}
