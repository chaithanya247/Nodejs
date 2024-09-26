const fs = require('fs');
const express = require('express');
const app = express();
const rd = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));
app.use(express.json());
//handlers

const get_data = (req, res) => {
  const id = req.params.id * 1;

  res.status(200).json({
    data: rd[id],
  });
};

const post_data = (req, res) => {
  const cid = rd[rd.length - 1].id + 1;
  const new_data = Object.assign({ cid }, req.body);
  rd.push(new_data);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(rd),
    (err) => {
      console.log(err);
    }
  );
};

const patch_data = (req, res) => {
  const nid = req.params.id * 1;
  rd[nid].name = req.body.name;
  res.status(200).json({
    data: rd,
  });
};

const delete_data = (req, res) => {
  const nid = req.params.id * 1;
  rd.splice(nid, 1);
  res.status(200).json({
    data: rd,
  });
};

//routes
const router = express.Router();

router
  .route('/api/tour/:id')
  .get(get_data)
  .post(post_data)
  .patch(patch_data)
  .delete(delete_data);
app.use(router);

app.listen(3000, () => {
  console.log('server is runiing on this port');
});
