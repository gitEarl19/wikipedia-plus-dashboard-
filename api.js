const BASE_URL = 'https://en.wikipedia.org/w/api.php';

export const WIKI_PAGES = {
  "Editorial Noticeboards": "Wikipedia:Dashboard",
  "Help Noticeboards": "Wikipedia:Help_desk",
  "Village Pump": "Wikipedia:Village_pump",
  "Admin Noticeboards": "Wikipedia:Administrators'_noticeboard",
  "RFCs": "Wikipedia:Requests_for_comment",
  "Requested Articles": "Wikipedia:Requested_articles",
  "Deletion Discussions": "Wikipedia:Articles_for_deletion",
  "Requested Moves": "Wikipedia:Requested_moves",
  "Adminship": "Wikipedia:Requests_for_adminship"
};

/**
 * Fetch sections of a Wikipedia page using the API
 * @param {string} title
 * @returns {Promise<Array>} sections
 */
async function fetchSections(title) {
  try {
    const res = await fetch(`${BASE_URL}?action=parse&page=${title}&format=json&origin=*`);
    const json = await res.json();
    return json?.parse?.sections || [];
  } catch (err) {
    console.error(`Error fetching sections for ${title}:`, err);
    return [];
  }
}

export async function fetchDashboardSections() {
  const dashboardData = [];

  for (const [title, page] of Object.entries(WIKI_PAGES)) {
    const sections = await fetchSections(page);
    dashboardData.push({ title, sections });
  }

  return dashboardData;
}
