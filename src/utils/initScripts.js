export const initGlobalScripts = () => {
    // We already have destinationsData loaded globally from index.html

    // 1️⃣ Global Search Functionality with Event Delegation
    document.addEventListener('input', (e) => {
        if (e.target && e.target.classList.contains('search-input')) {
            const searchInput = e.target;
            const term = e.target.value.toLowerCase();
            let resultsContainer = searchInput.parentNode.querySelector('.search-results-overlay');

            if (!resultsContainer) {
                resultsContainer = document.createElement('div');
                resultsContainer.className = 'search-results-overlay';
                searchInput.parentNode.appendChild(resultsContainer);
            }

            resultsContainer.innerHTML = '';

            if (term.length > 0) {
                if (typeof window.destinationsData !== 'undefined') {
                    const matches = window.destinationsData.filter(d =>
                        d.name.toLowerCase().includes(term) ||
                        d.city.toLowerCase().includes(term) ||
                        d.category.toLowerCase().includes(term)
                    );

                    if (matches.length > 0) {
                        resultsContainer.style.display = 'block';
                        matches.slice(0, 5).forEach(match => {
                            const div = document.createElement('a');
                            div.href = `/details.html?id=${match.id}`;
                            div.className = 'search-result-item';
                            div.innerHTML = `
                                <img src="${match.image}" alt="${match.name}" onerror="this.src='https://via.placeholder.com/50?text=Place'">
                                <div>
                                    <h4>${match.name}</h4>
                                    <p>${match.city}</p>
                                </div>
                            `;
                            resultsContainer.appendChild(div);
                        });
                    } else {
                        resultsContainer.innerHTML = '<p style="padding:15px; text-align:center; color:var(--text-light);">No results found</p>';
                        resultsContainer.style.display = 'block';
                    }
                }
            } else {
                resultsContainer.style.display = 'none';
            }

            // Filter on-page cards (dynamically queried so they are fresh)
            const catCards = document.querySelectorAll('.cat-card, .cat-large-card');
            const destCards = document.querySelectorAll('.dest-card');
            const cityCards = document.querySelectorAll('.city-card-wide');

            catCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                const isMatch = text.includes(term) || term === '';
                if (card.classList.contains('cat-large-card')) {
                    card.style.display = isMatch ? 'block' : 'none';
                } else {
                    card.style.display = isMatch ? 'flex' : 'none';
                }
            });
            destCards.forEach(card => {
                const titleEl = card.querySelector('h3');
                const locEl = card.querySelector('p');
                if (titleEl) {
                    const name = titleEl.textContent.toLowerCase();
                    const location = locEl ? locEl.textContent.toLowerCase() : '';
                    card.style.display = (name.includes(term) || location.includes(term)) || term === '' ? 'flex' : 'none';
                }
            });
            cityCards.forEach(card => {
                const titleEl = card.querySelector('h3');
                const listEl = card.querySelector('.famous-places-list');
                if (titleEl) {
                    const name = titleEl.textContent.toLowerCase();
                    const tags = listEl ? listEl.textContent.toLowerCase() : '';
                    card.style.display = (name.includes(term) || tags.includes(term)) || term === '' ? 'grid' : 'none';
                }
            });
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.target && e.target.classList.contains('search-input')) {
            if (e.key === 'Enter' && e.target.value.trim() !== '') {
                window.location.href = `/explore.html?q=${encodeURIComponent(e.target.value.trim())}`;
            }
        }
    });

    document.addEventListener('click', (e) => {
        // Close search results
        const searchInput = document.querySelector('.search-input');
        const resultsContainer = document.querySelector('.search-results-overlay');
        if (searchInput && resultsContainer) {
            if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
                resultsContainer.style.display = 'none';
            }
        }

        // 2️⃣ Click Feedback
        const clickablesSelector = 'a, button, .cat-card, .dest-card, .cat-large-card';
        const clickable = e.target.closest(clickablesSelector);
        if (clickable) {
            if (clickable.getAttribute('href') === '#' || (clickable.tagName === 'BUTTON' && clickable.type !== 'submit')) {
                e.preventDefault();
            }
            // Always apply scale animation for visual feedback
            if (clickable.tagName === 'BUTTON' || clickable.getAttribute('href') === '#') {
                clickable.style.transform = 'scale(0.95)';
                setTimeout(() => { clickable.style.transform = ''; }, 150);
            }
        }

        // 3️⃣ Profile Button Popup
        const profileBtn = document.getElementById('profileBtn');
        if (profileBtn && profileBtn.contains(e.target)) {
            let profileOverlay = document.getElementById('profileOverlay');
            if (!profileOverlay) {
                profileOverlay = document.createElement('div');
                profileOverlay.id = 'profileOverlay';
                profileOverlay.className = 'profile-overlay';
                profileOverlay.innerHTML = `
                    <div class="profile-sidebar">
                        <div class="profile-header">
                            <div class="profile-info-main">
                                <div class="profile-avatar">
                                    <img src="https://ui-avatars.com/api/?name=User&background=1e88e5&color=fff" alt="Avatar" />
                                </div>
                                <div class="user-details">
                                    <h2>User Explorer</h2>
                                    <p>user@tamilulagam.com</p>
                                </div>
                            </div>
                            <button class="close-profile" id="closeProfileBtn">&times;</button>
                        </div>

                        <div class="profile-stats">
                            <div class="stat-item"><span class="stat-value">12</span><span class="stat-label">Visited</span></div>
                            <div class="stat-item"><span class="stat-value">25</span><span class="stat-label">Favorites</span></div>
                            <div class="stat-item"><span class="stat-value">8</span><span class="stat-label">Reviews</span></div>
                        </div>

                        <div class="profile-menu">
                            <div class="menu-group">
                                <h3>Account Settings</h3>
                                <a href="/profile-info.html" class="menu-item" style="text-decoration: none;"><span>Personal Information</span></a>
                                <a href="/profile-favorites.html" class="menu-item" style="text-decoration: none;"><span>My Favorites</span></a>
                                <a href="/profile-history.html" class="menu-item" style="text-decoration: none;"><span>Travel History</span></a>
                            </div>
                            <div class="menu-group">
                                <h3>Preferences</h3>
                                <a href="/profile-notifications.html" class="menu-item" style="text-decoration: none;"><span>Notifications</span></a>
                                <a href="/profile-settings.html" class="menu-item" style="text-decoration: none;"><span>Global Settings</span></a>
                            </div>
                        </div>
                        <a href="/" class="logout-btn-real"><span>Logout</span></a>
                    </div>
                `;
                document.body.appendChild(profileOverlay);

                document.getElementById('closeProfileBtn').addEventListener('click', () => {
                    profileOverlay.classList.remove('active');
                });
                profileOverlay.addEventListener('click', (ev) => {
                    if (ev.target === profileOverlay) profileOverlay.classList.remove('active');
                });
            }
            setTimeout(() => { profileOverlay.classList.add('active'); }, 10);
        }

        // 4️⃣ City Card Wide Click Expansion
        const cityCard = e.target.closest('.city-card-wide');
        if (cityCard && !e.target.closest('a') && !e.target.closest('button')) {
            const mainLink = cityCard.querySelector('.city-text');
            if (mainLink) mainLink.click();
        }
    });

    // 4️⃣ Horizontal Scroll with Mouse Wheel (Delegate via WheelEvent)
    document.addEventListener('wheel', (evt) => {
        const container = evt.target.closest('.horizontal-scroll');
        if (container && evt.deltaY !== 0) {
            evt.preventDefault();
            container.scrollLeft += evt.deltaY;
        }
    }, { passive: false });
};
