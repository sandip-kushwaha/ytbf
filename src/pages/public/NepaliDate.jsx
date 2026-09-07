import NepaliDate from "nepali-date-converter";

const weekdays = [
  "आइतबार",
  "सोमबार",
  "मंगलबार",
  "बुधबार",
  "बिहीबार",
  "शुक्रबार",
  "शनिबार",
];

const months = [
  "बैशाख",
  "जेठ",
  "असार",
  "श्रावण",
  "भाद्र",
  "आश्विन",
  "कार्तिक",
  "मंसिर",
  "पौष",
  "माघ",
  "फाल्गुण",
  "चैत्र",
];

const digits = "०१२३४५६७८९";

const toNepaliDigits = (value) =>
  String(value).replace(
    /\d/g,
    (digit) => digits[digit]
  );

const formatDate = (date) => {
  if (!date) return "—";

  try {
    const nd = new NepaliDate(new Date(date));

    const day = nd.getDate();
    const month = nd.getMonth();
    const year = nd.getYear();

    const jsDate = new Date(date);
    const weekday = weekdays[jsDate.getDay()];

    return `${weekday}, ${toNepaliDigits(day)} ${months[month]} ${toNepaliDigits(year)}`;
  } catch (error) {
    console.error(error);
    return "—";
  }
};

export default formatDate;