namespace Vidly.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class SeedUsers : DbMigration
    {
        public override void Up()
        {
            Sql("INSERT INTO [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'1bb53474-bdf6-4c22-a105-212870ee46f3', N'guest@vidly.com', 0, N'AJdhfc1HggAq8cXF0tRnRVdDjs2wLIbii6WEEui+XxXy8Or/JF55vWmjvGgVBNmdNQ==', N'd32373cf-c006-4c46-a5bb-31d845aba3fe', NULL, 0, 0, NULL, 1, 0, N'guest@vidly.com')");
            Sql("INSERT INTO [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'edf52396-32f9-47c0-a568-c8a7aba93bd3', N'admin@vidly.com', 0, N'AK7VHqE7yOGJdTYyEvBLVRKO5R01kS5BlaGE4r8cc0R/woBpmTSSgBepW9LfvvwhFA==', N'4a1ef573-e744-4124-b5f9-761713be5b53', NULL, 0, 0, NULL, 1, 0, N'admin@vidly.com')");
            Sql("INSERT INTO [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'ab2dcac5-a732-4f07-a910-53e777cafaa1', N'CanManageMovies')");
            Sql("INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'edf52396-32f9-47c0-a568-c8a7aba93bd3', N'ab2dcac5-a732-4f07-a910-53e777cafaa1')");
        }

        public override void Down()
        {
        }
    }
}
