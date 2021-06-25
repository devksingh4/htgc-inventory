function paginateData(data: Array<Record<string, any>>, chunk: number = 5) {
  if (data.length <= chunk) return [data];
  let chunkedArray: Array<Record<string, any>> = [];
  let start = 0;
  let stop = chunk;
  while (start <= chunk) {
    chunkedArray.push(data.slice(start, stop));
    start += chunk;
    stop += chunk;
  }
  return chunkedArray;
}
module.exports = (app) => {
  app.get('/view-inventory', async (req, res) => {
    if (req.query.split <= 0) req.query.split = 1;
    let split: number = req.query.split || 1;
    const groups = [{ name: 'Kitchen', id: '9458f755-f6c0-4001-902c-8e2adb3bae7b' }, { name: 'Front Desk', id: '30528543-b245-477f-925b-72638c446511' }]
    const paginatedData: Array<Record<string, any>> = paginateData([
      {
        id: "ab302fde-aa22-4bb9-aab4-afc9e1367a77",
        description: "Daal",
        "quantity-boxed": 4,
        "quantity-loose": 5,
        "quantity-boxed-unit": "boxes",
        "quantity-loose-unit": "kgs",
        "category": "Kitchen"
      },
      {
        id: "d4140857-1ece-45d1-abe1-85f8c470937a",
        description: "Rice",
        "quantity-boxed": 2,
        "quantity-loose": 3,
        "quantity-boxed-unit": "boxes",
        "quantity-loose-unit": "bags",
        "category": "Kitchen"
      },
    ]);
    if (split > paginatedData.length) {
      split = paginatedData.length;
    }
    res.render('view-inventory', {
      entries: paginatedData[split - 1],
      user: { picture: 'https://devksingh.com/images/me.jpg', name: 'Dev Singh' },
      splits: Array.from({length: paginatedData.length + 1}, (x, i) => i).splice(1, paginatedData.length + 1),
      split,
      groups,
      groupLength: groups.length > 1,
    });
  })
}