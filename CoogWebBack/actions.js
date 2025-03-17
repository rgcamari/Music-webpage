const { stringify } = require('qs');
const pool = require('./database.js');
const queries = require('./queries.js');
const nodemailer = require('nodemailer');

function updateAdmin(adminId, updates) {
    const fields = [];
    const values = [];

    // Add fields and values to update
    if (updates.username !== undefined) {
        fields.push('username = ?');
        values.push(updates.username);
    }
    if (updates.password !== undefined) {
        fields.push('password = ?');
        values.push(updates.password);
    }
    if (updates.email !== undefined) {
        fields.push('email = ?');
        values.push(updates.email);
    }
    if (updates.image_url !== undefined) {
        fields.push('image_url = ?');
        values.push(updates.image_url);
    }

    // If no fields are provided, return early
    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    // Construct the query
    const query = `UPDATE admin SET ${fields.join(', ')} WHERE admin_id = ?`;
    values.push(adminId);  // Add admin_id to the values array

    // Execute the query
    return db.query(query, values);
}

function updateUser(userID, updates) {
    const fields = [];
    const values = [];

    // Add fields and values to update
    if (updates.username !== undefined) {
        fields.push('username = ?');
        values.push(updates.username);
    }
    if (updates.password !== undefined) {
        fields.push('password = ?');
        values.push(updates.password);
    }
    if (updates.email !== undefined) {
        fields.push('email = ?');
        values.push(updates.email);
    }
    if (updates.image_url !== undefined) {
        fields.push('image_url = ?');
        values.push(updates.image_url);
    }

    // If no fields are provided, return early
    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    // Construct the query
    const query = `UPDATE user SET ${fields.join(', ')} WHERE user_id = ?`;
    values.push(userID);  // Add admin_id to the values array

    // Execute the query
    return db.query(query, values);
}

function updateArtist(artistID, updates) {
    const fields = [];
    const values = [];

    // Add fields and values to update
    if (updates.username !== undefined) {
        fields.push('username = ?');
        values.push(updates.username);
    }
    if (updates.password !== undefined) {
        fields.push('password = ?');
        values.push(updates.password);
    }
    if (updates.email !== undefined) {
        fields.push('email = ?');
        values.push(updates.email);
    }
    if (updates.image_url !== undefined) {
        fields.push('image_url = ?');
        values.push(updates.image_url);
    }

    // If no fields are provided, return early
    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    // Construct the query
    const query = `UPDATE artist SET ${fields.join(', ')} WHERE artist_ID = ?`;
    values.push(artistID);  // Add admin_id to the values array

    // Execute the query
    return db.query(query, values);
}