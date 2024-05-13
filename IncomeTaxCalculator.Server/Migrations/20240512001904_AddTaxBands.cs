using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace IncomeTaxCalculator.API.Migrations
{
    /// <inheritdoc />
    public partial class AddTaxBands : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaxBands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    LowerLimit = table.Column<decimal>(type: "TEXT", nullable: false),
                    UpperLimit = table.Column<decimal>(type: "TEXT", nullable: true),
                    TaxRate = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxBands", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "TaxBands",
                columns: new[] { "Id", "LowerLimit", "Name", "TaxRate", "UpperLimit" },
                values: new object[,]
                {
                    { 1, 0m, "Tax Band A", 0m, 5000m },
                    { 2, 5000m, "Tax Band B", 20m, 20000m },
                    { 3, 20000m, "Tax Band C", 40m, null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaxBands");
        }
    }
}
