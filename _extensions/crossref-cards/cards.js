// cards.js — Hierarchical navigation view with URL state

let topics = window.crossrefCardsData || [];
let topicMap = {};
let focal = "Opinion Dynamics"; // default focal

// Build lookup + parent references
function buildGraph() {
  topics.forEach(item => {
    topicMap[item.title] = item;
  });
  topics.forEach(item => {
    (item.children || []).forEach(child => {
      if (topicMap[child]) {
        topicMap[child].parent = item.title;
      }
    });
  });
}

// Render one card
function createCard(item, isFocal = false) {
  const div = document.createElement("div");
  div.className = "crossref-card" + (isFocal ? " focal" : "");
  div.innerHTML = `
    <h3>${item.title}</h3>
    <div class="desc">${item.desc_html || ""}</div>
  `;
  div.addEventListener("click", () => {
    setFocal(item.title, true); // true = push new state
  });
  return div;
}

// Render hierarchy around focal
function renderHierarchy() {
  const parentsRow = document.querySelector(".row.parents");
  const siblingsRow = document.querySelector(".row.siblings");
  const childrenRow = document.querySelector(".row.children");

  parentsRow.innerHTML = "";
  siblingsRow.innerHTML = "";
  childrenRow.innerHTML = "";

  const focalItem = topicMap[focal];
  if (!focalItem) return;

  // Parents
  if (focalItem.parent && topicMap[focalItem.parent]) {
    const parentItem = topicMap[focalItem.parent];
    parentsRow.appendChild(createCard(parentItem));
  }

  // Siblings (including focal)
  if (focalItem.parent && topicMap[focalItem.parent]) {
    const parent = topicMap[focalItem.parent];
    (parent.children || []).forEach(childTitle => {
      const childItem = topicMap[childTitle];
      if (childItem) {
        siblingsRow.appendChild(createCard(childItem, childTitle === focal));
      }
    });
  } else {
    // No parent: just show focal
    siblingsRow.appendChild(createCard(focalItem, true));
  }

  // Children
  (focalItem.children || []).forEach(childTitle => {
    const childItem = topicMap[childTitle];
    if (childItem) {
      childrenRow.appendChild(createCard(childItem));
    }
  });
}

function setFocal(title, push = false) {
  focal = title;
  renderHierarchy();
  updateURL(push);
}

// ---------- URL State ----------

function updateURL(push) {
  const params = new URLSearchParams();
  if (focal) params.set("focal", focal);
  const newUrl = "?" + params.toString();
  if (push) {
    history.pushState({ focal }, "", newUrl);
  } else {
    history.replaceState({ focal }, "", newUrl);
  }
}

window.addEventListener("popstate", (e) => {
  if (e.state && e.state.focal) {
    focal = e.state.focal;
    renderHierarchy();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetch(window.crossrefCardsFile)
    .then(res => res.text())
    .then(text => {
      topics = jsyaml.load(text);
      buildGraph();
      // Restore focal from URL if present
      const params = new URLSearchParams(window.location.search);
      if (params.get("focal") && topicMap[params.get("focal")]) {
        focal = params.get("focal");
      }
      renderHierarchy();
      updateURL(false);
    })
    .catch(err => console.error("Error loading topics:", err));
});


