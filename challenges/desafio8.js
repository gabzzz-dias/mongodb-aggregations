db.air_alliances.aggregate([{
  $unwind: "$airlines",
},
{
  $lookup: {
    from: "air_routes",
    let: {
      airlineFromAirRoutes: "$airlines",
    },
    pipeline: [
      {
        $match: {
          $or: [
            {
              airplane: "747",
            },
            {
              airplane: "380",
            },
          ],

        },
      },
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  "$airline.name",
                  "$$airlineFromAirRoutes",
                ],
              },
            ],
          },
        },
      },
    ],
    as: "airplaneAliances",
  },
},
{
  $match: {
    airplaneAliances: {
      $not: {
        $size: 0,
      },
    },
  },
},
{
  $group: {
    _id: "$name",
    totalRotas: {
      $sum: {
        $size: "$airplaneAliances",
      },
    },
  },
},
{
  $sort: {
    totalRotas: -1,
  },
},
{
  $limit: 1,
},
]);
