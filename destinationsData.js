const destinationsData = [
    // Chennai
    {
        id: 'ch1',
        name: 'Marina Beach',
        city: 'Chennai',
        category: 'beaches',
        description: 'The second longest urban beach in the world.',
        about: 'Marina Beach is a natural urban beach in Chennai, Tamil Nadu, India, along the Bay of Bengal. The beach runs from near Fort St. George in the north to Foreshore Estate in the south, a distance of 6.0 km (3.7 mi), making it the second longest urban beach in the world.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74030?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1582510003544-4d00b7f74030?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.8',
        location: 'Kamarajar Salai, Chennai'
    },
    {
        id: 'ch2',
        name: 'Kapaleeshwarar Temple',
        city: 'Chennai',
        category: 'temples',
        description: 'Ancient Dravidian architecture dedicated to Lord Shiva.',
        about: 'Kapaleeshwarar Temple is a Hindu temple dedicated to lord Shiva located in Mylapore, Chennai in the Indian state of Tamil Nadu. The form of Shiva\'s consort Parvati worshipped at this temple is called Karpagambal. The temple was built around the 7th century CE and is a classic example of Dravidian architecture.',
        image: 'https://images.unsplash.com/photo-1621259182978-f09e5e2ca075?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1621259182978-f09e5e2ca075?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512100356132-d4263b6589a2?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.9',
        location: 'Mylapore, Chennai'
    },
    {
        id: 'ch3',
        name: 'Govt Museum',
        city: 'Chennai',
        category: 'museums',
        description: 'One of the oldest museums in India with rich heritage.',
        about: 'The Government Museum/Madras Museum is a museum of human history and culture located in Egmore, Chennai. Established in 1851, it is the second oldest museum in India.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.7',
        location: 'Egmore, Chennai'
    },
    {
        id: 'ch4',
        name: 'Fort St. George',
        city: 'Chennai',
        category: 'forts',
        description: 'The first English fortress in India.',
        about: 'Fort St. George is the first English (later British) fortress in India, founded in 1644 at the coastal city of Madras, the modern-day Chennai.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74030?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1582510003544-4d00b7f74030?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.5',
        location: 'Rajaji Salai, Chennai'
    },
    // Ooty
    {
        id: 'ot1',
        name: 'Ooty Lake',
        city: 'Ooty',
        category: 'lakes',
        description: 'Scenic man-made lake with boating facilities.',
        about: 'Ooty Lake is located in Ooty in the Nilgiris district, Tamil Nadu, India. It covers an area of 65 acres. The boat house offers boating facilities to tourists.',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.6',
        location: 'Ooty, Nilgiris'
    },
    {
        id: 'ot2',
        name: 'Botanical Garden',
        city: 'Ooty',
        category: 'forests',
        description: 'Exotic collection of flora and rare trees.',
        about: 'The Government Botanical Garden in Ooty, Tamil Nadu state, India, was laid out in 1848. It covers an area of around 55 hectares.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.8',
        location: 'Vannarapettai, Ooty'
    },
    {
        id: 'ot3',
        name: 'Doddabetta Peak',
        city: 'Ooty',
        category: 'mountains',
        description: 'Highest peak in the Nilgiri Mountains.',
        about: 'Doddabetta is the highest mountain in the Nilgiri Mountains at 2,637 metres (8,652 feet).',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.9',
        location: 'Nilgiris, Tamil Nadu'
    },
    {
        id: 'ot4',
        name: 'Tea Museum',
        city: 'Ooty',
        category: 'museums',
        description: 'Learn about the history of tea in India.',
        about: 'The Tea Museum in Ooty is situated adjacent to the Doddabetta Tea Factory. It showcases the history of tea and the evolution of tea production.',
        image: 'https://images.unsplash.com/photo-1544735049-31fb5a97e441?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1544735049-31fb5a97e441?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.4',
        location: 'Doddabetta, Ooty'
    },
    // Coimbatore
    {
        id: 'cb1',
        name: 'Marudhamalai Temple',
        city: 'Coimbatore',
        category: 'temples',
        description: 'Hilltop temple dedicated to Lord Murugan.',
        about: 'Marudhamalai is a popular 12th century hill temple situated in Coimbatore. It is dedicated to Lord Murugan.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.9',
        location: 'Coimbatore, Tamil Nadu'
    },
    {
        id: 'cb2',
        name: 'Adiyogi Siva',
        city: 'Coimbatore',
        category: 'statues',
        description: 'World\'s largest bust sculpture of Lord Shiva.',
        about: 'The Adiyogi statue is a 34-metre-tall steel statue of Shiva located in Coimbatore. It is the Largest Bust Sculpture in the world.',
        image: 'https://images.unsplash.com/photo-1598108480376-7be2993510f2?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1598108480376-7be2993510f2?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '5.0',
        location: 'Isha Yoga Center, Coimbatore'
    },
    {
        id: 'cb3',
        name: 'Siruvani Falls',
        city: 'Coimbatore',
        category: 'waterfalls',
        description: 'Beautiful waterfall with sweet water.',
        about: 'Siruvani Waterfalls and Dam are located 35 km west of Coimbatore. The water here is known for its sweetness.',
        image: 'https://images.unsplash.com/photo-1433086390636-524ee3c004d6?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1433086390636-524ee3c004d6?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.7',
        location: 'Siruvani, Coimbatore'
    },
    {
        id: 'cb4',
        name: 'Gedee Car Museum',
        city: 'Coimbatore',
        category: 'museums',
        description: 'Unique collection of vintage and rare cars.',
        about: 'Gedee Car Museum is one of the few places in India where you can find cars made in Britain, Germany, France, United States.',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.8',
        location: 'Avinashi Road, Coimbatore'
    },
    // Erode
    {
        id: 'er1',
        name: 'Bhavani Kooduthurai',
        city: 'Erode',
        category: 'rivers',
        description: 'Confluence of three rivers, a holy destination.',
        about: 'Bhavani Kooduthurai is a holy place where three rivers meet. It is known as the Triveni Sangam of South India.',
        image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.7',
        location: 'Bhavani, Erode'
    },
    {
        id: 'er2',
        name: 'Kodiveri Dam',
        city: 'Erode',
        category: 'waterfalls',
        description: 'Beautiful waterfall and dam on the Bhavani River.',
        about: 'Kodiveri Dam is located near Gobichettipalayam in Tamil Nadu. It is a popular tourist spot with a beautiful waterfall.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.8',
        location: 'Gobichettipalayam, Erode'
    },
    {
        id: 'er3',
        name: 'Chennimalai Temple',
        city: 'Erode',
        category: 'temples',
        description: 'Famous hilltop temple dedicated to Lord Murugan.',
        about: 'Chennimalai is a famous hilltop temple dedicated to Lord Murugan. It is situated in the Erode district.',
        image: 'https://images.unsplash.com/photo-1512100356132-d4263b6589a2?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1512100356132-d4263b6589a2?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.9',
        location: 'Chennimalai, Erode'
    },
    {
        id: 'er4',
        name: 'Sankagiri Fort',
        city: 'Erode',
        category: 'forts',
        description: 'Historic fort on a massive hill.',
        about: 'Sankagiri Fort is a historical fort maintained by the Archaeological Survey of India. It is located on a massive hill.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.6',
        location: 'Sankagiri, Erode'
    },
    // Madurai
    {
        id: 'md1',
        name: 'Meenakshi Amman Temple',
        city: 'Madurai',
        category: 'temples',
        description: 'Stunning Dravidian temple complex with colorful towers.',
        about: 'Meenakshi Temple is a historic Hindu temple located in the temple city of Madurai. It is dedicated to Meenakshi and Sundareshwar.',
        image: 'https://images.unsplash.com/photo-1621259182978-f09e5e2ca075?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1621259182978-f09e5e2ca075?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '5.0',
        location: 'Madurai, Tamil Nadu'
    },
    {
        id: 'md2',
        name: 'Thirumalai Nayakkar Mahal',
        city: 'Madurai',
        category: 'palaces',
        description: '17th-century palace complex with grand pillars.',
        about: 'Thirumalai Nayakkar Mahal is a 17th-century palace erected in 1636 AD by King Thirumalai Nayak.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.9',
        location: 'Madurai, Tamil Nadu'
    },
    {
        id: 'md3',
        name: 'Gandhi Museum',
        city: 'Madurai',
        category: 'museums',
        description: 'Memorial museum dedicated to Mahatma Gandhi.',
        about: 'The Gandhi Memorial Museum in Madurai is one of the five Gandhi Museums in the country. It commemorates the life and work of the Father of the Nation.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74030?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1582510003544-4d00b7f74030?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.7',
        location: 'Tamukkam, Madurai'
    },
    {
        id: 'md4',
        name: 'Alagar Koyil',
        city: 'Madurai',
        category: 'temples',
        description: 'Vishnu temple situated on a scenic hill.',
        about: 'Alagar Koyil is a temple dedicated to Lord Vishnu and is located 21 km from Madurai. It is nestled at the foothills of Alagar Hills.',
        image: 'https://images.unsplash.com/photo-1512100356132-d4263b6589a2?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1512100356132-d4263b6589a2?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.8',
        location: 'Alagar Hills, Madurai'
    },
    // Kanyakumari
    {
        id: 'kk1',
        name: 'Vivekananda Rock',
        city: 'Kanyakumari',
        category: 'islands',
        description: 'Iconic monument on a sea rock.',
        about: 'Vivekananda Rock Memorial is a popular tourist monument in Vavathurai, Kanyakumari. The memorial stands on one of two rocks located about 500 meters off mainland of Vavathurai.',
        image: 'https://images.unsplash.com/photo-1598108480376-7be2993510f2?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1598108480376-7be2993510f2?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '5.0',
        location: 'Kanyakumari, Tamil Nadu'
    },
    {
        id: 'kk2',
        name: 'Beach View',
        city: 'Kanyakumari',
        category: 'beaches',
        description: 'Beautiful seaside spot with sunrise views.',
        about: 'Kanyakumari Beach is at the confluence of the Arabian Sea, the Bay of Bengal, and the Indian Ocean. It\'s famous for its sunrise and sunset views.',
        image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '5.0',
        location: 'Kanyakumari Beach'
    },
    {
        id: 'kk3',
        name: 'Hidden Falls',
        city: 'Kanyakumari',
        category: 'waterfalls',
        description: 'A serene forest waterfall escape.',
        about: 'Hidden Falls is a pristine waterfall located deep within the Western Ghats near Kanyakumari.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '4.9',
        location: 'Western Ghats, Kanyakumari'
    },
    {
        id: 'kk4',
        name: 'Sunset Temple',
        city: 'Kanyakumari',
        category: 'temples',
        description: 'Historic temple with breathtaking dusk views.',
        about: 'The Sunset Temple in Kanyakumari is iconic for its dusk oceanic views.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
        ],
        rating: '5.0',
        location: 'Kanyakumari, Tamil Nadu'
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = destinationsData;
} else {
    window.destinationsData = destinationsData;
}
