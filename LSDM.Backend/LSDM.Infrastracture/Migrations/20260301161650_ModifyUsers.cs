using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LSDM.Infrastracture.Migrations
{
    /// <inheritdoc />
    public partial class ModifyUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ServerRoles",
                newName: "ServerRoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ServerRoleId",
                table: "ServerRoles",
                newName: "Id");
        }
    }
}
