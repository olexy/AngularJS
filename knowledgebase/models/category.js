var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        required: true
    },
    description: {
        type: String
    },
});

var Category = module.exports = mongoose.model('Category', categorySchema);


// Get All Categories
module.exports.getCategories = function(callback){
    Category.find(callback);
};

//  Get Category By ID
module.exports.getCategoryById = function(id, callback){
    Category.findById(id, callback);
};


//  Create Category 
module.exports.createCategory = function(newCategory, callback){
    newCategory.save(callback);
};

// Update Category
module.exports.updateCategory = function(id, data, callback){
    var name = data.name;
    var description = data.description;

    var query = {_id: id};
    Category.findById(id, function(err, category){
        if(!category){
            return next(new Error('Coul not load category'));
        } else {
            // Update
            category.name = name;
            category.description = description;
        
            category.save(callback);
        }
    });
};