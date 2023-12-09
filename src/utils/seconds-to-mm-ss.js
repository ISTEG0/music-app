import moment from 'moment';

function ConvertSecondsToMmSs(seconds) {
  return moment.utc(seconds * 1000).format('mm:ss');
}

export { ConvertSecondsToMmSs };
