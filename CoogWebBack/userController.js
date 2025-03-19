const { poolPromise } = require('../config/db');
const queries = require('../queries/queries');

// Get all users
const getUsers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(queries.getUsers);
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get user list with images
const getUserListOutput = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(queries.getUserListOutput);
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getUsers,
  getUserListOutput
};
