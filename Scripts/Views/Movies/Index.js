$(document).ready(() => {

    GetMovies().then(movies => CreateMoviesTable(movies));

});

const GetMovies = async () => {
    const res = await fetch(`/api/movies`);
    return await res.json();
}

const CreateMoviesTable = (movies) => {
    $("#movies-table").DataTable({
        responsive: true,
        data: movies,
        columns: [
            {
                title: "Name",
                data: "name",
                render: (data, type, movie) => {
                    return `<a href="/movies/edit/${movie.id}">${movie.name}</a>`;
                }
            },
            {
                title: "Genre",
                data: "genre.name"
            }
        ]
    });
}