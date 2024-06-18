using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shift_Master_Api.Migrations
{
    /// <inheritdoc />
    public partial class createShiftTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ShiftTb",
                columns: table => new
                {
                    ShiftId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShiftName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NightShift = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShiftStartTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    ShiftEndTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    TotalShiftTime = table.Column<int>(type: "int", nullable: false),
                    LunchStartTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    LunchEndTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    TotalLunchTime = table.Column<int>(type: "int", nullable: true),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShiftTb", x => x.ShiftId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShiftTb");
        }
    }
}
