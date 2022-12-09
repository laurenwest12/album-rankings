const calculateTotalReview = (reviews, albumUid, artistUid) => {
  const totalReview = reviews.reduce(
    (acc, review, index) => {
      acc.rating += review.rating;
      acc.spreadsheetAlbum = review.spreadsheetAlbum;
      acc.spreadsheetArtist = review.spreadsheetArtist;
      acc.artistUid = review.artistUid;
      acc.albumUid = review.albumUid;

      if (index === reviews.length - 1) {
        acc.rating = Math.round((acc.rating / reviews.length) * 100) / 100;
      }
      return acc;
    },
    {
      uid: `${albumUid}-${artistUid}-Total`,
      rating: 0,
      favoriteSong: '',
      userUid: 'Total',
    }
  );
  return totalReview;
};

module.exports = {
  calculateTotalReview,
};
