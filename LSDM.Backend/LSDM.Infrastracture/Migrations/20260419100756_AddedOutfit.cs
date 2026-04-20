using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace LSDM.Infrastracture.Migrations
{
    /// <inheritdoc />
    public partial class AddedOutfit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Outfits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    Model = table.Column<int>(type: "integer", nullable: false),
                    EyeColor = table.Column<int>(type: "integer", nullable: false),
                    HairColor = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Outfits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Outfits_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FaceFeatures",
                columns: table => new
                {
                    OutfitId = table.Column<int>(type: "integer", nullable: false),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    Scale = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FaceFeatures", x => new { x.OutfitId, x.Index });
                    table.ForeignKey(
                        name: "FK_FaceFeatures_Outfits_OutfitId",
                        column: x => x.OutfitId,
                        principalTable: "Outfits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HeadBlends",
                columns: table => new
                {
                    OutfitId = table.Column<int>(type: "integer", nullable: false),
                    ShapeFirstId = table.Column<int>(type: "integer", nullable: false),
                    ShapeSecondId = table.Column<int>(type: "integer", nullable: false),
                    SkinFirstId = table.Column<int>(type: "integer", nullable: false),
                    SkinSecondId = table.Column<int>(type: "integer", nullable: false),
                    ShapeMix = table.Column<float>(type: "real", nullable: false),
                    SkinMix = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeadBlends", x => x.OutfitId);
                    table.ForeignKey(
                        name: "FK_HeadBlends_Outfits_OutfitId",
                        column: x => x.OutfitId,
                        principalTable: "Outfits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HeadOverlays",
                columns: table => new
                {
                    OutfitId = table.Column<int>(type: "integer", nullable: false),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    Opacity = table.Column<float>(type: "real", nullable: false),
                    FirstColor = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeadOverlays", x => new { x.OutfitId, x.Index });
                    table.ForeignKey(
                        name: "FK_HeadOverlays_Outfits_OutfitId",
                        column: x => x.OutfitId,
                        principalTable: "Outfits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OutfitComponents",
                columns: table => new
                {
                    OutfitId = table.Column<int>(type: "integer", nullable: false),
                    ComponentId = table.Column<int>(type: "integer", nullable: false),
                    Drawable = table.Column<int>(type: "integer", nullable: false),
                    Texture = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OutfitComponents", x => new { x.OutfitId, x.ComponentId });
                    table.ForeignKey(
                        name: "FK_OutfitComponents_Outfits_OutfitId",
                        column: x => x.OutfitId,
                        principalTable: "Outfits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OutfitProps",
                columns: table => new
                {
                    OutfitId = table.Column<int>(type: "integer", nullable: false),
                    PropId = table.Column<int>(type: "integer", nullable: false),
                    Drawable = table.Column<int>(type: "integer", nullable: false),
                    Texture = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OutfitProps", x => new { x.OutfitId, x.PropId });
                    table.ForeignKey(
                        name: "FK_OutfitProps_Outfits_OutfitId",
                        column: x => x.OutfitId,
                        principalTable: "Outfits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Outfits_UserId",
                table: "Outfits",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FaceFeatures");

            migrationBuilder.DropTable(
                name: "HeadBlends");

            migrationBuilder.DropTable(
                name: "HeadOverlays");

            migrationBuilder.DropTable(
                name: "OutfitComponents");

            migrationBuilder.DropTable(
                name: "OutfitProps");

            migrationBuilder.DropTable(
                name: "Outfits");
        }
    }
}
