export type Place = {
    id: number
    name: string
    category: string
    rating: number
    address: string
    price: string
    description: string
    image: string
    atmosphere: string
    format: string
}
export const places: Place[] = [
    {
        id: 1,
        name: 'Moss Coffee',
        category: 'Кофейня',
        rating: 4.8,
        address: 'Центр города',
        price: '₽₽',
        description: 'Уютное место для кофе, работы и спокойной встречи.',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80',
        atmosphere: 'Тихая',
        format: 'Один',
    },

    {
        id: 2,
        name: 'The Garden',
        category: 'Ресторан',
        rating: 4.7,
        address: 'Набережная',
        price: '₽₽₽',
        description: 'Ресторан с приятной атмосферой для встречи с друзьями.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
        atmosphere: 'Спокойная',
        format: 'Друзья',
    },

    {
        id: 3,
        name: 'Urban Space',
        category: 'Бар',
        rating: 4.9,
        address: 'Лофт-квартал',
        price: '₽₽',
        description: 'Современное место для вечернего отдыха и новых знакомств.',
        image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80',
        atmosphere: 'Активная',
        format: 'Друзья',
    },

    {
        id: 4,
        name: 'Green Park',
        category: 'Парк',
        rating: 4.6,
        address: 'Северный район',
        price: '₽',
        description: 'Большое пространство для прогулок и спокойного отдыха.',
        image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80',
        atmosphere: 'Тихая',
        format: 'Один',
    },

    {
        id: 5,
        name: 'Cinema Hall',
        category: 'Кино',
        rating: 4.5,
        address: 'Торговый центр',
        price: '₽₽',
        description: 'Кинотеатр для вечернего похода вдвоём или с друзьями.',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
        atmosphere: 'Спокойная',
        format: 'Свидание',
    },

    {
        id: 6,
        name: 'Sky Restaurant',
        category: 'Ресторан',
        rating: 4.9,
        address: 'Центральная площадь',
        price: '₽₽₽',
        description: 'Ресторан с видом на город и современной кухней.',
        image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80',
        atmosphere: 'Активная',
        format: 'Свидание',
    },
]