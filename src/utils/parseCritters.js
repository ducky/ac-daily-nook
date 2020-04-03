import moment from 'moment';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import partition from 'lodash/partition';

import {
  parseActiveMonths,
  parseRemainingHours,
  parseRemainingMinutes,
  parseTimeActive,
  parseUpcomingTime,
} from './dateTime';

const parseCritters = (critters, settings) => {
  return critters.map(critter => {
    const { priceSell, timeStart, timeEnd, monthsNorthernHemisphere, monthsSouthernHemisphere } = critter;
    const formatTime = settings.formatTime === '12' ? 'h:mm A' : 'H:mm';
    const sellPrice = Number(priceSell) > 0 ? Number(priceSell) : 0;
    const monthsToCheck = settings.hemisphere === 'N' ? monthsNorthernHemisphere : monthsSouthernHemisphere;

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

    // TODO - See if we can clean this up
    if (timeStartMoment.isAfter(timeEndMoment)) {
      timeEndMoment.add(1, 'days');

      // Range is in Future, Shift to Now
      if (timeStartMoment.isAfter(now) && timeEndMoment.isAfter(now)) {
        timeStartMoment.subtract(1, 'd');
        timeEndMoment.subtract(1, 'd');
      }

      // Range is now Past, Shift Forward
      if (timeEndMoment.isBefore(now)) {
        timeStartMoment.add(1, 'd');
        timeEndMoment.add(1, 'd');
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
      sellPrice,
      timeActive,
      timeRemaining, // Rename to daily
      timeRemainingMinutes, // Rename to display
      timeUpcoming,
      timeUpcomingMinutes,
      timeUrgency,
      timeStart: timeStartMoment.format(formatTime),
      timeEnd: timeEndMoment.format(formatTime),
    };
  });
};

export const parseAndSortCritters = (critters, crittersCaught = [], settings = {}) => {
  const filteredByType = settings.critterType !== 'ALL' ? filter(critters, { type: settings.critterType }) : critters;

  const filteredByMonth =
    settings.month !== 'ALL'
      ? filter(filteredByType, c => {
          const monthsToFilter = settings.hemisphere === 'N' ? c.monthsNorthernHemisphere : c.monthsSouthernHemisphere;
          return monthsToFilter.includes(settings.month);
        })
      : filteredByType;

  const parsedCritters = parseCritters(filteredByMonth, settings);

  if (settings.viewMode === 'VIEW_PROFIT') {
    const activeList = filter(parsedCritters, { isActive: true });
    const listActive = orderBy(activeList, ['sellPrice'], ['desc']);
    return { listActive };
  }

  const [uncaughtList, caughtList] = partition(parsedCritters, c => !crittersCaught.includes(c.id));
  const [uncaughtActiveList, uncaughtInactiveList] = partition(uncaughtList, c => c.isActive);

  const listUncaughtActive = orderBy(
    uncaughtActiveList,
    ['timeActive', 'timeRemaining', 'monthsActive', 'id'],
    ['asc', 'asc', 'asc', 'asc']
  );
  const listUncaughtInactive = orderBy(
    uncaughtInactiveList,
    ['timeUpcomingMinutes', 'timeActive', 'id'],
    ['asc', 'asc', 'asc']
  );
  const listCaught = orderBy(caughtList, ['id'], ['asc']);

  return {
    listUncaughtActive,
    listUncaughtInactive,
    listCaught,
  };
};

export default parseCritters;
