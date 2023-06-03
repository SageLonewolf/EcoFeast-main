const express = require("express");
const webRouter = express.Router();
const bodyParser = require("body-parser");

webRouter.get("/api/data/dn", async (req, res) => {
    try {
      const path = require('path');
      const rootPath = path.resolve(__dirname, 'C:\\Users\\sanja\\.vscode\\.vscode\\EcoFeast-main');
      const filePath = path.join(rootPath, 'data.html');
      res.sendFile(filePath);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
 module.exports = webRouter;