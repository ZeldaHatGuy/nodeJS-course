// convert ID param to integer since response params come back as strings. 
function convertID(id) {
    return id * 1
}


module.exports = convertID;
