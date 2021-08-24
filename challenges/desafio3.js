db.movies.aggregate([{
  $match: {
    "imdb.rating": {
      $gte: 7,
    },
    genres: {
      $nin: ["Crime", "Horror"],
    },
    rated: {
      $in: ["PG", "G"],
    },
    languages: {
      $all: ["English", "Spanish"],
    },
  },
},
{
  $project: {
    _id: 0,
    votosIMDB: "$imdb.votes",
    avaliado: "$rated",
    ano: "$year",
    notaIMDB: "$imdb.rating",
    titulo: "$title",
  },
},
{
  $sort: {
    titulo: 1,
    notaIMDB: -1,
    ano: -1,
  },
}]);