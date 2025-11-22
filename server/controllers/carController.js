import Car from '../models/Car.js';

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
export const getCars = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, transmission, available, seats } = req.query;
    
    let query = {};

    // Apply filters
    if (category) query.category = category;
    if (transmission) query.transmission = transmission;
    if (available !== undefined) query.available = available === 'true';
    if (seats) query.seats = { $gte: parseInt(seats) };
    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = parseInt(minPrice);
      if (maxPrice) query.pricePerDay.$lte = parseInt(maxPrice);
    }

    const cars = await Car.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single car
// @route   GET /api/cars/:id
// @access  Public
export const getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new car
// @route   POST /api/cars
// @access  Private/Admin
export const createCar = async (req, res) => {
  try {
    const carData = req.body;

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      carData.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    const car = await Car.create(carData);

    res.status(201).json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update car
// @route   PUT /api/cars/:id
// @access  Private/Admin
export const updateCar = async (req, res) => {
  try {
    let car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      req.body.images = [...(car.images || []), ...newImages];
    }

    car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    await car.deleteOne();

    res.json({
      success: true,
      message: 'Car removed'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
