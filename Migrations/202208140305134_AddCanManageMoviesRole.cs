namespace Vidly.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCanManageMoviesRole : DbMigration
    {
        public override void Up()
        {
            Sql("INSERT INTO [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'1', N'CanManageMovies')");
        }
        
        public override void Down()
        {
        }
    }
}
