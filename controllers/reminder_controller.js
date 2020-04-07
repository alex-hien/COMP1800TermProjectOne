let Database = require("../database");
const fetch = require("node-fetch");

let remindersController = {
  list: (req, res) => {
    res.render('reminder/index', { reminders: Database.cindy.reminders })
  },

  new: (req, res) => {
    res.render('reminder/create')
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = Database.cindy.reminders.find(function(reminder) {
      return reminder.id == reminderToFind; // good test question for students what happens if I put ===
    })
    if (searchResult != undefined) {
      res.render('reminder/single-reminder', { reminderItem: searchResult })
    } else {
      res.render('reminder/index', { reminders: Database.cindy.reminders })
    }
  },

  create: (req, res) => {
    let reminder = {
      id: Database.cindy.reminders.length+1,
      title: req.body.title,
      description: req.body.description,
      completed: false
    }
    Database.cindy.reminders.push(reminder);
    res.redirect('/reminder');
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = Database.cindy.reminders.find(function(reminder) {
      return reminder.id == reminderToFind; // Why do you think I chose NOT to use === here?
    })
    res.render('reminder/edit', { reminderItem: searchResult })
    
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = Database.cindy.reminders.find(function(reminder) {
      if(reminder.id == reminderToFind) {
        reminder.title = req.body.title,
        reminder.description = req.body.description,
        // Why do you think I had to do req.body.completed == "true" below?
        reminder.completed = req.body.completed == "true" 
      }
    });
    res.redirect('/reminder/' + reminderToFind)
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let reminderIndex = Database.cindy.reminders.findIndex(function(reminder) {
      return reminder.id == reminderToFind; 
    })
    Database.cindy.reminders.splice(reminderIndex, 1);
    res.redirect('/reminder');
  },

  landing: (req, res) => {
    res.render('reminder/promotion');
  },

  toLogin: (req, res) => {
    res.render('reminder/login');
  },

//   user: (req, res) => {
//     if (Database[req.body.email] == undefined) {
//       Database[req.body.email] = {
//         reminders: []
//       }
//       res.redirect("/reminder");
//     }
//     else {
//       res.redirect("/reminder");
//     }
//   }

// //  same as getWeather: async function(req, res) {
//   getWeather: async (req, res) => {
//     const dsKey = "03c38bf0d83946fe44d22710353f13a1";
//     const latitude = "49.2497";
//     const longitude = "-123.1193";
//     const fetchWeather = await fetch(`https://api.darksky.net/forecast/${dsKey}/${latitude},${longitude}`);
//     const data = await fetchWeather.json();
//     console.log(data);
//     // json formats the data into something more useable for javascript (dictionary-like)
//   }

  //  same as getWeather: async function(req, res) {
    getWeather: async (req, res) => {
        const fetchWeather = await fetch('https://api.darksky.net/forecast/03c38bf0d83946fe44d22710353f13a1/49.2497,-123.1193,units=si');
        const data = await fetchWeather.json();
        res.render("reminder/weather", {
          data
        })
        console.log(data);
        // json formats the data into something more useable for javascript (dictionary-like)
      },
}

module.exports = remindersController
