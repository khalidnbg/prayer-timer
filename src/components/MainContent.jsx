import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import "moment/dist/locale/ar-dz";
moment.locale("ar");

export default function MainContent() {
  // STATES
  const [nextPrayerIndex, setNextPrayerIndex] = useState(2);
  const [timings, setTimings] = useState({
    Fajr: "04:20",
    Dhuhr: "11:50",
    Asr: "15:18",
    Sunset: "18:03",
    Isha: "19:33",
  });

  const [remainingTime, setRemainingTime] = useState("");

  const [selectedCity, setSelectedCity] = useState({
    displayName: "مكة المكرمة",
    apiName: "Makkah al Mukarramah",
  });

  const [today, setToday] = useState("");

  const avilableCities = [
    { displayName: "مكة المكرمة", apiName: "Makkah al Mukarramah" },
    { displayName: "الرياض", apiName: "Riyadh" },
    { displayName: "الدمام", apiName: "Dammam" },
    { displayName: "واشنطن", apiName: "Washington, D.C." },
    { displayName: "لندن", apiName: "London" },
    { displayName: "باريس", apiName: "Paris" },
    { displayName: "طوكيو", apiName: "Tokyo" },
    { displayName: "برلين", apiName: "Berlin" },
    { displayName: "موسكو", apiName: "Moscow" },
    { displayName: "كانبرا", apiName: "Canberra" },
    { displayName: "كيب تاون", apiName: "Cape Town" },
    { displayName: "كينشاسا", apiName: "Kinshasa" },
    { displayName: "نيودلهي", apiName: "New Delhi" },
    { displayName: "أوتاوا", apiName: "Ottawa" },
    { displayName: "سانتياغو", apiName: "Santiago" },
    { displayName: "سيول", apiName: "Seoul" },
    { displayName: "مدريد", apiName: "Madrid" },
    { displayName: "أوسلو", apiName: "Oslo" },
    { displayName: "أبوظبي", apiName: "Abu Dhabi" },
    { displayName: "كابول", apiName: "Kabul" },
    { displayName: "هراري", apiName: "Harare" },
    { displayName: "ويلينغتون", apiName: "Wellington" },
    { displayName: "أكرا", apiName: "Accra" },
    { displayName: "طرابلس", apiName: "Tripoli" },
    { displayName: "بغداد", apiName: "Baghdad" },
    { displayName: "كينغستاون", apiName: "Kingston" },
    { displayName: "بيروت", apiName: "Beirut" },
    { displayName: "تيرانا", apiName: "Tirana" },
    { displayName: "ياموسوكرو", apiName: "Yamoussoukro" },
    { displayName: "براسيليا", apiName: "Brasília" },
    { displayName: "بروكسل", apiName: "Brussels" },
    { displayName: "سراييفو", apiName: "Sarajevo" },
    { displayName: "سوفيا", apiName: "Sofia" },
    { displayName: "هافانا", apiName: "Havana" },
    { displayName: "نيقوسيا", apiName: "Nicosia" },
    { displayName: "براغ", apiName: "Prague" },
    { displayName: "كوبنهاغن", apiName: "Copenhagen" },
    { displayName: "دجيبوتي", apiName: "Djibouti" },
    { displayName: "روزو", apiName: "Roseau" },
    { displayName: "قاهرة", apiName: "Cairo" },
    { displayName: "نايروبي", apiName: "Nairobi" },
    { displayName: "إل سلفادور", apiName: "San Salvador" },
    { displayName: "مالبا", apiName: "Malabo" },
    { displayName: "أسمرة", apiName: "Asmara" },
    { displayName: "تالين", apiName: "Tallinn" },
    { displayName: "أدس أبابا", apiName: "Addis Ababa" },
    { displayName: "هلسنكي", apiName: "Helsinki" },
    { displayName: "باريس", apiName: "Paris" },
    { displayName: "برلين", apiName: "Berlin" },
    { displayName: "روما", apiName: "Rome" },
    { displayName: "أثينا", apiName: "Athens" },
    { displayName: "أنقرة", apiName: "Ankara" },
    { displayName: "مدريد", apiName: "Madrid" },
    { displayName: "ستوكهولم", apiName: "Stockholm" },
    { displayName: "بيروت", apiName: "Beirut" },
    { displayName: "أمستردام", apiName: "Amsterdam" },
    { displayName: "برلين", apiName: "Berlin" },
    { displayName: "بروكسل", apiName: "Brussels" },
    { displayName: "وارسو", apiName: "Warsaw" },
    { displayName: "لشبونة", apiName: "Lisbon" },
    { displayName: "بودابست", apiName: "Budapest" },
    { displayName: "أوسلو", apiName: "Oslo" },
    { displayName: "سكوبي", apiName: "Skopje" },
    { displayName: "بيونس آيرس", apiName: "Buenos Aires" },
    { displayName: "كانبيرا", apiName: "Canberra" },
    { displayName: "سوكري", apiName: "Sucre" },
    { displayName: "برازيليا", apiName: "Brasília" },
    { displayName: "أوتاوا", apiName: "Ottawa" },
    { displayName: "سانتياغو", apiName: "Santiago" },
    { displayName: "بوغوتا", apiName: "Bogotá" },
    { displayName: "كوستاريكا", apiName: "San José" },
    { displayName: "هافانا", apiName: "Havana" },
    { displayName: "جنوب السودان", apiName: "Juba" },
    { displayName: "ليما", apiName: "Lima" },
    { displayName: "كوبنهاغن", apiName: "Copenhagen" },
    { displayName: "كينيرون", apiName: "Nairobi" },
    { displayName: "كوالالمبور", apiName: "Kuala Lumpur" },
    { displayName: "مالي", apiName: "Male" },
    { displayName: "مابوتو", apiName: "Maputo" },
    { displayName: "ويندهوك", apiName: "Windhoek" },
    { displayName: "كاتماندو", apiName: "Kathmandu" },
    { displayName: "أمستردام", apiName: "Amsterdam" },
    { displayName: "نواكشوط", apiName: "Nouakchott" },
    { displayName: "ويلينغتون", apiName: "Wellington" },
    { displayName: "ماناغوا", apiName: "Managua" },
    { displayName: "نيامي", apiName: "Niamey" },
    { displayName: "أبوجا", apiName: "Abuja" },
    { displayName: "باناما", apiName: "Panama City" },
    { displayName: "بورتو بلونس", apiName: "Porto-Novo" },
    { displayName: "القاهرة", apiName: "Cairo" },
    { displayName: "بكين", apiName: "Beijing" },
    { displayName: "باراغواي", apiName: "Asunción" },
    { displayName: "ليما", apiName: "Lima" },
    { displayName: "مانيلا", apiName: "Manila" },
    { displayName: "وارسو", apiName: "Warsaw" },
    { displayName: "لشبونة", apiName: "Lisbon" },
    { displayName: "دوحة", apiName: "Doha" },
    { displayName: "بوخارست", apiName: "Bucharest" },
    { displayName: "الرباط", apiName: "Rabat" },
    { displayName: "موسكو", apiName: "Moscow" },
    { displayName: "كيغالي", apiName: "Kigali" },
    { displayName: "سانت لوسيا", apiName: "Castries" },
    { displayName: "كينغستاون", apiName: "Kingstown" },
    { displayName: "أبو ظبي", apiName: "Abu Dhabi" },
    { displayName: "دمشق", apiName: "Damascus" },
    { displayName: "دكا", apiName: "Dhaka" },
    { displayName: "كينشاسا", apiName: "Kinshasa" },
    { displayName: "سان سلفادور", apiName: "San Salvador" },
    { displayName: "باسكو", apiName: "Apia" },
    { displayName: "بلغراد", apiName: "Belgrade" },
    { displayName: "فري تاون", apiName: "Freetown" },
    { displayName: "سنغافورة", apiName: "Singapore" },
    { displayName: "براتيسلافا", apiName: "Bratislava" },
    { displayName: "لوبومباشي", apiName: "Ljubljana" },
    { displayName: "هونيارا", apiName: "Honiara" },
    { displayName: "أديس أبابا", apiName: "Addis Ababa" },
    { displayName: "مدريد", apiName: "Madrid" },
    { displayName: "ستوكهولم", apiName: "Stockholm" },
    { displayName: "برن", apiName: "Berne" },
    { displayName: "دمشق", apiName: "Damascus" },
    { displayName: "تايبيه", apiName: "Taipei" },
    { displayName: "دشانبي", apiName: "Dushanbe" },
    { displayName: "دودينتشاني", apiName: "Dodoma" },
    { displayName: "بانغوي", apiName: "Bangui" },
    { displayName: "ندجامينا", apiName: "N'Djamena" },
    { displayName: "تونجاتابو", apiName: "Nuku'alofa" },
    { displayName: "بورت أوف سبين", apiName: "Port of Spain" },
    { displayName: "تونس", apiName: "Tunis" },
    { displayName: "أنقرة", apiName: "Ankara" },
    { displayName: "أشغالابا", apiName: "Ashgabat" },
    { displayName: "فانواتو", apiName: "Port Vila" },
    { displayName: "الفاتيكان", apiName: "Vatican City" },
    { displayName: "كاراكاس", apiName: "Caracas" },
    { displayName: "هانوي", apiName: "Hanoi" },
    { displayName: "صنعاء", apiName: "Sana'a" },
    { displayName: "لوساكا", apiName: "Lusaka" },
    { displayName: "هراري", apiName: "Harare" },
  ];

  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Sunset", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  const getTimings = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectedCity.apiName}`
    );
    setTimings(response.data.data.timings);
  };

  useEffect(() => {
    getTimings();
  }, [selectedCity]);

  useEffect(() => {
    let interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);

    const t = moment();
    setToday(t.format("MMM Do YYYY | h:mm"));

    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  const setupCountdownTimer = () => {
    const momentNow = moment();
    let prayerIndex = 2;
    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }

    setNextPrayerIndex(prayerIndex);

    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );
      const totalDiffernce = midnightDiff + fajrToMidnightDiff;
      remainingTime = totalDiffernce;
    }

    const durationRemainingTime = moment.duration(remainingTime);

    setRemainingTime(
      `${durationRemainingTime.hours()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.seconds()}`
    );
  };

  const handleCityChange = (event) => {
    const cityObject = avilableCities.find((city) => {
      return city.apiName == event.target.value;
    });
    setSelectedCity(cityObject);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div>
            <h2>{today}</h2>
            <h1>{selectedCity.displayName}</h1>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div>
            <h2>متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
            <h1>{remainingTime}</h1>
          </div>
        </Grid>
      </Grid>

      <Stack
        direction="row"
        justifyContent={"center"}
        style={{ margin: "40px" }}>
        <FormControl style={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "white" }}>المدينة</span>
          </InputLabel>
          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity.apiName}
            label="Age"
            onChange={handleCityChange}>
            {avilableCities.map((city, index) => (
              <MenuItem key={index} value={city.apiName}>
                {city.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Divider style={{ borderColor: "white", opacity: "0.1" }} />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        style={{ margin: "50px 20px" }}>
        <Prayer
          name="الفجر"
          time={timings.Fajr}
          image="https://wepik.com/api/image/ai/9a07baa7-b49b-4f6b-99fb-2d2b908800c2"
        />
        <Prayer
          name="الظهر"
          time={timings.Dhuhr}
          image="https://wepik.com/api/image/ai/9a07bb45-6a42-4145-b6aa-2470408a2921"
        />
        <Prayer
          name="العصر"
          time={timings.Asr}
          image="https://wepik.com/api/image/ai/9a07bb90-1edc-410f-a29a-d260a7751acf"
        />
        <Prayer
          name="المغرب"
          time={timings.Sunset}
          image="https://wepik.com/api/image/ai/9a07bbe3-4dd1-43b4-942e-1b2597d4e1b5"
        />
        <Prayer
          name="العشاء"
          time={timings.Isha}
          image="https://wepik.com/api/image/ai/9a07bc25-1200-4873-8743-1c370e9eff4d"
        />
      </Stack>
    </>
  );
}
