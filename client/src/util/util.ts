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