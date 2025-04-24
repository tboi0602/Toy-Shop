import React from "react";
import avt from "../assets/avt.jpg";
const Infomation = () => {
  const countries = [
    "Select",
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Congo (Congo-Kinshasa)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic (Czechia)",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (North)",
    "Korea (South)",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];
  return (
    <div className="w-11/12 bg-white flex-col justify-center m-auto my-8 rounded-2xl">
      <div className="font-bold text-[20px] text-white w-full rounded-t-2xl py-3 text-center bg-gradient-to-r from-red-600 to-red-400">
        Welcom, User
      </div>
      <div className="avt flex ">
        <div className="flex-none avt w-[100px] h-[100px] mx-8 my-4">
          <img className=" fix-img rounded-full" src={avt} alt="" />
        </div>
        <div className="grow flex flex-col justify-center">
          <p className="text-[20px] font-bold">Tboi0602</p>
          <p className="text-gray-500 text-[13px]">
            523H0090@student.tdtu.edu.vn
          </p>
        </div>
        <div className=" px-8 py-12 ">
          <button className="flex-none btn-error px-5 py-1 rounded-md ">
            Edit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 p-8">
        <div className="flex flex-col gap-3">
          <label htmlFor="">Full Name</label>
          <input
            className="bg-[#F9F9F9] h-[50px] rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
            type="text"
            placeholder="Your full name"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">User Name</label>
          <input
            className="bg-[#F9F9F9] h-[50px] rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
            type="text"
            value="Tboi0602"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="Gender">Gender</label>
          <select
            className="bg-[#F9F9F9] h-[50px] rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
            name="Gender"
          >
            <option>Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Birth of day</label>
          <input
            className="bg-[#F9F9F9] h-[50px] rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
            type="date"
            placeholder="Your full name"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="Country">Country</label>
          <select
            className="bg-[#F9F9F9] h-[50px] rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
            name="Country"
          >
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Address</label>
          <input
            className="bg-[#F9F9F9] h-[50px] rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
            type="text"
            placeholder="Your address"
          />
        </div>
      </div>
      <div className="flex flex-col px-8 gap-2">
        <p className="font-bold flex-none">My email Address</p>
        <div className="flex gap-x-3 items-center pb-5 ">
          <div className="text-red-600 bg-red-100 w-9 h-9 rounded-full center hover:bg-red-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
          </div>
          <div className="grow">
            <input
              className=" outline-none w-3/12 border-b-2 border-red-600"
              type="text"
              value="523H0090@student.tdtu.edu.vn"
            />
          </div>
          <button className="btn-error-outline p-2 rounded-lg text-[12px]">Change password</button>
        </div>
      </div>
    </div>
  );
};

export default Infomation;
