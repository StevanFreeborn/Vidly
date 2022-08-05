$(document).ready(() => {
    $("#movies-table").DataTable({
        ajax: {
            url: "/api/movies",
            dataSrc: ""
        },
        columns: [
            {
                data: "name",
                render: (data, type, movie) => {
                    return `<a href="/movies/edit/${movie.id}">${movie.name}</a>`;
                }
            },
            {
                data: "genre.name"
            }
        ]
    });
});