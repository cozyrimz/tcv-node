const { Hub } = require('../models/hub');
const { logApiError, logServerError, findAndUpdateKeyDifferences, renameKeys } = require('../util');
const { sampleData } = require('../../frontend/testData/testCityData');

const fillSampleData = async () => {
  await Hub.deleteMany();

  for (const entry of sampleData.hubs) {
    let { city, name, address, type, zipcode, loc, phone, url, doses } = entry;
    entry.loc = { long: loc[1], lat: loc[0] };

    await renameKeys(entry, { type: 'hubType' });
    delete entry['id'];
    await Hub.create(entry);
  }
};
// setTimeout(() => fillSampleData(), 3000);

//******************ROUTE METHODS **********************/
const getHubs = async (req, res) => {
  let hubs = await Hub.find({})
    .lean()
    .catch(err => {
      return logApiError(res, 500, 'issue querying hubs collection on backend', err.message, err.stack);
    });

  return res.json({ hubs });
};
const createHub = async (req, res) => {
  let newData = req.body;

  newData['url'] = { key: '', url: newData.url };
  let newHub = await Hub.create({ ...req.body }).catch(err => {
    return logApiError(res, 500, 'issue creating new hub in hubs collection', err.message, err.stack);
  });

  return res.status(200).json(newHub);
};
const updateHub = async (req, res) => {
  let body = req.body;

  let { _id, url, ...newData } = body;

  let hub = await Hub.findOne({ _id: _id }).catch(err => {
    return logApiError(res, 500, 'issue finding hub in hubs collection on update', err.message, err.stack);
  });
  if (!hub) return logApiError(res, 204, 'No Content Found with that id');

  let updatedFields = findAndUpdateKeyDifferences(hub, newData);
  hub.url[0].url = Array.isArray(url) ? url[0].url : url;
  await hub.save();

  return res.status(200).json({ message: 'Success' });
};
const deleteHub = async (req, res) => {
  let { id } = req.params;

  if (!id) return logApiError(res, 401, 'Please provide a valid id');
  let deleted = await Hub.deleteOne({ _id: id }).catch(err => {
    return logApiError(res, 500, 'issue querying hubs collection on backend while deleting', err.message, err.stack);
  });

  return res.json(deleted);
};

module.exports = { getHubs, createHub, updateHub, deleteHub };
