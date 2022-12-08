const { searchSpotify } = require('../../spotify/search');

const mapReviews = async (reviews) => {
  const mapped = [];

  for (let i = 0; i < reviews.length; ++i) {
    const review = reviews[i];

    const {
      spreadsheetAlbum,
      spreadsheetArtist,
      rating,
      userName,
      favoriteSong,
    } = review;

    mapped.push({
      spreadsheetArtist: spreadsheetArtist.trim(),
      spreadsheetAlbum: spreadsheetAlbum.trim(),
      rating,
      favoriteSong,
      user: userName,
    });
  }

  return mapped;
};

module.exports = {
  mapReviews,
};
