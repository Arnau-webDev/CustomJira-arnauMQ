
interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string,
    createdAt: number,
    status: string
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pending: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe praesentium quo corrupti adipisci sit eum laborum, aperiam architecto sequi deserunt veniam facilis cum quam velit dolorem nobis ullam laboriosam. Consequatur?',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'In Progress: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe praesentium quo corrupti adipisci sit eum laborum, aperiam architecto sequi deserunt veniam facilis cum quam velit dolorem nobis ullam laboriosam. Consequatur?',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Completed: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe praesentium quo corrupti adipisci sit eum laborum, aperiam architecto sequi deserunt veniam facilis cum quam velit dolorem nobis ullam laboriosam. Consequatur?',
            status: 'finished',
            createdAt: Date.now() - 100000
        }
    ],
    
}