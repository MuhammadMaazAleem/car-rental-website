import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DateRangePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pickup Date
        </label>
        <DatePicker
          selected={startDate}
          onChange={onStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          className="input-field"
          dateFormat="dd/MM/yyyy"
          placeholderText="Select pickup date"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Return Date
        </label>
        <DatePicker
          selected={endDate}
          onChange={onEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate || new Date()}
          className="input-field"
          dateFormat="dd/MM/yyyy"
          placeholderText="Select return date"
        />
      </div>
    </div>
  )
}

export default DateRangePicker
