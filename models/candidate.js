const mongoose = require('mongoose');

//Define candidate schema
const candidateSchema = mongoose.Schema.Model({
    name: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            votedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    voteCount: {
        type: Number,
        default: 0
    }
    // email: {
    //     type: String
    // },
    // mobile: {
    //     type: String,
    //     required: true
    // },
    // address: {
    //     type: String,
    //     required: true
    // },
    // aadharNumber: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // }

});

const Candidate = mongoose.Model('Candidate', candidateSchema);
module.exports = Candidate;