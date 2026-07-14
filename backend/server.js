require("dotenv").config();
const env = require("./src/config/env");

const app = require("./app");

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);  
});