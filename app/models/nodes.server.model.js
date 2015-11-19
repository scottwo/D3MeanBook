var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var NodeSchema = new Schema({
    _id: Number,
    axle: Boolean,
    content: {
        text: String,
        imgUrl: String
    },
    parentNode: Array,
    childrenNode: Array,
});

mongoose.model('Node', NodeSchema);