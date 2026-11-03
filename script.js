const defaultGroups = [
  { 
    title: "🤖 AI Assistant Hub", 
    links: [
      { name: "Gemini Engine", url: "https://google.com" },
      { name: "ChatGPT Portal", url: "https://chatgpt.com" },
      { name: "Claude AI", url: "https://claude.ai" },
      { name: "Perplexity App", url: "https://perplexity.ai" },
      { name: "DeepSeek Core", url: "https://deepseek.com" },
      { name: "Hugging Face", url: "https://huggingface.co" }
    ],
    customBg: "",
    customColor: ""
  },
  { 
    title: "🎒 School Center", 
    links: [
      { name: "Google Classroom", url: "https://google.com" },
      { name: "Drive Node", url: "https://google.com" },
      { name: "Docs Engine", url: "https://google.com" }
    ],
    customBg: "",
    customColor: ""
  },
  { 
    title: "🎮 Entertainment Zone", 
    links: [
      { name: "YouTube Stream", url: "https://youtube.com" },
      { name: "Twitch Live", url: "https://twitch.tv" }
    ],
    customBg: "",
    customColor: ""
  }
];

let myWorkspaceData = [];

function updateClocks() {
  const now = new Date();
  document.getElementById('live-clock').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secDegrees = (seconds * 6); 
  const minDegrees = (minutes * 6) + (seconds * 0.1); 
  const hourDegrees = (hours * 30) + (minutes * 0.5); 

  document.getElementById('second-hand').style.transform = `translateX(-50%) rotate(${secDegrees}deg)`;
  document.getElementById('minute-hand').style.transform = `translateX(-50%) rotate(${minDegrees}deg)`;
  document.getElementById('hour-hand').style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;

  document.getElementById('greeting').innerText = hours < 12 ? "Good morning, Operator." : hours < 18 ? "System online. Good afternoon." : "System online. Good evening.";
}
setInterval(updateClocks, 1000);
updateClocks();

const suePanel = document.getElementById('sue-panel');
document.getElementById('toggle-sue-btn').addEventListener('click', () => {
  suePanel.classList.toggle('open');
});

function loadSettings() {
  chrome.storage.local.get(['shortcutGroups', 'wallpaper', 'theme', 'opacity'], (result) => {
    myWorkspaceData = (result.shortcutGroups && result.shortcutGroups.length > 0) ? result.shortcutGroups : defaultGroups;
    if (result.wallpaper) document.body.style.backgroundImage = `url('${result.wallpaper}')`;
    if (result.theme) {
      document.body.className = `theme-${result.theme}`;
      document.getElementById('theme-selector').value = result.theme;
    }
    if (result.opacity) {
      document.documentElement.style.setProperty('--card-bg', `rgba(30, 31, 46, ${result.opacity / 100})`);
      document.getElementById('opacity-slider').value = result.opacity;
    }
    renderGroups();
  });
}

document.getElementById('theme-selector').addEventListener('change', (e) => {
  document.body.className = `theme-${e.target.value}`;
  chrome.storage.local.set({ theme: e.target.value });
});

document.getElementById('opacity-slider').addEventListener('input', (e) => {
  const alpha = e.target.value / 100;
  document.documentElement.style.setProperty('--card-bg', `rgba(30, 31, 46, ${alpha})`);
  chrome.storage.local.set({ opacity: e.target.value });
});

document.getElementById('apply-bg-btn').addEventListener('click', () => {
  const url = document.getElementById('bg-url-input').value;
  if (url) {
    document.body.style.backgroundImage = `url('${url}')`;
    chrome.storage.local.set({ wallpaper: url });
  }
});

function renderGroups() {
  const container = document.getElementById('groups-container');
  container.innerHTML = '';
  chrome.storage.local.set({ shortcutGroups: myWorkspaceData });

  myWorkspaceData.forEach((group, groupIndex) => {
    const groupCard = document.createElement('div');
    groupCard.className = 'group-card';
    
    if (group.customBg) groupCard.style.backgroundImage = `url('${group.customBg}')`;
    if (group.customColor) groupCard.style.setProperty('--title-color', group.customColor);

    const headerDiv = document.createElement('div');
    headerDiv.className = 'group-header';
    
    const title = document.createElement('h3');
    title.className = 'group-title';
    title.innerText = group.title;
    headerDiv.appendChild(title);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'header-actions';

    const configBtn = document.createElement('button');
    configBtn.className = 'action-btn';
    configBtn.innerText = '🎨';
    configBtn.onclick = () => {
      const bOption = prompt("Container Background Image URL:", group.customBg || "");
      const cOption = prompt("Custom Title Hex/Color Code:", group.customColor || "");
      myWorkspaceData[groupIndex].customBg = bOption || "";
      myWorkspaceData[groupIndex].customColor = cOption || "";
      renderGroups();
    };

    const deleteGroupBtn = document.createElement('button');
    deleteGroupBtn.className = 'action-btn';
    deleteGroupBtn.innerText = '🗑️';
    deleteGroupBtn.onclick = () => {
      if(confirm(`Purge capsule "${group.title}"?`)) {
        myWorkspaceData.splice(groupIndex, 1);
        renderGroups();
      }
    };
    
    actionsDiv.appendChild(configBtn);
    actionsDiv.appendChild(deleteGroupBtn);
    headerDiv.appendChild(actionsDiv);
    groupCard.appendChild(headerDiv);

    const list = document.createElement('ul');
    list.className = 'shortcut-list';
    
    group.links.forEach((link, linkIndex) => {
      const li = document.createElement('li');
      li.className = 'shortcut-item';

      const a = document.createElement('a');
      a.href = link.url;
      a.innerText = link.name;
      a.target = "_blank";
      li.appendChild(a);

      const removeLinkBtn = document.createElement('button');
      removeLinkBtn.className = 'action-btn';
      removeLinkBtn.innerText = '×';
      removeLinkBtn.onclick = () => {
        myWorkspaceData[groupIndex].links.splice(linkIndex, 1);
        renderGroups();
      };
      li.appendChild(removeLinkBtn);
      list.appendChild(li);
    });
    groupCard.appendChild(list);

    const addLinkBtn = document.createElement('button');
    addLinkBtn.className = 'add-link-btn';
    addLinkBtn.innerText = '+ Sync Target Website';
    addLinkBtn.onclick = () => {
      const name = prompt("Link title label:");
      let url = prompt("Full tracking URL:");
      if (name && url) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) url = 'https://' + url;
        myWorkspaceData[groupIndex].links.push({ name, url });
        renderGroups();
      }
    };
    groupCard.appendChild(addLinkBtn);
    container.appendChild(groupCard);
  });
}

document.getElementById('add-group-btn').addEventListener('click', () => {
  const name = prompt("Name New Capsule Manifest:");
  if (name) {
    myWorkspaceData.push({ title: name, links: [], customBg: "", customColor: "" });
    renderGroups();
  }
});

// Donation Redirection Listener Engine
document.getElementById('donate-btn').addEventListener('click', () => {
  const donationUrl = 'https://buymeacoffee.com'; // Swapping point for developer link
  window.open(donationUrl, '_blank');
});

loadSettings();