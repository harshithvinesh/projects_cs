export const validateTaskBody = (req, res, next) => {
  const { title, completed } = req.body;

  // 1. Check if title is missing for creation or explicitly invalid
  if (req.method === 'POST' && (!title || typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error: A valid string "title" is required to create a task.'
    });
  }

  // 2. If title is provided in a PUT/POST update, ensure it's a non-empty string
  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error: "title" cannot be an empty string.'
    });
  }

  // 3. Ensure "completed" is a boolean if provided
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error: "completed" field must be a boolean (true or false).'
    });
  }

  // If all checks pass, hand control over to the controller via next()
  next();
};
