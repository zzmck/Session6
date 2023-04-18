const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const middleware = require("../middleware");

router.get('/', middleware.authorisation.access, controllers.sauce.getAll);
router.get('/:id', middleware.authorisation.access, controllers.sauce.getId);
router.post('/', middleware.authorisation.access,  middleware.images.verification, controllers.sauce.post);
router.post('/:id/like', middleware.authorisation.access, controllers.sauce.postLikeDislike);
router.put('/:id', middleware.authorisation.access,  middleware.images.verification, controllers.sauce.putId);
router.delete('/:id', middleware.authorisation.access, controllers.sauce.deleteId);

module.exports=router;