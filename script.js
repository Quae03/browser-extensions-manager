let nestedJSONData = `[
    {
        "id": 1,
        "logo": "./assets/images/logo-devlens.svg",
        "name": "DevLens",
        "description": "Quickly inspect page layouts and visualize element boundaries.",
        "isActive": true
    },
    {
        "id": 2,
        "logo": "./assets/images/logo-style-spy.svg",
        "name": "StyleSpy",
        "description": "Instantly analyze and copy CSS from any webpage element.",
        "isActive": true
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
        "isActive": true
    },
    {
        "id": 5,
        "logo": "./assets/images/logo-tab-master-pro.svg",
        "name": "TabMaster Pro",
        "description": "Organizes browser tabs into groups and sessions.",
        "isActive": true
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
        "isActive": true
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
        "isActive": true
    },
    {
        "id": 10,
        "logo": "./assets/images/logo-link-checker.svg",
        "name": "LinkChecker",
        "description": "Scans and highlights broken links on any page.",
        "isActive": true
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
        "isActive": true
    }
  ]`;

// Insert JSON extensions list into HTML

let extensionsList = JSON.parse(nestedJSONData);
let content = document.getElementById('content');

let allExtensions = [];
let activeExtensions = [];
let inactiveExtensions = [];

const allExtensionsBtn = document.getElementById('allExtensionsBtn');
const activeExtensionsBtn = document.getElementById('activeExtensionsBtn');
const inactiveExtensionsBtn = document.getElementById('inactiveExtensionsBtn');
let state = 'all';

function generateContent() {

    content.innerHTML = extensionsList.map((ext)=> {
        ext.isActive ? activeExtensions.push(ext) : inactiveExtensions.push(ext);
        localStorage.setItem("activeExtensions", JSON.stringify(activeExtensions));
        localStorage.setItem("inactiveExtensions", JSON.stringify(inactiveExtensions));
        let {id, logo, name, description} = ext;

        if (state === 'all') {
            allExtensions.push({id: ext.id, isActive: ext.isActive});
        return `
            <div class="extension">
                <div>
                    <div class="extension-content">
                        <div>  
                        <img src="${logo}">
                        </div>
                        <div>
                        <h3>${name}</h3>
                        <p>${description}</p>
                        </div>
                    </div>
                </div>
                <div id="${id}" class="extension-btns">
                    <button class="remove-extension-btn">Remove</button>
                    <label class="switch">
                        <input onclick='toggle(${id})' type="checkbox" id="toggleSwitch${id}">
                        <span id="slider${id}" class="slider"></span>
                    </label>
                </div>
            </div>`
    }}).join("");
    activeExtensions.forEach((ext)=> {
        let toggleSwitch = document.getElementById(`toggleSwitch${ext.id}`);
        if (ext.isActive = true) {
            toggleSwitch.click();
        } else {
            return;
        }
    })
}

generateContent();

window.onload = ()=> {
    if (state === 'all') {
        allExtensionsBtn.click();
    }
}

