const express = require('express');
const authenticate = require('../middlewares/authenticate');
const controller = require('../controllers/NoteController');

//Define the router
const router = express.Router({mergeParams: true});
// Router will use authenticate middleware for all operations
router.use(authenticate);


// Get route for homepage which displays all the notes
router.get('/', controller.get);

// Post route for a note which creates a new note
router.post('/', controller.post);

// Delete Route for a note which deletes a given note
router.delete('/:noteId', controller.delete)

// Put Route for a note which Modifies a given note
router.put('/:noteId', controller.put)



//Export the router
module.exports = router
