import { mongooseConnect } from "@/lib/mongoose";
import { Update } from "@/models/Update";

export default async function handler(req, res) {
  await mongooseConnect();
  const { sort, phrase, ...filters} = req.query;
  let [sortField, sortOrder] = (sort || '_id-desc').split('-');
  
  const updatesQuery = {};
  if (phrase) {
    updatesQuery['$or'] = [
      {title:{$regex:phrase,$options:'i'}},
      {message:{$regex:phrase,$options:'i'}},
    ];
  }
 
  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach(filterName => {
      updatesQuery['properties. '+filterName] = filters[filterName];
    });
  }
  res.json(await Update.find(
    updatesQuery,
    null,
    {sort:{[sortField]:sortOrder==='asc' ? 1 : -1}}));
}