let nestedJSONData = `[
    {
        "id": 1,
        "logo": "./assets/images/logo-devlens.svg",
        "name": "DevLens",
        "description": "Quickly inspect page layouts and visualize element boundaries.",
        "isActive": false
    },
    {
        "id": 2,
        "logo": "./assets/images/logo-style-spy.svg",
        "name": "StyleSpy",
        "description": "Instantly analyze and copy CSS from any webpage element.",
        "isActive": false
    },
    {
        "id": 3,
        "logo": "./assets/images/logo-speed-boost.svg",
        "name": "SpeedBoost",
        "description": "Optimizes browser resource usage to accelerate page loading.",
        "isActive": false
    },
    {
        "id": 4,
        "logo": "./assets/images/logo-json-wizard.svg",
        "name": "JSONWizard",
        "description": "Formats, validates, and prettifies JSON responses in-browser.",
        "isActive": false
    },
    {
        "id": 5,
        "logo": "./assets/images/logo-tab-master-pro.svg",
        "name": "TabMaster Pro",
        "description": "Organizes browser tabs into groups and sessions.",
        "isActive": false
    },
    {
        "id": 6,
        "logo": "./assets/images/logo-viewport-buddy.svg",
        "name": "ViewportBuddy",
        "description": "Simulates various screen resolutions directly within the browser.",
        "isActive": false
    },
    {
        "id": 7,
        "logo": "./assets/images/logo-markup-notes.svg",
        "name": "Markup Notes",
        "description": "Enables annotation and notes directly onto webpages for collaborative debugging.",
        "isActive": false
    },
    {
        "id": 8,
        "logo": "./assets/images/logo-grid-guides.svg",
        "name": "GridGuides",
        "description": "Overlay customizable grids and alignment guides on any webpage.",
        "isActive": false
    },
    {
        "id": 9,
        "logo": "./assets/images/logo-palette-picker.svg",
        "name": "Palette Picker",
        "description": "Instantly extracts color palettes from any webpage.",
        "isActive": false
    },
    {
        "id": 10,
        "logo": "./assets/images/logo-link-checker.svg",
        "name": "LinkChecker",
        "description": "Scans and highlights broken links on any page.",
        "isActive": false
    },
    {
        "id": 11,
        "logo": "./assets/images/logo-dom-snapshot.svg",
        "name": "DOM Snapshot",
        "description": "Capture and export DOM structures quickly.",
        "isActive": false
    },
    {
        "id": 12,
        "logo": "./assets/images/logo-console-plus.svg",
        "name": "ConsolePlus",
        "description": "Enhanced developer console with advanced filtering and logging.",
        "isActive": false
    }
  ]`;

let extensions = JSON.parse(nestedJSONData); // Convert JSON
let activeExts = [];
let inactiveExts = [];


// HTML element references
const allExtsBtn = document.getElementById('allExtsBtn');
const activeExtsBtn = document.getElementById('activeExtsBtn');
const inactiveExtsBtn = document.getElementById('inactiveExtsBtn');
const container = document.getElementById('extensionsContainer');

function generateExtensions(list) {
    // Reset container each time function runs
    container.innerHTML = '';

    // Iterate through list to populate HTML
    list.forEach((ext)=> {
        const extDiv = document.createElement('div');
        extDiv.className = 'extension';
        extDiv.setAttribute('data-id', ext.id);
        extDiv.innerHTML = `
        <div class="extension-content">
            <div>
                <img src="${ext.logo}" alt="${ext.name}"/>
            </div>
            <div>
                <h3>${ext.name}</h3>
                <p>${ext.description}</p>
            </div>   
        </div>
        <div class="extension-btns">
            <button class="remove-extension-btn">Remove</button>
            <label class="switch">
                <input type="checkbox" ${ext.isActive ? 'checked' : ''}/>
                <span class="slider"></span>
            </label>
        </div>
        `;

        // Add toggle event
        const toggle = extDiv.querySelector('input[type="checkbox"]');
        toggle.addEventListener('change', ()=> {
            const id = parseInt(extDiv.dataset.id);
            const currentExt = extensions.find((e)=> e.id === id);
            currentExt.isActive = toggle.checked;
            console.log(`Toggle ${currentExt.name} to ${currentExt.isActive}`);
        });

        container.appendChild(extDiv);
    });
}

generateExtensions(extensions);

allExtsBtn.addEventListener('click', (e)=> {
    // Add styling to the all button
    styleActiveBtn(e.target.id);

    generateExtensions(extensions);
});

activeExtsBtn.addEventListener('click', (e)=> {
    // Add styling to the all button
    styleActiveBtn(e.target.id);

    activeExts = extensions.filter(ext=> ext.isActive);
    generateExtensions(activeExts);
});

inactiveExtsBtn.addEventListener('click', (e)=> {
    // Add styling to the all button
    styleActiveBtn(e.target.id);

    inactiveExts = extensions.filter(ext=> !ext.isActive);
    generateExtensions(inactiveExts);
});

window.addEventListener('DOMContentLoaded', ()=> {
    generateExtensions(extensions);
    allExtsBtn.click();
});

function styleActiveBtn(button) {
    let buttons = Array.from(document.querySelectorAll('#allExtsBtn, #activeExtsBtn, #inactiveExtsBtn'));
    
    let activeBtn = buttons.find((btn)=> btn.id === button);
    activeBtn.classList.remove('button'); // Remove default button styling from active button
    activeBtn.classList.add('active'); // Add active styling to active button
    
    let inactiveBtns = buttons.filter((btn)=> btn.id !== button);
    inactiveBtns.forEach((btn)=> {
        btn.classList ? btn.classList.remove('active') : ""; // Remove active styling from other buttons
        btn.classList ? btn.classList.add('button') : ""; // Add default styling to inactive buttons
    });
};