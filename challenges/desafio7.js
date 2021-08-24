db.movies.aggregate([{
  $match: {
    languages: "English",
  },
},
{
  $unwind: "$cast",
},
{
  $group: {
    mediaIMDB: {
      $avg: "$imdb.rating",
    },
    numeroFilmes: {
      $sum: 1,
    },
    _id: "$cast",
  },
},
{
  $project: {
    mediaIMDB: {
      $round: ["$mediaIMDB", 1],
    },
    numeroFilmes: 1,
  },
},
{
  $sort: {
    numeroFilmes: -1,
    _id: -1,
  },
},
]);
