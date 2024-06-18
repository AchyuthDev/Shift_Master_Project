using System.ComponentModel.DataAnnotations;

namespace Shift_Master_Api.Models.DomineModels
{
    public class Shift
    {
        
        public int ShiftId { get; set; }

        public string ShiftName { get; set; }
        public string? NightShift {  get; set; }
        public TimeSpan ShiftStartTime { get; set; }
        public TimeSpan ShiftEndTime { get; set; }
        public int TotalShiftTime { get; set; }

        public TimeSpan? LunchStartTime { get; set; }
        public TimeSpan? LunchEndTime { get; set; }

        public int? TotalLunchTime { get; set; }

        public string? Remark { get; set; }

        public bool IsActive {  get; set; }

        public bool IsDelete { get; set; } = false;
    }
}
