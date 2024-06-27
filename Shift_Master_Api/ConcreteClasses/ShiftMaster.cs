using Shift_Master_Api.DataContextDb;
using Shift_Master_Api.DTO;
using Shift_Master_Api.Models.DomineModels;
using Shift_Master_Api.Repostry;

namespace Shift_Master_Api.ConcreteClasses
{
    public class ShiftMaster : IShiftMaster
    {
        private readonly ApplicationDbContext _context;

        public ShiftMaster(ApplicationDbContext Context)
        {
            _context = Context;
        }
        public int AddShift(Shift ShiftDetails)
        {
            try
            {
                var exist=_context.ShiftTb.Any(e=>e.ShiftName==ShiftDetails.ShiftName);
                if (exist == null)
                {
                    _context.ShiftTb.Add(ShiftDetails);
                    int result = _context.SaveChanges();
                    return result;
                }
                else {
                    return 0;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public int DeleteShift(int id)
        {
            try
            {
                var GetShiftRecord = _context.ShiftTb.Where(i => i.ShiftId == id).FirstOrDefault();
                GetShiftRecord.IsDelete = true;
                int result = _context.SaveChanges();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
          
           
        }
        public List<ShiftNamesDto> GetAllShiftNames()
        {
            try
            {
                var Names = _context.ShiftTb.Select(i => i.ShiftName).ToList();
                List<ShiftNamesDto> ShiftNames = new List<ShiftNamesDto>();
                foreach (var ShiftName in Names)
                {
                    ShiftNamesDto Name = new ShiftNamesDto();
                    Name.ShiftName = ShiftName;
                    ShiftNames.Add(Name);
                }
                return ShiftNames;
            }
            catch (Exception)
            {

                throw;
            }          
        }
        public List<Shift> GetAllShifts() 
        {
            try
            {
                var AllShifts = _context.ShiftTb.Where(u => u.IsDelete == false).ToList();
                return AllShifts;
            }
            catch (Exception)
            {

                throw;
            }
          
        }

        public void UpdateShift(UpdateShiftDto updateDetails)
        {
          
            try
            {
                var getShift = _context.ShiftTb.Find(updateDetails.ShiftId);
                 getShift.Remark= updateDetails.Remark;
                getShift.IsActive= updateDetails.IsActive;
                _context.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
