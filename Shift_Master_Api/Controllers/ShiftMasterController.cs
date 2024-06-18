using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.Extensions.Options;
using Shift_Master_Api.DataContextDb;
using Shift_Master_Api.DTO;
using Shift_Master_Api.Models.DomineModels;
using Shift_Master_Api.Repostry;

namespace Shift_Master_Api.Controllers
{
   
    public class ShiftMasterController : Controller
    {
        private readonly IShiftMaster _shiftsRepostry;
        private readonly ApplicationDbContext _context;

        public ShiftMasterController(IShiftMaster ShiftMaster,ApplicationDbContext context) 
        { 
            _shiftsRepostry= ShiftMaster;
            _context=context;
        }

        [HttpPost]
        [Route("api/ShiftMaster/AddShift")]
       public IActionResult AddShift(Shift ShiftDetails)
       {
            try
            {
                //Calling Repositry for adding shift data 

                int result = _shiftsRepostry.AddShift(ShiftDetails);
                if (result == 0)
                {
                    return Ok(500);
                }
                return Ok(200);
            }
            catch (Exception)
            {

                throw;
            }
          
       }
        [HttpPatch]
        [Route("api/ShiftMaster/UpdateShift")]
        public IActionResult EditShift(UpdateShiftDto UpdateDetails)
        {
            try
            {
                _shiftsRepostry.UpdateShift(UpdateDetails);
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
           
        }
        [HttpGet]
        [Route("api/ShiftMaster/GetAllShifts")]
       
        public IActionResult GetShifts(ODataQueryOptions<Shift> options)
        {
            try
            { 
                var AllShifts = (_context.ShiftTb.ToList()).AsQueryable();
                var GetAllShift = options.ApplyTo(AllShifts);
                return Ok(GetAllShift); 
            }
            catch (Exception)
            {

                throw;
            }
            
        }
        [HttpDelete]
        [Route("api/ShiftMaster/DeleteShift")]
        public IActionResult DeleteShift(int id)
        {
            try
            {
                int result = _shiftsRepostry.DeleteShift(id);
                if (result == 0)
                {
                    return Ok(500);
                }
                return Ok(200);
            }
            catch (Exception)
            {

                throw;
            }
          
        }
        [HttpGet]
        [Route("api/ShiftMaster/GetShiftNames")]
        public IActionResult GetShiftNames()
        {
            try
            {
                var ShiftNames = _shiftsRepostry.GetAllShiftNames();
                return Ok(ShiftNames);
            }
            catch (Exception)
            {

                throw;
            }
          
        }

        [HttpGet]
        [Route("api/ShiftMaster/GetShiftDetails")]
        public IActionResult GetShiftDetails(int id)

        {
            try
            {
                var ShiftDetails = _context.ShiftTb.Where(i => i.ShiftId == id).FirstOrDefault();
                return Ok(ShiftDetails);
            }
            catch (Exception)
            {

                throw;
            }
           
        }
        [HttpGet]
        [Route("api/ShiftMaster/ValidateShiftName")]
        public IActionResult ValidateShiftName(string shiftName)
        {
            try
            {
                var result = _context.ShiftTb.Where(n => n.ShiftName == shiftName).FirstOrDefault();
                if (result == null)
                {
                    return Ok(false);
                }
                else
                {
                    return Ok(true);
                }
            }
            catch (Exception)
            {

                throw;
            }
          
           
        }
    }
}
