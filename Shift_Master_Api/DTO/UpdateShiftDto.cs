namespace Shift_Master_Api.DTO
{
    public class UpdateShiftDto
    {
        public int ShiftId { get; set; }
         public string Remark {  get; set; }
        public bool IsActive { get; set; }
    }
}
