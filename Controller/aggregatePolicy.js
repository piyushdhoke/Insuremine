const User = require('../Models/user')
const PolicyInfo = require('../Models/policyInfo')



const aggregatePolicies = async (req, res) => {
    try {
      const result = await PolicyInfo.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user_info',
          },
        },
        {
          $group: {
            _id: '$userId',
            total_policies: { $sum: 1 },
            policies: { $push: '$$ROOT' },
          },
        },
      ]);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };


  module.exports = {aggregatePolicies}
  