const mongoose = require('mongoose');

var ticketSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
	description: {
		type: String,
		required: true
	},
	responsible: {
        type: String,
        required: false
    },
    priority: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    createdBy: {
		type: String,
      required:true
    },
    isValidated: {
        type: Boolean,
        required: true,
    },
    comments: {
        type: Array,
        default:[]
    }
},{ timestamps: { createdAt: 'created_at' }})

ticketSchema.methods = {
	getId: function () {
        return this.id;
    }
}

module.exports = mongoose.model('Ticket', ticketSchema);
