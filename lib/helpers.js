//Helpers to be userd in template
module.exports = function(app){
  app.locals.formatDate = function(date, format){
    if (date instanceof Date){
      year = date.getFullYear();
      month = date.getMonth();
      day = date.getDate();

      switch (format){
        
        case 'YYYY-MM-DD':
          return year + '-' + (month+1) + '-' + day;
        default:
          return year + '-' + (month+1) + '-' + day;
      }
    }
    else
      return date;
  };

  app.locals.getDonationString = function(donation) {
    if (!donation)
      return '';
    switch (donation.type) {
      case 0:
        return donation.donator + '捐款' + donation.amount + '元';
      case 1:
        return donation.donator + '捐款' + donation.amount + '元' + '用于' + donation.note;
      case 2:
        return donation.donator + '捐赠' + donation.goods + '用于' + donation.note;
    }
    return '';
  };
};