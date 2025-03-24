const Song = require('../models/Song');
const TopTrending = require('../models/TopTrending');
const CougarWrapUp = require('../models/CougarWrapUp');

// Trigger to update TopTrending and CougarWrapUp
const updateTopTrending = async () => {
  console.log('Updating Top Trending & Cougar Wrap-Up...');
  const topSongs = await Song.find().sort({ streams: -1 }).limit(50);

  // Update Top Trending Collection
  await TopTrending.updateOne({ name: 'Top 50 Songs' }, { $set: { songs: topSongs } }, { upsert: true });

  // Update Cougar Wrap-Up with Top Artists/Albums/Genres
  const topArtists = await Song.aggregate([{ $group: { _id: '$artist', streams: { $sum: '$streams' } } }, { $sort: { streams: -1 } }]).limit(10);
  const topAlbums = await Song.aggregate([{ $group: { _id: '$album', streams: { $sum: '$streams' } } }, { $sort: { streams: -1 } }]).limit(10);

  await CougarWrapUp.updateOne(
    { name: 'Cougar Wrap-Up' },
    {
      $set: {
        topSongs: topSongs,
        topArtists: topArtists,
        topAlbums: topAlbums,
      },
    },
    { upsert: true }
  );

  console.log('Top Trending & Cougar Wrap-Up updated successfully!');
};

const Artist = require('../models/Artist');
const Recommendation = require('../models/Recommendation');

const promoteArtistIfEligible = async (artistId) => {
  const artistStreams = await Song.aggregate([
    { $match: { artist: artistId } },
    { $group: { _id: '$artist', totalStreams: { $sum: '$streams' } } },
  ]);

  if (artistStreams.length > 0 && artistStreams[0].totalStreams >= 50000) {
    // Promote artist to Recommended List
    await Recommendation.updateOne(
      { artist: artistId },
      { $set: { recommended: true } },
      { upsert: true }
    );
    console.log(`Artist ${artistId} promoted to Recommended List!`);
  }
};

module.exports = {
  updateTopTrending,
  promoteArtistIfEligible,
};

