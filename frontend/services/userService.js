// userService.js

const User = require('../models/User'); // Mongoose model

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error('Error fetching user: ' + error.message);
  }
};

const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};

const updateUser = async (id, updateData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    return updatedUser;
  } catch (error) {
    throw new Error('Error updating user: ' + error.message);
  }
};

const deleteUser = async (id) => {
  try {
    await User.findByIdAndDelete(id);
    return { message: 'User deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting user: ' + error.message);
  }
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
