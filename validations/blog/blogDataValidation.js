const { createBlog } = require("./blogValschema");

const blogPostValidation = async (req, res) => {
  let isValid = await createBlog.validate(req.body, {
    abortEarly: false,
  });
  if (isValid.error) {
      res.status(403).json({
          success: false,
          message: isValid.error.details[0].message
    });
  } else {
      next()
  }
};

module.exports = {blogPostValidation}
