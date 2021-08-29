db.trips.aggregate([{
  $group: {
    _id: "$bikeid",
    mediaDeUso: {
      $avg: {
        $divide: [{
          $subtract: [
            "$stopTime",
            "$startTime",
          ],
        },
        60000,
        ],
      },
    },
  },
},
{
  $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: {
      $ceil: "$mediaDeUso",
    },
  },
},
{
  $sort: {
    duracaoMedia: -1,
  },
},
{
  $limit: 5,
},
]);
