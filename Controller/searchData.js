const User = require('../Models/user')
const PolicyInfo = require('../Models/policyInfo')

const searchData =async (req, res) => {
    const username = req.query.username;
    try {
      const user = await User.findOne({ firstname: username }).populate('policies');
      if (user) {
        res.status(200).json(user.policies);
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  

  module.exports ={searchData}
  