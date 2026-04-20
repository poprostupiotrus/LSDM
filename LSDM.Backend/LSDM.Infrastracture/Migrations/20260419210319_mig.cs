using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LSDM.Infrastracture.Migrations
{
    /// <inheritdoc />
    public partial class mig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_HeadOverlays",
                table: "HeadOverlays");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FaceFeatures",
                table: "FaceFeatures");

            migrationBuilder.AddColumn<int>(
                name: "HeadOverlayId",
                table: "HeadOverlays",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FaceFeatureId",
                table: "FaceFeatures",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_HeadOverlays",
                table: "HeadOverlays",
                columns: new[] { "OutfitId", "HeadOverlayId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_FaceFeatures",
                table: "FaceFeatures",
                columns: new[] { "OutfitId", "FaceFeatureId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_HeadOverlays",
                table: "HeadOverlays");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FaceFeatures",
                table: "FaceFeatures");

            migrationBuilder.DropColumn(
                name: "HeadOverlayId",
                table: "HeadOverlays");

            migrationBuilder.DropColumn(
                name: "FaceFeatureId",
                table: "FaceFeatures");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HeadOverlays",
                table: "HeadOverlays",
                columns: new[] { "OutfitId", "Index" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_FaceFeatures",
                table: "FaceFeatures",
                columns: new[] { "OutfitId", "Index" });
        }
    }
}
