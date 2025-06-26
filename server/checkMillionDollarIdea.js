function checkMillionDollarIdea(req, res, next) {
  const { numWeeks, weeklyRevenue } = req.body;
  const value = Number(numWeeks) * Number(weeklyRevenue);
  if (!numWeeks || !weeklyRevenue || isNaN(value) || value < 1000000) {
    return res.status(400).send();
  }
  next();
}

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
