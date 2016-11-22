var express = require('express');
var router = express.Router();

var Category = require('../models/category');

router.get('/', function(req, res, next) {
  Category.getCategories(function(err, categories){
      if(err){
          console.log(err);
      }
      res.json(categories);
  });
});

router.get('/:id', function(req, res, next) {
  Category.getCategoryById(req.params.id, function(err, category){
      if(err){
          console.log(err);
      }
      res.json(category);
  });
});

//POST REQUEST
router.post('/', function(req, res, next){
    // Get Form Values
    var name = req.body.name;
    var description = req.body.description;
    
    // Category Object
    var newCategory = new Category({
        name: name,
        description: description
    });

    // Create Category
    Category.createCategory(newCategory, function(err, category){
        if(err){
            console.log(err);
        }

        res.location('/categories');
        res.redirect('/categories');
    });
});

// Update Category
router.put('/', function(req, res, next){

    // Get Form Values
    var id = req.body.id;
    var data = {
        name: req.body.name,
        description: req.body.description
    };

    // Update Category
    Category.updateCategory(id, data, function(err, catageory){
        if(err){
            console.log(err);
        }

        res.location('/categories');
        res.redirect('/categories');
    });
});


// Remove Category
router.delete('/:id', function(req, res, next){

    var id = req.params.id;

    Category.removeCategory(id, function(err, category){
        if(err){
            console.log(err);
        }

        res.location('/categories');
        res.redirect('/categories');
    });
});

module.exports = router;
