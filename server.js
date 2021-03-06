const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//cors enables remote testing by FCC
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));

//render static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:date_string?', (req, res) => {
    let date;
    let dateString = req.params.date_string;
    if(!dateString) date = new Date();
    else {
      if(dateString.indexOf('-') !== -1) date = new Date(dateString);
      else date = new Date(parseInt(dateString));
    }
    if(!date.getDate()) {
      res.status(500).json({"error" : "Invalid Date" });
    }
    else {
      res.status(200).json({'unix': date.getTime(), 'utc': date.toUTCString()});
    }
  });

//handle page not found errors
app.get('*', function(req, res){
  res.sendFile(__dirname + '/views/oops.html', 404);
  });

  const listener = app.listen(PORT, () => {
      console.log('You are listening on port ' + PORT);
  });