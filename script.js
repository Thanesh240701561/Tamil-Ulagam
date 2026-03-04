document.addEventListener('DOMContentLoaded', () => {
    // 1️⃣ Selection of Elements
    const searchInput = document.querySelector('.search-input');
    const catCards = document.querySelectorAll('.cat-card, .cat-large-card');
    const destCards = document.querySelectorAll('.dest-card');
    const cityCards = document.querySelectorAll('.city-card-wide');
    const clickables = document.querySelectorAll('a, button, .cat-card, .dest-card, .cat-large-card');

    // 2️⃣ Search Functionality
    if (searchInput) {
        // Create Results Container if typing
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results-overlay';
        searchInput.parentNode.appendChild(resultsContainer);

        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            resultsContainer.innerHTML = '';

            if (term.length > 0) {
                if (typeof destinationsData !== 'undefined') {
                    const matches = destinationsData.filter(d =>
                        d.name.toLowerCase().includes(term) ||
                        d.city.toLowerCase().includes(term) ||
                        d.category.toLowerCase().includes(term)
                    );

                    if (matches.length > 0) {
                        resultsContainer.style.display = 'block';
                        matches.slice(0, 5).forEach(match => {
                            const div = document.createElement('a');
                            div.href = `details.html?id=${match.id}`;
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

            // Filter on-page cards
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
        });

        // Add Enter key support
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && searchInput.value.trim() !== '') {
                window.location.href = `explore.html?q=${encodeURIComponent(searchInput.value.trim())}`;
            }
        });

        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
                resultsContainer.style.display = 'none';
            }
        });
    }

    // 3️⃣ Click Feedback and Navigation Simulation
    clickables.forEach(element => {
        element.addEventListener('click', (e) => {
            // If it's just a placeholder link, prevent default and show feedback
            if (element.getAttribute('href') === '#' || element.tagName === 'BUTTON') {
                e.preventDefault();

                // Click Effect
                element.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
            }
        });
    });

    // Profile Button Action
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
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
                                    <p>user@discoverkumari.com</p>
                                </div>
                            </div>
                            <button class="close-profile" id="closeProfileBtn">&times;</button>
                        </div>

                        <div class="profile-stats">
                            <div class="stat-item">
                                <span class="stat-value">12</span>
                                <span class="stat-label">Visited</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">25</span>
                                <span class="stat-label">Favorites</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">8</span>
                                <span class="stat-label">Reviews</span>
                            </div>
                        </div>

                        <div class="profile-menu">
                            <div class="menu-group">
                                <h3>Account Settings</h3>
                                <a href="profile-info.html" class="menu-item" style="text-decoration: none;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    <span>Personal Information</span>
                                </a>
                                <a href="profile-favorites.html" class="menu-item" style="text-decoration: none;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                    <span>My Favorites</span>
                                </a>
                                <a href="profile-history.html" class="menu-item" style="text-decoration: none;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    <span>Travel History</span>
                                </a>
                            </div>

                            <div class="menu-group">
                                <h3>Preferences</h3>
                                <a href="profile-notifications.html" class="menu-item" style="text-decoration: none;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                    <span>Notifications</span>
                                </a>
                                <a href="profile-settings.html" class="menu-item" style="text-decoration: none;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                    <span>Global Settings</span>
                                </a>
                            </div>
                        </div>

                        <a href="index.html" class="logout-btn-real">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            <span>Logout</span>
                        </a>
                    </div>
                `;
                document.body.appendChild(profileOverlay);

                document.getElementById('closeProfileBtn').addEventListener('click', () => {
                    profileOverlay.classList.remove('active');
                });

                profileOverlay.addEventListener('click', (e) => {
                    if (e.target === profileOverlay) {
                        profileOverlay.classList.remove('active');
                    }
                });
            }
            // slight delay to allow display block before adding the active class for animation
            setTimeout(() => {
                profileOverlay.classList.add('active');
            }, 10);
        });
    }

    // Horizontal Scroll with Mouse Wheel
    const scrollContainers = document.querySelectorAll('.horizontal-scroll');
    scrollContainers.forEach(container => {
        container.addEventListener('wheel', (evt) => {
            if (evt.deltaY !== 0) {
                evt.preventDefault();
                container.scrollLeft += evt.deltaY;
            }
        }, { passive: false });
    });
});
