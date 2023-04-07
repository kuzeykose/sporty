import dayjs from 'dayjs';

export const calendarCellDateCalculator = (date: { year: number; month: number }) => {
  const today = dayjs();
  const currentMonth = dayjs(`${date.year}-${date.month}`);
  const daysInMonth = currentMonth.daysInMonth();
  const calendarDays = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const day = dayjs(currentMonth).date(i);
    calendarDays.push({
      date: day.format('YYYY-MM-DD'),
      day: day.isoWeekday(),
      isCurrentMonth: true,
      isToday: day.format('YYYY-MM-DD') === today.format('YYYY-MM-DD'),
    });
  }

  // set previous month
  switch (calendarDays[0].day) {
    case 7:
      for (let index = 1; index < 7; index++) {
        const extraDate = dayjs(currentMonth).startOf('month').subtract(index, 'day');
        calendarDays.unshift({ date: extraDate.format('YYYY-MM-DD'), day: extraDate.isoWeekday(), events: [] });
      }
      break;
    case 6:
      for (let index = 1; index < 6; index++) {
        const extraDate = dayjs(currentMonth).startOf('month').subtract(index, 'day');
        calendarDays.unshift({ date: extraDate.format('YYYY-MM-DD'), day: extraDate.isoWeekday(), events: [] });
      }
      break;
    case 5:
      for (let index = 1; index < 5; index++) {
        const extraDate = dayjs(currentMonth).startOf('month').subtract(index, 'day');
        calendarDays.unshift({ date: extraDate.format('YYYY-MM-DD'), day: extraDate.isoWeekday(), events: [] });
      }
      break;
    case 4:
      for (let index = 1; index < 4; index++) {
        const extraDate = dayjs(currentMonth).startOf('month').subtract(index, 'day');
        calendarDays.unshift({ date: extraDate.format('YYYY-MM-DD'), day: extraDate.isoWeekday(), events: [] });
      }
      break;
    case 3:
      for (let index = 1; index < 3; index++) {
        const extraDate = dayjs(currentMonth).startOf('month').subtract(index, 'day');
        calendarDays.unshift({ date: extraDate.format('YYYY-MM-DD'), day: extraDate.isoWeekday(), events: [] });
      }
      break;
    case 2:
      for (let index = 1; index < 2; index++) {
        const extraDate = dayjs(currentMonth).startOf('month').subtract(index, 'day');
        calendarDays.unshift({ date: extraDate.format('YYYY-MM-DD'), day: extraDate.isoWeekday(), events: [] });
      }
      break;
    case 1:
      for (let index = 1; index < 1; index++) {
        const extraDate = dayjs(currentMonth).startOf('month').subtract(index, 'day');
        calendarDays.unshift({ date: extraDate.format('YYYY-MM-DD'), day: extraDate.isoWeekday(), events: [] });
      }
      break;

    default:
      break;
  }
  //set next month
  switch (calendarDays.at(-1)?.day) {
    case 1:
      for (let index = 1; index < 7; index++) {
        const extraDate = dayjs(currentMonth).endOf('month').add(index, 'day');
        calendarDays.push({ date: extraDate.format('YYYY-MM-DD'), day: extraDate.isoWeekday(), events: [] });
      }
      break;
    case 2:
      for (let index = 1; index < 6; index++) {
        const extraDate = dayjs(currentMonth).endOf('month').add(index, 'day');
        calendarDays.push({ date: extraDate.format('YYYY-MM-DD'), day: extraDate.isoWeekday(), events: [] });
      }
      break;
    case 3:
      for (let index = 1; index < 5; index++) {
        const extraDate = dayjs(currentMonth).endOf('month').add(index, 'day');
        calendarDays.push({ date: extraDate.format('YYYY-MM-DD'), day: extraDate.isoWeekday(), events: [] });
      }
      break;
    case 4:
      for (let index = 1; index < 4; index++) {
        const extraDate = dayjs(currentMonth).endOf('month').add(index, 'day');
        calendarDays.push({ date: extraDate.format('YYYY-MM-DD'), day: extraDate.isoWeekday(), events: [] });
      }
      break;
    case 5:
      for (let index = 1; index < 3; index++) {
        const extraDate = dayjs(currentMonth).endOf('month').add(index, 'day');
        calendarDays.push({ date: extraDate.format('YYYY-MM-DD'), day: extraDate.isoWeekday(), events: [] });
      }
      break;
    case 6:
      for (let index = 1; index < 2; index++) {
        const extraDate = dayjs(currentMonth).date(31).add(index, 'day');
        calendarDays.push({ date: extraDate.format('YYYY-MM-DD'), day: extraDate.isoWeekday(), events: [] });
      }
      break;
    case 7:
      for (let index = 1; index < 8; index++) {
        const extraDate = dayjs(currentMonth).endOf('month').add(index, 'day');
        calendarDays.push({ date: extraDate.format('YYYY-MM-DD'), day: extraDate.isoWeekday(), events: [] });
      }
      break;

    default:
      break;
  }
  // set spaces from next month
  if (calendarDays?.length < 42) {
    const lastDate = calendarDays[calendarDays?.length - 1].date;
    let missingCount = 43 - calendarDays?.length;
    for (let index = 1; index < missingCount; index++) {
      const extraDate = dayjs(lastDate).add(index, 'day');
      calendarDays.push({ date: extraDate.format('YYYY-MM-DD'), day: extraDate.isoWeekday(), events: [] });
    }
  }
  return calendarDays;
};
