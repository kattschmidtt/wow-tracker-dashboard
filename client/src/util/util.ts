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