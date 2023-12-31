db.trips.aggregate([{
  $project: {
    diaDaSemana: {
      $dayOfWeek: {
        date: "$startTime",
      },
    },
    usertype: 1,
  },
},
{
  $group: {
    _id: "$diaDaSemana",
    total: {
      $sum: 1,
    },
  },
},
{
  $project: {
    _id: 0,
    diaDaSemana: "$_id",
    total: "$total",
  },
},
{
  $sort: {
    total: -1,
  },
},
{
  $limit: 1,
},
]);
