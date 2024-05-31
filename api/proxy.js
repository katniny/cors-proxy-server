const fetch = require("node-fetch");

module.exports = async (req, res) => {
   const { url } = req.query;

   if (!url) {
      return res.status(400).json({ error: "Missing URL parameter" });
   }

   try {
      const response = await fetch(url, {
         method: req.method,
         headers: {
            ...req.headers,
            "x-requested-with": "XMLHttpRequest",
         },
         body: req.method !== "GET" ? req.body : undefined,
      });

      const data = await response.text();
      res.status(response.status).send(data);
   } catch (error) {
      res.status(500).json({ error: error.toString() });
   }
};