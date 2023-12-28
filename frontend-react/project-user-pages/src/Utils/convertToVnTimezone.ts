import { format } from "date-fns-tz";


export const convertToVnTimezone = (date: any) => {
    return format(date, "yyyy-mm-dd");
  };