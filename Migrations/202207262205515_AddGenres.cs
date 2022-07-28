namespace Vidly.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class AddGenres : DbMigration
    {
        public override void Up()
        {
            Sql("INSERT INTO Genres (Id, Name) VALUES (1, 'Drama')");
            Sql("INSERT INTO Genres (Id, Name) VALUES (2, 'Thriller')");
            Sql("INSERT INTO Genres (Id, Name) VALUES (3, 'Action')");
            Sql("INSERT INTO Genres (Id, Name) VALUES (4, 'Comedy')");
            Sql("INSERT INTO Genres (Id, Name) VALUES (5, 'Adventure')");
            Sql("INSERT INTO Genres (Id, Name) VALUES (6, 'Fantasy')");
        }

        public override void Down()
        {
        }
    }
}
