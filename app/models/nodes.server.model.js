var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var NodeSchema = new Schema({
    _id: Number,
    axle: Boolean,            //Axle is the term for being a category, not just a node, but a branch to new nodes. These can have nodes created around them, but other nodes cannot
    content: {
        text: String,
        imgUrl: String
    },
    parentNode: Array,
    childrenNode: Array,
});

mongoose.model('Node', NodeSchema);