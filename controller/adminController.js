const User = require("../models/userModel")
const Campaign = require('../models/campaign')

exports.getUser = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
}
exports.userStatus = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).send("User not found");

  user.isActive = !user.isActive;
  await user.save();
  res.send(`User ${user.isActive ? 'activated' : 'deactivated'}`);
}
exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).send("User not found");

  user.isActive = !user.isActive;
  await user.save();
  res.send(`User ${user.isActive ? 'activated' : 'deactivated'}`);
}
exports.getCampaign = async (req, res) => {
  const campaigns = await Campaign.findAll();
  res.json(campaigns);
}
exports.campaignStatus = async (req, res) => {
  const campaign = await Campaign.findByPk(req.params.id);
  if (!campaign) return res.status(404).send("Campaign not found");

  campaign.isActive = !campaign.isActive;
  await campaign.save();
  res.send(`Campaign ${campaign.isActive ? 'activated' : 'deactivated'}`);
}
exports.deleteCampaign = async (req, res) => {
  const campaign = await Campaign.findByPk(req.params.id);
  if (!campaign) return res.status(404).send("Campaign not found");

  campaign.isActive = !campaign.isActive;
  await campaign.save();
  res.send(`Campaign ${campaign.isActive ? 'activated' : 'deactivated'}`);
}
exports.adminLogin = (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '123') {
    return res.send('Logged in');
  }
  res.status(401).send('Unauthorized');
}