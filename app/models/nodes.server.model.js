var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var NodeSchema = new Schema({
    _id: Number,                //id number for db to differentiate between nodes and use in parentNode and childrenNode below
    axle: Boolean,            //Axle is the term for being a category, not just a node, but a branch to new nodes. These can have nodes created around them, but other nodes cannot
    content: {
        text: String,           //text string of what to be displayed on the node
        imgUrl: String
    },
    parentNode: Array,          //_id of the parent node
    childrenNode: Array,        //List of the _id's of the children nodes if axle is TRUE
    nodeXY: {                       //stores the current xy-coord of the node
        x: Number,
        y: Number
    },                  
    parentXY: {                 //stores the current xy-coord of the node's parent
        x: Number,
        y: Number
    }
});

mongoose.model('Node', NodeSchema);