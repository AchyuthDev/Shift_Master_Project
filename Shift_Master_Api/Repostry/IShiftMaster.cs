using Shift_Master_Api.DTO;
using Shift_Master_Api.Models.DomineModels;

namespace Shift_Master_Api.Repostry
{
    public interface IShiftMaster
    {
        public int AddShift(Shift ShiftDetails);
        public void UpdateShift(UpdateShiftDto updateDetails);

        public List<Shift> GetAllShifts();
        public int DeleteShift(int id);
        public List<ShiftNamesDto> GetAllShiftNames();
         

    }
}
