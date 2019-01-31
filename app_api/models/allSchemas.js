var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
  address: {
    type: String,
  }
},{
  usePushEach: true
});

var orderSchema = new mongoose.Schema({
  orderDate:{
    type: Date,
    "default": Date.now,
    required: true
  },
  orderMedicines: {
    type: [medicineSchema],
    requried: true
  },
  orderAmount: {
    type: Number,
    required: true
  },
  orderUserID: {
    type: Number,
    required: true
  },
  orderShopID: {
    type: Number,
    required: true
  },
  orderDeliveryAddress: addressSchema
},{
  usePushEach: true
});

var payslipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  monthDeliveries: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  }
},{
  usePushEach: true
});

var medicineSchema = new mongoose.Schema({
  medicineName:{
    type: String,
    required: true
  },
  manufacturingCompany:{
    type: String,
    required: true
  },
  pricePerGram:{
    type: Number,
    required: true
  }
},{
  usePushEach: true
});

var userSchema = new mongoose.Schema({
  userName:{
    type: String,
    requried: true
  },
  userEmail:{
    type: String,
    required: true
  },
  userPassword:{
    type: String,
    required: true
  },
  userOrders: {
    type: [orderSchema],
    "default": []
  },
  userAddress: {
    type: [addressSchema],
    required: true
  }
},{
  usePushEach: true
});

var reviewSchema = new mongoose.Schema({
  reviewerName: {
    type: String,
    required: true
  },
  reviewTimeStamp:{
    type: Date,
    "default": Date.now,
    required: true
  },
  reviewRating:{
    type: Number,
    required: true
  },
  reviewComment: String
},{
  usePushEach: true
});

var openingSchema = new mongoose.Schema({
  days: {
    type: String,
    required: true
  },
  openingTime: {
    type: String,
    required: true,
    default: ""
  },
  closingTime:  {
    type: String,
    required: true,
    default: ""
  },
  closed:{
    type: Boolean,
    "default": true,
    requried: true
  }
},{
  usePushEach: true
});

var shopSchema = new mongoose.Schema({
  medicalShopName: {
    type: String,
    required: true
  },
  shopEmailID:{
    type: String,
    required: true
  },
  shopPassword:{
    type: String,
    requried: true
  },
  address: {
    type: addressSchema,
    required: true
  },
  ratings: {
    type: Number,
    required: true,
    "default": 0,
    min: 0,
    max: 5
  },
  facilities: [String],
  coords: {
    type: [Number],
    required: true,
    index: '2dsphere'
  },
  openingTime: [openingSchema],
  reviews: [reviewSchema],
  mapLink: {
    type: String
  },
  shopOrders: [orderSchema],
  shopLicense: {
    type: String,
    required: true
  },
  shopOwners:{
    type: [String],
    required: true
  },
  shopMedicines: [medicineSchema]
},{
  usePushEach: true
});

var deliveryBoySchema = new mongoose.Schema({
  boyName: {
    type: String,
    required: true
  },
  boyPassword: {
    type: String,
    required: true
  },
  boyEmailId: {
    type: String,
    required: true
  },
  boyGrade: {
    type: Number,
    default: 1
  },
  boyOrders: {
    type: [orderSchema],
    "default": []
  },
  boyPayslips: {
    type: [payslipSchema],
    "default": []
  }
},{
  usePushEach: true
});

mongoose.model('Medicine', medicineSchema);
mongoose.model('Addres', addressSchema);
mongoose.model('Order', orderSchema);
mongoose.model('Payslip', payslipSchema);
mongoose.model('User', userSchema);
mongoose.model('Shop', shopSchema);
mongoose.model('Boy', deliveryBoySchema);
