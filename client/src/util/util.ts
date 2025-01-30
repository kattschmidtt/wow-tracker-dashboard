import React, { ReactNode } from "react";

function getUserRegion(): string {
  const locale = new Intl.DateTimeFormat().resolvedOptions().locale;
  return locale;
}

export function getCurrentISODate(): string {
  return new Date().toISOString();
}


export function prettyDate(): string {
  const currentDate = getCurrentISODate()
  const region = getUserRegion() 

  switch(region) {
    case "en-US": 
    case "en-GB": 
    case "ko-KR": 
    case "ar-EG": 
      return(new Intl.DateTimeFormat(region).format(parseInt(currentDate)));
    default: 
      return "Region not supported";
  }
}

export function prettyNumberFormat(x: number): string {
  return x.toLocaleString(getUserRegion());
}

export function prettyTime(t: string) {
  const time: number = parseInt(t)
  const pad = (n: string | number, z = 2) => ('00' + n).slice(-z)
  const mm = pad((time % 3.6e6) / 6e4 | 0)
  const ss = pad((time % 6e4) / 1000 | 0)
  const mmm = pad(time % 1000, 3)
 
  return `${mm}:${ss}.${mmm}`
}

export function prettySpecificDate(t: string): string {
  const date = new Date(t);

  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate
}

export function convertToPercentage(t: number): string {
  const percentage = Math.round(t)
  return `${percentage}%`
}

//ranking parsing colors
const colorParseRanges = [
    { min: 1, max: 3, color: '#e5cc80' }, //artifact
    { min: 4, max: 998, color: '#ff8000' }, //legendary
    { min: 999, max: 1999, color: '#a335ee' },//epic
    { min: 2000, max: 3000, color: '#0070ff' }, //rare
    { min: 3001, max: 6000, color: '#1eff00' }, //common
];

export const parseColor = (number: number): string => {
    const match = colorParseRanges.find(range => number >= range.min && number <= range.max);
    return match ? match.color : '#666666'; 
};


export const classColorMapping: { [key: string]: string } = {
  "Death Knight": "#C41E3A",
  "Demon Hunter": "#A330C9",
  "Druid": "#FF7C0A",
  "Evoker": "#33937F",
  "Hunter": "#AAD372",
  "Mage": "#3FC7EB",
  "Monk": "#00FF98",
  "Paladin": "#F48CBA",
  "Priest": "#FFFFFF",
  "Rogue": "#FFF468",
  "Shaman": "#0070DD",
  "Warlock": "#8788EE",
  "Warrior": "#C69B6D"
};

