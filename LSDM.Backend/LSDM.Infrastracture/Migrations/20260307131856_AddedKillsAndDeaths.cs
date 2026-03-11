using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LSDM.Infrastracture.Migrations
{
    /// <inheritdoc />
    public partial class AddedKillsAndDeaths : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Deaths",
                table: "AspNetUsers",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Kills",
                table: "AspNetUsers",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Deaths",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Kills",
                table: "AspNetUsers");
        }
    }
}
