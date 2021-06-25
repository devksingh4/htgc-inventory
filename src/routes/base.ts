import { v4 as uuidv4 } from 'uuid';

module.exports = (app) => {
  app.get('/', async (req, res) => {
    const groups = [{ name: 'Kitchen', id: '9458f755-f6c0-4001-902c-8e2adb3bae7b' }, { name: 'Front Desk', id: '30528543-b245-477f-925b-72638c446511' }]
    res.render('index', { 
      uuid: uuidv4(),
      groupLength: groups.length > 1,
      groups, 
      units: ['boxes', 'kgs', 'lbs', 'g'],
      user: { picture: 'https://devksingh.com/images/me.jpg', name: 'Dev Singh' } 
    })
  })
}