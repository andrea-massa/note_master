const mongoose = require('mongoose');
const Notes = require('../models/Note');


const notes = [
    {
        title: 'Workouts',
        content: 'Monday: Push, Tuesday: Rest, Wednesday: Legs, Thursday: Rest, Friday: Pull, Saturday: Rest, Sunday: Rest'
    },
    {
        title: 'Grocery List',
        content: 'Bananas, Apples, Spinach, Chicken, Sugar, Ice Cream'
    },
    {
        title: 'Travel Places',
        content: 'Barcelona, Spain. Madrid, Spain. Rome, Italy. Califoria, US.'
    },   
    { 
        title: 'Cute Dog Names',
        content: 'Coco, Bear, Charlie, Zeus'
    }
]

mongoose.connect('mongodb://127.0.0.1:27017/noteMaster?directConnection=true')
    .then(() => {
        console.log('Connection to DB was successful')
        Notes.deleteMany({})
            .then(() => {
                console.log('Deleted Existing Notes in DB')
                Notes.insertMany(notes)
                    .then(() => {
                        console.log('Notes DB successfully Seeded')
                    })
                    .catch((e) => {
                        console.log('Error: ' + e)
                    })
            })
            .catch((e) => {
                console.log('Error: ' + e)
            })
    })
    .catch((e) => {
        console.log('Error Connecting to DB:\n' + e)
    })

