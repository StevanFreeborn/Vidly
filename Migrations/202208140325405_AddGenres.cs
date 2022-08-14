namespace Vidly.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class AddGenres : DbMigration
    {
        public override void Up()
        {
            Sql("INSERT INTO [dbo].[Genres] ([Id], [Name]) VALUES (1, N'Thriller')");
            Sql("INSERT INTO [dbo].[Genres] ([Id], [Name]) VALUES (2, N'Drama')");
            Sql("INSERT INTO [dbo].[Genres] ([Id], [Name]) VALUES (3, N'Comedy')");
            Sql("INSERT INTO [dbo].[Genres] ([Id], [Name]) VALUES (4, N'Action')");
            Sql("INSERT INTO [dbo].[Genres] ([Id], [Name]) VALUES (5, N'Romance')");
        }

        public override void Down()
        {
        }
    }
}
