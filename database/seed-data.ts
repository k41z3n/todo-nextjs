
interface seedData {
    entries: seedEntry[]
}

interface seedEntry {
    createAt: number,
    description: string,
    status: string,
}

export const seedData: seedData = {
    entries: [
        {
            createAt: Date.now(),
            description: "lorem  pennding",
            status: 'pennding'
        },
        {
            createAt: Date.now(),
            description: "lorem 22222 ",
            status: 'pennding'
        },
        {
            createAt: Date.now(),
            description: "lorem 3333333",
            status: 'pennding'
        }
    ]
}