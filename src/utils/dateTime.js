import moment from 'moment';

export const findNextActiveMonth = months => {
  const startMonth = moment();
  const currentMonth = moment();

  if (!months.length) return currentMonth.startOf('M');
  for (let i = 0; i < 12; i++) {
    if (months.includes(currentMonth.format('MM'))) return currentMonth.startOf('M').add(5, 'h');
    currentMonth.add(1, 'M');
  }

  return startMonth.startOf('M').add(5, 'h');
};

export const findNextInactiveMonth = months => {
  const currentMonth = moment();

  if (!months.length || months.length === 12) return null;
  for (let i = 0; i < 12; i++) {
    if (!months.includes(currentMonth.format('MM'))) return currentMonth.startOf('M').add(5, 'h');
    currentMonth.add(1, 'M');
  }

  return null;
};

export const parseTimeActive = (months, startTime, endTime) => {
  // Calculate Yearly Hours
  const totalDaysActive = months.length * 30;
  const totalYearlyHours = totalDaysActive * 24;

  // Calculate Daily Hours
  const dailyHoursDifference = endTime.diff(startTime, 'hours');
  const dailyHoursOffset = 24 - dailyHoursDifference;

  // HACK - Adding an extra year of hours to offset these to bottom
  const alwaysActiveOffset = months.length === 12 ? 8640 : 0;

  const totalDailyHours = totalDaysActive * dailyHoursOffset;
  return totalYearlyHours - totalDailyHours + alwaysActiveOffset;
};

export const parseActiveMonths = months => {
  return months.length;
};

export const parseRemainingHours = months => {
  const nextInactiveMonth = findNextInactiveMonth(months);
  return nextInactiveMonth ? nextInactiveMonth.diff(moment(), 'h') : 99999;
};

export const parseRemainingMinutes = (timeEnd, months, ignoreEndTime) => {
  const timeEndMoment = moment(timeEnd);
  const nextInactiveMonth = findNextInactiveMonth(months);

  if (ignoreEndTime && months.length === 12) return 99999;

  if (timeEndMoment.isBefore(moment())) {
    timeEndMoment.add(1, 'd');
  }

  if (nextInactiveMonth && ignoreEndTime) {
    return nextInactiveMonth.diff(moment(), 'm');
  }

  if (nextInactiveMonth && nextInactiveMonth.isBefore(timeEndMoment)) {
    return nextInactiveMonth.diff(moment(), 'm');
  }

  return timeEnd.diff(moment(), 'm');
};

export const parseUpcomingTime = (timeStart, months, isActiveMonth, debug) => {
  if (isActiveMonth) {
    const timeUpcomingDiff = timeStart.isAfter(moment())
      ? timeStart.diff(moment(), 'm')
      : moment().diff(timeStart, 'm');
    const timeUpcomingDuration = moment.duration(timeUpcomingDiff, 'm').format('h [hour], m [min]');
    return [timeUpcomingDiff, timeUpcomingDuration];
  } else {
    const nextMonth = findNextActiveMonth(months);
    const timeUpcomingDiff = nextMonth.diff(moment(), 'm');
    const timeUpcomingDuration =
      nextMonth.diff(moment(), 'h') < 24
        ? moment.duration(timeUpcomingDiff, 'm').format('h [hour], m [min]')
        : moment.duration(timeUpcomingDiff, 'm').format('d [day]', { trim: false });
    return [timeUpcomingDiff, timeUpcomingDuration];
  }
};
