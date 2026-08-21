const { sendAPIErrorResponse } = require('../utils/apiError');

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array()
      });
    }

      const user = await authService.register(email, password, name);
      res.status(201).json({ user, token });
    } catch (error) {
      sendAPIErrorResponse(res, error.message, 500);
    }
  }
]);