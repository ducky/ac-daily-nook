import moment from 'moment';
import orderBy from 'lodash/orderBy';
import partition from 'lodash/partition';

import {
  parseActiveMonths,
  parseRemainingHours,
  parseRemainingMinutes,
  parseTimeActive,
  parseUpcomingTime,
} from './dateTime';

const parseCritters = (critters, hemisphereKey = 'N') => {
  return critters.map(critter => {
    const { timeStart, timeEnd, monthsNorthernHemisphere, monthsSouthernHemisphere } = critter;
    const monthsToCheck = hemisphereKey === 'N' ? monthsNorthernHemisphere : monthsSouthernHemisphere;

    const monthBeginning = moment()
      .startOf('M')
      .add(5, 'h');
    const monthEnd = moment()
      .add(1, 'M')
      .startOf('M')
      .add(5, 'h');

    if (monthBeginning.isAfter(moment())) {
      monthBeginning.subtract(1, 'month');
      monthEnd.subtract(1, 'month');
    }

    const now = moment();
    const [timeStartHours, timeStartMinutes] = timeStart.split(':');
    const [timeEndHours, timeEndMinutes] = timeEnd.split(':');
    const timeStartMoment = moment().set({ hours: timeStartHours, minutes: timeStartMinutes });
    const timeEndMoment = moment().set({ hours: timeEndHours, minutes: timeEndMinutes });

    if (timeStartMoment.isAfter(timeEndMoment)) {
      timeEndMoment.add(1, 'days');

      if (timeStartMoment.isAfter(now) && timeEndMoment.isAfter(now)) {
        timeStartMoment.subtract(1, 'd');
        timeEndMoment.subtract(1, 'd');
      }
    }

    const isActiveAlways = timeStart === '0:00' && timeEnd === '24:00';
    const isActiveMonth = monthsToCheck.includes(monthBeginning.format('MM'));
    const isActiveTime = moment().isBetween(timeStartMoment, timeEndMoment);
    const isActive = (isActiveMonth && isActiveAlways) || (isActiveMonth && isActiveTime);

    // Calculate Time Remaining
    const timeRemainingMinutes = parseRemainingMinutes(timeEndMoment, monthsToCheck, isActiveAlways);
    const timeRemaining = isActive
      ? moment.duration(timeRemainingMinutes, 'm').format('h [hour], m [min]', { trim: false })
      : timeRemainingMinutes;

    const monthsActive = parseActiveMonths(monthsToCheck);
    const timeActive = parseTimeActive(monthsToCheck, timeStartMoment, timeEndMoment);

    // Calculate Time til Next
    const [timeUpcomingMinutes, timeUpcoming] = parseUpcomingTime(
      timeStartMoment,
      monthsToCheck,
      isActiveMonth,
      critter
    );

    // Calculate Time Remaining
    const timeUrgency = parseRemainingHours(monthsToCheck);
    const isReachingMonthEnd = timeUrgency > 0 && timeUrgency < 24;

    return {
      ...critter,
      isActive,
      isActiveAlways,
      isReachingMonthEnd,
      monthsActive,
      timeActive,
      timeRemaining, // Rename to daily
      timeRemainingMinutes, // Rename to display
      timeUpcoming,
      timeUpcomingMinutes,
      timeUrgency,
      timeStart: timeStartMoment.format('h:mm A'),
      timeEnd: timeEndMoment.format('h:mm A'),
    };
  });
};

export const parseAndSortCritters = (critters, crittersCaught = [], options = {}) => {
  const filteredByType =
    options.critterType !== 'ALL' ? critters.filter(c => c.type === options.critterType) : critters;

  const filteredByMonth =
    options.month !== 'ALL'
      ? filteredByType.filter(c => {
          const monthsToFilter = options.hemisphere === 'N' ? c.monthsNorthernHemisphere : c.monthsSouthernHemisphere;
          return monthsToFilter.includes(options.month);
        })
      : filteredByType;

  const parsedCritters = parseCritters(filteredByMonth, options.hemisphere);

  const [uncaughtList, caughtList] = partition(parsedCritters, c => !crittersCaught.includes(c.identifier));
  const [uncaughtActiveList, uncaughtInactiveList] = partition(uncaughtList, c => c.isActive);

  const listUncaughtActive = orderBy(
    uncaughtActiveList,
    ['timeActive', 'timeRemaining', 'monthsActive', 'identifier'],
    ['asc', 'asc', 'asc', 'asc']
  );
  const listUncaughtInactive = orderBy(uncaughtInactiveList, ['timeUpcomingMinutes', 'identifier'], ['asc', 'asc']);
  const listCaught = orderBy(caughtList, ['identifier'], ['asc']);

  return {
    listUncaughtActive,
    listUncaughtInactive,
    listCaught,
  };
};

export default parseCritters;
