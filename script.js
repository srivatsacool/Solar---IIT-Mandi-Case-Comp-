document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. Core Elements & Navigation
    ========================================================= */
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const dashboardViews = document.querySelectorAll('.dashboard-view');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');

    function switchView(targetId) {
        navLinks.forEach(link => link.classList.remove('active'));
        dashboardViews.forEach(view => {
            view.classList.remove('active');
            view.style.animation = 'none';
            view.offsetHeight; 
            view.style.animation = null; 
        });

        const targetLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        if (targetLink) targetLink.classList.add('active');

        const targetView = document.getElementById(targetId);
        if (targetView) targetView.classList.add('active');

        closeSidebar();
        
        if(targetId === 'dashboard-bio') {
            animateCounters();
            startTerminalStream();
        }
        if(targetId === 'dashboard-kabadiwala') {
            animatePayout();
        }
        if(targetId === 'dashboard-triage') {
             triggerLaserScan();
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            if (targetId) switchView(targetId);
        });
    });

    window.triggerNav = function(targetId, el) {
        if(el) closeDropdown();
        switchView(targetId);
    };

    function openSidebar() {
        sidebar.classList.add('open');
        sidebarOverlay.style.display = 'block';
        setTimeout(() => sidebarOverlay.style.opacity = '1', 10);
    }
    
    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.style.opacity = '0';
        setTimeout(() => sidebarOverlay.style.display = 'none', 300);
    }

    if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
    if(closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    if(sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    /* =========================================================
       2. Toasts & Dropdowns
    ========================================================= */
    const notifToggle = document.getElementById('notifToggle');
    const notifMenu = document.getElementById('notifMenu');
    const notifBadge = document.getElementById('notifBadge');

    function closeDropdown() { if(notifMenu) notifMenu.classList.remove('show'); }

    if(notifToggle) {
        notifToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            notifMenu.classList.toggle('show');
            if(notifBadge) {
                notifBadge.style.transform = 'scale(0)';
                setTimeout(() => notifBadge.style.display = 'none', 300);
            }
        });
    }

    document.addEventListener('click', () => closeDropdown());
    if(notifMenu) notifMenu.addEventListener('click', (e) => e.stopPropagation());

    const toastContainer = document.getElementById('toast-container');
    window.showToast = function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        let icon = '<i class="fa-solid fa-circle-info text-info"></i>';
        if(type === 'success') icon = '<i class="fa-solid fa-circle-check text-green"></i>';
        if(type === 'error') icon = '<i class="fa-solid fa-circle-exclamation text-danger"></i>';
        toast.innerHTML = `${icon}<span>${message}</span>`;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('hide');
            toast.addEventListener('animationend', () => toast.remove());
        }, 3000);
    };

    /* =========================================================
       3. View 1: GIS Map Interactions
    ========================================================= */
    const markers = document.querySelectorAll('.interactive-marker');
    const nodeName = document.getElementById('nodeName');
    const nodePanels = document.getElementById('nodePanels');
    const nodeCost = document.getElementById('nodeCost');
    const nodeCapStatus = document.getElementById('nodeCapStatus');
    const nodePercentage = document.getElementById('nodePercentage');
    const nodeChart = document.getElementById('nodeChart');

    markers.forEach(marker => {
        marker.addEventListener('click', () => {
            markers.forEach(m => m.classList.remove('selected'));
            marker.classList.add('selected');

            // Extraction data
            const loc = marker.getAttribute('data-loc');
            const cap = marker.getAttribute('data-cap');
            const cost = marker.getAttribute('data-cost');
            const panels = marker.getAttribute('data-panels');

            // Update UI
            if(nodeName) nodeName.textContent = loc;
            if(nodePanels) nodePanels.textContent = `${panels} Panels Expected`;
            if(nodeCost) nodeCost.textContent = `~ ${cost}L Value`;
            
            if(nodePercentage) {
                nodePercentage.textContent = cap;
                if(nodeChart) {
                    nodeChart.style.strokeDasharray = `${cap}, 100`;
                    // Color change based on cap
                    if(cap > 80) {
                        nodeChart.style.stroke = 'var(--danger)';
                        nodeCapStatus.textContent = `${cap}% Critical Mass`;
                        nodeCapStatus.className = 'text-sm text-danger font-bold';
                    } else if (cap > 50) {
                        nodeChart.style.stroke = 'var(--light-green)';
                        nodeCapStatus.textContent = `${cap}% Optimal Volume`;
                        nodeCapStatus.className = 'text-sm text-green font-bold';
                    } else {
                        nodeChart.style.stroke = 'var(--info)';
                        nodeCapStatus.textContent = `${cap}% Base Accrual`;
                        nodeCapStatus.className = 'text-sm text-info font-bold';
                    }
                }
            }
        });
    });

    // Populate Kabadiwala Feed
    const txList = document.getElementById('txList');
    if(txList) {
        const names = ['Ramesh K.', 'Saanvi D.', 'Vendor_412', 'Kabadi_Jodh', 'Anil Singh'];
        const vols = [5, 12, 2, 45, 8];
        const amounts = [2500, 6000, 1000, 22500, 4000];
        
        for(let i=0; i<15; i++) {
            const idx = Math.floor(Math.random()*names.length);
            const amt = amounts[idx] + Math.floor(Math.random()*200);
            const time = `${Math.floor(Math.random()*12)+1}:${Math.floor(Math.random()*50)+10} PM`;
            
            const div = document.createElement('div');
            div.className = 'feed-item flex justify-between align-center interactive-element';
            div.innerHTML = `
                <div class="flex-col">
                    <strong class="text-sm border-b border-dashed border-slate-200 pb-1 mb-1">${names[idx]}</strong>
                    <span class="text-xs text-muted"><i class="fa-solid fa-solar-panel"></i> ${vols[idx]} Panels deposited</span>
                </div>
                <div class="flex-col text-right">
                    <strong class="text-green text-sm">₹${amt.toLocaleString()}</strong>
                    <span class="text-xs text-slate-400 font-mono">${time} <i class="fa-solid fa-check-double text-green opacity-50"></i></span>
                </div>
            `;
            // Staggered animation
            div.style.animationDelay = `${i * 0.1}s`;
            txList.appendChild(div);
        }
    }

    /* =========================================================
       4. View 2: Triage Scans
    ========================================================= */
    const scanTriggers = document.querySelectorAll('.scan-trigger-btn');
    const scanImg = document.getElementById('liveScanImg');
    const twinId = document.getElementById('twinIdDisplay');
    const loadingText = document.getElementById('scanLoadingText');
    const boundingBoxes = document.querySelectorAll('.cv-bounding-box');

    function triggerLaserScan() {
        const bars = document.querySelectorAll('.res-fill');
        bars.forEach(b => {
            const temp = b.style.width;
            b.style.width = '0%';
            setTimeout(() => b.style.width = temp, 500);
        });
    }

    scanTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            switchView('dashboard-triage');
            showToast('Initiating Computer Vision Feed...', 'info');
            
            if(scanImg && twinId && loadingText) {
                // Blur/Contrast states
                scanImg.style.filter = 'contrast(3) brightness(1.2) sepia(1) hue-rotate(180deg)';
                twinId.textContent = "INITIALIZING...";
                twinId.style.color = "#FFC107";
                loadingText.style.display = 'block';
                boundingBoxes.forEach(b => b.style.display = 'none');
                
                setTimeout(() => {
                    scanImg.style.filter = 'contrast(1.1)';
                    twinId.textContent = "RJ-SO-2026-NEW";
                    twinId.style.color = "#00E5FF";
                    loadingText.style.display = 'none';
                    boundingBoxes.forEach(b => b.style.display = 'block');
                    triggerLaserScan();
                    showToast('Panel RJ-SO-2026-NEW logged to twin ledger.', 'success');
                }, 2500);
            }
        });
    });

    const routeBtn = document.getElementById('routeSecondLifeBtn');
    if(routeBtn) {
        routeBtn.addEventListener('click', function() {
            showToast('Panel marked for Village School #44.', 'success');
            const iconBox = this.querySelector('.icon-box');
            if(iconBox) iconBox.innerHTML = '<i class="fa-solid fa-check"></i>';
        });
    }

    /* =========================================================
       5. View 3: Bio-Extraction & ML Terminal
    ========================================================= */
    let terminalInterval;
    const terminalStream = document.getElementById('terminalStream');
    
    const logs = [
        "[SYS] Polling pH sensors... Current: 2.14",
        "<span class='warn'>[WARN] Temperature anomaly localized in quadrant 3 (32.8°C)</span>",
        "[ML_ENGINE] Running stabilization matrices... (Iteration 341)",
        "[CMD] Injecting 15ml buffering agent.",
        "<span class='success'>[OK] pH stabilized to 2.10. Bacterial metabolic rate optimal.</span>",
        "[SYS] Ag Extraction rate: +1.2 g/min.",
        "[ML_ENGINE] Predictive yield updated: +3% vs baseline.",
        "[CMD] Modulating agi-motor speed to 45 RPM.",
        "<span class='success'>[OK] Acidithiobacillus colonies at peak density.</span>"
    ];

    function startTerminalStream() {
        if(!terminalStream) return;
        terminalStream.innerHTML = '';
        clearInterval(terminalInterval);
        
        let counter = 0;
        terminalInterval = setInterval(() => {
            const entry = logs[counter % logs.length];
            const div = document.createElement('div');
            
            div.className = 'log-line';
            // Simple parsing to apply specific CSS styles
            if(entry.includes('warn')) div.classList.add('warn');
            if(entry.includes('success')) div.classList.add('success');
            
            const timestamp = new Date().toISOString().substring(11, 19);
            div.innerHTML = `<span class="text-slate-500">[${timestamp}]</span> ${entry}`;
            
            terminalStream.appendChild(div);
            
            // Auto scroll container
            const container = document.getElementById('mlTerminal');
            if(container) container.scrollTop = container.scrollHeight;

            if(terminalStream.children.length > 30) {
                terminalStream.removeChild(terminalStream.firstChild);
            }

            counter++;
        }, 1200);
    }

    // Number Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.count-up');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const inc = target / 40; 
            let count = 0;
            
            const updateCount = () => {
                count += inc;
                if(count < target) {
                    counter.innerText = Math.ceil(count).toLocaleString();
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCount();
        });
    }

    function animatePayout() {
        const payoutEl = document.getElementById('animatedPayout');
        if(!payoutEl) return;
        let count = 0; let target = 82500; let inc = 1500;
        const updatePayout = () => {
            count += inc;
            if(count < target) {
                payoutEl.innerText = `₹${count.toLocaleString()}`;
                setTimeout(updatePayout, 20);
            } else {
                payoutEl.innerText = `₹${target.toLocaleString()}`;
            }
        };
        updatePayout();
    }

    // Initial load
    setTimeout(() => { animatePayout(); }, 500);

});
