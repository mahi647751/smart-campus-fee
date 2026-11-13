const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Replace with your MongoDB Atlas connection string below:
mongoose.connect('mongodb://admin:admin1234@ac-jaet6u6-shard-00-00.nlsatr6.mongodb.net:27017,ac-jaet6u6-shard-00-01.nlsatr6.mongodb.net:27017,ac-jaet6u6-shard-00-02.nlsatr6.mongodb.net:27017/campusfee?ssl=true&replicaSet=atlas-gvf2ow-shard-0&authSource=admin');
const FeeSchema = new mongoose.Schema({
  name: String,
  feeType: String,
  amount: Number,
  status: { type: String, default: 'Paid' }
});
const Fee = mongoose.model('Fee', FeeSchema);

app.get('/fees', async (req, res) => {
  res.json(await Fee.find());
});

app.post('/fees', async (req, res) => {
  const fee = new Fee(req.body);
  await fee.save();
  res.json(fee);
});

app.delete('/fees/:id', async (req, res) => {
  await Fee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));