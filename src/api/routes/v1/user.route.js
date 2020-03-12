const express = require("express");
const controller = require("../../controllers/user.controller");
const { authorize } = require("../../middlewares/auth");

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param("userId", controller.load);

router
  .route("/")
  /**
   * @api {get} v1/users List Users
   * @apiDescription Get a list of users
   */
  .get(authorize(), controller.list)
  /**
   * @api {post} v1/users Create User
   * @apiDescription Create a new user
   */
  .post(authorize(), controller.create);

router
  .route("/profile")
  /**
   * @api {get} v1/users/profile User Profile
   * @apiDescription Get logged in user profile information
   */
  .get(authorize(), controller.loggedIn);

router
  .route("/:userId")
  .get(authorize(), controller.get)
  .put(authorize(), controller.replace)
  /**
   * @api {patch} v1/users/:id Update User
   * @apiDescription Update some fields of a user document
   */
  .patch(authorize(), controller.update)
  /**
   * @api {patch} v1/users/:id Delete User
   * @apiDescription Delete a user
   */
  .delete(authorize(), controller.remove);

module.exports = router;
