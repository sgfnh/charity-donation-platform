const express = require("express");
const Organization = require("../models/organization")
const Campaign = require('../models/campaign')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config()

exports.organizationRegister = async (req, res) => {
  const { name, email, password, phone, address, mission } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const org = await Organization.create({
    name, email, password: hashedPassword, phone, address, mission
  });

  res.json({ message: 'Organization registered successfully' });
}
exports.organizationLogin = async (req, res) => {
  const { email, password } = req.body;
  const org = await Organization.findOne({ where: { email } });

  if (!org) return res.status(401).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, org.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ message: 'Login successful', email: org.email });
}

exports.createCampaign = async (req, res) => {
  const { title, description, orgEmail, imageUrl, tags } = req.body;
  const org = await Organization.findOne({ where: { email: orgEmail } });
  if (!org) return res.status(404).json({ error: 'Organization not found' });

  const campaign = await Campaign.create({
    title,
    description,
    imageUrl,
    tags,

    OrganizationId: org.id
  });

  res.json({ message: 'Campaign launched successfully', campaign });
}
exports.getCampaign = async (req, res) => {
  const org = await Organization.findOne({ where: { email: req.params.email } });
  if (!org) return res.status(404).json({ error: 'Organization not found' });

  const campaigns = await Campaign.findAll({ where: { OrganizationId: org.id } });
  res.json(campaigns);
}
exports.deleteCampaign = async (req, res) => {
  const campaign = await Campaign.findByPk(req.params.id);
  if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

  await campaign.destroy();
  res.json({ message: 'Campaign deleted' });
}
exports.updateCampaign = async (req, res) => {
  const id = req.params.id;
  const { title, description, imageUrl, tags } = req.body;

  const campaign = await Campaign.findByPk(id);
  if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

  await campaign.update({ title, description, imageUrl, tags });

  res.json({ message: 'Campaign updated', campaign });
}
exports.exploreCampaign = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({ include: 'Organization' });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
}