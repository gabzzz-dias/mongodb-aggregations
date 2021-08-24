db.movies.aggregate([{
  $match: {
    $and: [{
      "imdb.rating": {
        $gte: 7,
      },
    },
    {
      genres: {
        $nin: ["Crime", "Horror"],
      },
    },
    {
      $or: [{
        rated: "PG",
      },
      {
        rated: "G",
      }],
    },
    {
      $and: [{
        languages: "English",
      },
      {
        languages: "Spanish",
      }],
    }],
  },
},
{
  $project: {
    _id: 0,
    avaliado: "$rated",
    titulo: "$title",
    votosIMDB: "$imdb.votes",
    ano: "$year",
    notaIMDB: "$imdb.rating",
  },
}]);
