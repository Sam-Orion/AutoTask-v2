const Task = require('../models/taskModel');
const axios = require('axios');

exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);

    // If the task is marked as outdoor, check the weather
    if (req.body.outdoor) {
      const weatherForecast = await checkWeather(task.dueDate);
      if (weatherForecast.rain) {
        task.dueDate = new Date(task.dueDate).setDate(new Date(task.dueDate).getDate() + 1);
        console.log('Task postponed due to predicted rain.');
      }
    }

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const checkWeather = async (date) => {
  const latitude = 51.5074; // Example: London
  const longitude = -0.1278;
  const formattedDate = new Date(date).toISOString().split('T')[0]; // YYYY-MM-DD

  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_sum&timezone=Europe/London`
    );

    const weatherData = response.data.daily;
    const targetDateWeather = weatherData.time.findIndex((d) => d === formattedDate);
    const rain = weatherData.precipitation_sum[targetDateWeather] > 0;

    console.log(`Weather on ${formattedDate}: ${rain ? 'Rain' : 'Clear'}`);
    return { rain };
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return { rain: false };
  }
};
