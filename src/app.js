const express = require('express');

const routes = require('./routes');

const { PORT } = process.env
const app = express();

app.use('/', routes(app));

const port = PORT || 3000

app.listen(port, () => {
	console.log(`USSD successfully started at 127.0.0.1:${port}`);
});
