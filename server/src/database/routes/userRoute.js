import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../../utils';

const router = express.Router();

// Update User
router.put('/:id', isAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.address = req.body.address || user.address;
    const updatedUser = await user.save();
    return res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } catch (error) {
    return res.status(404).send({ message: 'User Not Found' });
  }
});

// Sign-In user
router.post('/signin', async (req, res) => {
  try {
    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    return res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } catch (error) {
    return res.status(401).send({ message: 'Invalid Email or Password.' });
  }
});

// Register user
router.post('/register', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = await user.save();
    return res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } catch (error) {
    return res.status(401).send({ message: 'Invalid User Data.' });
  }
});

export default router;
