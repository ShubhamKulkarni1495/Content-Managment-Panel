const mongoose = require('mongoose');

const PosterSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    photo: { 
        type: String, 
        required: true 
    },
}, { timestamps: true });


const PosterModel = mongoose.model('filesReceived', PosterSchema);

module.exports = PosterModel;