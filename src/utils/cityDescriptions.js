export const cityDescriptions = {
    'Chennai': 'Gateway to South India',
    'Madurai': 'The Ancient City of Temples',
    'Coimbatore': 'Manchester of South India',
    'Tirunelveli': 'The Halwa City of South India',
    'Nilgiris': 'The Enchanting Blue Mountains',
    'Dindigul': 'The City of Locks and Biryani',
    'Kanyakumari': 'The Land\'s End of India',
    'Thanjavur': 'The Rice Bowl of Tamil Nadu',
    'Trichy': 'The Historic Rockfort City',
    'Tiruchirappalli': 'The Historic Rockfort City',
    'Salem': 'The Steel and Mango City',
    'Erode': 'The Turmeric City of India',
    'Chengalpattu': 'Gateway to Coastal Heritage',
    'Rameswaram': 'Island of Divine Peace',
    'Ooty': 'Queen of Hill Stations',
    'Kodaikanal': 'Princess of Hill Stations',
    'Vellore': 'The Fort City',
    'Cuddalore': 'The Coastal Town of Temples',
    'Ramanathapuram': 'The Land of Sethupathis',
    'Nagapattinam': 'The Port of Religious Harmony',
    'Tenkasi': 'The Spa of South India',
    'The Nilgiris': 'The Enchanting Blue Mountains',
    'Tuticorin': 'The Pearl City',
    'Hosur': 'The Little England of India',
    'Tiruppur': 'The Knitwear Capital',
    'Karur': 'The Textiles City',
    'Sivakasi': 'The Firecracker Capital',
    'Nagarkoil': 'The Southern Gateway',
    'Coonoor': 'The Tea Garden Paradise',
    'Yercaud': 'The Jewel of the South',
    'Yelagiri': 'The Poor Man\'s Ooty',
    'Valparai': 'The Seventh Heaven',
    'Hogenakkal': 'The Niagara of India',
    'Pondicherry': 'The French Riviera of the East',
    'Karaikudi': 'The Heritage Heart of Chettinad',
    'Chettinad': 'The Realm of Spice and Splendor',
    'Ariyalur': 'The Fossil City',
    'Perambalur': 'The Earthly Abode',
    'Tiruvallur': 'The Spiritual Corridor',
    'Thiruvallur': 'The Spiritual Corridor',
    'Tiruvannamalai': 'The Sacred Hill of Fire',
    'Thiruvannamalai': 'The Sacred Hill of Fire',
    'Krishnagiri': 'The Land of Mangoes',
    'Dharmapuri': 'The Land of Bravery',
    'Villupuram': 'Gateway to the South',
    'Namakkal': 'The Egg City of India',
    'Tirupattur': 'The Peaceful Hill Gateway',
    'Tiruvarur': 'Cultural Seat of Cholas',
    'Theni': 'The Cardamom Capital',
    'Virudhunagar': 'The Business Hub',
    'Pudukkottai': 'The Unique Princely State'
};

export const getCityDesc = (cityName) => {
    if (!cityName) return 'A beautiful place to explore';

    // Normalize: trim, handle Thiru vs Tiru
    const normalizedName = cityName.trim();
    const searchName = normalizedName.toLowerCase().startsWith('thiru')
        ? normalizedName.substring(1)
        : normalizedName;

    // Direct match
    if (cityDescriptions[normalizedName]) return cityDescriptions[normalizedName];

    // Case-insensitive search
    const entry = Object.entries(cityDescriptions).find(([key]) => {
        const keyNorm = key.toLowerCase();
        return keyNorm === normalizedName.toLowerCase() ||
            keyNorm.replace(/^thiru/, 'tiru') === normalizedName.toLowerCase().replace(/^thiru/, 'tiru');
    });

    const fallbacks = [
        `Discover the hidden gems and vibrant culture of ${normalizedName}.`,
        `${normalizedName} - A perfect blend of tradition and modern charm.`,
        `Explore the scenic beauty and historic landmarks of ${normalizedName}.`,
        `A must-visit destination in Tamil Nadu: ${normalizedName}.`,
        `Experience the unique local flavors and heritage of ${normalizedName}.`
    ];

    // Use a simple hash based on cityName to keep it consistent but varied across different cities
    const hash = normalizedName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const fallback = fallbacks[hash % fallbacks.length];

    return entry ? entry[1] : fallback;
};
