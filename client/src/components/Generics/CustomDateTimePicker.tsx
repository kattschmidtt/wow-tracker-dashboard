import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
interface DateTimeProps {
  label: string;
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void; //take in a dayjs date
}

const CustomDateTimePicker = ({ label, value, onChange }: DateTimeProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker label={label} value={value} onChange={onChange} />
    </LocalizationProvider>
  );
};
export default CustomDateTimePicker;
