'use strict';

import mongoose from 'mongoose';

var PhotoSchema = new mongoose.Schema({
  type: String,
  name: String,
  
});

export default mongoose.model('Photo', PhotoSchema);
