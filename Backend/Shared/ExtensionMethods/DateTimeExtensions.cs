using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnProjectsPortal.Shared.ExtensionMethods
{
    public static class DateTimeExtensions
    {
        public static int GetWeekOfYear(this DateTime dateTime)
        {
            CultureInfo cultureInfo = new("en-US");
            Calendar _calender = cultureInfo.Calendar;
            CalendarWeekRule _calendarWeekRule = cultureInfo.DateTimeFormat.CalendarWeekRule;
            DayOfWeek _firstDayOfWeek = cultureInfo.DateTimeFormat.FirstDayOfWeek; ;

            return _calender.GetWeekOfYear(dateTime, _calendarWeekRule, _firstDayOfWeek);
        }
    }
}
