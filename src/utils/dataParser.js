import fs from "fs";

import korh_weather_info from "../../data/korh_historical_weather_data_raw.json" assert { type: "json" };

const { data: daily_weather_data } = korh_weather_info;

const formatted_data = daily_weather_data.map((day) => `On ${day[0]} the low temperature in Worcester, MA USA was ${day[2][0]}, the high temperature was ${day[1][0]}, there were ${day[3][0]} inches of precipitation, and ${day[4][0]} inches of snow.`);

const stringified_data = JSON.stringify(formatted_data);
fs.writeFileSync("data/formatted_data.json", stringified_data);