function activateBtn(event) {
    
    state = event.innerHTML.toLowerCase();
    if (state === 'active') {
        // Remove active styling from other buttons
        allExtensionsBtn.style.backgroundColor = '#fff';
        allExtensionsBtn.style.color = 'hsl(227, 75%, 14%)';
        inactiveExtensionsBtn.style.backgroundColor = '#fff';
        inactiveExtensionsBtn.style.color = 'hsl(227, 75%, 14%)';
        
        // Add styling to show this is the active button
        event.style.backgroundColor = 'hsl(3, 71%, 56%)';
        event.style.color = '#fff';
        event.style.cursor = 'default';

        // Functionality
        let activeExtensions = JSON.parse(localStorage.activeExtensions);
        
        content.innerHTML = activeExtensions.map((ext)=> {
            
            let {id, logo, name, description} = ext;
    
            return `
                <div class="extension">
                    <div>
                        <div class="extension-content">
                            <div>  
                            <img src="${logo}">
                            </div>
                            <div>
                            <h3>${name}</h3>
                            <p>${description}</p>
                            </div>
                        </div>
                    </div>
                    <div id="${id}" class="extension-btns">
                        <button class="remove-extension-btn">Remove</button>
                        <label class="switch">
                            <input onclick='toggle(${id})' type="checkbox" id="toggleSwitch${id}">
                            <span id="slider${id}" class="slider"></span>
                        </label>
                    </div>
                </div>`
        }).join("");
        activeExtensions.forEach((ext)=> {
            let toggleSwitch = document.getElementById(`toggleSwitch${ext.id}`);
            if (ext.isActive = true) {
                toggleSwitch.click();
            } else {
                return;
            }
        })
    }
    if (state === 'inactive') {
        // Remove active styling from other buttons
        allExtensionsBtn.style.backgroundColor = '#fff';
        allExtensionsBtn.style.color = 'hsl(227, 75%, 14%)';
        activeExtensionsBtn.style.backgroundColor = '#fff';
        activeExtensionsBtn.style.color = 'hsl(227, 75%, 14%)';

        // Add styling to show this is the active button
        event.style.backgroundColor = 'hsl(3, 71%, 56%)';
        event.style.color = '#fff';
        event.style.cursor = 'default';

        // Functionality

        let inactiveExtensions = JSON.parse(localStorage.inactiveExtensions);
        
        content.innerHTML = inactiveExtensions.map((ext)=> {
            
            let {id, logo, name, description} = ext;
    
            return `
                <div class="extension">
                    <div>
                        <div class="extension-content">
                            <div>  
                            <img src="${logo}">
                            </div>
                            <div>
                            <h3>${name}</h3>
                            <p>${description}</p>
                            </div>
                        </div>
                    </div>
                    <div id="${id}" class="extension-btns">
                        <button class="remove-extension-btn">Remove</button>
                        <label class="switch">
                            <input onclick='toggle(${id})' type="checkbox" id="toggleSwitch${id}">
                            <span id="slider${id}" class="slider"></span>
                        </label>
                    </div>
                </div>`
        }).join("");
    }
    if (state === 'all') {
        activeExtensionsBtn.style.backgroundColor = '#fff';
        activeExtensionsBtn.style.color = 'hsl(227, 75%, 14%)';
        inactiveExtensionsBtn.style.backgroundColor = '#fff';
        inactiveExtensionsBtn.style.color = 'hsl(227, 75%, 14%)';
        
        // Add styling to show this is the active button
        event.style.backgroundColor = 'hsl(3, 71%, 56%)';
        event.style.color = '#fff';
        event.style.cursor = 'default';

        // Functionality

        content.innerHTML = extensionsList.map((ext)=> {
           
            let {id, logo, name, description} = ext;
    
            return `
                <div class="extension">
                    <div>
                        <div class="extension-content">
                            <div>  
                            <img src="${logo}">
                            </div>
                            <div>
                            <h3>${name}</h3>
                            <p>${description}</p>
                            </div>
                        </div>
                    </div>
                    <div id="${id}" class="extension-btns">
                        <button class="remove-extension-btn">Remove</button>
                        <label class="switch">
                            <input onclick='toggle(${id})' type="checkbox" id="toggleSwitch${id}">
                            <span id="slider${id}" class="slider"></span>
                        </label>
                    </div>
                </div>`
        }).join("");
        activeExtensions.forEach((ext)=> {
            let toggleSwitch = document.getElementById(`toggleSwitch${ext.id}`);
            if (ext.isActive = true) {
                toggleSwitch.click();
            } else {
                return;
            }
        })
    }

}

function toggle(id) {
    let toggleSwitch = document.getElementById(`toggleSwitch${id}`); 
    search = extensionsList.find((ext)=> ext.id == id);

    if (toggleSwitch.checked) {
        inactiveExtensions = inactiveExtensions.filter((ext)=> ext.id !== id);
        !activeExtensions.includes(search) ? activeExtensions.push(search) : "";
        inactiveExtensions.length == 0 ? localStorage.removeItem("inactiveExtensions") : "";

        localStorage.setItem("activeExtensions", JSON.stringify(activeExtensions));
        localStorage.setItem("inactiveExtensions", JSON.stringify(inactiveExtensions));

        
    } else {
        activeExtensions = activeExtensions.filter((ext)=> ext.id !== id);
        inactiveExtensions.push(search);
        activeExtensions.length == 0 ? localStorage.removeItem("activeExtensions") : "";

        localStorage.setItem("activeExtensions", JSON.stringify(activeExtensions));
        localStorage.setItem("inactiveExtensions", JSON.stringify(inactiveExtensions));
    }
}
