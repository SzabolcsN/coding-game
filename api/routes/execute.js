const express = require('express');
const router = express.Router();
const { executeCode } = require('../helpers/codeExecuter');

router.post('/', async (req, res) => {
  try {
    const { code, language, input } = req.body;
    const result = await executeCode(code, language, input);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;